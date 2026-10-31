-- StockWise Sprint 3: run as a MySQL user with CREATE privileges.
CREATE DATABASE IF NOT EXISTS stockwise CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE stockwise;

CREATE TABLE IF NOT EXISTS suppliers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  contact_name VARCHAR(120),
  email VARCHAR(190),
  phone VARCHAR(40),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  supplier_id INT UNSIGNED NULL,
  sku VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  reorder_level INT UNSIGNED NOT NULL DEFAULT 5,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_product_supplier FOREIGN KEY (supplier_id)
    REFERENCES suppliers(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT ck_product_price CHECK (price >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stock_movements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  movement_type ENUM('IN','OUT') NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  note VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_movement_product FOREIGN KEY (product_id)
    REFERENCES products(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT ck_movement_quantity CHECK (quantity > 0),
  INDEX idx_movements_date (created_at),
  INDEX idx_movements_product_date (product_id, created_at)
) ENGINE=InnoDB;
