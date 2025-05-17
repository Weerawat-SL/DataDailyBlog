---
layout: post
title: "DBT สำหรับ Data Engineer: เครื่องมือที่จะเปลี่ยนวิธีการทำงานกับข้อมูลของคุณ"
date: 2025-05-12
categories: [Data Engineering, Tools]
tags: [dbt, data transformation, SQL, data modeling, draft-A]
image: assets/images/dbt-cover.jpg
---

## Table of Contents
- [Table of Contents](#table-of-contents)
- [เมื่อ SQL ธรรมดาไม่เพียงพออีกต่อไป](#เมื่อ-sql-ธรรมดาไม่เพียงพออีกต่อไป)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [DBT คืออะไร?](#dbt-คืออะไร)
- [การติดตั้ง DBT](#การติดตั้ง-dbt)
- [การใช้งาน DBT เบื้องต้น](#การใช้งาน-dbt-เบื้องต้น)
  - [1. สร้างโปรเจค DBT](#1-สร้างโปรเจค-dbt)
  - [2. ตั้งค่าการเชื่อมต่อกับ Data Warehouse](#2-ตั้งค่าการเชื่อมต่อกับ-data-warehouse)
  - [3. สร้าง Model แรกของคุณ](#3-สร้าง-model-แรกของคุณ)
  - [4. กำหนด Source](#4-กำหนด-source)
  - [5. รัน DBT](#5-รัน-dbt)
- [เทคนิคและการตั้งค่า](#เทคนิคและการตั้งค่า)
  - [1. การใช้ Materialization ที่เหมาะสม](#1-การใช้-materialization-ที่เหมาะสม)
  - [2. การใช้ Macros เพื่อลดการเขียนโค้ดซ้ำ](#2-การใช้-macros-เพื่อลดการเขียนโค้ดซ้ำ)
  - [3. การทำ Data Testing](#3-การทำ-data-testing)
  - [4. การสร้าง Documentation](#4-การสร้าง-documentation)
- [สรุป](#สรุป)

## เมื่อ SQL ธรรมดาไม่เพียงพออีกต่อไป

เคยเจอปัญหาเหล่านี้มั้ย? SQL ไฟล์กระจัดกระจายอยู่ทั่วเครื่อง ไม่รู้ว่าอันไหนเป็นเวอร์ชั่นล่าสุด หรือเวลาแก้ query แล้วไม่รู้ว่าจะส่งผลกระทบกับ query อื่นๆ ยังไงบ้าง หรือแม้แต่การที่ต้องรัน SQL หลายๆ ไฟล์ตามลำดับที่ถูกต้องทุกครั้ง

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่ทำงานกับโปรเจคที่มี transformation logic เยอะๆ ทำให้การจัดการ SQL เป็นเรื่องปวดหัวมาก บางครั้งก็ต้องมานั่งเช็คว่า query ไหนต้องรันก่อน query ไหน หรือถ้ามีการเปลี่ยนแปลงโครงสร้างตาราง ก็ต้องไล่แก้ทุก query ที่เกี่ยวข้อง

นี่คือจุดที่ DBT (Data Build Tool) เข้ามาช่วยแก้ปัญหาเหล่านี้ได้อย่างลงตัว!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การใช้ DBT เพื่อจัดการ data transformation
- การเขียน SQL ในรูปแบบ modular และมีการ reuse
- การทำ version control กับ data transformation
- การทำ data documentation อัตโนมัติ
- การทำ data testing เพื่อตรวจสอบคุณภาพข้อมูล
- การสร้าง data lineage เพื่อติดตามการไหลของข้อมูล

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มใช้งาน DBT คุณควรมีสิ่งเหล่านี้:
- ความรู้พื้นฐานเกี่ยวกับ SQL
- Python (เวอร์ชั่น 3.6 หรือสูงกว่า)
- Data warehouse เช่น Snowflake, BigQuery, Redshift หรือ PostgreSQL
- Git (สำหรับ version control)
- Terminal หรือ Command Line Interface
- Text editor หรือ IDE (เช่น VS Code)

## DBT คืออะไร?

DBT (Data Build Tool) คือเครื่องมือที่ช่วยให้ data analyst และ data engineer สามารถทำ data transformation ได้อย่างมีประสิทธิภาพมากขึ้น โดยใช้หลักการของ software engineering มาประยุกต์ใช้กับการทำงานกับข้อมูล

DBT มีแนวคิดหลักๆ ดังนี้:
- **Models**: คือไฟล์ SQL ที่อธิบายว่าจะสร้างตารางหรือ view อย่างไร
- **Sources**: คือการอ้างอิงถึงข้อมูลต้นทาง
- **Tests**: คือการตรวจสอบคุณภาพของข้อมูล
- **Documentation**: คือการสร้างเอกสารอธิบายโมเดลและข้อมูล
- **Macros**: คือฟังก์ชันที่สามารถนำมาใช้ซ้ำได้ใน SQL

ข้อดีของ DBT คือ มันทำงานบน data warehouse ที่มีอยู่แล้ว ไม่ต้องย้ายข้อมูลไปมา และใช้ SQL เป็นหลัก ทำให้เรียนรู้ได้ง่าย

## การติดตั้ง DBT

การติดตั้ง DBT ทำได้หลายวิธี แต่วิธีที่ง่ายที่สุดคือการใช้ pip:

```bash
# สร้าง virtual environment
python -m venv dbt-env

# เปิดใช้งาน virtual environment
# สำหรับ Windows
dbt-env\Scripts\activate
# สำหรับ Linux/Mac
source dbt-env/bin/activate

# ติดตั้ง DBT Core และ adapter ตามประเภทของ data warehouse ที่ใช้
# สำหรับ PostgreSQL
pip install dbt-postgres

# สำหรับ Snowflake
pip install dbt-snowflake

# สำหรับ BigQuery
pip install dbt-bigquery

# สำหรับ Redshift
pip install dbt-redshift
```

หลังจากติดตั้งเสร็จแล้ว เราสามารถตรวจสอบว่าติดตั้งสำเร็จหรือไม่ด้วยคำสั่ง:

```bash
dbt --version
```

## การใช้งาน DBT เบื้องต้น

### 1. สร้างโปรเจค DBT

```bash
dbt init my_first_dbt_project
cd my_first_dbt_project
```

คำสั่งนี้จะสร้างโครงสร้างโปรเจคพื้นฐานให้เรา ซึ่งประกอบด้วยไฟล์และโฟลเดอร์ต่างๆ ที่จำเป็น

### 2. ตั้งค่าการเชื่อมต่อกับ Data Warehouse

แก้ไขไฟล์ `profiles.yml` (อยู่ที่ `~/.dbt/profiles.yml`) เพื่อตั้งค่าการเชื่อมต่อกับ data warehouse ของคุณ

ตัวอย่างสำหรับ PostgreSQL:

```yaml
my_first_dbt_project:
  target: dev
  outputs:
    dev:
      type: postgres
      host: localhost
      user: postgres
      password: your_password
      port: 5432
      dbname: your_database
      schema: dbt_dev
      threads: 4
```

### 3. สร้าง Model แรกของคุณ

สร้างไฟล์ `models/my_first_model.sql`:

```sql
-- models/my_first_model.sql
{{ config(materialized='table') }}

SELECT
    customer_id,
    first_name,
    last_name,
    email,
    created_at
FROM
    {{ source('raw', 'customers') }}
WHERE
    created_at >= '2023-01-01'
```

### 4. กำหนด Source

สร้างไฟล์ `models/sources.yml`:

```yaml
version: 2

sources:
  - name: raw
    database: your_database  # ชื่อ database ที่มีข้อมูลต้นทาง
    schema: public  # schema ที่มีข้อมูลต้นทาง
    tables:
      - name: customers
        columns:
          - name: customer_id
            tests:
              - unique
              - not_null
```

### 5. รัน DBT

```bash
# ตรวจสอบว่า SQL ที่จะถูกสร้างถูกต้องหรือไม่
dbt compile

# รัน model ทั้งหมด
dbt run

# รัน test ทั้งหมด
dbt test
```

## เทคนิคและการตั้งค่า

### 1. การใช้ Materialization ที่เหมาะสม

DBT มี materialization หลายแบบให้เลือกใช้:
- **Table**: สร้างเป็นตาราง (เหมาะกับข้อมูลที่ใช้บ่อยหรือคิวรี่ซับซ้อน)
- **View**: สร้างเป็น view (ประหยัดพื้นที่ แต่อาจช้ากว่า)
- **Incremental**: อัพเดตเฉพาะข้อมูลใหม่ (เหมาะกับตารางขนาดใหญ่)
- **Ephemeral**: ไม่สร้างเป็นตารางหรือ view แต่จะถูกแทรกเป็น CTE ในโมเดลอื่น

```sql
{{ config(
    materialized='incremental',
    unique_key='order_id'
) }}

SELECT
    order_id,
    customer_id,
    order_date,
    amount
FROM
    {{ source('raw', 'orders') }}
{% if is_incremental() %}
    WHERE order_date > (SELECT MAX(order_date) FROM {{ this }})
{% endif %}
```

### 2. การใช้ Macros เพื่อลดการเขียนโค้ดซ้ำ

สร้างไฟล์ `macros/generate_schema_name.sql`:

```sql
{% macro generate_schema_name(custom_schema_name, node) %}
    {% if custom_schema_name %}
        {{ custom_schema_name | trim }}
    {% elif target.name == 'prod' %}
        prod_{{ node.schema }}
    {% else %}
        {{ target.schema }}_{{ node.schema }}
    {% endif %}
{% endmacro %}
```

### 3. การทำ Data Testing

เพิ่ม test ใน `models/schema.yml`:

```yaml
version: 2

models:
  - name: my_first_model
    columns:
      - name: customer_id
        tests:
          - unique
          - not_null
      - name: email
        tests:
          - unique
          - not_null
          - accepted_values:
              values: ['@gmail.com', '@yahoo.com', '@hotmail.com']
              quote: false
              where: "email LIKE '%' || value"
```

### 4. การสร้าง Documentation

รัน command เพื่อสร้าง documentation:

```bash
dbt docs generate
dbt docs serve
```

## สรุป

DBT เป็นเครื่องมือที่ช่วยให้การทำ data transformation เป็นเรื่องง่ายและมีระบบมากขึ้น ด้วยการนำแนวคิดของ software engineering มาประยุกต์ใช้ ไม่ว่าจะเป็น version control, testing, documentation และ modularity

สำหรับ Data Engineer มือใหม่ การเริ่มต้นใช้ DBT อาจจะดูเป็นการเพิ่มความซับซ้อนในตอนแรก แต่เมื่อโปรเจคเริ่มใหญ่ขึ้น คุณจะเห็นประโยชน์อย่างชัดเจน โดยเฉพาะในเรื่องของการบำรุงรักษาโค้ด การทำงานร่วมกันเป็นทีม และการตรวจสอบคุณภาพข้อมูล

ลองนำ DBT ไปใช้ในโปรเจคต่อไปของคุณดูนะครับ รับรองว่าจะช่วยให้การทำงานกับข้อมูลของคุณเป็นระบบและมีประสิทธิภาพมากขึ้นแน่นอน!

หวังว่าบทความนี้จะเป็นประโยชน์สำหรับทุกคนที่กำลังมองหาวิธีจัดการกับ data transformation ให้เป็นระบบมากขึ้นนะครับ
