CREATE TABLE orders (id SERIAL PRIMARY KEY, status VARCHAR(20) NOT NULL, user_id bigint REFERENCES users(id) NOT NULL);