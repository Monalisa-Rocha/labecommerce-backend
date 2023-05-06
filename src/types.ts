export type TUser = {
    id: string,
    email: string,
    password: string,
}

export type product = {
    id: string,
    name: string,
    price: number,
    category: string,
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
}

export type purchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
}