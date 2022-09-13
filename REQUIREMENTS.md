# API Requirements

These are the document notes that describes what endpoints the API needs to supply, as well as data shapes, database schema, and all the database tables.

## API Endpoints

#### Products

-   Index: '/api/products' [GET]
-   Show: '/api/products/:id' [GET]
-   Create: '/api/products' [POST] [token required]
-   Delete: '/api/products/:id' [DELETE] [token required]

#### Users

-   Index: '/api/users' [GET] [token required]
-   Show: '/api/users/:id' [GET] [token required]
-   Create: '/api/users' [POST]
-   Login: '/api/users/login' [POST]
-   Delete: '/api/users' [DELETE] [token required]

#### Orders

-   Current Order by user (args: user id): '/api/orders/user/:id' [GET] [token required]
-   Index: '/api/orders' [GET]
-   Show: '/api/orders/:id' [GET]
-   Create: '/api/orders' [POST] [token required]
-   Delete: '/api/orders' [DELETE] [token required]
-   Add product: '/api/orders/:id/products' [POST] [token required]

## Data Shapes

### DataBase Schema

        Schema | Name | Type | Owner
        --------+----------------+-------+----------
        public | migrations | table | postgres
        public | order_products | table | postgres
        public | orders | table | postgres
        public | products | table | postgres
        public | users | table | postgres

#### Product

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

#### User

-   id
-   firstName
-   lastName
-   username
-   password_digest (hashed password)

                                            Table "public.users"
        Column      |          Type          | Collation | Nullable |              Default

        -----------------+------------------------+-----------+----------+-----------------------------------
        id | integer | | not null | nextval('users_id_seq'::regclass)
        firstname | character varying(50) | | not null |
        lastname | character varying(50) | | not null |
        username | character varying(50) | | not null |
        password_digest | character varying(255) | | not null |
        Indexes:
        "users_pkey" PRIMARY KEY, btree (id)
        Referenced by:
        TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

#### Orders

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (active or complete)

                                        Table "public.orders"

        Column | Type | Collation | Nullable | Default
        ---------+-----------------------+-----------+----------+------------------------------------
        id | integer | | not null | nextval('orders_id_seq'::regclass)
        status | character varying(20) | | not null |
        user_id | bigint | | not null |
        Indexes:
        "orders_pkey" PRIMARY KEY, btree (id)
        Foreign-key constraints:
        "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
        Referenced by:
        TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

                                  Table "public.order_products"

        Column | Type | Collation | Nullable | Default
        ------------+---------+-----------+----------+--------------------------------------------
        id | integer | | not null | nextval('order_products_id_seq'::regclass)
        quantity | integer | | not null |
        order_id | bigint | | not null |
        product_id | bigint | | not null |
        Indexes:
        "order_products_pkey" PRIMARY KEY, btree (id)
        Foreign-key constraints:
        "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
        "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
