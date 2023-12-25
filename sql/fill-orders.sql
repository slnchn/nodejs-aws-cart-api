-- Insert mock data into orders table
INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total) VALUES
    ('e801459c-22b8-49e7-8f03-ee841d142e46', '71b15627-2a92-4cf8-a014-d7bbdce0328e', '29406775-0fca-430a-befd-2abd624506d0', '{"method": "credit_card", "amount": 50}', '{"address": "123 Main St"}', 'Fast delivery', 'PROCESSING', 50.00),
    ('abf8f36f-1b01-46b6-88fb-6160484c7aff', '373cb81d-8799-4798-bf34-8a1247f319b4', 'd393b63d-0881-4116-be2e-fca8da1193f2', '{"method": "paypal", "amount": 75}', '{"address": "456 Oak St"}', 'Standard delivery', 'SHIPPED', 75.00);
 