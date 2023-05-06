"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "001",
        email: "monalisa@gmail.com",
        password: "abcdef",
    },
    {
        id: "002",
        email: "clara@hotmail.com",
        password: "fedcba",
    },
];
exports.products = [
    {
        id: "001",
        name: "Camiseta",
        price: 29.90,
        category: "Vestuário",
    },
    {
        id: "2",
        name: "Tênis",
        price: 129.90,
        category: "Calçados",
    },
];
exports.purchases = [
    {
        userId: "1",
        productId: "1",
        quantity: 3,
        totalPrice: 89.70,
    },
    {
        userId: "2",
        productId: "2",
        quantity: 2,
        totalPrice: 259.80,
    },
];
