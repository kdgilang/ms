"use strict";

const PROTO_PATH = "./user.proto";
require('dotenv').config();
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const GRPC_HOST = process.env.GRPC_HOST;
const customersProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

const customers = [
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

server.addService(customersProto.CustomerService.service, {
    getAll: (_, callback) => {
        callback(null, { customers });
    },
    get: (call, callback) => {
        let customer = customers.find(n => n.id == call.request.id);
        if (customer) {
            callback(null, customer);
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },
    insert: (call, callback) => {
        let customer = call.request;
        customer.id = "";
        customers.push(customer);
        callback(null, customer);
    },
    update: (call, callback) => {
        let existingCustomer = customers.find(n => n.id == call.request.id);
        if (existingCustomer) {
            existingCustomer.name = call.request.name;
            existingCustomer.age = call.request.age;
            existingCustomer.address = call.request.address;
            callback(null, existingCustomer);
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },
    remove: (call, callback) => {
        let existingCustomerIndex = customers.findIndex(n => n.id == call.request.id);
        if (existingCustomerIndex != -1) {
            customers.splice(existingCustomerIndex, 1);
            callback(null, {});
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    }
});

server.bind(GRPC_HOST, grpc.ServerCredentials.createInsecure());
console.log(`grpc running at ${GRPC_HOST}`);
server.start();
