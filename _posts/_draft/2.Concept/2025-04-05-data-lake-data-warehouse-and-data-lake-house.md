---
layout: post
title: "Data Lake, Data Warehouse และ Data Lakehouse: เลือกใช้แบบไหนดี?"
author: "Weerawat"
date: 2025-04-05
categories: [Concept, Data Engineering, Architecture]
tags: [data lake, data warehouse, data lakehouse, architecture, draft-A]
image: assets/images/data-storage-cover.jpg
---

## Table of Contents
- [Table of Contents](#table-of-contents)
- [เมื่อต้องเลือกที่เก็บข้อมูลให้เหมาะสม](#เมื่อต้องเลือกที่เก็บข้อมูลให้เหมาะสม)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Data Lake คืออะไร?](#data-lake-คืออะไร)
  - [ลักษณะสำคัญของ Data Lake:](#ลักษณะสำคัญของ-data-lake)
  - [ตัวอย่าง Data Lake:](#ตัวอย่าง-data-lake)
  - [ตัวอย่างการใช้งาน Data Lake:](#ตัวอย่างการใช้งาน-data-lake)
- [Data Warehouse คืออะไร?](#data-warehouse-คืออะไร)
  - [ลักษณะสำคัญของ Data Warehouse:](#ลักษณะสำคัญของ-data-warehouse)
  - [ตัวอย่าง Data Warehouse:](#ตัวอย่าง-data-warehouse)
  - [ตัวอย่างการใช้งาน Data Warehouse:](#ตัวอย่างการใช้งาน-data-warehouse)
- [Data Lakehouse คืออะไร?](#data-lakehouse-คืออะไร)
  - [ลักษณะสำคัญของ Data Lakehouse:](#ลักษณะสำคัญของ-data-lakehouse)
  - [ตัวอย่าง Data Lakehouse:](#ตัวอย่าง-data-lakehouse)
  - [ตัวอย่างการใช้งาน Data Lakehouse:](#ตัวอย่างการใช้งาน-data-lakehouse)
- [เปรียบเทียบทั้งสามแบบ](#เปรียบเทียบทั้งสามแบบ)
- [การเลือกใช้ให้เหมาะสม](#การเลือกใช้ให้เหมาะสม)
  - [เลือก Data Lake เมื่อ:](#เลือก-data-lake-เมื่อ)
  - [เลือก Data Warehouse เมื่อ:](#เลือก-data-warehouse-เมื่อ)
  - [เลือก Data Lakehouse เมื่อ:](#เลือก-data-lakehouse-เมื่อ)
  - [แนวทาง Modern Data Stack](#แนวทาง-modern-data-stack)
- [สรุป](#สรุป)

## เมื่อต้องเลือกที่เก็บข้อมูลให้เหมาะสม

เคยเจอสถานการณ์แบบนี้มั้ย? องค์กรของคุณมีข้อมูลมากมายหลายประเภท ทั้งข้อมูลที่มีโครงสร้าง (structured) และไม่มีโครงสร้าง (unstructured) แล้วไม่รู้ว่าควรจัดเก็บอย่างไรดี หรือทีมผู้บริหารต้องการรายงานที่มีความถูกต้องสูงในขณะที่ทีม Data Science ต้องการข้อมูลดิบจำนวนมากสำหรับสร้างโมเดล

ผมเองก็เคยเจอปัญหานี้มาก่อน โดยเฉพาะตอนที่ต้องออกแบบสถาปัตยกรรมข้อมูลให้กับองค์กรที่มีความต้องการหลากหลาย บางทีมต้องการความเร็วและความถูกต้อง บางทีมต้องการความยืดหยุ่นและข้อมูลดิบ การเลือกระหว่าง Data Lake, Data Warehouse หรือแม้แต่ Data Lakehouse จึงเป็นเรื่องที่ต้องพิจารณาอย่างรอบคอบ

ในบทความนี้ เราจะมาทำความเข้าใจความแตกต่างระหว่างทั้งสามแบบ และเรียนรู้วิธีเลือกใช้ให้เหมาะสมกับความต้องการขององค์กร!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- ความเข้าใจเกี่ยวกับสถาปัตยกรรมการจัดเก็บข้อมูลแบบต่างๆ
- การวิเคราะห์ความต้องการและเลือกสถาปัตยกรรมที่เหมาะสม
- การออกแบบระบบจัดเก็บข้อมูลที่มีประสิทธิภาพ
- การเข้าใจข้อดีและข้อเสียของแต่ละแบบ
- การวางแผนการย้ายข้อมูลระหว่างระบบต่างๆ

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มเรียนรู้เกี่ยวกับ Data Lake, Data Warehouse และ Data Lakehouse คุณควรมีความรู้พื้นฐานเกี่ยวกับ:
- ความรู้พื้นฐานเกี่ยวกับการจัดเก็บข้อมูล
- ความเข้าใจพื้นฐานเกี่ยวกับ SQL และฐานข้อมูล
- ความรู้เบื้องต้นเกี่ยวกับ cloud computing
- ความเข้าใจเกี่ยวกับความต้องการทางธุรกิจและการวิเคราะห์ข้อมูล

## Data Lake คืออะไร?

Data Lake คือระบบจัดเก็บข้อมูลที่สามารถเก็บข้อมูลได้ทุกประเภท ทั้งข้อมูลที่มีโครงสร้าง (structured), กึ่งมีโครงสร้าง (semi-structured) และไม่มีโครงสร้าง (unstructured) ในรูปแบบดิบ (raw format) โดยไม่จำเป็นต้องกำหนดโครงสร้างล่วงหน้า (schema-on-read)

### ลักษณะสำคัญของ Data Lake:

1. **ความยืดหยุ่นสูง**: สามารถเก็บข้อมูลได้ทุกประเภท ไม่ว่าจะเป็น CSV, JSON, XML, รูปภาพ, วิดีโอ ฯลฯ
2. **Schema-on-Read**: ไม่จำเป็นต้องกำหนดโครงสร้างข้อมูลล่วงหน้า แต่จะกำหนดเมื่อต้องการอ่านข้อมูล
3. **ราคาถูก**: ใช้เทคโนโลยีการจัดเก็บที่มีราคาถูก เช่น object storage
4. **ขนาดไม่จำกัด**: สามารถขยายขนาดได้ไม่จำกัด
5. **เหมาะสำหรับ Data Science**: เหมาะสำหรับการทำ machine learning และ advanced analytics

### ตัวอย่าง Data Lake:

- **Amazon S3**: Object storage ที่มีราคาถูกและขยายขนาดได้ไม่จำกัด
- **Azure Data Lake Storage**: บริการจัดเก็บข้อมูลที่ออกแบบมาเพื่อ big data analytics
- **Google Cloud Storage**: Object storage ของ Google Cloud
- **Hadoop HDFS**: Distributed file system ที่เป็นพื้นฐานของ Hadoop ecosystem

### ตัวอย่างการใช้งาน Data Lake:

```python
# ตัวอย่างการอ่านข้อมูลจาก Data Lake ด้วย Python และ Pandas
import pandas as pd
import boto3
from io import StringIO

# เชื่อมต่อกับ S3
s3 = boto3.client('s3')

# อ่านไฟล์ CSV จาก S3
obj = s3.get_object(Bucket='my-data-lake', Key='raw-data/sales.csv')
sales_df = pd.read_csv(StringIO(obj['Body'].read().decode('utf-8')))

# อ่านไฟล์ JSON จาก S3
obj = s3.get_object(Bucket='my-data-lake', Key='raw-data/customers.json')
customers_df = pd.read_json(StringIO(obj['Body'].read().decode('utf-8')))

# วิเคราะห์ข้อมูล
merged_df = pd.merge(sales_df, customers_df, on='customer_id')
result = merged_df.groupby('product_category').agg({'amount': 'sum'})
```

## Data Warehouse คืออะไร?

Data Warehouse คือระบบจัดเก็บข้อมูลที่ออกแบบมาเพื่อการวิเคราะห์และรายงานผล โดยเก็บข้อมูลที่มีโครงสร้าง (structured) ที่ผ่านการประมวลผลและจัดระเบียบแล้ว (processed and organized) ในรูปแบบที่มีการกำหนดโครงสร้างล่วงหน้า (schema-on-write)

### ลักษณะสำคัญของ Data Warehouse:

1. **โครงสร้างที่ชัดเจน**: ข้อมูลถูกจัดเก็บในรูปแบบตาราง (tables) ที่มีโครงสร้างชัดเจน
2. **Schema-on-Write**: ต้องกำหนดโครงสร้างข้อมูลล่วงหน้าก่อนที่จะนำเข้าข้อมูล
3. **ประสิทธิภาพสูง**: ออกแบบมาเพื่อการ query ที่มีประสิทธิภาพ
4. **ความถูกต้องสูง**: ข้อมูลผ่านการตรวจสอบและทำความสะอาดแล้ว
5. **เหมาะสำหรับ Business Intelligence**: เหมาะสำหรับการทำรายงานและ dashboard

### ตัวอย่าง Data Warehouse:

- **Amazon Redshift**: Data warehouse แบบ columnar ที่ขยายขนาดได้
- **Google BigQuery**: Serverless data warehouse ที่รองรับการ query ข้อมูลขนาดใหญ่
- **Snowflake**: Cloud data warehouse ที่แยก storage และ compute
- **Azure Synapse Analytics**: บริการ analytics ที่รวม data warehouse และ big data analytics

### ตัวอย่างการใช้งาน Data Warehouse:

```sql
-- ตัวอย่างการ query ข้อมูลจาก Data Warehouse ด้วย SQL
-- สร้าง view สำหรับวิเคราะห์ยอดขายรายเดือน
CREATE VIEW monthly_sales AS
SELECT
    DATE_TRUNC('month', order_date) AS month,
    product_category,
    SUM(amount) AS total_sales,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM
    fact_sales
JOIN
    dim_products ON fact_sales.product_id = dim_products.product_id
GROUP BY
    DATE_TRUNC('month', order_date),
    product_category
ORDER BY
    month DESC,
    total_sales DESC;

-- Query ข้อมูลจาก view
SELECT * FROM monthly_sales
WHERE month >= CURRENT_DATE - INTERVAL '12 months';
```

## Data Lakehouse คืออะไร?

Data Lakehouse เป็นสถาปัตยกรรมใหม่ที่รวมข้อดีของทั้ง Data Lake และ Data Warehouse เข้าด้วยกัน โดยมีความยืดหยุ่นของ Data Lake และประสิทธิภาพของ Data Warehouse

### ลักษณะสำคัญของ Data Lakehouse:

1. **ความยืดหยุ่นและประสิทธิภาพ**: รวมความยืดหยุ่นของ Data Lake และประสิทธิภาพของ Data Warehouse
2. **Transaction Support**: รองรับการทำ ACID transactions เหมือน database
3. **Schema Enforcement**: มีการบังคับใช้ schema แต่ยังคงความยืดหยุ่น
4. **Data Governance**: มีเครื่องมือสำหรับจัดการ metadata และ data quality
5. **เหมาะสำหรับทั้ง BI และ Data Science**: รองรับทั้งการทำรายงานและ machine learning

### ตัวอย่าง Data Lakehouse:

- **Databricks Delta Lake**: เพิ่มความสามารถ ACID transactions ให้กับ data lake
- **Apache Iceberg**: Table format ที่รองรับ ACID transactions และ schema evolution
- **Apache Hudi**: Data lake framework ที่รองรับ ACID transactions และ incremental processing
- **AWS Lake Formation**: บริการที่ช่วยในการสร้าง data lake ที่มีความปลอดภัยและมีการจัดการ

### ตัวอย่างการใช้งาน Data Lakehouse:

```python
# ตัวอย่างการใช้งาน Delta Lake กับ Spark
from pyspark.sql import SparkSession

# สร้าง Spark session
spark = SparkSession.builder \
    .appName("DeltaLakeExample") \
    .config("spark.jars.packages", "io.delta:delta-core_2.12:1.0.0") \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \
    .getOrCreate()

# อ่านข้อมูลจาก CSV
sales_df = spark.read.format("csv") \
    .option("header", "true") \
    .load("s3://my-data-lake/raw-data/sales.csv")

# เขียนข้อมูลลง Delta Lake
sales_df.write.format("delta") \
    .mode("overwrite") \
    .save("s3://my-data-lake/delta/sales")

# อ่านข้อมูลจาก Delta Lake
delta_df = spark.read.format("delta") \
    .load("s3://my-data-lake/delta/sales")

# ทำ SQL query บน Delta Lake
spark.sql("""
    SELECT
        product_category,
        SUM(amount) AS total_sales
    FROM
        delta.`s3://my-data-lake/delta/sales`
    GROUP BY
        product_category
    ORDER BY
        total_sales DESC
""").show()
```

## เปรียบเทียบทั้งสามแบบ

| คุณลักษณะ | Data Lake | Data Warehouse | Data Lakehouse |
|----------|----------|----------------|----------------|
| **ประเภทข้อมูล** | ทุกประเภท (structured, semi-structured, unstructured) | ส่วนใหญ่เป็น structured | ทุกประเภท แต่มี schema enforcement |
| **Schema** | Schema-on-Read | Schema-on-Write | Flexible Schema |
| **ราคา** | ถูก | แพง | ปานกลาง |
| **ประสิทธิภาพการ Query** | ต่ำ-ปานกลาง | สูง | ปานกลาง-สูง |
| **ความยืดหยุ่น** | สูงมาก | ต่ำ | สูง |
| **Use Cases** | Data Science, Machine Learning | Business Intelligence, Reporting | ทั้ง Data Science และ BI |
| **Data Quality** | ไม่มีการรับประกัน | สูง | ปานกลาง-สูง |
| **ACID Transactions** | ไม่รองรับ | รองรับ | รองรับ |
| **ตัวอย่างเทคโนโลยี** | S3, ADLS, GCS | Redshift, BigQuery, Snowflake | Delta Lake, Iceberg, Hudi |

## การเลือกใช้ให้เหมาะสม

การเลือกระหว่าง Data Lake, Data Warehouse และ Data Lakehouse ขึ้นอยู่กับความต้องการและบริบทขององค์กร:

### เลือก Data Lake เมื่อ:

1. **ต้องการเก็บข้อมูลทุกประเภท**: องค์กรมีข้อมูลหลากหลายประเภท ทั้ง structured, semi-structured และ unstructured
2. **ต้องการความยืดหยุ่นสูง**: ไม่ต้องการกำหนดโครงสร้างข้อมูลล่วงหน้า
3. **มีทีม Data Science ที่แข็งแกร่ง**: มีทีมที่สามารถทำงานกับข้อมูลดิบได้
4. **ต้องการประหยัดค่าใช้จ่าย**: มีงบประมาณจำกัด
5. **ต้องการเก็บข้อมูลดิบไว้สำหรับอนาคต**: ไม่แน่ใจว่าจะใช้ข้อมูลอย่างไรในอนาคต

### เลือก Data Warehouse เมื่อ:

1. **ต้องการประสิทธิภาพสูงในการ query**: ต้องการความเร็วในการ query ข้อมูล
2. **ต้องการความถูกต้องสูง**: ข้อมูลต้องมีความถูกต้องและน่าเชื่อถือ
3. **มีโครงสร้างข้อมูลที่ชัดเจน**: รู้ว่าต้องการใช้ข้อมูลอย่างไร
4. **เน้น Business Intelligence**: ต้องการทำรายงานและ dashboard
5. **มีงบประมาณเพียงพอ**: สามารถลงทุนในระบบที่มีราคาสูงได้

### เลือก Data Lakehouse เมื่อ:

1. **ต้องการทั้งความยืดหยุ่นและประสิทธิภาพ**: ต้องการข้อดีของทั้ง Data Lake และ Data Warehouse
2. **มีทั้งทีม Data Science และ Business Intelligence**: ต้องการรองรับทั้งสองทีม
3. **ต้องการ ACID transactions บน Data Lake**: ต้องการความน่าเชื่อถือของข้อมูล
4. **ต้องการลดความซับซ้อนของสถาปัตยกรรม**: ไม่ต้องการดูแลทั้ง Data Lake และ Data Warehouse
5. **กำลังมองหาสถาปัตยกรรมที่ทันสมัย**: ต้องการใช้เทคโนโลยีล่าสุด

### แนวทาง Modern Data Stack

ในปัจจุบัน หลายองค์กรเลือกใช้แนวทาง Modern Data Stack ซึ่งอาจรวมทั้ง Data Lake, Data Warehouse และ Data Lakehouse เข้าด้วยกัน:

1. **Data Lake** สำหรับเก็บข้อมูลดิบทุกประเภท
2. **Data Warehouse** สำหรับข้อมูลที่ผ่านการประมวลผลแล้วและใช้สำหรับ BI
3. **Data Lakehouse** สำหรับการทำ advanced analytics และ machine learning

ตัวอย่างสถาปัตยกรรม:
- ใช้ S3 หรือ ADLS เป็น Data Lake สำหรับเก็บข้อมูลดิบ
- ใช้ Snowflake หรือ BigQuery เป็น Data Warehouse สำหรับ BI
- ใช้ Delta Lake หรือ Iceberg สำหรับสร้าง Data Lakehouse สำหรับ Data Science

## สรุป

Data Lake, Data Warehouse และ Data Lakehouse เป็นสถาปัตยกรรมการจัดเก็บข้อมูลที่มีจุดเด่นและข้อจำกัดแตกต่างกัน:

- **Data Lake** เหมาะสำหรับการเก็บข้อมูลทุกประเภทในรูปแบบดิบ มีความยืดหยุ่นสูงและราคาถูก แต่อาจมีประสิทธิภาพต่ำในการ query
- **Data Warehouse** เหมาะสำหรับการวิเคราะห์และรายงานผล มีประสิทธิภาพสูงในการ query แต่มีความยืดหยุ่นต่ำและราคาแพง
- **Data Lakehouse** เป็นสถาปัตยกรรมใหม่ที่พยายามรวมข้อดีของทั้งสองแบบ มีทั้งความยืดหยุ่นและประสิทธิภาพ แต่อาจมีความซับซ้อนในการตั้งค่าและดูแลรักษา

การเลือกใช้สถาปัตยกรรมใดขึ้นอยู่กับความต้องการและบริบทขององค์กร ไม่มีสถาปัตยกรรมใดที่เหมาะสมกับทุกสถานการณ์ บางองค์กรอาจเลือกใช้ทั้งสามแบบร่วมกันในรูปแบบของ Modern Data Stack เพื่อให้ได้ประโยชน์สูงสุด

สิ่งสำคัญคือการเข้าใจความต้องการขององค์กรและเลือกสถาปัตยกรรมที่เหมาะสมที่สุด โดยคำนึงถึงปัจจัยต่างๆ เช่น ประเภทของข้อมูล, ความต้องการในการวิเคราะห์, งบประมาณ, และทักษะของทีม

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจความแตกต่างระหว่าง Data Lake, Data Warehouse และ Data Lakehouse มากขึ้น และสามารถเลือกใช้ได้อย่างเหมาะสมกับความต้องการขององค์กรนะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
