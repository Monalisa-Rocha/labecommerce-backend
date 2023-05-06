-- Active: 1682894388974@@127.0.0.1@3306
CREATE TABLE 
    users( 
        id TEXT PRIMARY KEY UNIQUE NOT NULL, 
        email TEXT UNIQUE NOT NULL, 
        password TEXT NOT NULL
    );

INSERT INTO users (id, email, password)
VALUES
  ("u001", "monalisa@email.com", "password1"),
  ("u002", "clara@email.com", "password2"),
  ("u003", "joao@email.com", "password3");


CREATE TABLE products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
  ("id1", "Camiseta", 29.99, "Vestuário"),
  ("id2", "Calça", 59.99, "Vestuário"),
  ("id3", "Tênis", 199.99, "Calçados"),
  ("id4", "Relógio", 69.99, "Acessórios"),
  ("id5", "Shorts", 39.99, "Vestuário");

  SELECT * FROM users;

  SELECT * FROM products;

SELECT * FROM products WHERE name LIKE "Tênis";

UPDATE users SET email = "jose@email.com"
WHERE email = "maria@email.com";

UPDATE products SET id = "id6"
WHERE id = "id6"

SELECT * FROM products WHERE id = "id2";

DELETE FROM users WHERE id = "u003";

DELETE FROM products WHERE id = "id2";

UPDATE users SET id = "u011", email = "mona@email.com", password = "password11" WHERE id = "u001";

UPDATE products SET id = "id4", name = "Relogio de marca", price = 239.99, category = "acessórios de grife" WHERE id = "id4";

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

SELECT * FROM products WHERE price >= 100.00 AND price <= 300.00 ORDER BY price ASC;


CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  total_price REAL NOT NULL,
  paid INTEGER NOT NULL,
  created_at TEXT,
  delivered_at TEXT,
  buyer_id TEXT NOT NULL,
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, total_price, paid, created_at, delivered_at, buyer_id) 
VALUES
("P001", 12.00, 0, "2023-04-30 10:20:30", NULL, "U001"),
("P002", 40.00, 0, "2023-05-01 14:50:10", NULL, "U001"),
("P003", 29.99, 0, "2023-05-02 18:00:00", NULL, "U002"),
("P004", 10.99, 0, "2023-05-02 19:30:15", NULL, "U002"),
("P005", 60.00, 0, "2023-05-03 09:45:20", NULL, "U001"),
("P006", 59.99, 0, "2023-05-03 12:00:00", NULL, "U002");

UPDATE purchases SET delivered_at = DATETIME("now") WHERE id = "P001";

SELECT * FROM purchases
INNER JOIN users ON purchases.buyer_id = users.id
ORDER BY purchases.buyer_id = "U001";

-- CREATE TABLE purchases_products (
--     purchase_id TEXT NOT NULL,
--     product_id TEXT NOT NULL,
--     quantity INTEGER NOT NULL,
--     FOREIGN KEY (purchase_id) REFERENCES purchases(id),
--     FOREIGN KEY (product_id) REFERENCES products(id)
-- );
-- criação da tabela purchases_products
CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (purchase_id, product_id),
  FOREIGN KEY (purchase_id) REFERENCES purchases(purchase_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- inserção dos registros referentes à compra
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("c001", "p001", 5),
("c001", "p002", 3);

INSERT INTO purchases (purchase_id, customer_id, date)
VALUES
("c001", "customer_001", "2023-05-04"),
("c002", "customer_002", "2023-05-04"),
("c003", "customer_003", "2023-05-03");

INSERT INTO products (product_id, name, price)
VALUES
("p001", "Relógio", 29.50),
("p002", "Óculos", 19.99),
("p003", "Calça", 50.00);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("c001", 'p001', 5),
("c001", "p002", 3),
("c002", "p003", 2),
("c002", "p001", 1),
("c003", "p001", 3),
("c003", "p002", 2),
("c003", "p003", 4);

SELECT pp.purchase_id, pp.product_id, pp.quantity, p.customer_id, p.date, pr.name, pr.price
FROM purchases_products pp
INNER JOIN purchases p ON pp.purchase_id = p.purchase_id
INNER JOIN products pr ON pp.product_id = pr.product_id;


