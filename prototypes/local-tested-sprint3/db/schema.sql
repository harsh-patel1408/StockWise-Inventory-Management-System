-- StockWise Sprint 3 — MySQL 8.x database schema
-- Run: mysql -u root -p < db/schema.sql
CREATE DATABASE IF NOT EXISTS stockwise CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE stockwise;

CREATE TABLE IF NOT EXISTS suppliers (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NULL,
  phone VARCHAR(40) NULL,
  address VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  sku VARCHAR(40) NOT NULL,
  name VARCHAR(140) NOT NULL,
  description TEXT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  quantity INT UNSIGNED NOT NULL DEFAULT 0,
  reorder_level INT UNSIGNED NOT NULL DEFAULT 5,
  supplier_id INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_sku (sku),
  KEY idx_products_supplier (supplier_id),
  CONSTRAINT fk_products_supplier FOREIGN KEY (supplier_id)
    REFERENCES suppliers(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_products_price CHECK (price >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stock_movements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT UNSIGNED NOT NULL,
  movement_type ENUM('IN','OUT') NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  note VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_movements_product_date (product_id, created_at),
  CONSTRAINT fk_movements_product FOREIGN KEY (product_id)
    REFERENCES products(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_movement_positive CHECK (quantity > 0)
) ENGINE=InnoDB;
