require('dotenv').config()
const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
import mongoose from 'mongoose'
import validateUserRepository from './repositories/validateUserRepository'
import { resolve } from 'path'
import { GRPC_HOST } from './consts/userConst'
import { DB_HOST } from './consts/userConst'

const PROTO_PATH = resolve('./user.proto')

mongoose.connect(DB_HOST)

import './schemas/userSchema'
import './schemas/userDetailSchema'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})

const usersProto = grpc.loadPackageDefinition(packageDefinition)
const server = new grpc.Server()

const users = [
  {
    id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
    name: "John Bolton",
    age: 23,
    address: "Address 1"
  },
  {
    id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
    name: "Mary Anne",
    age: 45,
    address: "Address 2"
  }
]
// @ts-ignore
server.addService(usersProto.UserService.service, {
  // @ts-ignore
  getAll: (_, callback) => {
    callback(null, { users })
  },
  // @ts-ignore
  get: (call, callback) => {
    let user = users.find(n => n.id == call.request.id)
    if (user) {
      callback(null, user)
    }
    else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found"
      })
    }
  },
  // @ts-ignore
  insert: (call, callback) => {
    let user = call.request
    user.id = ""
    users.push(user)
    callback(null, user)
  },
  // @ts-ignore
  update: (call, callback) => {
    let existinguser = users.find(n => n.id == call.request.id)
    if (existinguser) {
      existinguser.name = call.request.name
      existinguser.age = call.request.age
      existinguser.address = call.request.address
      callback(null, existinguser)
    }
    else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found"
      })
    }
  },
  // @ts-ignore
  remove: (call, callback) => {
    let existinguserIndex = users.findIndex(n => n.id == call.request.id)
    if (existinguserIndex != -1) {
      users.splice(existinguserIndex, 1)
      callback(null, {})
    }
    else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found"
      })
    }
  },
  // @ts-ignore
  validate: async (call, callback) => {
    try {
      const isValid = await validateUserRepository(call.request)

      if (isValid) {
        callback(null, {})
      }
      else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found"
        })
      }
    } catch (err) {
      console.log(err)
    }
  },
})

server.bind(GRPC_HOST, grpc.ServerCredentials.createInsecure())
console.log(`grpc running at ${GRPC_HOST}`)
server.start()
