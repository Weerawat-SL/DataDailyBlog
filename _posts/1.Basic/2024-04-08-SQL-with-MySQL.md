---
layout: post
title:  "ลองเล่น SQL บน MySQL"
author: "Weerawat"
categories: [Basic]
tags: [Database,MySQL, SQL] #[tag1, tag2, tag3]
# opengraph: {{ site.baseurl }}{{ site.baseurl }}/assets/image/DE.jpg
# name: Jane Doe
# position: "DataEngineer"
---
![](https://zixzax.net/wp-content/uploads/2020/05/MySQL-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3.png)
# ลองเล่น SQL บน MySQL

## Table of Contents
- [ทำไมต้องเรียนรู้ MySQL?](#ทำไมต้องเรียนรู้-mysql)
- [ความรู้ที่จะได้รับ](#ความรู้ที่จะได้รับ)
- [สิ่งที่ต้องเตรียมก่อนเริ่มต้น](#สิ่งที่ต้องเตรียมก่อนเริ่มต้น)
- [แนวคิดพื้นฐานของ MySQL](#แนวคิดพื้นฐานของ-mysql)
- [การติดตั้ง MySQL](#การติดตั้ง-mysql)
- [การใช้งาน MySQL เบื้องต้น](#การใช้งาน-mysql-เบื้องต้น)
- [เทคนิคและการปรับแต่ง](#เทคนิคและการปรับแต่ง)

## ทำไมต้องเรียนรู้ MySQL?
MySQL เป็นระบบฐานข้อมูลที่ได้รับความนิยมมากที่สุดตัวหนึ่งในโลก โดยมักจะได้รับเลือกให้เป็น Database ตัวแรกๆที่คนส่วนใหญ่ จะได้ลองเล่นกัน หลักๆก็เพราะ Open Source หามาลองเล่นได้ฟรี ใช้งานง่าย มีคอมมูนิตี้ขนาดใหญ่ที่คอยซัพพอร์ตเรื่องปัญหาต่างๆ และยังเป็นตัวต้นแบบของDatabase อื่นๆอีกหลายตัว

สำหรับคนที่อยากจะเริ่มศึกษาเรื่อง **SQL** และ **Database** แต่ก็ไม่รู้ว่า จะเริ่มจากตรงไหน จะไปฝึกบนเว็บ **SQL Fiddle** ก็มีข้อจำกัด จะไปใช้ **cloud service** ก็แอบไม่สบายกระเป๋าตัง วันนี้ เราจะมาทดลอง **Setup** บนเครื่องส่วนตัวของเราเองและทดสอบการใช้งานเบื่องต้นกัน

## ความรู้ที่จะได้รับ

การเรียนรู้ MySQL จะช่วยพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **SQL (Structured Query Language)** - เรียนรู้ภาษามาตรฐานสำหรับการจัดการฐานข้อมูล
- **Database Design** - เข้าใจการออกแบบฐานข้อมูลที่มีประสิทธิภาพ
- **Data Manipulation** - เรียนรู้การเพิ่ม แก้ไข ลบ และค้นหาข้อมูล
- **Data Integration** - เข้าใจวิธีการเชื่อมต่อฐานข้อมูลกับระบบอื่นๆ
- **Performance Optimization** - เรียนรู้การปรับแต่งประสิทธิภาพของฐานข้อมูล

## สิ่งที่ต้องเตรียมก่อนเริ่มต้น

ก่อนที่จะเริ่มเรียนรู้ SQL บน MySQL ควรมีสิ่งต่อไปนี้:

1. **คอมพิวเตอร์** - Windows, macOS, หรือ Linux ก็ได้
2. **Docker** (แนะนำ) - สำหรับติดตั้ง MySQL แบบง่ายๆ
3. **พื้นฐานการใช้งานคอมพิวเตอร์** - เข้าใจการใช้งาน Command Line เบื้องต้น
4. **ความอยากรู้อยากเห็น** - สำคัญที่สุด! 😊

## แนวคิดพื้นฐานของ MySQL

ก่อนที่จะเริ่มติดตั้งและใช้งาน MySQL มาทำความเข้าใจแนวคิดพื้นฐานกันก่อน:

### MySQL คืออะไร?

MySQL เป็นระบบจัดการฐานข้อมูลเชิงสัมพันธ์ (Relational Database Management System หรือ RDBMS) ที่เป็น Open Source ซึ่งหมายความว่าเราสามารถใช้งานได้ฟรี และมีชุมชนขนาดใหญ่คอยพัฒนาและสนับสนุน

### คำศัพท์พื้นฐานที่ควรรู้

- **Database** - ที่เก็บข้อมูลทั้งหมด เปรียบเสมือนโฟลเดอร์ใหญ่
- **Table** - โครงสร้างที่ใช้เก็บข้อมูล เปรียบเสมือนตารางใน Excel
- **Row** - แถวในตาราง แต่ละแถวคือข้อมูล 1 รายการ
- **Column** - คอลัมน์ในตาราง กำหนดประเภทข้อมูลที่จะเก็บ
- **Primary Key** - คอลัมน์ที่ใช้ระบุความเป็นเอกลักษณ์ของแต่ละแถว
- **Foreign Key** - คอลัมน์ที่ใช้อ้างอิงไปยัง Primary Key ของตารางอื่น
- **SQL** - ภาษาที่ใช้ในการจัดการฐานข้อมูล

### ประเภทของคำสั่ง SQL

1. **DDL (Data Definition Language)** - ใช้สร้างและจัดการโครงสร้างฐานข้อมูล เช่น CREATE, ALTER, DROP
2. **DML (Data Manipulation Language)** - ใช้จัดการข้อมูลในฐานข้อมูล เช่น SELECT, INSERT, UPDATE, DELETE
3. **DCL (Data Control Language)** - ใช้จัดการสิทธิ์การเข้าถึงข้อมูล เช่น GRANT, REVOKE
4. **TCL (Transaction Control Language)** - ใช้จัดการ Transaction เช่น COMMIT, ROLLBACK

## การติดตั้ง MySQL

เราจะแบ่งออกเป็น 2 ส่วนคือตัว **Database** และ **Tools** ที่ใช้สำหรับการ **Manage Database**

### Pre-Requirement Setup
เบื่องต้นเราต้องมี [Docker Desktop](https://www.docker.com/products/docker-desktop/) ติดตั้งในเครื่องก่อน เพราะเราจะใช้ในการความคุม **Container** ของ **Database** และ **Tools**

![Docker](https://www.docker.com/wp-content/uploads/2023/08/docker-desktop-hero-v2.svg)

### MySQL Setup
การติดตั้ง **MySQL Database** แบ่งเป็น 3 วิธีหลักๆ คือ
- **Installer** 
    **ไม่ค่อยแนะนำ** เพราะถึงจะประหยัดทรัพยากรจากการไม่ต้องรัน **Docker** ไปด้วย แต่ตัว **Database** จะรันแทบตลอดเวลาที่เปิดเครื่องเลย และลบออกยาก เลยจะไม่ขอลงรายละเอียด แต่ถ้าสนใจสามารถศึกษาได้จาก [www.mysql.com](https://www.mysql.com/) และสามารถโหลดตัว [Installer ได้ที่นี่](https://dev.mysql.com/downloads/installer/)

    ส่วน **Tools** ที่แนะนำจะเป็นตัว [MySQL Workbench](https://www.mysql.com/products/workbench/)

- **Docker Image**
เริ่มจากการเปิด `Terminal`ของ **VScode** หรือ `CMD` ขึ้นมา จากนั้นรันตามคำสั่งข้างล่างนี้ โดย

>docker run \
    --name=`<ชื่อ Container>` \
    -e MYSQL_ROOT_PASSWORD=`<Password ของ Account Root>` \
    -e MYSQL_DATABASE=`<ชื่อ Schema ที่ต้องการสร้าง>` \
    -p `<Port จากเครื่อง>`:`<Port ใน Container>` \
    -d `<ชื่อ Image ที่ใช้>`:`<Tag หรือ Version>`

ว่าแล้วก็ทดลองรันคำสั่ง ข้างล่างนี้กันเลย

```bash
docker run --name=Mysql_Database -e MYSQL_ROOT_PASSWORD=test1234 -e MYSQL_DATABASE=DEV_Schema -p 3306:3306 -d mysql:latest
```
![docker_image_install]({{ site.baseurl }}/assets/mysql/docker_image_install.png)

โหลด **Image** และสร้าง **Container** เรียบร้อย เราสามารถไปตรวจสอบได้ที่ **Docker** จะเห็นตามนี้
![docker_image_install_check]({{ site.baseurl }}/assets/mysql/docker_image_install_check.png)

จะเห็นรายละเอียด เช่น **ชื่อContainer**, **Image:Version**, **Portที่ใช้งาน** และปุ่ม **Start/Stop** หรือ ลบ ก็ทำได้ที่หน้านี้ นอกจากนี้ในหน้า **Images** จะเห็น `mysql:latest` ที่ **Download** มาและในหน้า **Volumes** จะมีการสร้าง **Volumes** ที่ใช่ใน **Container** เพิ่มมาด้วย

เมื่อติดตั้งแล้ว เราจะมาทดสอบด้วยคำสั่งเรียกดูรายละเอียดของ **Container** ข้างล่างกัน

```bash
docker inspect Mysql_Database
```

![docker_image_install_check_status]({{ site.baseurl }}/assets/mysql/docker_image_install_check_status.png)

- **Docker Compose**
วิธีนี้ จะใกล้เคียงกับการใช้ `docker run` สร้าง **Container** ตรง แต่จะต่างกันแค่ เราจะ **draft** คำสั่งทั้งหมด ลงไฟล์ `docker-compose.yml` แล้วรันทั้งหมดครั้งเดียวเลย **Docker** ก็จะสร้าง **Container** ทั้งหมด ตามที่เขียนไว้ในไฟล์นั้น

ดังนั้นในรอบนี้ เราจะสร้าง **Database** พร้อมกันกับ **phpMyAdmin** ครั้งเดียวกันเลย

สร้างไฟล์ **yaml** ชื่อ `docker-compose.yml`

>*ผมขอต่อท้ายชื่อด้วย `compose` เพื่อให้เห็นความแตกต่างบางอย่าง

>**ปกติ `MySQL` ใช้ `Port:3306` และ `phpmyadmin` ใช้ `Port:8080` แต่จะขอเลื่อนไปใช้ `3307` กับ `8081` เพื่อไม่ให้ชนกับของเดิม

```yml
version: '3.1'

services:
  mysql:
    image: mysql:latest
    container_name: Mysql_Database_compose
    ports:
      - "3307:3306"
    environment:
      - MYSQL_DATABASE=DEV_Schema
      - MYSQL_ROOT_PASSWORD=test1234

  phpmyadmin:
    image: phpmyadmin
    container_name: phpMyAdmin_compose
    restart: always
    ports:
      - 8081:80
    environment:
      - PMA_ARBITRARY=1
```

จากนั้นเปิด `Terminal` หรือ `CMD` และไปที่ **directory** ที่ไฟล์นั้นอยู๋ แล้วรัน `docker-compose up -d`

รอโหลดซักครู่หนึ่ง

![docker_compose_load]({{ site.baseurl }}/assets/mysql/docker_compose_load.png)

จะเห็นว่า **MySQL** ที่มี **Port:3307** และ **phpMyAdmin** ที่มี **Port:8081** ถูกสร้างขึ้นภายใต้ชื่อของโฟรเดอร์ที่วางไฟล์ `docker-compose.yml` เอาไว้นั้นเอง

![docker_compose_check]({{ site.baseurl }}/assets/mysql/docker_compose_check.png)

รอบนี้ เราเปลี่ยน **Port** ของ **phpMyAdmin** เป็น **8081** จึงต้องเข้าใช้งาน ด้วย `http://localhost:8081`
และเนื่องจากset ให้ **link** ไปที่ **database** ตัวไหน เลยมีการถามถึง **Server** ที่จะใช้งาน

![phpMyAdmin_login]({{ site.baseurl }}/assets/mysql/phpMyAdmin_login.png)

![phpMyAdmin_ui]({{ site.baseurl }}/assets/mysql/phpMyAdmin_ui.png)

เย้ ใช้งานได้ปกติ

ในความเป็นจริงการติดตั้ง **MySQL** และ **phpMyAdmin** เลือกแค่ 1 วิธีจากข้างบนนี้ก็พอ ที่ติดตั้งให้ดูทั้ง 2 ตัวเป็นแค่การยกตัวอย่างให้ดู 

นอกจากนี้การตั้งค่าทั้งหมดเป็นตัวอย่างการตั้งค่าอย่างง่าย หากต้องการปรับแต่งเพิ่มเติม เราสามารถไปศึกษาได้ที่ [MySQL image](https://hub.docker.com/_/mysql)
| [phpMyAdmin image](https://hub.docker.com/_/phpmyadmin)
| [phpMyAdmin image comfig](https://docs.phpmyadmin.net/en/latest/setup.html)

## การใช้งาน MySQL เบื้องต้น

หลังจากติดตั้ง MySQL เรียบร้อยแล้ว มาเริ่มใช้งานกัน:

### 1. เชื่อมต่อกับ MySQL

#### ผ่าน MySQL CLI
```bash
docker exec -it Mysql_Database bash
```

จากนั้น **Login MySQL** ด้วย **User: root** ตามคำสั่งนี้

```bash
mysql -u root -p
```
![mysql_login]({{ site.baseurl }}/assets/mysql/mysql_login.png)

จากนั้นจะโดนถามรหัสผ่าน เมื่อพิมจะไม่มีอะไรขึ้นมา ไม่ต้องตกใจ พิมให้ถูกต้องครบแล้วกด**Enter**ได้เลย

จากนี้ไป เราสามารถเขียน **SQL** ได้ตามปกติเลย เช่น เราจะเรียกดู**Schema**ทั้งหมดจากคำสั่ง
```bash
show databases;
```
![sql_show_database]({{ site.baseurl }}/assets/mysql/sql_show_database.png)

#### ผ่าน phpMyAdmin
เปิดเบราว์เซอร์และไปที่ http://localhost:8080
- Username: root
- Password: mypassword

ลองสร้าง **Table** เล่นๆ ตามนี้
```bash
๊USE DEV_Schema;

CREATE TABLE DEV_Schema.Customer_Table (
    Customer_id int,
    Customer_name varchar(255)
);

SELECT * FROM DEV_Schema.Customer_Table;
```
![sql_create_table]({{ site.baseurl }}/assets/mysql/sql_create_table.png)

เรียกTableที่สร้างได้แล้ว แต่เป็น**Table**เปล่า **terminal**เลยแจ้งว่า `Empty set`

งั้นเรามาลองใส่ข้อมูลกันเถอะ
```bash
INSERT INTO DEV_Schema.Customer_Table (Customer_id, Customer_name)
VALUES (1, 'AAA'),(2, 'BBB'),(3, 'CCC');

SELECT * FROM DEV_Schema.Customer_Table;
```
![sql_insert]({{ site.baseurl }}/assets/mysql/sql_insert.png)

ต่อไป มาติดตั้ง **phpMyAdmin** ด้วย **Docker Image** กันต่อ
เปิด **Terminal** หรือ **CMD** ใหม่ขึ้นมาแล้วรันคำสั่งดังนี้

```bash
docker run --name=phpMyAdmin -d --link Mysql_Database:db -p 8080:80 phpmyadmin/phpmyadmin
```

**Docker** จะทำการโหลด **Image** มาสร้างเป็น **Container** เช่นเดิม

![alt text]({{ site.baseurl }}/assets/mysql/phpMyAdmin_Container.png)

เมื่อ **Container** ทำงาน จะสร้าง **WebService** เป็น **UI** สวยๆให้เราใช้งานแทน **command-line** โดยพิม `http://localhost:8080` ในเว็บบราวเชอร์

ใส่ **Username : root** และ **password** เพื่อ **login** จะได้ตามรูปข้างล่าง
ซึ่งจะเห็น **Table** ที่เราสร้างไว้ตอนแรก ทางซ้ายมือ

![myadmin_table]({{ site.baseurl }}/assets/mysql/myadmin_table.png)

### 2. สร้างฐานข้อมูลและตาราง
```sql
-- สร้างฐานข้อมูล
CREATE DATABASE online_store;

-- เลือกฐานข้อมูลที่จะใช้งาน
USE online_store;

-- สร้างตาราง products
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- สร้างตาราง customers
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- สร้างตาราง orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- สร้างตาราง order_items
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### 3. เพิ่มข้อมูล

```sql
-- เพิ่มข้อมูลสินค้า
INSERT INTO products (product_name, price, stock_quantity) VALUES
('สมาร์ทโฟน รุ่น X', 15000.00, 50),
('แล็ปท็อป รุ่น Y', 35000.00, 20),
('หูฟังไร้สาย รุ่น Z', 3500.00, 100),
('กล้องถ่ายรูป รุ่น A', 28000.00, 15),
('สมาร์ทวอทช์ รุ่น B', 8500.00, 30);

-- เพิ่มข้อมูลลูกค้า
INSERT INTO customers (first_name, last_name, email, phone) VALUES
('สมชาย', 'ใจดี', 'somchai@example.com', '081-234-5678'),
('สมหญิง', 'รักสวย', 'somying@example.com', '089-876-5432'),
('มานะ', 'มานี', 'mana@example.com', '062-345-6789'),
('ปิติ', 'มีชัย', 'piti@example.com', '091-234-5678'),
('วิภา', 'สดใส', 'wipa@example.com', '085-678-9012');

-- เพิ่มข้อมูลคำสั่งซื้อ
INSERT INTO orders (customer_id, total_amount, status) VALUES
(1, 15000.00, 'delivered'),
(2, 38500.00, 'shipped'),
(3, 28000.00, 'processing'),
(4, 15000.00, 'pending'),
(5, 43500.00, 'delivered');

-- เพิ่มข้อมูลรายการสั่งซื้อ
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 15000.00),
(2, 2, 1, 35000.00),
(2, 3, 1, 3500.00),
(3, 4, 1, 28000.00),
(4, 1, 1, 15000.00),
(5, 2, 1, 35000.00),
(5, 3, 2, 3500.00),
(5, 5, 1, 8500.00);
```

### 4. ค้นหาข้อมูล

```sql
-- ค้นหาข้อมูลสินค้าทั้งหมด
SELECT * FROM products;

-- ค้นหาสินค้าที่มีราคามากกว่า 10,000 บาท
SELECT product_name, price FROM products WHERE price > 10000;

-- ค้นหาลูกค้าเรียงตามชื่อ
SELECT * FROM customers ORDER BY first_name;

-- นับจำนวนคำสั่งซื้อแยกตามสถานะ
SELECT status, COUNT(*) as count FROM orders GROUP BY status;

-- ค้นหาข้อมูลคำสั่งซื้อพร้อมชื่อลูกค้า
SELECT o.order_id, CONCAT(c.first_name, ' ', c.last_name) as customer_name, 
       o.total_amount, o.status
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

-- ค้นหารายละเอียดคำสั่งซื้อพร้อมสินค้า
SELECT o.order_id, c.first_name, c.last_name, p.product_name, 
       oi.quantity, oi.price, (oi.quantity * oi.price) as subtotal
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id;

-- หายอดขายรวมของแต่ละสินค้า
SELECT p.product_name, SUM(oi.quantity) as total_sold, 
       SUM(oi.quantity * oi.price) as total_revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id
ORDER BY total_revenue DESC;
```

### 5. แก้ไขและลบข้อมูล

```sql
-- แก้ไขราคาสินค้า
UPDATE products SET price = 16000.00 WHERE product_id = 1;

-- เพิ่มจำนวนสินค้าในสต็อก
UPDATE products SET stock_quantity = stock_quantity + 10 WHERE product_id = 4;

-- เปลี่ยนสถานะคำสั่งซื้อ
UPDATE orders SET status = 'shipped' WHERE order_id = 4;

-- ลบคำสั่งซื้อ (ต้องลบ order_items ก่อนเพราะมี foreign key)
DELETE FROM order_items WHERE order_id = 5;
DELETE FROM orders WHERE order_id = 5;
```
## เทคนิคและการปรับแต่ง

ในการใช้ SQL จะมีเทคนิคมากมายที่จะช่วยให้ใช้งานได้อย่างมีประสิทธิภาพมากขึ้น เลยจะขอยกตัวอย่างเบื่องต้นดังนี้:

### 1. การสร้าง Index เพื่อเพิ่มความเร็วในการค้นหา

```sql
-- สร้าง index บนคอลัมน์ที่ใช้ค้นหาบ่อย
CREATE INDEX idx_product_name ON products(product_name);
CREATE INDEX idx_customer_email ON customers(email);
CREATE INDEX idx_order_status ON orders(status);
```

### 2. การใช้ Transaction เพื่อความปลอดภัยของข้อมูล

```sql
-- เริ่ม transaction
START TRANSACTION;

-- ทำการเพิ่มคำสั่งซื้อ
INSERT INTO orders (customer_id, total_amount, status) 
VALUES (1, 8500.00, 'pending');

-- ดึง order_id ที่เพิ่งสร้าง
SET @last_order_id = LAST_INSERT_ID();

-- เพิ่มรายการสั่งซื้อ
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES (@last_order_id, 5, 1, 8500.00);

-- อัพเดตจำนวนสินค้าในสต็อก
UPDATE products SET stock_quantity = stock_quantity - 1 
WHERE product_id = 5;

-- ยืนยันการทำรายการ
COMMIT;

-- หากมีข้อผิดพลาด สามารถยกเลิกได้ด้วย
-- ROLLBACK;
```

### 3. การสำรองและกู้คืนข้อมูล

```bash
# สำรองข้อมูล
docker exec mysql-container sh -c 'exec mysqldump -u root -p"mypassword" online_store > /var/lib/mysql/backup.sql'

# คัดลอกไฟล์สำรองออกมา
docker cp mysql-container:/var/lib/mysql/backup.sql ./backup.sql

# กู้คืนข้อมูล
docker exec -i mysql-container sh -c 'exec mysql -u root -p"mypassword" online_store' < backup.sql
```

### 4. การใช้ Stored Procedure

```sql
-- สร้าง stored procedure สำหรับเพิ่มคำสั่งซื้อ
DELIMITER //
CREATE PROCEDURE create_order(
    IN p_customer_id INT,
    IN p_product_id INT,
    IN p_quantity INT
)
BEGIN
    DECLARE p_price DECIMAL(10, 2);
    DECLARE p_total DECIMAL(10, 2);
    DECLARE p_order_id INT;
    
    -- ดึงราคาสินค้า
    SELECT price INTO p_price FROM products WHERE product_id = p_product_id;
    
    -- คำนวณราคารวม
    SET p_total = p_price * p_quantity;
    
    -- เริ่ม transaction
    START TRANSACTION;
    
    -- เพิ่มคำสั่งซื้อ
    INSERT INTO orders (customer_id, total_amount, status) 
    VALUES (p_customer_id, p_total, 'pending');
    
    -- ดึง order_id ที่เพิ่งสร้าง
    SET p_order_id = LAST_INSERT_ID();
    
    -- เพิ่มรายการสั่งซื้อ
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (p_order_id, p_product_id, p_quantity, p_price);
    
    -- อัพเดตจำนวนสินค้าในสต็อก
    UPDATE products SET stock_quantity = stock_quantity - p_quantity 
    WHERE product_id = p_product_id;
    
    -- ยืนยันการทำรายการ
    COMMIT;
    
    -- ส่งค่า order_id กลับ
    SELECT p_order_id AS new_order_id;
    
    -- หากมีข้อผิดพลาด
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred' AS message;
    END;
END //
DELIMITER ;

-- เรียกใช้ stored procedure
CALL create_order(1, 3, 2);
```

---

การเรียนรู้ SQL เป็นก้าวแรกที่สำคัญมาก ด้วยความรู้พื้นฐานนี้ยังสามารถเอาไปต่อยอดในการทำ ETL, Data Pipeline หรือแม้แต่การวิเคราะห์ข้อมูลขั้นสูงได้

หวังว่าบทความนี้จะช่วยให้ เข้าใจพื้นฐานของ MySQL และสามารถนำไปใช้งานได้จริงได้ครับ