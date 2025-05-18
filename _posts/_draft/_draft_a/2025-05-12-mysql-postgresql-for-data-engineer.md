---
layout: post
title: "MySQL vs PostgreSQL: คู่หูฐานข้อมูลที่ Data Engineer ต้องรู้"
author: "Weerawat"
tags: [Database, MySQL, PostgreSQL, draft-A]
---

![MySQL vs PostgreSQL](https://miro.medium.com/v2/resize:fit:1400/1*TTM5AleQfFJ-mItttJROdg.jpeg)

# MySQL vs PostgreSQL: คู่หูฐานข้อมูลที่ Data Engineer ต้องรู้

## Table of Contents
- [ปัญหาที่มักเจอเมื่อต้องเลือกใช้ฐานข้อมูล](#ปัญหาที่มักเจอเมื่อต้องเลือกใช้ฐานข้อมูล)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept](#concept)
- [Pre-Setup](#pre-setup)
- [How to](#how-to)
- [Technic and Config](#technic-and-config)
- [สรุป](#สรุป)

## ปัญหาที่มักเจอเมื่อต้องเลือกใช้ฐานข้อมูล

เคยมั้ยครับ ที่เราต้องเริ่มโปรเจคใหม่แล้วต้องเลือกฐานข้อมูล แต่ไม่รู้ว่าควรเลือก MySQL หรือ PostgreSQL ดี? หรือบางทีเราอาจจะเจอคำถามสัมภาษณ์งานว่า "ทำไมถึงเลือกใช้ MySQL แทนที่จะเป็น PostgreSQL?" แล้วเราก็ตอบได้แค่ "เพราะว่าเคยใช้มาก่อน" 😅

ผมเองก็เคยเจอปัญหาแบบนี้ตอนเริ่มทำงานเป็น Data Engineer ใหม่ๆ เลยอยากมาแชร์ประสบการณ์และความรู้เกี่ยวกับฐานข้อมูลทั้งสองตัวนี้ ที่เป็นเหมือน "คู่หู" ที่ Data Engineer ทุกคนควรรู้จักให้ดี

## Knowledge

การทำความเข้าใจเรื่องนี้จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Database Design**: เข้าใจการออกแบบฐานข้อมูลที่เหมาะสมกับแต่ละ Use Case
- **Performance Optimization**: รู้วิธีปรับแต่งฐานข้อมูลให้ทำงานได้เร็วขึ้น
- **Data Modeling**: เรียนรู้การสร้างโมเดลข้อมูลที่เหมาะสมกับแต่ละฐานข้อมูล
- **SQL Mastery**: พัฒนาทักษะ SQL ที่ใช้ได้กับทั้งสองฐานข้อมูล และเรียนรู้ความแตกต่าง
- **System Architecture**: เข้าใจว่าควรวาง Database ไว้ตรงไหนในระบบ

## Pre-Requirement

ก่อนที่เราจะไปลุยกันต่อ มาดูสิ่งที่เราควรมีกันก่อน:

1. **Docker Desktop**: เราจะใช้ Docker ในการจำลองฐานข้อมูลทั้งสองตัว
2. **Terminal หรือ Command Prompt**: สำหรับรันคำสั่ง Docker
3. **Database Client**: เช่น DBeaver, phpMyAdmin, pgAdmin หรือจะใช้ CLI ก็ได้
4. **พื้นฐาน SQL**: ความรู้พื้นฐานเกี่ยวกับคำสั่ง SQL จะช่วยให้เข้าใจได้ง่ายขึ้น

## Concept

มาทำความเข้าใจพื้นฐานของทั้งสองฐานข้อมูลกันก่อน:

### MySQL คืออะไร?

MySQL เป็นระบบจัดการฐานข้อมูลเชิงสัมพันธ์ (RDBMS) ที่เป็นที่นิยมมากที่สุดตัวหนึ่งในโลก ถูกพัฒนาโดย Oracle Corporation และเป็น Open Source

**จุดเด่น**:
- ง่ายต่อการติดตั้งและใช้งาน
- ประสิทธิภาพสูงสำหรับการอ่านข้อมูล (Read-heavy workloads)
- รองรับการทำงานกับเว็บแอปพลิเคชันได้ดี
- มีชุมชนผู้ใช้ขนาดใหญ่

### PostgreSQL คืออะไร?

PostgreSQL (หรือเรียกสั้นๆ ว่า Postgres) เป็น Object-Relational Database Management System (ORDBMS) ที่เน้นความสามารถในการขยายและความสอดคล้องกับมาตรฐาน SQL

**จุดเด่น**:
- รองรับข้อมูลประเภทซับซ้อน (เช่น JSON, Arrays)
- มีความสามารถในการทำ Full-text search
- รองรับการทำงานกับข้อมูลเชิงพื้นที่ (Geospatial data)
- การจัดการ Concurrency ที่ดีกว่า

### ความแตกต่างหลักๆ

| คุณสมบัติ | MySQL | PostgreSQL |
|----------|-------|------------|
| ประเภท | RDBMS | ORDBMS |
| การจัดการ Transaction | ACID แต่ขึ้นอยู่กับ Storage Engine | ACID เต็มรูปแบบ |
| Performance | เร็วกว่าสำหรับการอ่าน | เร็วกว่าสำหรับการเขียนที่ซับซ้อน |
| Data Types | พื้นฐาน | หลากหลาย รวมถึง JSON, Arrays |
| Replication | Master-Slave | Streaming Replication |
| License | GPL/Commercial | PostgreSQL License (เสรี) |

## Pre-Setup

มาเริ่มติดตั้งฐานข้อมูลทั้งสองตัวกันเลย! เราจะใช้ Docker เพื่อให้ง่ายต่อการติดตั้งและไม่รกเครื่อง

### ติดตั้ง MySQL ด้วย Docker

เปิด Terminal หรือ Command Prompt แล้วรันคำสั่งนี้:

```bash
docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=mypassword -e MYSQL_DATABASE=testdb -p 3306:3306 -d mysql:latest
```

คำสั่งนี้จะ:
- สร้าง Container ชื่อ `mysql-db`
- ตั้งรหัสผ่าน root เป็น `mypassword`
- สร้างฐานข้อมูลชื่อ `testdb`
- Map port 3306 ของ Container กับ port 3306 ของเครื่องเรา

### ติดตั้ง PostgreSQL ด้วย Docker

ทำแบบเดียวกันสำหรับ PostgreSQL:

```bash
docker run --name postgres-db -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=testdb -p 5432:5432 -d postgres:latest
```

### ติดตั้ง GUI Tools (ตัวเลือกเพิ่มเติม)

สำหรับ MySQL:
```bash
docker run --name phpmyadmin -d --link mysql-db:db -p 8080:80 phpmyadmin/phpmyadmin
```

สำหรับ PostgreSQL:
```bash
docker run --name pgadmin -d -e PGADMIN_DEFAULT_EMAIL=admin@example.com -e PGADMIN_DEFAULT_PASSWORD=admin -p 8081:80 dpage/pgadmin4
```

## How to

มาดูวิธีการใช้งานพื้นฐานของทั้งสองฐานข้อมูลกัน:

### การเชื่อมต่อกับ MySQL

```bash
# เชื่อมต่อผ่าน CLI
docker exec -it mysql-db mysql -u root -p

# เมื่อถูกถามรหัสผ่าน ให้ใส่ mypassword
```

หรือเข้าผ่าน phpMyAdmin ที่ http://localhost:8080 (username: root, password: mypassword)

### การเชื่อมต่อกับ PostgreSQL

```bash
# เชื่อมต่อผ่าน CLI
docker exec -it postgres-db psql -U postgres -d testdb

# ไม่ต้องใส่รหัสผ่านเพราะเรากำลังเชื่อมต่อจากภายใน Container
```

หรือเข้าผ่าน pgAdmin ที่ http://localhost:8081 (email: admin@example.com, password: admin)

### การสร้างตารางใน MySQL

```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### การสร้างตารางใน PostgreSQL

```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

สังเกตความแตกต่างเล็กน้อย: MySQL ใช้ `AUTO_INCREMENT` ในขณะที่ PostgreSQL ใช้ `SERIAL`

### การเพิ่มข้อมูล

คำสั่ง INSERT ใช้ได้เหมือนกันทั้งสองฐานข้อมูล:

```sql
INSERT INTO customers (name, email) VALUES 
('สมชาย ใจดี', 'somchai@example.com'),
('สมหญิง รักเรียน', 'somying@example.com');
```

### การค้นหาข้อมูล

คำสั่ง SELECT พื้นฐานใช้ได้เหมือนกัน:

```sql
SELECT * FROM customers WHERE name LIKE 'สม%';
```

## Technic and Config

มาดูเทคนิคและการตั้งค่าที่น่าสนใจสำหรับ Data Engineer:

### การ Import ข้อมูลขนาดใหญ่ใน MySQL

```bash
# สร้างไฟล์ CSV ตัวอย่าง
echo "id,name,email
1,สมชาย,somchai@example.com
2,สมหญิง,somying@example.com" > data.csv

# นำเข้าข้อมูล
docker exec -i mysql-db mysql -u root -p testdb << EOF
LOAD DATA LOCAL INFILE '/path/to/data.csv'
INTO TABLE customers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
EOF
```

### การ Import ข้อมูลขนาดใหญ่ใน PostgreSQL

```bash
# นำเข้าข้อมูล
docker exec -i postgres-db psql -U postgres -d testdb << EOF
COPY customers(id, name, email)
FROM '/path/to/data.csv'
DELIMITER ','
CSV HEADER;
EOF
```

### การสร้าง Index เพื่อเพิ่มประสิทธิภาพ

MySQL:
```sql
CREATE INDEX idx_customer_name ON customers(name);
```

PostgreSQL:
```sql
CREATE INDEX idx_customer_name ON customers(name);
-- หรือใช้ GIN index สำหรับการค้นหาข้อความ
CREATE INDEX idx_customer_name_gin ON customers USING gin(name gin_trgm_ops);
```

### การใช้งาน JSON

MySQL (ตั้งแต่เวอร์ชัน 5.7):
```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    attributes JSON
);

INSERT INTO products (name, attributes) VALUES 
('สมาร์ทโฟน', '{"color": "ดำ", "storage": "128GB", "camera": "48MP"}');

-- ค้นหาสินค้าที่มีกล้อง 48MP
SELECT * FROM products WHERE attributes->'$.camera' = '48MP';
```

PostgreSQL:
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    attributes JSONB
);

INSERT INTO products (name, attributes) VALUES 
('สมาร์ทโฟน', '{"color": "ดำ", "storage": "128GB", "camera": "48MP"}');

-- ค้นหาสินค้าที่มีกล้อง 48MP
SELECT * FROM products WHERE attributes->>'camera' = '48MP';
```

### การทำ Replication

MySQL:
```bash
# ตั้งค่า Master
docker run --name mysql-master -e MYSQL_ROOT_PASSWORD=master -p 3307:3306 -d mysql:latest

# ตั้งค่า Slave
docker run --name mysql-slave -e MYSQL_ROOT_PASSWORD=slave -p 3308:3306 --link mysql-master -d mysql:latest
```

PostgreSQL:
```bash
# ตั้งค่า Master
docker run --name postgres-master -e POSTGRES_PASSWORD=master -p 5433:5432 -d postgres:latest

# ตั้งค่า Replica
docker run --name postgres-replica -e POSTGRES_PASSWORD=replica -p 5434:5432 --link postgres-master -d postgres:latest
```

(หมายเหตุ: การตั้งค่า Replication จริงๆ จะซับซ้อนกว่านี้ แต่นี่เป็นตัวอย่างเบื้องต้น)

## สรุป

ทั้ง MySQL และ PostgreSQL เป็นฐานข้อมูลที่ยอดเยี่ยมและมีจุดแข็งที่แตกต่างกัน:

- **MySQL** เหมาะกับ:
  - เว็บแอปพลิเคชันที่เน้นการอ่านข้อมูล
  - ระบบที่ต้องการความเรียบง่ายในการติดตั้งและบำรุงรักษา
  - โปรเจคที่ทีมมีประสบการณ์กับ MySQL มากกว่า

- **PostgreSQL** เหมาะกับ:
  - ระบบที่ต้องการความสามารถขั้นสูง เช่น การจัดการข้อมูล JSON, Geospatial
  - งานที่ต้องการความถูกต้องของข้อมูลสูง
  - ระบบที่มีการเขียนข้อมูลซับซ้อนและต้องการ ACID compliance เต็มรูปแบบ

สำหรับ Data Engineer มือใหม่ ผมแนะนำให้เริ่มต้นกับ MySQL ก่อนเพราะง่ายกว่า แต่ก็ควรเรียนรู้ PostgreSQL ควบคู่กันไปด้วย เพราะในหลายๆ โปรเจค คุณอาจต้องทำงานกับทั้งสองฐานข้อมูลนี้

สุดท้ายนี้ การเลือกใช้ฐานข้อมูลไม่ได้มีคำตอบที่ถูกหรือผิด 100% แต่ขึ้นอยู่กับความต้องการของโปรเจคและทีมของคุณ หวังว่าบทความนี้จะช่วยให้คุณเข้าใจความแตกต่างและเลือกใช้ได้อย่างเหมาะสมครับ!

แล้วพบกันใหม่ในบทความหน้า ถ้ามีคำถามหรือข้อสงสัยอะไร ก็คอมเมนต์ได้เลยนะครับ 😊
