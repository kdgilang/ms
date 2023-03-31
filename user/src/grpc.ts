require('dotenv').config()
const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
import mongoose from 'mongoose'
import validateUserRepository from './repositories/validateUserRepository'
import updateUserRepository from './repositories/updateUserRepository'
import getUserByEmailRepository from './repositories/getUserByEmailRepository'
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
  validate: async (call, callback) => {
    try {
      const isValid = await validateUserRepository(call.request)

      const response = {
        status: isValid,
        message: isValid ? "Success" : "Not found"
      }

      callback(null, response)
    } catch (err) {
      callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error"
      })
      console.log(err)
    }
  },
  // @ts-ignore
  updateToken: async (call, callback) => {
    try {
      const { email, token } = call.request
      const user = await getUserByEmailRepository(email)
      user.token = token
      await updateUserRepository(user)
      callback(null, {})
    } catch (err) {
      callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error"
      })
      console.log(err)
    }
  }
})

server.bind(GRPC_HOST, grpc.ServerCredentials.createInsecure())
console.log(`grpc running at ${GRPC_HOST}`)
server.start()
