-- StockWise sample records. For a fresh database only; running twice duplicates movements.
USE stockwise;
INSERT INTO suppliers (id, name, email, phone, address) VALUES
 (1,'Northstar Wholesale','sales@northstar.example','020 5550 1010','Birmingham, UK'),
 (2,'Harbour Trading','hello@harbour.example','020 5550 2020','Bristol, UK'),
 (3,'Evergreen Essentials','orders@evergreen.example','020 5550 3030','Leeds, UK'),
 (4,'Metro Distribution','team@metro.example','020 5550 4040','London, UK');
INSERT INTO products (id, sku, name, description, price, quantity, reorder_level, supplier_id) VALUES
 (1,'STK-001','Premium A4 Notebook','Hardcover notebook, ruled pages',4.50,48,12,1),
 (2,'STK-002','Blue Ballpoint Pens','Pack of ten ballpoint pens',2.75,9,15,1),
 (3,'STK-003','Desk Organiser','Five-compartment desk tray',12.99,18,6,2),
 (4,'STK-004','USB-C Charging Cable','One-metre braided cable',8.95,5,10,4),
 (5,'STK-005','Reusable Water Bottle','750 ml stainless steel',16.50,32,8,3),
 (6,'STK-006','Sticky Notes Set','Six colours, 100 sheets each',3.99,7,12,1),
 (7,'STK-007','Wireless Mouse','Ergonomic optical mouse',19.95,22,7,4),
 (8,'STK-008','Packing Tape','Clear 48 mm packing tape',1.80,4,10,2),
 (9,'STK-009','Paper Clips','Box of 200 metal clips',1.50,70,15,3),
 (10,'STK-010','Label Printer Roll','Thermal label roll, 500 labels',9.75,11,12,4),
 (11,'STK-011','File Folder Pack','Pack of 25 A4 folders',6.25,29,8,2),
 (12,'STK-012','Screen Cleaning Kit','Spray and microfiber cloth',7.50,16,6,3);
INSERT INTO stock_movements (product_id, movement_type, quantity, note, created_at) VALUES
 (1,'IN',48,'Opening stock','2026-10-20 09:00:00'),
 (2,'IN',20,'Opening stock','2026-10-20 09:10:00'),
 (2,'OUT',11,'Sample sale','2026-10-23 11:20:00'),
 (3,'IN',18,'Opening stock','2026-10-20 09:20:00'),
 (4,'IN',15,'Opening stock','2026-10-20 09:30:00'),
 (4,'OUT',10,'Sample sale','2026-10-25 10:30:00'),
 (5,'IN',32,'Opening stock','2026-10-20 09:40:00'),
 (6,'IN',15,'Opening stock','2026-10-20 09:50:00'),
 (6,'OUT',8,'Sample sale','2026-10-26 13:10:00'),
 (7,'IN',22,'Opening stock','2026-10-20 10:00:00'),
 (8,'IN',10,'Opening stock','2026-10-20 10:10:00'),
 (8,'OUT',6,'Sample sale','2026-10-27 15:15:00'),
 (9,'IN',70,'Opening stock','2026-10-20 10:20:00'),
 (10,'IN',20,'Opening stock','2026-10-20 10:30:00'),
 (10,'OUT',9,'Sample sale','2026-10-28 12:40:00'),
 (11,'IN',29,'Opening stock','2026-10-20 10:40:00'),
 (12,'IN',16,'Opening stock','2026-10-20 10:50:00');
