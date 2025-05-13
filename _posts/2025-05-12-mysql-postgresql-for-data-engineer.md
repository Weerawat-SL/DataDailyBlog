---
layout: post
title: "MySQL และ PostgreSQL สำหรับวิศวกรข้อมูล"
date: 2025-05-12
categories: [Database, Draft]
tags: [MySQL, PostgreSQL, SQL, RDBMS, Data Engineering]
---

# MySQL และ PostgreSQL สำหรับวิศวกรข้อมูล

## บทนำ

MySQL และ PostgreSQL เป็นระบบจัดการฐานข้อมูลเชิงสัมพันธ์ (RDBMS) ที่ได้รับความนิยมอย่างมากในงานวิศวกรรมข้อมูล ทั้งสองระบบมีจุดแข็งและจุดอ่อนที่แตกต่างกัน การเข้าใจคุณลักษณะและความแตกต่างของทั้งสองระบบจะช่วยให้วิศวกรข้อมูลสามารถเลือกใช้ได้อย่างเหมาะสมกับความต้องการของโครงการ บทความนี้จะกล่าวถึงคุณลักษณะ ความแตกต่าง และการใช้งาน MySQL และ PostgreSQL ในงานวิศวกรรมข้อมูล

## ภาพรวมของ MySQL และ PostgreSQL

### MySQL

MySQL เป็นระบบจัดการฐานข้อมูลเชิงสัมพันธ์แบบโอเพนซอร์สที่พัฒนาโดย Oracle Corporation (เดิมพัฒนาโดย MySQL AB) เป็นที่รู้จักในด้านความเร็ว ความน่าเชื่อถือ และความง่ายในการใช้งาน

**คุณลักษณะหลัก**:
- เน้นประสิทธิภาพและความเร็วในการอ่านข้อมูล
- รองรับหลาย storage engines (InnoDB, MyISAM, Memory, etc.)
- ใช้งานง่ายและมีชุมชนผู้ใช้ขนาดใหญ่
- มีเครื่องมือจัดการที่ใช้งานง่าย เช่น MySQL Workbench

### PostgreSQL

PostgreSQL (หรือเรียกสั้นๆ ว่า Postgres) เป็นระบบจัดการฐานข้อมูลเชิงสัมพันธ์แบบโอเพนซอร์สที่เน้นการปฏิบัติตามมาตรฐาน SQL และความสามารถในการขยายฟังก์ชัน

**คุณลักษณะหลัก**:
- รองรับฟีเจอร์ขั้นสูงและการปฏิบัติตามมาตรฐาน SQL
- รองรับข้อมูลประเภท JSON และ NoSQL
- มีความสามารถในการขยายฟังก์ชันด้วย extensions
- รองรับ advanced data types และ full-text search

## การเปรียบเทียบ MySQL และ PostgreSQL

### 1. ประสิทธิภาพและการปรับขนาด

**MySQL**:
- มีประสิทธิภาพสูงสำหรับการอ่านข้อมูล
- เหมาะสำหรับเว็บแอปพลิเคชันที่มีการอ่านข้อมูลมากกว่าการเขียน
- การปรับขนาดแนวนอนทำได้ผ่าน replication และ sharding

**PostgreSQL**:
- มีประสิทธิภาพสูงสำหรับการประมวลผลคิวรี่ที่ซับซ้อน
- รองรับการทำงานแบบ concurrent ได้ดีกว่าด้วย MVCC (Multiversion Concurrency Control)
- การปรับขนาดแนวตั้งทำได้ดีกว่า MySQL

### 2. ความสามารถและฟีเจอร์

**MySQL**:
- รองรับหลาย storage engines ที่เหมาะกับงานต่างๆ
- มีฟีเจอร์พื้นฐานครบถ้วนสำหรับการใช้งานทั่วไป
- การรองรับ JSON มีข้อจำกัดมากกว่า PostgreSQL

**PostgreSQL**:
- รองรับ data types ที่หลากหลาย เช่น arrays, hstore, JSON/JSONB, geometric types
- มี extensions ที่เพิ่มความสามารถ เช่น PostGIS สำหรับข้อมูลเชิงพื้นที่
- รองรับ table inheritance และ function overloading
- มี full-text search ในตัว

### 3. ความน่าเชื่อถือและความสอดคล้องของข้อมูล

**MySQL**:
- มีความน่าเชื่อถือสูงแต่อาจมีข้อจำกัดในการรักษาความสอดคล้องของข้อมูลในบางกรณี
- การรองรับ ACID properties ขึ้นอยู่กับ storage engine ที่ใช้ (InnoDB รองรับเต็มที่)

**PostgreSQL**:
- มีความน่าเชื่อถือสูงและเน้นการรักษาความสอดคล้องของข้อมูล
- รองรับ ACID properties อย่างเต็มที่
- มีกลไก WAL (Write-Ahead Logging) ที่ช่วยในการกู้คืนข้อมูล

### 4. การรองรับ SQL และมาตรฐาน

**MySQL**:
- รองรับ SQL standard แต่มีไวยากรณ์เฉพาะของตัวเอง
- อาจมีข้อจำกัดในการรองรับฟีเจอร์ SQL ขั้นสูง

**PostgreSQL**:
- รองรับ SQL standard อย่างครบถ้วน
- รองรับฟีเจอร์ SQL ขั้นสูง เช่น Common Table Expressions (CTEs), window functions, LATERAL JOIN

## การใช้งาน MySQL และ PostgreSQL ในงานวิศวกรรมข้อมูล

### 1. การออกแบบ Schema

#### MySQL

```sql
-- สร้างตารางใน MySQL
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- สร้างตารางที่มีความสัมพันธ์
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
) ENGINE=InnoDB;
```

#### PostgreSQL

```sql
-- สร้างตารางใน PostgreSQL
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- สร้าง function สำหรับอัปเดต updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- สร้าง trigger สำหรับอัปเดต updated_at
CREATE TRIGGER update_customers_modtime
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- สร้างตารางที่มีความสัมพันธ์
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- สร้าง index
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_created_at ON customers(created_at);
```

### 2. การใช้งานกับข้อมูล JSON

#### MySQL

```sql
-- สร้างตารางที่มีคอลัมน์ JSON
CREATE TABLE product_details (
    product_id INT PRIMARY KEY,
    details JSON
);

-- เพิ่มข้อมูล JSON
INSERT INTO product_details VALUES (1, '{"name": "Laptop", "specs": {"cpu": "Intel i7", "ram": "16GB", "storage": "512GB SSD"}}');

-- คิวรี่ข้อมูล JSON
SELECT product_id, details->'$.name' AS product_name, details->'$.specs.cpu' AS cpu
FROM product_details
WHERE details->'$.specs.ram' = '"16GB"';
```

#### PostgreSQL

```sql
-- สร้างตารางที่มีคอลัมน์ JSONB
CREATE TABLE product_details (
    product_id INT PRIMARY KEY,
    details JSONB
);

-- เพิ่มข้อมูล JSONB
INSERT INTO product_details VALUES (1, '{"name": "Laptop", "specs": {"cpu": "Intel i7", "ram": "16GB", "storage": "512GB SSD"}}');

-- คิวรี่ข้อมูล JSONB
SELECT product_id, details->>'name' AS product_name, details->'specs'->>'cpu' AS cpu
FROM product_details
WHERE details->'specs'->>'ram' = '16GB';

-- สร้าง index สำหรับ JSONB
CREATE INDEX idx_product_details_ram ON product_details ((details->'specs'->>'ram'));
```

### 3. การใช้งานกับ Window Functions

#### MySQL (ตั้งแต่เวอร์ชัน 8.0)

```sql
-- คำนวณยอดขายสะสมรายเดือน
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    SUM(total_amount) AS monthly_sales,
    SUM(SUM(total_amount)) OVER (ORDER BY DATE_FORMAT(order_date, '%Y-%m')) AS cumulative_sales
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month;

-- คำนวณอันดับลูกค้าตามยอดซื้อ
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    SUM(o.total_amount) AS total_spent,
    RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS spending_rank
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, customer_name
ORDER BY total_spent DESC;
```

#### PostgreSQL

```sql
-- คำนวณยอดขายสะสมรายเดือน
SELECT
    TO_CHAR(order_date, 'YYYY-MM') AS month,
    SUM(total_amount) AS monthly_sales,
    SUM(SUM(total_amount)) OVER (ORDER BY TO_CHAR(order_date, 'YYYY-MM')) AS cumulative_sales
FROM orders
GROUP BY TO_CHAR(order_date, 'YYYY-MM')
ORDER BY month;

-- คำนวณอันดับลูกค้าตามยอดซื้อ
SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    SUM(o.total_amount) AS total_spent,
    RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS spending_rank
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, customer_name
ORDER BY total_spent DESC;
```

### 4. การใช้งานกับ Common Table Expressions (CTEs)

#### MySQL (ตั้งแต่เวอร์ชัน 8.0)

```sql
-- ใช้ CTE เพื่อหาลูกค้าที่มียอดซื้อสูงสุดในแต่ละเดือน
WITH monthly_customer_sales AS (
    SELECT
        DATE_FORMAT(o.order_date, '%Y-%m') AS month,
        o.customer_id,
        CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
        SUM(o.total_amount) AS total_spent,
        RANK() OVER (PARTITION BY DATE_FORMAT(o.order_date, '%Y-%m') ORDER BY SUM(o.total_amount) DESC) AS rank_in_month
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY month, o.customer_id, customer_name
)
SELECT month, customer_id, customer_name, total_spent
FROM monthly_customer_sales
WHERE rank_in_month = 1
ORDER BY month;
```

#### PostgreSQL

```sql
-- ใช้ CTE เพื่อหาลูกค้าที่มียอดซื้อสูงสุดในแต่ละเดือน
WITH monthly_customer_sales AS (
    SELECT
        TO_CHAR(o.order_date, 'YYYY-MM') AS month,
        o.customer_id,
        c.first_name || ' ' || c.last_name AS customer_name,
        SUM(o.total_amount) AS total_spent,
        RANK() OVER (PARTITION BY TO_CHAR(o.order_date, 'YYYY-MM') ORDER BY SUM(o.total_amount) DESC) AS rank_in_month
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY month, o.customer_id, c.first_name, c.last_name
)
SELECT month, customer_id, customer_name, total_spent
FROM monthly_customer_sales
WHERE rank_in_month = 1
ORDER BY month;
```

## แนวปฏิบัติที่ดีในการใช้ MySQL และ PostgreSQL สำหรับวิศวกรข้อมูล

### 1. การปรับแต่งประสิทธิภาพ

#### MySQL

- **ใช้ EXPLAIN**: วิเคราะห์แผนการทำงานของคิวรี่
- **เลือก Storage Engine ที่เหมาะสม**: InnoDB สำหรับงานที่ต้องการ ACID, MyISAM สำหรับงานที่เน้นการอ่าน
- **ปรับแต่งค่าคอนฟิกุเรชัน**: ปรับแต่งค่า buffer pool, connection pool, และพารามิเตอร์อื่นๆ
- **ใช้ Partitioning**: แบ่งตารางขนาดใหญ่เป็นส่วนย่อย

#### PostgreSQL

- **ใช้ EXPLAIN ANALYZE**: วิเคราะห์แผนการทำงานและเวลาที่ใช้จริง
- **ปรับแต่ง Autovacuum**: ตั้งค่า autovacuum ให้เหมาะสมเพื่อรักษาประสิทธิภาพ
- **ใช้ Partitioning**: แบ่งตารางขนาดใหญ่เป็นส่วนย่อย
- **ปรับแต่งค่าคอนฟิกุเรชัน**: ปรับแต่งค่า shared_buffers, work_mem, และพารามิเตอร์อื่นๆ

### 2. การรักษาความปลอดภัย

#### MySQL

- **ใช้ Prepared Statements**: ป้องกัน SQL Injection
- **จัดการสิทธิ์อย่างเหมาะสม**: ใช้หลักการ least privilege
- **เข้ารหัสการเชื่อมต่อ**: ใช้ SSL/TLS
- **ตั้งค่า Security Options**: เช่น skip-show-database, local-infile=0

#### PostgreSQL

- **ใช้ Prepared Statements**: ป้องกัน SQL Injection
- **ใช้ Row-Level Security**: ควบคุมการเข้าถึงในระดับแถว
- **จัดการ pg_hba.conf**: ควบคุมการเข้าถึงในระดับเครือข่าย
- **ใช้ Roles และ Permissions**: จัดการสิทธิ์อย่างละเอียด

### 3. การสำรองและกู้คืนข้อมูล

#### MySQL

- **ใช้ mysqldump**: สำหรับการสำรองข้อมูลแบบ logical
- **ใช้ Binary Log**: สำหรับ point-in-time recovery
- **ใช้ Percona XtraBackup**: สำหรับการสำรองข้อมูลแบบ physical โดยไม่ล็อคตาราง
- **ทดสอบการกู้คืน**: ทดสอบกระบวนการกู้คืนอย่างสม่ำเสมอ

#### PostgreSQL

- **ใช้ pg_dump**: สำหรับการสำรองข้อมูลแบบ logical
- **ใช้ WAL Archiving**: สำหรับ point-in-time recovery
- **ใช้ pg_basebackup**: สำหรับการสำรองข้อมูลแบบ physical
- **ทดสอบการกู้คืน**: ทดสอบกระบวนการกู้คืนอย่างสม่ำเสมอ

### 4. การใช้งานกับ Data Pipeline

#### MySQL

- **ใช้ Change Data Capture (CDC)**: เช่น Debezium, Maxwell
- **ใช้ LOAD DATA INFILE**: สำหรับการนำเข้าข้อมูลปริมาณมาก
- **ใช้ Bulk Insert**: สำหรับการเพิ่มข้อมูลปริมาณมาก
- **ใช้ Connection Pooling**: เช่น ProxySQL, MySQL Router

#### PostgreSQL

- **ใช้ Logical Replication**: สำหรับ CDC
- **ใช้ COPY**: สำหรับการนำเข้าและส่งออกข้อมูลปริมาณมาก
- **ใช้ Foreign Data Wrappers**: เชื่อมต่อกับแหล่งข้อมูลภายนอก
- **ใช้ Connection Pooling**: เช่น PgBouncer, Pgpool-II

## กรณีศึกษา: การเลือกใช้ MySQL และ PostgreSQL ในโครงการวิศวกรรมข้อมูล

### กรณีศึกษา 1: ระบบ E-commerce

บริษัท E-commerce แห่งหนึ่งต้องการปรับปรุงระบบฐานข้อมูลเพื่อรองรับการเติบโตของธุรกิจ:

1. **ความต้องการ**:
   - รองรับการทำธุรกรรมจำนวนมาก
   - มีความพร้อมใช้งานสูง
   - รองรับการวิเคราะห์ข้อมูลลูกค้า

2. **การเลือกฐานข้อมูล**:
   - **MySQL**: สำหรับระบบ OLTP หลัก เนื่องจากมีประสิทธิภาพสูงในการอ่านและเขียนข้อมูลธุรกรรม
   - **PostgreSQL**: สำหรับระบบวิเคราะห์ข้อมูล เนื่องจากมีความสามารถในการประมวลผลคิวรี่ที่ซับซ้อน

3. **การออกแบบ**:
   - ใช้ MySQL Cluster สำหรับระบบ OLTP เพื่อความพร้อมใช้งานสูง
   - ใช้ PostgreSQL กับ TimescaleDB extension สำหรับข้อมูล time-series
   - ใช้ CDC เพื่อส่งข้อมูลจาก MySQL ไปยัง PostgreSQL

4. **ผลลัพธ์**:
   - รองรับการทำธุรกรรมได้มากกว่า 10,000 รายการต่อวินาที
   - ลดเวลาในการวิเคราะห์ข้อมูลลง 70%
   - มีความพร้อมใช้งาน 99.99%

### กรณีศึกษา 2: ระบบ Location-based Service

บริษัทสตาร์ทอัพแห่งหนึ่งต้องการสร้างแอปพลิเคชันบริการตามตำแหน่ง:

1. **ความต้องการ**:
   - จัดเก็บและค้นหาข้อมูลตำแหน่ง
   - รองรับการค้นหาตามระยะทาง
   - จัดเก็บข้อมูลผู้ใช้และการตั้งค่า

2. **การเลือกฐานข้อมูล**:
   - **PostgreSQL**: เลือกใช้เนื่องจากมี PostGIS extension ที่รองรับข้อมูลเชิงพื้นที่อย่างมีประสิทธิภาพ

3. **การออกแบบ**:
   - ใช้ PostGIS สำหรับข้อมูลตำแหน่งและการค้นหาตามระยะทาง
   - ใช้ JSONB สำหรับข้อมูลการตั้งค่าที่มีโครงสร้างยืดหยุ่น
   - ใช้ partitioning ตามพื้นที่ทางภูมิศาสตร์

4. **ผลลัพธ์**:
   - ค้นหาสถานที่ในรัศมี 5 กิโลเมตรได้ภายใน 100 มิลลิวินาที
   - รองรับผู้ใช้มากกว่า 1 ล้านคน
   - ลดพื้นที่จัดเก็บข้อมูลลง 40% ด้วยการใช้ JSONB

## แนวโน้มและอนาคตของ MySQL และ PostgreSQL

### MySQL

- **MySQL HeatWave**: บริการที่รวม OLTP และ OLAP ในระบบเดียวกัน
- **MySQL Document Store**: รองรับการจัดเก็บข้อมูลแบบ document
- **MySQL InnoDB ClusterSet**: รองรับการทำ disaster recovery ข้ามศูนย์ข้อมูล
- **MySQL Shell**: เครื่องมือใหม่สำหรับการจัดการและการเขียนสคริปต์

### PostgreSQL

- **PostgreSQL 15+**: ปรับปรุงประสิทธิภาพและฟีเจอร์ใหม่ๆ
- **Citus**: extension สำหรับการทำ distributed PostgreSQL
- **Hydra**: โครงการที่มุ่งเน้นการปรับปรุงประสิทธิภาพของ PostgreSQL
- **Postgres-XL**: รองรับการทำ MPP (Massively Parallel Processing)

## สรุป

MySQL และ PostgreSQL เป็นระบบจัดการฐานข้อมูลที่มีประสิทธิภาพสูงและมีจุดแข็งที่แตกต่างกัน การเลือกใช้ขึ้นอยู่กับความต้องการเฉพาะของโครงการ:

- **MySQL** เหมาะสำหรับแอปพลิเคชันที่ต้องการประสิทธิภาพสูงในการอ่านและเขียนข้อมูล มีความง่ายในการตั้งค่าและใช้งาน
- **PostgreSQL** เหมาะสำหรับแอปพลิเคชันที่ต้องการฟีเจอร์ขั้นสูง การรองรับข้อมูลที่ซับซ้อน และการประมวลผลคิวรี่ที่ซับซ้อน

วิศวกรข้อมูลควรเข้าใจจุดแข็งและข้อจำกัดของทั้งสองระบบเพื่อเลือกใช้ให้เหมาะสมกับความต้องการของโครงการ ในหลายกรณี การใช้ทั้งสองระบบร่วมกันอาจเป็นทางเลือกที่ดีที่สุด โดยใช้แต่ละระบบสำหรับงานที่เหมาะสมที่สุด
