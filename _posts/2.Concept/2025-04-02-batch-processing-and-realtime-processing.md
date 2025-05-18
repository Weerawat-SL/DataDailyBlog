---
layout: post
title: "Batch Processing VS Real-time Processing: เลือกใช้แบบไหนดี?"
date: 2025-04-02
categories: [Concept]
tags: [batch processing, real-time processing, stream processing, data pipeline, draft-A]
image: assets/images/batch-vs-realtime-cover.jpg
---

## Table of Contents
- [เมื่อความเร็วและความถูกต้องต้องแลกกัน](#เมื่อความเร็วและความถูกต้องต้องแลกกัน)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Batch Processing คืออะไร?](#batch-processing-คืออะไร)
- [Real-time Processing คืออะไร?](#real-time-processing-คืออะไร)
- [เปรียบเทียบ Batch VS Real-time](#เปรียบเทียบ-batch-vs-real-time)
- [การเลือกใช้ให้เหมาะสม](#การเลือกใช้ให้เหมาะสม)
- [เทคนิคและการตั้งค่า](#เทคนิคและการตั้งค่า)
- [สรุป](#สรุป)

## เมื่อความเร็วและความถูกต้องต้องแลกกัน

ต่อยอดจากเรื่อง ETL การทำ Data Processing มีความที่ต้องการหลากหลาย ตามความต้องการของธุรกิจ แต่หลักๆจะแบ่งออกเป็น 2 ประเภท คือ Batch Processing และ Real-time Processing 

ตัวอย่าง ทีมธุรกิจต้องการรายงานยอดขายแบบเพื่อติดตามแคมเปญที่กำลังจัดอยู่ภายในขณะดำเนินการ ซึ่งกรณีนี้อาจต้องใช้ real-time processing แต่ในขณะเดียวกันก็ต้องการรายงานที่มีความถูกต้องสูงเพื่อใช้ในการวางแผนระยะยาว หรือทีม Data Science ต้องการข้อมูลล่าสุดเพื่อทำ model แต่ก็ต้องการข้อมูลย้อนหลังที่สมบูรณ์เพื่อ train model เคสนี้ batch processing จะเหมาะสมกว่า

ในตอนที่ต้องออกแบบ data pipeline ที่ต้องตอบโจทย์ทั้งความเร็วและความถูกต้อง บางครั้งก็ต้องเลือกระหว่างการมีข้อมูลที่อัพเดทแบบ real-time แต่อาจจะไม่สมบูรณ์ กับการมีข้อมูลที่สมบูรณ์แต่อัพเดทช้า

นี่คือจุดที่เราต้องเข้าใจความแตกต่างระหว่าง Batch Processing และ Real-time Processing เพื่อเลือกใช้ให้เหมาะสมกับความต้องการ!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- ความเข้าใจเกี่ยวกับ Batch Processing และ Real-time Processing
- การเลือกใช้เทคโนโลยีที่เหมาะสมกับแต่ละประเภทของ processing
- การออกแบบ data pipeline ที่รองรับทั้ง batch และ real-time
- การจัดการกับ trade-off ระหว่างความเร็วและความถูกต้อง
- การใช้เครื่องมือต่างๆ สำหรับ batch และ real-time processing

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มเรียนรู้เกี่ยวกับ Batch และ Real-time Processing คุณควรมีความรู้พื้นฐานเกี่ยวกับ:
- ความรู้พื้นฐานเกี่ยวกับ data pipeline
- ความเข้าใจพื้นฐานเกี่ยวกับ database และ data storage
- ความรู้เบื้องต้นเกี่ยวกับ distributed systems
- ความรู้เบื้องต้นเกี่ยวกับ data processing frameworks (เช่น Spark, Flink)

## Batch Processing คืออะไร?

Batch Processing คือการประมวลผลข้อมูลเป็นชุด (batch) โดยจะรวบรวมข้อมูลไว้ก่อน แล้วค่อยประมวลผลทีเดียวในช่วงเวลาที่กำหนด เช่น ทุกชั่วโมง, ทุกวัน, หรือทุกสัปดาห์

### ลักษณะสำคัญของ Batch Processing:

1. **ประมวลผลข้อมูลเป็นชุด**: ข้อมูลจะถูกรวบรวมและประมวลผลพร้อมกันในคราวเดียว
2. **มีการกำหนดเวลาที่แน่นอน**: มักจะทำงานตามตารางเวลาที่กำหนดไว้ล่วงหน้า
3. **เน้นความถูกต้องและความสมบูรณ์**: สามารถประมวลผลข้อมูลทั้งหมดได้อย่างละเอียด
4. **มี latency สูง**: ข้อมูลอาจไม่ได้รับการอัพเดทในทันที
5. **ใช้ทรัพยากรอย่างมีประสิทธิภาพ**: สามารถจัดการทรัพยากรได้ดีกว่าเพราะรู้ปริมาณข้อมูลล่วงหน้า

### ตัวอย่างการใช้งาน Batch Processing:

- รายงานยอดขายประจำวัน/สัปดาห์/เดือน
- การคำนวณดัชนีสำหรับ search engine
- การ train machine learning models
- การทำ ETL (Extract, Transform, Load) แบบดั้งเดิม
- การสร้าง data warehouse

### เทคโนโลยีที่ใช้สำหรับ Batch Processing:

- Apache Hadoop
- Apache Spark (Batch mode)
- Apache Hive
- AWS Glue
- Google Cloud Dataflow (Batch mode)
- Azure Data Factory

## Real-time Processing คืออะไร?

Real-time Processing (หรือ Stream Processing) คือการประมวลผลข้อมูลทันทีที่ได้รับ โดยไม่ต้องรอให้ข้อมูลสะสมเป็นชุดก่อน ทำให้สามารถเห็นผลลัพธ์ได้แบบ real-time หรือใกล้เคียง real-time

### ลักษณะสำคัญของ Real-time Processing:

1. **ประมวลผลข้อมูลทันที**: ข้อมูลจะถูกประมวลผลทันทีที่เข้ามาในระบบ
2. **ทำงานตลอดเวลา**: ระบบจะทำงานตลอดเวลาเพื่อรอรับข้อมูลใหม่
3. **เน้นความเร็ว**: มุ่งเน้นการประมวลผลที่รวดเร็วเพื่อให้ได้ผลลัพธ์ทันที
4. **มี latency ต่ำ**: ข้อมูลได้รับการอัพเดทเกือบจะทันที
5. **ใช้ทรัพยากรอย่างต่อเนื่อง**: ต้องมีทรัพยากรพร้อมใช้งานตลอดเวลา

### ตัวอย่างการใช้งาน Real-time Processing:

- ระบบตรวจจับการฉ้อโกง (Fraud Detection)
- ระบบแนะนำสินค้าแบบ real-time
- การวิเคราะห์ social media sentiment
- ระบบ monitoring และ alerting
- IoT data processing
- Real-time analytics dashboard

### เทคโนโลยีที่ใช้สำหรับ Real-time Processing:

- Apache Kafka
- Apache Flink
- Apache Spark Streaming
- AWS Kinesis
- Google Cloud Dataflow (Streaming mode)
- Azure Stream Analytics

## เปรียบเทียบ Batch VS Real-time

| คุณลักษณะ | Batch Processing | Real-time Processing |
|----------|-----------------|---------------------|
| **ความเร็ว** | ช้ากว่า (มี latency สูง) | เร็วกว่า (มี latency ต่ำ) |
| **ความถูกต้อง** | มักจะมีความถูกต้องสูงกว่า | อาจมีความถูกต้องน้อยกว่าเนื่องจากข้อจำกัดด้านเวลา |
| **ปริมาณข้อมูล** | รองรับข้อมูลขนาดใหญ่ได้ดี | อาจมีข้อจำกัดในการรองรับข้อมูลขนาดใหญ่ |
| **ความซับซ้อน** | สามารถทำการประมวลผลที่ซับซ้อนได้ | มักจะทำการประมวลผลที่ไม่ซับซ้อนมาก |
| **ทรัพยากร** | ใช้ทรัพยากรอย่างมีประสิทธิภาพ | ใช้ทรัพยากรอย่างต่อเนื่อง |
| **ความทนทานต่อความผิดพลาด** | สูง (สามารถรันใหม่ได้) | ต่ำกว่า (ข้อมูลอาจสูญหายได้) |
| **ค่าใช้จ่าย** | มักจะมีค่าใช้จ่ายต่ำกว่า | มักจะมีค่าใช้จ่ายสูงกว่า |
| **Use Cases** | รายงาน, ETL, Data Warehouse | Monitoring, Alerting, Real-time Analytics |

## การเลือกใช้ให้เหมาะสม

การเลือกระหว่าง Batch และ Real-time Processing ขึ้นอยู่กับความต้องการของธุรกิจและลักษณะของข้อมูล:

### เลือก Batch Processing เมื่อ:

1. **ความถูกต้องสำคัญกว่าความเร็ว**: เช่น รายงานทางการเงิน, การวิเคราะห์ข้อมูลเชิงลึก
2. **ข้อมูลมีขนาดใหญ่มาก**: เช่น การประมวลผลข้อมูลหลายเทราไบต์
3. **การประมวลผลมีความซับซ้อนสูง**: เช่น การคำนวณที่ต้องใช้ algorithm ซับซ้อน
4. **มีข้อจำกัดด้านทรัพยากร**: เช่น ต้องการประหยัดค่าใช้จ่าย
5. **ไม่ต้องการผลลัพธ์แบบ real-time**: เช่น รายงานประจำวัน/สัปดาห์/เดือน

### เลือก Real-time Processing เมื่อ:

1. **ความเร็วสำคัญกว่าความถูกต้อง**: เช่น ระบบตรวจจับการฉ้อโกง, ระบบแนะนำสินค้า
2. **ต้องการการตอบสนองทันที**: เช่น การแจ้งเตือนเมื่อเกิดเหตุการณ์สำคัญ
3. **ข้อมูลมีมูลค่าสูงในช่วงเวลาสั้นๆ**: เช่น ข้อมูลราคาหุ้น, ข้อมูลการจราจร
4. **ต้องการ interactive experience**: เช่น dashboard ที่อัพเดทแบบ real-time
5. **มีทรัพยากรเพียงพอ**: สามารถรองรับค่าใช้จ่ายที่สูงขึ้นได้

### แนวทาง Lambda Architecture

บางครั้งเราไม่จำเป็นต้องเลือกระหว่าง Batch และ Real-time แต่สามารถใช้ทั้งสองแบบร่วมกันได้ผ่าน Lambda Architecture:

![Lambda Architecture](assets/images/lambda-architecture.png)

Lambda Architecture ประกอบด้วย 3 ส่วนหลัก:
1. **Batch Layer**: ประมวลผลข้อมูลทั้งหมดแบบ batch เพื่อความถูกต้องสูง
2. **Speed Layer**: ประมวลผลข้อมูลล่าสุดแบบ real-time เพื่อความเร็ว
3. **Serving Layer**: รวมผลลัพธ์จาก Batch Layer และ Speed Layer เพื่อให้ได้มุมมองที่สมบูรณ์

ด้วยวิธีนี้ เราสามารถได้ประโยชน์จากทั้งสองแบบ: ความเร็วจาก real-time processing และความถูกต้องจาก batch processing

## เทคนิคและการตั้งค่า

### 1. การทำ Batch Processing ด้วย Apache Spark

```python
from pyspark.sql import SparkSession

# สร้าง Spark Session
spark = SparkSession.builder \
    .appName("BatchProcessingExample") \
    .getOrCreate()

# อ่านข้อมูลจาก source
df = spark.read.format("csv") \
    .option("header", "true") \
    .load("s3://my-bucket/data/sales/*.csv")

# ทำ transformation
result = df.groupBy("product_category") \
    .agg({"amount": "sum"}) \
    .withColumnRenamed("sum(amount)", "total_sales")

# เขียนผลลัพธ์
result.write.format("parquet") \
    .mode("overwrite") \
    .save("s3://my-bucket/results/sales_by_category/")
```

### 2. การทำ Real-time Processing ด้วย Apache Kafka และ Spark Streaming

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

# สร้าง Spark Session สำหรับ streaming
spark = SparkSession.builder \
    .appName("RealTimeProcessingExample") \
    .getOrCreate()

# อ่านข้อมูลจาก Kafka
df = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("subscribe", "sales_topic") \
    .load()

# แปลง binary data เป็น string
df = df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)")

# ทำ transformation
result = df.groupBy(window(col("timestamp"), "1 minute"), col("product_category")) \
    .agg({"amount": "sum"}) \
    .withColumnRenamed("sum(amount)", "total_sales")

# เขียนผลลัพธ์แบบ streaming
query = result \
    .writeStream \
    .outputMode("complete") \
    .format("console") \
    .start()

query.awaitTermination()
```

### 3. การทำ Lambda Architecture ด้วย Spark และ Kafka

```python
# Batch Layer
def process_batch():
    df = spark.read.format("parquet") \
        .load("s3://my-bucket/data/sales/*.parquet")
    
    result = df.groupBy("product_category", "date") \
        .agg({"amount": "sum"}) \
        .withColumnRenamed("sum(amount)", "total_sales")
    
    result.write.format("parquet") \
        .mode("overwrite") \
        .partitionBy("date") \
        .save("s3://my-bucket/batch_results/")

# Speed Layer
def process_stream():
    df = spark \
        .readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", "kafka:9092") \
        .option("subscribe", "sales_topic") \
        .load()
    
    df = df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)")
    
    result = df.groupBy(window(col("timestamp"), "1 minute"), col("product_category")) \
        .agg({"amount": "sum"}) \
        .withColumnRenamed("sum(amount)", "total_sales")
    
    query = result \
        .writeStream \
        .outputMode("complete") \
        .format("memory") \
        .queryName("real_time_sales") \
        .start()
    
    return query

# Serving Layer
def serve_data():
    # ดึงข้อมูลจาก Batch Layer
    batch_data = spark.read.format("parquet") \
        .load("s3://my-bucket/batch_results/")
    
    # ดึงข้อมูลจาก Speed Layer
    real_time_data = spark.sql("SELECT * FROM real_time_sales")
    
    # รวมข้อมูลจากทั้งสองแหล่ง
    combined_data = batch_data.union(real_time_data)
    
    return combined_data
```

## สรุป

Batch Processing และ Real-time Processing มีข้อดีและข้อเสียที่แตกต่างกัน การเลือกใช้ขึ้นอยู่กับความต้องการของธุรกิจและลักษณะของข้อมูล:

- **Batch Processing** เหมาะสำหรับงานที่ต้องการความถูกต้องสูง, มีข้อมูลขนาดใหญ่, และไม่ต้องการผลลัพธ์แบบ real-time
- **Real-time Processing** เหมาะสำหรับงานที่ต้องการความเร็ว, ต้องการการตอบสนองทันที, และข้อมูลมีมูลค่าสูงในช่วงเวลาสั้นๆ
- **Lambda Architecture** เป็นทางเลือกที่ดีเมื่อต้องการทั้งความเร็วและความถูกต้อง

โดยปกติ การเริ่มต้นด้วย Batch Processing อาจจะง่ายกว่า เพราะมีความซับซ้อนน้อยกว่าและมีเครื่องมือที่เป็นที่นิยมมากกว่า แต่เมื่อคุณมีความเข้าใจพื้นฐานที่ดีแล้ว การเรียนรู้เกี่ยวกับ Real-time Processing จะช่วยเพิ่มทักษะและโอกาสในการทำงานกับระบบที่หลากหลายมากขึ้น

ในท้ายที่สุด การเลือกระหว่าง Batch และ Real-time ไม่ใช่การเลือกว่าอันไหนดีกว่ากัน แต่เป็นการเลือกว่าอันไหนเหมาะสมกับ use case ของคุณมากกว่า

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจความแตกต่างระหว่าง Batch Processing และ Real-time Processing และสามารถเลือกใช้ได้อย่างเหมาะสมกับความต้องการของคุณนะครับ
