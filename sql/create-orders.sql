-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID,
    cart_id UUID REFERENCES carts(id),
    payment JSON,
    delivery JSON,
    comments TEXT,
    status VARCHAR(64),
    total NUMERIC
);
