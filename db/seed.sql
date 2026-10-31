-- Demo-only records. Safe to re-run after schema.sql; no real customer data.
USE stockwise;

INSERT INTO suppliers (id, name, contact_name, email, phone) VALUES
 (1,'Northline Wholesale','Amira Khan','orders@northline.example','020 7000 1101'),
 (2,'Metro Office Supply','Oliver Reed','sales@metrooffice.example','020 7000 1102'),
 (3,'FreshPack Distribution','Sara Ahmed','hello@freshpack.example','020 7000 1103')
ON DUPLICATE KEY UPDATE name=VALUES(name), contact_name=VALUES(contact_name),
  email=VALUES(email), phone=VALUES(phone);

INSERT INTO products (id, supplier_id, sku, name, description, price, stock_quantity, reorder_level) VALUES
 (1,1,'SW-1001','A4 Copy Paper','500-sheet ream',5.99,32,10),
 (2,2,'SW-1002','Blue Ballpoint Pens','Pack of 10',3.49,8,10),
 (3,2,'SW-1003','Desk Notebook','A5 ruled notebook',4.75,24,8),
 (4,3,'SW-1004','Packing Tape','48 mm clear tape',2.25,4,6),
 (5,1,'SW-1005','Printer Toner','Black cartridge',39.95,3,5),
 (6,3,'SW-1006','Shipping Labels','100-label roll',6.20,18,8),
 (7,2,'SW-1007','Highlighter Set','Assorted colours',7.99,12,6),
 (8,1,'SW-1008','Storage Folders','Pack of 20',9.50,0,4)
ON DUPLICATE KEY UPDATE supplier_id=VALUES(supplier_id), name=VALUES(name),
 description=VALUES(description), price=VALUES(price),
 stock_quantity=VALUES(stock_quantity), reorder_level=VALUES(reorder_level);

-- One opening IN movement per product, except the zero-stock product.
-- The movement history is consistent with the sample balances.
INSERT INTO stock_movements (id,product_id,movement_type,quantity,note,created_at) VALUES
 (1,1,'IN',32,'Demo opening balance','2026-10-20 09:00:00'),
 (2,2,'IN',8,'Demo opening balance','2026-10-20 09:10:00'),
 (3,3,'IN',24,'Demo opening balance','2026-10-20 09:20:00'),
 (4,4,'IN',4,'Demo opening balance','2026-10-20 09:30:00'),
 (5,5,'IN',3,'Demo opening balance','2026-10-20 09:40:00'),
 (6,6,'IN',18,'Demo opening balance','2026-10-20 09:50:00'),
 (7,7,'IN',12,'Demo opening balance','2026-10-20 10:00:00')
ON DUPLICATE KEY UPDATE note=VALUES(note);
