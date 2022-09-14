# API Requirements

These are the document notes that describes the API endpoints and their CRUD operations, as well as data shapes, database schema, and all the database tables.

## API Endpoints

**NOTE: All tokens must be in the Authorization header request of type 'Bearer'.**

#### Products

-   Index: '/api/products' [GET]
-   Show: '/api/products/:id' [GET]
-   Create: '/api/products' [POST] [token required],
    body request example:

```json
{
	"name": "laptop",
	"price": 2000
}
```

-   Delete: '/api/products/:id' [DELETE] [token required]

#### Users

-   Index: '/api/users' [GET] [token required]
-   Show: '/api/users/:id' [GET] [token required]
-   Create: '/api/users' [POST],
    body request example:

```json
{
	"firstname": "John",
	"lastname": "Doe",
	"username": "johndoe",
	"password": "12345"
}
```

-   Login: '/api/users/login' [POST],
    body request example:

```json
{
	"username": "johndoe",
	"password": "12345"
}
```

-   Delete: '/api/users' [DELETE] [token required]

#### Orders

-   Current Order by user (args: user id): '/api/orders/user/:id' [GET] [token required]
-   Index: '/api/orders' [GET]
-   Show: '/api/orders/:id' [GET]
-   Create: '/api/orders' [POST] [token required],
    body request example:

```json
{
	"userId": "5",
	"status": "active"
}
```

-   Delete: '/api/orders' [DELETE] [token required]
-   Add product: '/api/orders/:id/products' [POST] [token required],
    body request example:

```json
{
	"productId": "3",
	"quantity": 10
}
```

## Data Shapes

### DataBase Schema

        Schema | Name | Type | Owner
        --------+----------------+-------+----------
        public | migrations | table | postgres
        public | order_products | table | postgres
        public | orders | table | postgres
        public | products | table | postgres
        public | users | table | postgres

### Database Tables

#### Products Table

-   id
-   name
-   price

                                       Table "public.products"

        Column | Type | Collation | Nullable | Default
        --------+-----------------------+-----------+----------+--------------------------------------
        id | integer | | not null | nextval('products_id_seq'::regclass)
        name | character varying(50) | | not null |
        price | integer | | not null |
        Indexes:
        "products_pkey" PRIMARY KEY, btree (id)
        Referenced by:
        TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

#### Users Table

-   id
-   firstName
-   lastName
-   username
-   password_digest (hashed password)

                                            Table "public.users"
        Column   |          Type          | Collation | Nullable |              Default
        -----------+------------------------+-----------+----------+-----------------------------------
        id        | integer                |           | not null | nextval('users_id_seq'::regclass)
        firstname | character varying(50)  |           | not null |
        lastname  | character varying(50)  |           | not null |
        username  | character varying(50)  |           | not null |
        password  | character varying(255) |           | not null |
        Indexes:
            "users_pkey" PRIMARY KEY, btree (id)
        Referenced by:
            TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

#### Orders Table

-   id
-   status of order (active or complete)
-   user_id

                                        Table "public.orders"
        Column  |         Type          | Collation | Nullable |              Default
        ---------+-----------------------+-----------+----------+------------------------------------
        id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
        status  | character varying(20) |           | not null |
        user_id | bigint                |           | not null |
        Indexes:
        "orders_pkey" PRIMARY KEY, btree (id)
        Foreign-key constraints:
        "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        Referenced by:
        TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

#### Order_Products Table

-   id
-   quantity
-   order_id
-   product_id

                                  Table "public.order_products"
          Column   |  Type   | Collation | Nullable |                  Default
          ------------+---------+-----------+----------+--------------------------------------------
          id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
          quantity   | integer |           | not null |
          order_id   | bigint  |           | not null |
          product_id | bigint  |           | not null |
          Indexes:
          "order_products_pkey" PRIMARY KEY, btree (id)
          Foreign-key constraints:
          "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
          "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
