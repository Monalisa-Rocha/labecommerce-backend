import express, { Request, Response } from 'express'
import cors from 'cors'
import { products, purchases, users } from './database'
import { TUser } from './types'
import { TPurchase } from './types'
import { send } from 'process'
import { CountQueuingStrategy } from 'stream/web'
import { Console } from 'console'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003")
});

app.get('/ping', (req: Request, res: Response) => {

  res.send('Pong!')
});

app.post('/users', (req: Request, res: Response) => {

  // res.status(200).send(users)

  // REFATORANDO O CÓDIGO

  try {
    res.json(users);

    res.status(200).send(users)

  } catch (error) {

    console.log(error);

    res.status(404).send('Erro');

  }

});

app.post('/products', (req: Request, res: Response) => {

  // res.status(200).send(products)

  // REFATORANDO O CODIGO

  try {
    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(404).send('Erro');

  }

});

app.post('/purchases', (req: Request, res: Response) => {
 
  res.status(200).send(purchases)

})

app.get('/products/search', (req: Request, res: Response) => {

  // const q = req.query.q as string

  // const result = products.filter((product) => {
  //     return product.name.toLowerCase().includes(q.toLowerCase())
  // })

  // res.status(200).send(result)

  // REFATORANDO O CODIGO

  try {
    const q = req.query.q as string

    if (!q || q.length < 1) {

      throw new Error("O parâmetro 'q' deve ter pelo menos um caractere.")
    }

    const result = products.filter((product) => {

      return product.name.toLowerCase().includes(q.toLowerCase())

    })

    res.status(200).send(result)

  } catch (error) {

    res.status(400).send('Erro ao pesquisar produto')
  }


});

app.post('/users', (req: Request, res: Response) => {

  // const {id} = req.body
  // const {email} = req.body
  // const {password} = req.body

  // const { id, email, password } = req.body

  // const newUser: TUser = {
  //     id,
  //     email,
  //     password,
  // }

  // users.push(newUser)
  // res.status(201).send("Cadastro realizado com sucesso")

  // REFATORANDO O CODIGO
  try {

    const { id, email, password } = req.body

    if (!id || !email || !password) {

      throw new Error('O body está incompleto')
    }

    const deletarUser = users.find(user => user.id === id || user.email === email)

    if (deletarUser) {

      throw new Error('Já existe um usuário com o mesmo ID ou e-mail')
    }

    const newUser: TUser = {
      id,
      email,
      password,
    }

    users.push(newUser)

    res.status(201).send('Cadastro realizado com sucesso')

  } catch (error) {
    res.status(400).send('Erro ao criar usuário')
  }

});

app.post('/purchases', (req: Request, res: Response) => {

  const { userId, productId, quantity, totalPrice } = req.body

  const newPurchase: TPurchase = {

      userId,
      productId,
      quantity,
      totalPrice,
  }

  purchases.push(newPurchase)
  res.status(201).send("Compra realizada com sucesso")


});

app.get('/products', (req: Request, res: Response) => {

  res.send(products)

});

app.get('/products/:id', (req: Request, res: Response) => {

    const id = req.params.Id
  console.log(id)

    const result = products.filter((product) => {
       return product.id === id
  })

  res.status(200).send(result)

  // REFATORANDO O CÓDIGO

  // try {
  //   const id = req.params;

  //   if (!id) {
  //     throw new Error('Id inválido');
  //   }

  //   const result = products.filter((product) => product.id === id);

  //   if (result.length === 0) {
  //     throw new Error('Produto com Id não encontrado');
  //   }

  //   res.status(200).send(result);

  // } catch (error) {
  //   console.error(error);
  //   res.status(404).json({ message: error.message });

  // }

});

app.get('/users/:id/purchases', (req: Request, res: Response) => {

  //   const { id } = req.params
  // // console.log(id)

  //   const result = users.filter((purchases) => {
  //      return purchases.id === id
  // })

  // res.status(200).send(result)

  // REFATORANDO O CÓDIGO

  try {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User com Id não encontrado');
    }

    const product = products.find((product) => product.id === productId);
    if (!product) {
      throw new Error('Produto com Id não encontrado');
    }

    if (!quantity || quantity <= 0) {
      throw new Error('Quantidade inválida');
    }

    const total = product.price * quantity;

    res.status(201).json(purchases);

  } catch (error) {
    console.error(error);
    res.status(400).send('Erro');
  }

});

app.delete('/users/:id', (req: Request, res: Response) => {

  //       const id = req.params.id

  //       const userResult = users.findIndex((user) => {
  //           return user.id === id
  // })

  //       users.splice(userResult, 1)

  //       res.status(200).send("User apagado com sucesso")

  // REFATORANDO O CÓDIGO

  try {

    const id = req.params.id

    const userResult = users.findIndex((user) => {
      return user.id === id
    })

    users.splice(userResult, 1)

    res.status(200).send("User apagado com sucesso")

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }

});

app.delete('/products/:id', (req: Request, res: Response) => {

  // const id = req.params.id

  // const result = products.filter((product) => {
  //   return product.id === id
  // })

  // res.status(200).send("Produto apagado com sucesso")

  //  REFATORANDO O CÓDIGO

  try {

    const id = req.params.id

    const result = products.filter((product) => {
      return product.id === id
    })

    res.status(200).send("Produto apagado com sucesso")

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }

});

app.put('/users/:id', (req: Request, res: Response) => {

  // const { id } = req.params

  // const newId = req.body.id
  // const newEmail = req.body.email
  // const newPassword = req.body.password

  // const userFind = users.find((user) => {
  //   return user.id === id
  // })

  // if (userFind) {

  //   userFind.id = newId
  //   userFind.email = newEmail
  //   userFind.password = newPassword
  // }

  // res.status(200).send("Cadastro atualizado com sucesso")

  try {
    const id = req.params.id

    const newId = req.body.id
    const newEmail = req.body.email
    const newPassword = req.body.password

    const userFind = users.find((user) => {
      return user.id === id
    })

    if (userFind) {

      userFind.id = newId
      userFind.email = newEmail
      userFind.password = newPassword
    }

    res.status(200).send("Cadastro atualizado com sucesso")

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }

});

app.put('/products/:id', (req: Request, res: Response) => {

  // const { id } = req.params

  // const newName = req.body.name
  // const newPrice = req.body.price
  // const newCategory = req.body.category

  // const productFind = products.find((product) => {
  //   return product.id === id
  // })


  // res.status(200).send("Produto atualizado com sucesso")

  // REFATORANDO O CÓDIGO 

  try {
    const { id } = req.params

    const newName = req.body.name
    const newPrice = req.body.price
    const newCategory = req.body.category

    const productFind = products.find((product) => {
      return product.id === id
    })


    res.status(200).send("Produto atualizado com sucesso")

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }

});

// import express from 'express';
// const app = express();

// import { users, products, purchases } from "./database";

// console.log("Usuários:", users);
// console.log("Produtos:", products);
// console.log("Compras:", purchases);


// console.log("Hello World")

