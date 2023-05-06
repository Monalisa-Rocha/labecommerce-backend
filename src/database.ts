import { TUser, product, TPurchase, purchase } from "./types";

export const users: TUser[] = [
  {
    id: "u001",
    email: "monalisa@gmail.com",
    password: "abcdef",
  },
  {
    id: "u002",
    email: "clara@hotmail.com",
    password: "fedcba",
  },
];

export const products: product[] = [
  {
    id: "1",
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

export const purchases: TPurchase[] = [
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

