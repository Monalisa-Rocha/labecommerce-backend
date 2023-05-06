import { knex } from 'knex'
import express, { Request, Response } from 'express'
import cors from 'cors'

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./src/database/knex.db",
    },
    useNullAsDefault: true,
    pool: {
        min: 0,
        max: 1,
        afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        }
    }
});

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 300")
});

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

app.get("/products/:id", async (req: Request, res: Response) => {
    const productId = req.params.id;

    const product = await knex("products").where({ id: productId }).first();

    if (!product) {
        return res.status(404).send("Produto não encontrado");
    }

    return res.json(product);
});

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    const userId = req.params.id;

    const userPurchases = await knex("purchases")
        .select()
        .where({ buyer: userId });

    return res.json(userPurchases);
});

// Endpoint GET /users
app.get("/users", async (req: Request, res: Response) => {
    try {

        const users = await db.select('*').from("users");
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao consultar usuários." });
    }
});

// Endpoint GET /products
app.get("/products", async (req: Request, res: Response) => {
    try {

        const products = await db.select('*').from("products");
        res.status(200).json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao consultar produtos." });
    }
});

// Endpoint GET /product/search
app.get("/product/search", async (req: Request, res: Response) => {
    try {

        const products = await db.select('*').from("products").where("name", "like", "{req.query.q}");
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const purchase = await knex("purchases")
            .join("users", "purchases.buyer", '=', "users.id")
            .select(
                "purchases.id as purchaseId",
                "total_price as totalPrice",
                "purchases.created_at as createdAt",
                "paid as isPaid",
                "purchases.buyer as buyerId",
                "email",
                "name",
            )
            .where("purchases.id", id)
            .first();

        if (!purchase) {
            return res.status(404).json({ error: "Compra não encontrada" });
        }

        return res.status(200).json(purchase);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar compra" });
    }
});

interface PurchaseProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
}

interface Purchase {
  purchaseId: string;
  totalPrice: number;
  createdAt: string;
  isPaid: boolean;
  buyerId: string;
  email: string;
  name: string;
  productsList: PurchaseProduct[];
}

export async function getPurchaseById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const purchase = await knex("purchases")
      .select("purchases.id as purchaseId", "total_price as totalPrice", "created_at as createdAt", "is_paid as isPaid", "buyer_id as buyerId", "users.email", "users.name")
      .join("users", "users.id", "=", "purchases.buyer_id")
      .where("purchases.id", id)
      .first();

    if (!purchase) {
      return res.status(404).json({ message: "Compra não encontrada" });
    }

    const purchaseProducts = await knex("purchases_products")
      .select("products.id", "products.name", "products.price", "products.description", "products.image_url as imageUrl", "quantity")
      .join("products", "products.id", "=", "purchases_products.product_id")
      .where("purchase_id", id);

    const productsList = purchaseProducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        quantity: product.quantity,
      };
    });

    const response: Purchase = {
      purchaseId: purchase.purchaseId,
      totalPrice: purchase.totalPrice,
      createdAt: purchase.createdAt,
      isPaid: purchase.isPaid,
      buyerId: purchase.buyerId,
      email: purchase.email,
      name: purchase.name,
      productsList,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
