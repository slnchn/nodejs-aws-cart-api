-- Insert mock data into carts table
INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
    ('29406775-0fca-430a-befd-2abd624506d0', '71b15627-2a92-4cf8-a014-d7bbdce0328e', '2023-01-01', '2023-01-01', 'OPEN'),
    ('d393b63d-0881-4116-be2e-fca8da1193f2', '373cb81d-8799-4798-bf34-8a1247f319b4', '2023-01-02', '2023-01-02', 'ORDERED');

-- Insert mock data into cart_items table
INSERT INTO cart_items (product_id, cart_id, count) VALUES
    ('e4555906-3dcf-4117-b070-7715e588cb9e', '29406775-0fca-430a-befd-2abd624506d0', 3),
    ('c61edd7c-1e88-48a3-b698-8b11f32fc46d', '29406775-0fca-430a-befd-2abd624506d0', 2),
    ('cc6b3807-d7bc-45f7-8073-547558af9859', 'd393b63d-0881-4116-be2e-fca8da1193f2', 1),
    ('fbeefd45-ff88-4e60-9afd-a867baeaf06c', '5a7f7919-25ff-4167-bb7f-9d3850ac2218', 4),
    ('8265575e-932a-4a3d-878e-e448d41d0b14', '5a7f7919-25ff-4167-bb7f-9d3850ac2218', 2);
