"use strict";

const PROTO_PATH = "./user.proto";
require('dotenv').config();
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const validateUserRepository = require('./dist/repositories/validateUserRepository')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const GRPC_HOST = process.env.GRPC_HOST;
const usersProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

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
];

server.addService(usersProto.UserService.service, {
    getAll: (_, callback) => {
        callback(null, { users });
    },
    get: (call, callback) => {
        let user = users.find(n => n.id == call.request.id);
        if (user) {
            callback(null, user);
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },
    insert: (call, callback) => {
        let user = call.request;
        user.id = "";
        users.push(user);
        callback(null, user);
    },
    update: (call, callback) => {
        let existinguser = users.find(n => n.id == call.request.id);
        if (existinguser) {
            existinguser.name = call.request.name;
            existinguser.age = call.request.age;
            existinguser.address = call.request.address;
            callback(null, existinguser);
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },
    remove: (call, callback) => {
        let existinguserIndex = users.findIndex(n => n.id == call.request.id);
        if (existinguserIndex != -1) {
            users.splice(existinguserIndex, 1);
            callback(null, {});
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },
    validate: async (call, callback) => {
        const isValid = await validateUserRepository(call.request);
        if (isValid) {
            callback({ 
                code: grpc.status.OK,
                details: "Success"
            });
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },
});

server.bind(GRPC_HOST, grpc.ServerCredentials.createInsecure());
console.log(`grpc running at ${GRPC_HOST}`);
server.start();
