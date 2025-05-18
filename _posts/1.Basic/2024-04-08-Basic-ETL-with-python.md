---
layout: post
title: "เริ่มต้นทำ ETL ด้วย Python"
author: "Weerawat"
categories: [Basic]
tags: [ETL, Python, Data-Engineering, draft-A]
---

# เริ่มต้นทำ ETL ด้วย Python

## Table of Contents
- [ทำไมต้องเรียนรู้เรื่อง ETL?](#ทำไมต้องเรียนรู้เรื่อง-etl)
- [ความรู้ที่จะได้รับ](#ความรู้ที่จะได้รับ)
- [สิ่งที่ต้องเตรียมก่อนเริ่มต้น](#สิ่งที่ต้องเตรียมก่อนเริ่มต้น)
- [แนวคิดพื้นฐานของ ETL](#แนวคิดพื้นฐานของ-etl)
- [การติดตั้งและเตรียมสภาพแวดล้อม](#การติดตั้งและเตรียมสภาพแวดล้อม)
- [การทำ ETL ด้วย Python](#การทำ-etl-ด้วย-python)
- [เทคนิคและการปรับแต่ง](#เทคนิคและการปรับแต่ง)

## ทำไมต้องเรียนรู้เรื่อง ETL?

โดยปกติ ETL จะเป็นงานหลักที่ DE ทุกคนต้องทำเป็น และจะเห็นใน Job Description ของตำแหน่งนี้ทุกบริษัทเลย อาจจะต่างกันที่ Tools บ้าง แต่โดยหลักแล้วเป็นการรวมรวมและนำเข้าข้อมูลสู่ Database, Data Lake, Data Warehouse จากหลายแหล่ง ทั้งไฟล์ Excel, CSV, ฐานข้อมูล MySQL และอื่นๆ เพื่อนำมาจัดเก็บและ ใช้งานต่อ 

รอบนี้เลยจะมายกตัวอย่าง การทำ ETL อย่างง่าย ด้วย Python โดยจะยังไม่ได้ใช้ Tools ตัวอื่นเข้ามาช่วยในการจัดการกัน

## ความรู้ที่จะได้รับ

การเรียนรู้การทำ ETL ด้วย Python จะช่วยพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Python Programming** - พัฒนาทักษะการเขียนโปรแกรมด้วย Python
- **Data Manipulation** - เรียนรู้การจัดการข้อมูลด้วย Pandas
- **Database Integration** - เข้าใจการเชื่อมต่อและทำงานกับฐานข้อมูล
- **Data Cleaning** - เรียนรู้เทคนิคการทำความสะอาดข้อมูล
- **Automation** - เข้าใจการสร้างกระบวนการอัตโนมัติ

## สิ่งที่ต้องเตรียมก่อนเริ่มต้น

ก่อนที่จะเริ่มเรียนรู้การทำ ETL ด้วย Python จะต้องเตรียมสิ่งเหล่านี้:

1. **Python** - ติดตั้ง Python เวอร์ชัน 3.6 ขึ้นไป
2. **ฐานข้อมูล** - MySQL และ PostgreSQL (สามารถใช้ Docker ตามบทความก่อนหน้า)
3. **พื้นฐาน Python** - เข้าใจการเขียนโปรแกรม Python เบื้องต้น
4. **พื้นฐาน SQL** - เข้าใจการใช้งาน SQL เบื้องต้น

## แนวคิดพื้นฐานของ ETL

ETL ย่อมาจาก Extract, Transform, Load ซึ่งเป็นกระบวนการสำคัญในการทำ Data Integration:

### 1. Extract (การดึงข้อมูล)
คือการดึงข้อมูลจากแหล่งต่างๆ เช่น:
- ไฟล์ CSV, Excel, JSON
- ฐานข้อมูล MySQL, PostgreSQL, Oracle
- API จากเว็บไซต์หรือแอปพลิเคชัน
- ข้อมูลจาก Cloud Storage

### 2. Transform (การแปลงข้อมูล)
คือการปรับแต่งข้อมูลให้อยู่ในรูปแบบที่ต้องการ เช่น:
- ทำความสะอาดข้อมูล (Data Cleaning)
- แปลงประเภทข้อมูล (Data Type Conversion)
- จัดการค่าที่หายไป (Handling Missing Values)
- รวมข้อมูลจากหลายแหล่ง (Data Integration)
- คำนวณค่าใหม่ (Calculated Fields)

### 3. Load (การโหลดข้อมูล)
คือการนำข้อมูลที่ผ่านการแปลงแล้วไปเก็บในปลายทาง เช่น:
- ฐานข้อมูล Data Warehouse
- Data Lake
- ไฟล์ในรูปแบบต่างๆ
- ระบบวิเคราะห์ข้อมูล

## การติดตั้งและเตรียมสภาพแวดล้อม

### 1. ติดตั้งฐานข้อมูล MySQL และ PostgreSQL ด้วย Docker Compose

สร้างไฟล์ `docker-compose.yml` ด้วยเนื้อหาดังนี้:

```yml
version: '3.1'

services:
  mysql_db:
    image: mysql:latest
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      - MYSQL_DATABASE=etl_tutorial
      - MYSQL_ROOT_PASSWORD=password
    networks:
      - etl-network

  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      - PMA_ARBITRARY=1
    networks:
      - etl-network

  postgres:
    image: postgres:14.0
    container_name: postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=etl_tutorial
    networks:
      - etl-network

  pgadmin4:
    image: dpage/pgadmin4
    container_name: pgadmin4
    restart: always
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=password
    ports:
      - "8081:80"
    networks:
      - etl-network

networks:
  etl-network:
```

รันคำสั่งเพื่อสร้าง container:

```bash
docker-compose up -d
```

### 2. สร้าง Virtual Environment และติดตั้ง Package ที่จำเป็น

```bash
# สร้าง virtual environment
python -m venv etl_env

# เปิดใช้งาน virtual environment
# สำหรับ Windows
etl_env\Scripts\activate
# สำหรับ macOS/Linux
source etl_env/bin/activate

# ติดตั้ง package ที่จำเป็น
pip install pandas numpy sqlalchemy pymysql psycopg2-binary openpyxl
```

## การทำ ETL ด้วย Python

ในตัวอย่างนี้ เราจะทำ ETL โดย:
1. ดึงข้อมูลจากไฟล์ CSV และ Excel
2. แปลงและทำความสะอาดข้อมูล
3. โหลดข้อมูลเข้าฐานข้อมูล MySQL และ PostgreSQL

### 1. สร้างข้อมูลตัวอย่าง

สร้างไฟล์ `sales_data.csv` ด้วยเนื้อหาดังนี้:

```
date,product_id,product_name,quantity,unit_price,customer_id
2025-01-01,P001,สมาร์ทโฟน,2,15000,C001
2025-01-02,P002,แล็ปท็อป,1,35000,C002
2025-01-03,P003,หูฟังไร้สาย,3,3500,C001
2025-01-03,P001,สมาร์ทโฟน,1,15000,C003
2025-01-04,P004,กล้องถ่ายรูป,1,28000,C002
```

สร้างไฟล์ Excel `customer_data.xlsx` ด้วยข้อมูลดังนี้:

| customer_id | first_name | last_name | email | phone |
|-------------|------------|-----------|-------|-------|
| C001 | สมชาย | ใจดี | somchai@example.com | 081-234-5678 |
| C002 | สมหญิง | รักสวย | somying@example.com | 089-876-5432 |
| C003 | มานะ | มานี | mana@example.com | 062-345-6789 |
| C004 | ปิติ | มีชัย | piti@example.com | 091-234-5678 |
| C005 | วิภา | สดใส | wipa@example.com | 085-678-9012 |

### 2. เขียนโค้ด Python สำหรับทำ ETL

สร้างไฟล์ `etl_process.py` ด้วยเนื้อหาดังนี้:

```python
import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from datetime import datetime

# 1. Extract - ดึงข้อมูลจากไฟล์ CSV และ Excel
def extract_data():
    print("เริ่มดึงข้อมูล...")
    
    # ดึงข้อมูลจากไฟล์ CSV
    sales_df = pd.read_csv('sales_data.csv')
    print(f"ดึงข้อมูลการขายจำนวน {len(sales_df)} รายการ")
    
    # ดึงข้อมูลจากไฟล์ Excel
    customers_df = pd.read_excel('customer_data.xlsx')
    print(f"ดึงข้อมูลลูกค้าจำนวน {len(customers_df)} รายการ")
    
    return sales_df, customers_df

# 2. Transform - แปลงและทำความสะอาดข้อมูล
def transform_data(sales_df, customers_df):
    print("เริ่มแปลงข้อมูล...")
    
    # แปลงวันที่ให้เป็นรูปแบบที่ถูกต้อง
    sales_df['date'] = pd.to_datetime(sales_df['date'])
    
    # คำนวณยอดรวมของแต่ละรายการ
    sales_df['total_amount'] = sales_df['quantity'] * sales_df['unit_price']
    
    # เพิ่มคอลัมน์ปีและเดือน
    sales_df['year'] = sales_df['date'].dt.year
    sales_df['month'] = sales_df['date'].dt.month
    
    # รวมข้อมูลการขายและลูกค้า
    merged_df = pd.merge(
        sales_df,
        customers_df,
        on='customer_id',
        how='left'
    )
    
    # สร้าง DataFrame สำหรับการวิเคราะห์ยอดขายรายเดือน
    monthly_sales = sales_df.groupby(['year', 'month', 'product_id', 'product_name']) \
                           .agg({
                               'quantity': 'sum',
                               'total_amount': 'sum'
                           }) \
                           .reset_index()
    
    print("แปลงข้อมูลเสร็จสิ้น")
    return merged_df, monthly_sales

# 3. Load - โหลดข้อมูลเข้าฐานข้อมูล
def load_data(merged_df, monthly_sales):
    print("เริ่มโหลดข้อมูล...")
    
    # เชื่อมต่อกับ MySQL
    mysql_engine = create_engine('mysql+pymysql://root:password@localhost:3306/etl_tutorial')
    
    # เชื่อมต่อกับ PostgreSQL
    pg_engine = create_engine('postgresql://postgres:password@localhost:5432/etl_tutorial')
    
    # โหลดข้อมูลเข้า MySQL
    merged_df.to_sql('sales_with_customer', mysql_engine, if_exists='replace', index=False)
    print(f"โหลดข้อมูลการขายพร้อมข้อมูลลูกค้าจำนวน {len(merged_df)} รายการเข้า MySQL สำเร็จ")
    
    # โหลดข้อมูลเข้า PostgreSQL
    monthly_sales.to_sql('monthly_sales_analysis', pg_engine, if_exists='replace', index=False)
    print(f"โหลดข้อมูลวิเคราะห์ยอดขายรายเดือนจำนวน {len(monthly_sales)} รายการเข้า PostgreSQL สำเร็จ")

# ฟังก์ชันหลัก
def main():
    print(f"เริ่มกระบวนการ ETL เวลา {datetime.now()}")
    
    # 1. Extract
    sales_df, customers_df = extract_data()
    
    # 2. Transform
    merged_df, monthly_sales = transform_data(sales_df, customers_df)
    
    # 3. Load
    load_data(merged_df, monthly_sales)
    
    print(f"กระบวนการ ETL เสร็จสิ้น เวลา {datetime.now()}")

if __name__ == "__main__":
    main()
```

### 3. รันโปรแกรม ETL

```bash
python etl_process.py
```

ผลลัพธ์ที่ได้:
```
เริ่มกระบวนการ ETL เวลา 2025-05-18 10:30:45.123456
เริ่มดึงข้อมูล...
ดึงข้อมูลการขายจำนวน 5 รายการ
ดึงข้อมูลลูกค้าจำนวน 5 รายการ
เริ่มแปลงข้อมูล...
แปลงข้อมูลเสร็จสิ้น
เริ่มโหลดข้อมูล...
โหลดข้อมูลการขายพร้อมข้อมูลลูกค้าจำนวน 5 รายการเข้า MySQL สำเร็จ
โหลดข้อมูลวิเคราะห์ยอดขายรายเดือนจำนวน 4 รายการเข้า PostgreSQL สำเร็จ
กระบวนการ ETL เสร็จสิ้น เวลา 2025-05-18 10:30:47.234567
```

### 4. ตรวจสอบผลลัพธ์

เข้าไปที่ phpMyAdmin (http://localhost:8080) และ pgAdmin (http://localhost:8081) เพื่อตรวจสอบข้อมูลที่โหลดเข้าไป

## เทคนิคและการปรับแต่ง

เมื่อการนำไปใช้งานจริงๆ ก็จะมีเทคนิคเพิ่มเติมที่จะช่วยให้ทำงานได้อย่างมีประสิทธิภาพมากขึ้น:

### 1. การจัดการกับข้อมูลขนาดใหญ่

```python
# อ่านไฟล์ CSV ขนาดใหญ่แบบ chunk
chunk_size = 10000
chunks = []

for chunk in pd.read_csv('large_sales_data.csv', chunksize=chunk_size):
    # ทำการแปลงข้อมูลในแต่ละ chunk
    chunk['total_amount'] = chunk['quantity'] * chunk['unit_price']
    chunks.append(chunk)

# รวม chunk ทั้งหมด
large_df = pd.concat(chunks)
```

### 2. การทำ ETL แบบ Incremental

```python
def get_last_update_date(engine, table_name):
    try:
        query = f"SELECT MAX(date) as last_date FROM {table_name}"
        result = pd.read_sql(query, engine)
        return result['last_date'].iloc[0]
    except:
        return None

def incremental_etl(file_path, engine, table_name):
    # ดึงวันที่อัพเดตล่าสุด
    last_update = get_last_update_date(engine, table_name)
    
    # อ่านข้อมูลใหม่
    df = pd.read_csv(file_path)
    df['date'] = pd.to_datetime(df['date'])
    
    # กรองเฉพาะข้อมูลใหม่
    if last_update:
        new_data = df[df['date'] > last_update]
    else:
        new_data = df
    
    # โหลดเฉพาะข้อมูลใหม่
    if not new_data.empty:
        new_data.to_sql(table_name, engine, if_exists='append', index=False)
        print(f"โหลดข้อมูลใหม่จำนวน {len(new_data)} รายการ")
    else:
        print("ไม่มีข้อมูลใหม่")
```

### 3. การจัดการกับข้อผิดพลาด

```python
def safe_etl_process():
    try:
        # 1. Extract
        sales_df, customers_df = extract_data()
        
        # 2. Transform
        merged_df, monthly_sales = transform_data(sales_df, customers_df)
        
        # 3. Load
        load_data(merged_df, monthly_sales)
        
        print("กระบวนการ ETL เสร็จสิ้นสมบูรณ์")
        return True
    except Exception as e:
        print(f"เกิดข้อผิดพลาด: {str(e)}")
        # บันทึกข้อผิดพลาดลงไฟล์
        with open('etl_error_log.txt', 'a') as f:
            f.write(f"{datetime.now()}: {str(e)}\n")
        return False
```

### 4. การทำ ETL แบบอัตโนมัติด้วย Scheduler

```python
import schedule
import time

def job():
    print(f"เริ่มกระบวนการ ETL อัตโนมัติ เวลา {datetime.now()}")
    safe_etl_process()

# กำหนดให้ทำงานทุกวันเวลา 02:00 น.
schedule.every().day.at("02:00").do(job)

# กำหนดให้ทำงานทุกวันจันทร์เวลา 08:00 น.
schedule.every().monday.at("08:00").do(job)

# รันตลอดเวลา
while True:
    schedule.run_pending()
    time.sleep(60)  # ตรวจสอบทุก 1 นาที
```

---

การเรียนรู้การทำ ETL ด้วย Python เป็นทักษะพื้นฐานที่สำคัญมาก เพื่อให้เข้าใจ Concept ของ ETL และจะต่อยอดไปถึงการใช้ tools ต่างๆ อีกด้วย 

นอกจากนี้การทำ ETL ไม่ได้จำกัดอยู่แค่ตัวอย่างที่ยกมาในบทความนี้ เราสามารถประยุกต์ใช้กับข้อมูลประเภทอื่นๆ ได้อีกมากมาย เช่น ข้อมูลจาก API, ข้อมูลจาก Web Scraping หรือแม้แต่ข้อมูลจาก IoT devices

จึงหวังว่าบทความนี้จะช่วยให้ เข้าใจพื้นฐานของการทำ ETL ด้วย Python และสามารถนำไปใช้งานได้จริงครับ
