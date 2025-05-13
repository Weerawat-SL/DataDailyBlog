---
layout: post
title: "dbt สำหรับวิศวกรข้อมูล"
date: 2025-05-12
categories: [Data Transformation, Draft]
tags: [dbt, SQL, Data Modeling, ELT, Analytics Engineering]
---

# dbt สำหรับวิศวกรข้อมูล

## บทนำ

dbt (data build tool) เป็นเครื่องมือที่ช่วยให้วิศวกรข้อมูลและนักวิเคราะห์สามารถแปลงข้อมูลใน data warehouse ได้อย่างมีประสิทธิภาพ โดยใช้ SQL เป็นหลัก dbt ช่วยนำแนวปฏิบัติที่ดีในการพัฒนาซอฟต์แวร์มาใช้กับการแปลงข้อมูล เช่น version control, testing, documentation และ modularity บทความนี้จะกล่าวถึงหลักการพื้นฐาน คุณลักษณะ และการใช้งาน dbt ในงานวิศวกรรมข้อมูล

## dbt คืออะไร?

dbt เป็นเครื่องมือที่ช่วยในการแปลงข้อมูลใน data warehouse โดยใช้แนวคิด ELT (Extract, Load, Transform) แทนที่จะเป็น ETL (Extract, Transform, Load) แบบดั้งเดิม dbt มุ่งเน้นที่ขั้นตอน "T" (Transform) โดยให้คุณเขียนโค้ด SQL เพื่อแปลงข้อมูลที่อยู่ใน data warehouse อยู่แล้ว

### คุณลักษณะหลักของ dbt

- **SQL-first**: ใช้ SQL เป็นภาษาหลักในการแปลงข้อมูล
- **Version Control**: รองรับการใช้ Git สำหรับการควบคุมเวอร์ชัน
- **Testing**: รองรับการทดสอบข้อมูลแบบอัตโนมัติ
- **Documentation**: สร้างเอกสารแบบอัตโนมัติสำหรับโมเดลข้อมูล
- **Modularity**: สนับสนุนการสร้างโค้ดที่นำกลับมาใช้ใหม่ได้ผ่าน macros และ packages

## แนวคิดพื้นฐานของ dbt

### 1. Models

Model เป็นไฟล์ SQL ที่กำหนดวิธีการแปลงข้อมูล โดยทั่วไปแล้ว model จะสร้าง view หรือ table ใน data warehouse

```sql
-- models/customers.sql
SELECT
    id,
    first_name,
    last_name,
    email,
    created_at
FROM {{ source('raw', 'customers') }}
```

### 2. Sources

Source เป็นการอ้างอิงถึงข้อมูลดิบที่อยู่ใน data warehouse ซึ่งเป็นข้อมูลที่โหลดเข้ามาจากระบบต้นทาง

```yaml
# models/sources.yml
version: 2

sources:
  - name: raw
    database: raw_data
    schema: public
    tables:
      - name: customers
      - name: orders
```

### 3. References

Reference เป็นการอ้างอิงถึง model อื่นๆ ที่สร้างไว้แล้ว ทำให้สามารถสร้าง dependency graph ได้

```sql
-- models/customer_orders.sql
SELECT
    c.id as customer_id,
    c.first_name,
    c.last_name,
    o.id as order_id,
    o.amount,
    o.created_at as order_date
FROM {{ ref('customers') }} c
JOIN {{ ref('orders') }} o ON c.id = o.customer_id
```

### 4. Tests

Test เป็นการตรวจสอบความถูกต้องของข้อมูลใน model โดย dbt มี generic tests ที่ใช้งานได้ทันที และสามารถสร้าง singular tests ที่เป็น SQL query ได้

```yaml
# models/schema.yml
version: 2

models:
  - name: customers
    columns:
      - name: id
        tests:
          - unique
          - not_null
      - name: email
        tests:
          - unique
          - not_null
```

### 5. Documentation

Documentation เป็นการเพิ่มคำอธิบายให้กับ model และ column ซึ่ง dbt จะสร้างเอกสารแบบ HTML ให้โดยอัตโนมัติ

```yaml
# models/schema.yml
version: 2

models:
  - name: customers
    description: "ตารางข้อมูลลูกค้า"
    columns:
      - name: id
        description: "รหัสลูกค้า (primary key)"
      - name: email
        description: "อีเมลของลูกค้า"
```

### 6. Macros

Macro เป็นฟังก์ชันที่สามารถนำกลับมาใช้ใหม่ได้ใน SQL โดยใช้ Jinja templating language

```sql
-- macros/generate_schema_name.sql
--{% macro generate_schema_name(custom_schema_name, node) %}
--     {%- if custom_schema_name -%}
--         {{ custom_schema_name | trim }}
--     {%- else -%}
--         {{ node.schema }}
--     {%- endif -%}
-- {% endmacro %}
```

## การใช้งาน dbt ในงานวิศวกรรมข้อมูล

### 1. การสร้าง Data Modeling

dbt เหมาะสำหรับการสร้าง data model ใน data warehouse:

- **Staging Models**: แปลงข้อมูลดิบให้อยู่ในรูปแบบที่สะอาดและพร้อมใช้งาน
- **Intermediate Models**: สร้างโมเดลขั้นกลางที่รวมข้อมูลจากหลายแหล่ง
- **Mart Models**: สร้างโมเดลสำหรับการวิเคราะห์และรายงาน

### 2. การทดสอบคุณภาพข้อมูล

dbt ช่วยในการทดสอบคุณภาพข้อมูล:

- **Schema Tests**: ทดสอบโครงสร้างของข้อมูล เช่น unique, not_null, relationships
- **Custom Tests**: สร้างการทดสอบเฉพาะตามความต้องการ
- **Data Quality Tests**: ทดสอบคุณภาพของข้อมูล เช่น ค่าที่ถูกต้อง, ช่วงที่ยอมรับได้

### 3. การสร้างเอกสาร

dbt ช่วยในการสร้างเอกสารสำหรับ data warehouse:

- **Model Documentation**: เอกสารสำหรับโมเดลและคอลัมน์
- **Lineage Graph**: กราฟแสดงความสัมพันธ์ระหว่างโมเดล
- **Data Dictionary**: พจนานุกรมข้อมูลสำหรับ data warehouse

## การสร้าง dbt Project

### โครงสร้างของ dbt Project

```
my_dbt_project/
├── dbt_project.yml          # ไฟล์คอนฟิกของโปรเจค
├── models/                  # โฟลเดอร์สำหรับ models
│   ├── staging/             # โมเดลสำหรับ staging
│   │   ├── schema.yml       # ไฟล์ schema สำหรับ staging models
│   │   ├── stg_customers.sql
│   │   └── stg_orders.sql
│   ├── intermediate/        # โมเดลขั้นกลาง
│   │   ├── schema.yml
│   │   └── int_customer_orders.sql
│   └── marts/              # โมเดลสำหรับ data marts
│       ├── schema.yml
│       ├── dim_customers.sql
│       └── fct_orders.sql
├── macros/                  # โฟลเดอร์สำหรับ macros
│   └── generate_schema_name.sql
├── tests/                   # โฟลเดอร์สำหรับ singular tests
│   └── test_customer_orders.sql
└── seeds/                   # โฟลเดอร์สำหรับ seed files
    └── country_codes.csv
```

### ตัวอย่าง dbt_project.yml

```yaml
name: 'my_dbt_project'
version: '1.0.0'
config-version: 2

profile: 'my_profile'

model-paths: ["models"]
seed-paths: ["seeds"]
test-paths: ["tests"]
macro-paths: ["macros"]
snapshot-paths: ["snapshots"]

target-path: "target"
clean-targets:
  - "target"
  - "dbt_modules"
  - "logs"

models:
  my_dbt_project:
    staging:
      materialized: view
    intermediate:
      materialized: ephemeral
    marts:
      materialized: table
```

### ตัวอย่าง Staging Model

```sql
-- models/staging/stg_customers.sql
WITH source AS (
    SELECT * FROM {{ source('raw', 'customers') }}
),

renamed AS (
    SELECT
        id AS customer_id,
        first_name,
        last_name,
        email,
        created_at,
        updated_at
    FROM source
)

SELECT * FROM renamed
```

### ตัวอย่าง Intermediate Model

```sql
-- models/intermediate/int_customer_orders.sql
WITH customers AS (
    SELECT * FROM {{ ref('stg_customers') }}
),

orders AS (
    SELECT * FROM {{ ref('stg_orders') }}
),

customer_orders AS (
    SELECT
        customers.customer_id,
        customers.first_name,
        customers.last_name,
        customers.email,
        orders.order_id,
        orders.amount,
        orders.order_date
    FROM customers
    LEFT JOIN orders ON customers.customer_id = orders.customer_id
)

SELECT * FROM customer_orders
```

### ตัวอย่าง Mart Model

```sql
-- models/marts/dim_customers.sql
WITH customers AS (
    SELECT * FROM {{ ref('stg_customers') }}
),

orders AS (
    SELECT
        customer_id,
        COUNT(*) AS order_count,
        SUM(amount) AS total_amount
    FROM {{ ref('stg_orders') }}
    GROUP BY customer_id
),

final AS (
    SELECT
        c.customer_id,
        c.first_name,
        c.last_name,
        c.email,
        COALESCE(o.order_count, 0) AS order_count,
        COALESCE(o.total_amount, 0) AS total_amount
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
)

SELECT * FROM final
```

## แนวปฏิบัติที่ดีในการใช้ dbt

### 1. การออกแบบ Model

- **ใช้ Staging Models**: สร้าง staging models สำหรับแต่ละแหล่งข้อมูล
- **ใช้ Intermediate Models**: สร้าง intermediate models สำหรับการแปลงข้อมูลที่ซับซ้อน
- **ใช้ Mart Models**: สร้าง mart models สำหรับการวิเคราะห์และรายงาน
- **ใช้ Naming Convention**: ตั้งชื่อ models ให้มีความหมายและเป็นระบบ

### 2. การทดสอบ

- **ทดสอบทุก Primary Key**: ทดสอบว่า primary key เป็น unique และ not null
- **ทดสอบ Foreign Keys**: ทดสอบความสัมพันธ์ระหว่างตาราง
- **ทดสอบ Business Logic**: สร้าง custom tests สำหรับ business logic
- **ทดสอบก่อน Deploy**: รัน dbt test ก่อน deploy เสมอ

### 3. การจัดการ Dependencies

- **ใช้ ref และ source**: ใช้ ref และ source แทนการอ้างอิงตารางโดยตรง
- **ใช้ DAG**: ออกแบบ dependency graph ให้ชัดเจนและไม่ซับซ้อนเกินไป
- **หลีกเลี่ยง Circular Dependencies**: หลีกเลี่ยงการสร้าง circular dependencies

### 4. การจัดการ Performance

- **ใช้ Materialization ที่เหมาะสม**: เลือกใช้ materialization (view, table, incremental, ephemeral) ที่เหมาะสมกับแต่ละ model
- **ใช้ Incremental Models**: ใช้ incremental models สำหรับข้อมูลที่มีขนาดใหญ่และมีการอัปเดตบ่อย
- **ใช้ Partitioning และ Clustering**: ใช้ partitioning และ clustering สำหรับตารางขนาดใหญ่

## การใช้งาน dbt กับ Data Warehouse ต่างๆ

### dbt กับ Snowflake

```yaml
# profiles.yml
my_profile:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: [account]
      user: [username]
      password: [password]
      role: [role]
      database: [database]
      warehouse: [warehouse]
      schema: [schema]
      threads: 4
```

### dbt กับ BigQuery

```yaml
# profiles.yml
my_profile:
  target: dev
  outputs:
    dev:
      type: bigquery
      method: service-account
      keyfile: [path/to/keyfile.json]
      project: [project_id]
      dataset: [dataset]
      threads: 4
```

### dbt กับ Redshift

```yaml
# profiles.yml
my_profile:
  target: dev
  outputs:
    dev:
      type: redshift
      host: [host]
      user: [username]
      password: [password]
      port: 5439
      dbname: [database]
      schema: [schema]
      threads: 4
```

## กรณีศึกษา: การใช้ dbt ในโครงการวิศวกรรมข้อมูล

### กรณีศึกษา: E-commerce Analytics

บริษัท E-commerce แห่งหนึ่งต้องการสร้างระบบวิเคราะห์ข้อมูลโดยใช้ dbt:

1. **ความต้องการ**:
   - แปลงข้อมูลดิบจากระบบ E-commerce เป็นโมเดลที่พร้อมสำหรับการวิเคราะห์
   - สร้างรายงานยอดขาย, พฤติกรรมลูกค้า, และประสิทธิภาพของสินค้า
   - ตรวจสอบคุณภาพข้อมูลอย่างสม่ำเสมอ

2. **การใช้ dbt**:
   - สร้าง staging models สำหรับข้อมูลดิบจากระบบ E-commerce
   - สร้าง intermediate models สำหรับการรวมและแปลงข้อมูล
   - สร้าง mart models สำหรับการวิเคราะห์และรายงาน
   - สร้าง tests สำหรับการตรวจสอบคุณภาพข้อมูล
   - สร้างเอกสารสำหรับโมเดลข้อมูล

3. **ผลลัพธ์**:
   - ลดเวลาในการพัฒนาโมเดลข้อมูลลง 60%
   - เพิ่มความน่าเชื่อถือของข้อมูลด้วยการทดสอบอัตโนมัติ
   - ปรับปรุงความเข้าใจในข้อมูลด้วยเอกสารที่ชัดเจน

## เครื่องมือและ Ecosystem ของ dbt

### 1. dbt Cloud

dbt Cloud เป็นบริการ managed dbt ที่ช่วยให้สามารถใช้งาน dbt ได้โดยไม่ต้องติดตั้งและจัดการเอง:

- **Web IDE**: พัฒนา dbt models บนเว็บ
- **Scheduling**: กำหนดเวลาการรัน dbt jobs
- **CI/CD**: รองรับการทำ CI/CD
- **Documentation Hosting**: โฮสต์เอกสารของ dbt project

### 2. dbt Packages

dbt Packages เป็นชุดของ models, macros, และ tests ที่สามารถนำมาใช้ซ้ำได้:

- **dbt_utils**: ชุดของ macros ที่ใช้บ่อย
- **dbt_expectations**: ชุดของ tests สำหรับการตรวจสอบคุณภาพข้อมูล
- **dbt_date**: ชุดของ macros สำหรับการจัดการวันที่
- **dbt_audit_helper**: ชุดของ macros สำหรับการตรวจสอบการเปลี่ยนแปลงของข้อมูล

### 3. dbt CLI

dbt CLI เป็นเครื่องมือคอมมานด์ไลน์สำหรับการใช้งาน dbt:

```bash
# ติดตั้ง dbt
pip install dbt-core dbt-snowflake

# สร้าง dbt project ใหม่
dbt init my_project

# รัน dbt models
dbt run

# รัน dbt tests
dbt test

# สร้างเอกสาร
dbt docs generate
dbt docs serve
```

## แนวโน้มและอนาคตของ dbt

### 1. dbt Core และ dbt Cloud

dbt มีการพัฒนาอย่างต่อเนื่องทั้ง dbt Core (open-source) และ dbt Cloud (managed service):

- เพิ่มฟีเจอร์ใหม่ๆ
- ปรับปรุงประสิทธิภาพและความเสถียร
- รองรับ data warehouse และ data platform เพิ่มเติม

### 2. dbt Semantic Layer

dbt Semantic Layer เป็นฟีเจอร์ใหม่ที่ช่วยในการกำหนดความหมายของข้อมูล:

- กำหนด metrics และ dimensions
- สร้าง semantic layer ที่สามารถใช้ร่วมกับเครื่องมือ BI ต่างๆ
- ลดความซ้ำซ้อนในการกำหนด metrics

### 3. dbt และ Data Mesh

dbt สามารถใช้เป็นเครื่องมือสำหรับการทำ Data Mesh:

- รองรับการทำงานแบบกระจาย
- สนับสนุนการสร้าง data products
- ช่วยในการจัดการ data contracts

## สรุป

dbt เป็นเครื่องมือที่มีประโยชน์อย่างมากสำหรับวิศวกรข้อมูลในการแปลงข้อมูลใน data warehouse ด้วยการใช้ SQL เป็นหลักและการนำแนวปฏิบัติที่ดีในการพัฒนาซอฟต์แวร์มาใช้ dbt ช่วยให้สามารถสร้าง data model ที่มีคุณภาพ ทดสอบได้ และมีเอกสารที่ชัดเจน

การใช้ dbt ช่วยให้วิศวกรข้อมูลสามารถทำงานได้อย่างมีประสิทธิภาพมากขึ้น ลดความผิดพลาด และเพิ่มความน่าเชื่อถือของข้อมูล นอกจากนี้ dbt ยังมีการพัฒนาอย่างต่อเนื่องและมี ecosystem ที่กว้างขวาง ทำให้เป็นเครื่องมือที่มีอนาคตสดใสในวงการวิศวกรรมข้อมูล
