---
layout: post
title: "Kafka สำหรับ Data Engineer: จัดการข้อมูลแบบ Real-time อย่างมืออาชีพ"
date: 2025-05-12
categories: [Data Engineering, Streaming, Tools]
tags: [kafka, streaming, real-time, data pipeline, draft-A]
image: assets/images/kafka-cover.jpg
---

## Table of Contents
- [Table of Contents](#table-of-contents)
- [เมื่อข้อมูลมาเร็วเกินกว่าจะรอ Batch Processing](#เมื่อข้อมูลมาเร็วเกินกว่าจะรอ-batch-processing)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Kafka คืออะไร?](#kafka-คืออะไร)
- [องค์ประกอบหลักของ Kafka](#องค์ประกอบหลักของ-kafka)
  - [1. Topic](#1-topic)
  - [2. Partition](#2-partition)
  - [3. Producer](#3-producer)
  - [4. Consumer](#4-consumer)
  - [5. Consumer Group](#5-consumer-group)
  - [6. Broker](#6-broker)
  - [7. ZooKeeper](#7-zookeeper)
- [การติดตั้งและเริ่มต้นใช้งาน Kafka](#การติดตั้งและเริ่มต้นใช้งาน-kafka)
  - [1. ติดตั้ง Kafka ด้วย Docker](#1-ติดตั้ง-kafka-ด้วย-docker)
  - [2. ติดตั้ง Kafka Client](#2-ติดตั้ง-kafka-client)
  - [3. สร้าง Topic](#3-สร้าง-topic)
  - [4. ทดสอบ Producer และ Consumer ด้วย Command Line](#4-ทดสอบ-producer-และ-consumer-ด้วย-command-line)
- [การใช้งาน Kafka สำหรับ Data Pipeline](#การใช้งาน-kafka-สำหรับ-data-pipeline)
  - [1. สร้าง Producer ด้วย Python](#1-สร้าง-producer-ด้วย-python)
  - [2. สร้าง Consumer ด้วย Python](#2-สร้าง-consumer-ด้วย-python)
  - [3. สร้าง Real-time Analytics ด้วย Kafka Streams](#3-สร้าง-real-time-analytics-ด้วย-kafka-streams)
  - [4. เชื่อมต่อ Kafka กับระบบอื่นๆ ด้วย Kafka Connect](#4-เชื่อมต่อ-kafka-กับระบบอื่นๆ-ด้วย-kafka-connect)
- [เทคนิคและแนวทางปฏิบัติที่ดี](#เทคนิคและแนวทางปฏิบัติที่ดี)
  - [1. การตั้งค่า Partitions](#1-การตั้งค่า-partitions)
  - [2. การตั้งค่า Replication](#2-การตั้งค่า-replication)
  - [3. การจัดการ Consumer Groups](#3-การจัดการ-consumer-groups)
  - [4. การจัดการ Performance](#4-การจัดการ-performance)
- [สรุป](#สรุป)

## เมื่อข้อมูลมาเร็วเกินกว่าจะรอ Batch Processing

เคยเจอสถานการณ์แบบนี้มั้ย? ต้องการข้อมูลล่าสุดเพื่อตัดสินใจทางธุรกิจแต่ต้องรอให้ batch job รันเสร็จก่อน หรือระบบต้องรับข้อมูลจำนวนมากในเวลาอันรวดเร็วแต่ไม่สามารถรองรับได้ หรือแย่กว่านั้น ข้อมูลสูญหายเพราะระบบไม่สามารถรับมือกับปริมาณข้อมูลที่เข้ามาพร้อมกันได้

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่ทำงานกับระบบที่ต้องรับข้อมูลจำนวนมากในเวลาอันรวดเร็ว เช่น ระบบ IoT ที่มีอุปกรณ์ส่งข้อมูลเข้ามาตลอดเวลา หรือระบบ e-commerce ที่ต้องติดตามพฤติกรรมของผู้ใช้แบบ real-time เพื่อแนะนำสินค้า

นี่คือจุดที่ Apache Kafka เข้ามาช่วยแก้ปัญหาเหล่านี้ได้อย่างลงตัว!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- ความเข้าใจเกี่ยวกับ distributed streaming platform
- การออกแบบและสร้าง real-time data pipeline ด้วย Kafka
- การจัดการกับข้อมูลปริมาณมากแบบ real-time
- การทำ fault-tolerant และ scalable systems
- การใช้ Kafka ร่วมกับเครื่องมืออื่นๆ ในระบบนิเวศของ big data

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มเรียนรู้เกี่ยวกับ Kafka คุณควรมีความรู้พื้นฐานเกี่ยวกับ:
- ความรู้พื้นฐานเกี่ยวกับ Java หรือ Python
- ความเข้าใจพื้นฐานเกี่ยวกับ distributed systems
- ความรู้เบื้องต้นเกี่ยวกับ data pipeline
- คอมพิวเตอร์ที่มี RAM อย่างน้อย 8GB
- Docker (ถ้าต้องการใช้ Docker สำหรับการติดตั้ง)

## Kafka คืออะไร?

Apache Kafka คือ distributed streaming platform ที่ออกแบบมาเพื่อจัดการกับข้อมูลแบบ real-time โดยมีคุณสมบัติหลักๆ ดังนี้:

1. **Publish and Subscribe**: สามารถส่ง (publish) และรับ (subscribe) stream ของข้อมูลได้เหมือนกับระบบ messaging
2. **Store**: สามารถจัดเก็บ stream ของข้อมูลได้อย่างทนทานและมีความปลอดภัย
3. **Process**: สามารถประมวลผล stream ของข้อมูลได้ทันทีที่ข้อมูลเข้ามา

Kafka ถูกพัฒนาขึ้นโดย LinkedIn ในปี 2011 และต่อมาได้กลายเป็นโปรเจค open-source ภายใต้ Apache Software Foundation โดยปัจจุบัน Kafka ได้รับความนิยมอย่างมากในการสร้าง real-time data pipeline และ streaming applications

## องค์ประกอบหลักของ Kafka

### 1. Topic

Topic คือหมวดหมู่หรือ feed ของข้อมูลที่ใช้ในการจัดระเบียบข้อมูล โดย producer จะส่งข้อมูลไปยัง topic และ consumer จะรับข้อมูลจาก topic

### 2. Partition

Topic สามารถแบ่งออกเป็นหลาย partitions ซึ่งช่วยให้สามารถขยายขนาดและทำงานแบบ parallel ได้ โดยแต่ละ partition จะเก็บข้อมูลเป็นลำดับ (ordered sequence) และแต่ละข้อมูลจะมี offset เป็นตัวระบุตำแหน่ง

### 3. Producer

Producer คือแอปพลิเคชันที่ส่งข้อมูลไปยัง topic โดยสามารถเลือกได้ว่าจะส่งข้อมูลไปยัง partition ไหน

### 4. Consumer

Consumer คือแอปพลิเคชันที่รับข้อมูลจาก topic โดยสามารถรับข้อมูลจากหลาย partitions ได้

### 5. Consumer Group

Consumer Group คือกลุ่มของ consumers ที่ทำงานร่วมกันเพื่อรับข้อมูลจาก topic โดยแต่ละ consumer ใน group จะรับผิดชอบการอ่านข้อมูลจาก partitions ที่แตกต่างกัน

### 6. Broker

Broker คือ server ที่รัน Kafka โดย Kafka cluster ประกอบด้วย brokers หลายตัวที่ทำงานร่วมกัน

### 7. ZooKeeper

ZooKeeper เป็นบริการที่ใช้ในการจัดการและประสานงานระหว่าง brokers ใน Kafka cluster (หมายเหตุ: Kafka รุ่นใหม่กำลังลดการพึ่งพา ZooKeeper)

## การติดตั้งและเริ่มต้นใช้งาน Kafka

### 1. ติดตั้ง Kafka ด้วย Docker

วิธีที่ง่ายที่สุดในการเริ่มต้นใช้งาน Kafka คือการใช้ Docker:

```bash
# สร้างไฟล์ docker-compose.yml
cat > docker-compose.yml << EOF
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.0
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  broker:
    image: confluentinc/cp-kafka:7.3.0
    container_name: broker
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://broker:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
EOF

# รัน Docker Compose
docker-compose up -d
```

### 2. ติดตั้ง Kafka Client

เราจะใช้ Python เป็นตัวอย่างในการเขียน Kafka client:

```bash
# ติดตั้ง Kafka client สำหรับ Python
pip install kafka-python
```

### 3. สร้าง Topic

```bash
# เข้าไปใน container
docker exec -it broker bash

# สร้าง topic
kafka-topics --create --topic my-topic --bootstrap-server broker:29092 --partitions 3 --replication-factor 1

# ตรวจสอบ topic
kafka-topics --list --bootstrap-server broker:29092
```

### 4. ทดสอบ Producer และ Consumer ด้วย Command Line

```bash
# รัน producer
kafka-console-producer --topic my-topic --bootstrap-server broker:29092

# พิมพ์ข้อความและกด Enter เพื่อส่งข้อมูล
Hello, Kafka!
This is a test message.
```

ในอีก terminal หนึ่ง:

```bash
# รัน consumer
kafka-console-consumer --topic my-topic --bootstrap-server broker:29092 --from-beginning
```

## การใช้งาน Kafka สำหรับ Data Pipeline

### 1. สร้าง Producer ด้วย Python

```python
# producer.py
from kafka import KafkaProducer
import json
import time
import random
from datetime import datetime

# สร้าง producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# สร้างข้อมูลจำลอง
def generate_data():
    return {
        'user_id': random.randint(1, 1000),
        'product_id': random.randint(1, 100),
        'action': random.choice(['view', 'add_to_cart', 'purchase']),
        'timestamp': datetime.now().isoformat()
    }

# ส่งข้อมูลไปยัง topic
try:
    while True:
        data = generate_data()
        producer.send('user-activity', data)
        print(f"Sent: {data}")
        time.sleep(1)  # ส่งข้อมูลทุก 1 วินาที
except KeyboardInterrupt:
    producer.close()
```

### 2. สร้าง Consumer ด้วย Python

```python
# consumer.py
from kafka import KafkaConsumer
import json

# สร้าง consumer
consumer = KafkaConsumer(
    'user-activity',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='my-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

# รับข้อมูลจาก topic
try:
    for message in consumer:
        data = message.value
        print(f"Received: {data}")
        
        # ทำการประมวลผลข้อมูล
        if data['action'] == 'purchase':
            print(f"User {data['user_id']} purchased product {data['product_id']}")
except KeyboardInterrupt:
    consumer.close()
```

### 3. สร้าง Real-time Analytics ด้วย Kafka Streams

Kafka Streams เป็น library ที่ช่วยให้สามารถประมวลผลข้อมูลแบบ real-time ได้ง่ายขึ้น:

```java
// StreamsApp.java
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.KTable;
import org.apache.kafka.streams.kstream.Produced;
import org.apache.kafka.streams.kstream.TimeWindows;

import java.time.Duration;
import java.util.Properties;

public class StreamsApp {
    public static void main(String[] args) {
        // ตั้งค่า properties
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "streams-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        // สร้าง StreamsBuilder
        StreamsBuilder builder = new StreamsBuilder();

        // อ่านข้อมูลจาก topic
        KStream<String, String> userActivity = builder.stream("user-activity");

        // นับจำนวนการ purchase ตาม product_id ในช่วงเวลา 1 นาที
        KTable<String, Long> purchaseCount = userActivity
            .filter((key, value) -> value.contains("\"action\":\"purchase\""))
            .selectKey((key, value) -> extractProductId(value))
            .groupByKey()
            .windowedBy(TimeWindows.of(Duration.ofMinutes(1)))
            .count();

        // ส่งผลลัพธ์ไปยัง topic ใหม่
        purchaseCount.toStream()
            .map((key, value) -> {
                String productId = key.key();
                String window = key.window().start() + " - " + key.window().end();
                return new KeyValue<>(productId, "{\"product_id\":\"" + productId + "\",\"window\":\"" + window + "\",\"count\":" + value + "}");
            })
            .to("purchase-count", Produced.with(Serdes.String(), Serdes.String()));

        // สร้างและรัน KafkaStreams
        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();

        // ปิด KafkaStreams เมื่อโปรแกรมถูกปิด
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
    }

    private static String extractProductId(String json) {
        // แยก product_id จาก JSON string
        // (ในโค้ดจริงควรใช้ JSON parser)
        int start = json.indexOf("\"product_id\":") + 13;
        int end = json.indexOf(",", start);
        return json.substring(start, end);
    }
}
```

### 4. เชื่อมต่อ Kafka กับระบบอื่นๆ ด้วย Kafka Connect

Kafka Connect เป็นเครื่องมือที่ช่วยให้สามารถเชื่อมต่อ Kafka กับระบบอื่นๆ ได้ง่าย เช่น databases, search engines, file systems:

```bash
# ตัวอย่างการใช้ Kafka Connect เพื่อเชื่อมต่อกับ PostgreSQL
cat > postgres-sink.json << EOF
{
    "name": "postgres-sink",
    "config": {
        "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
        "tasks.max": "1",
        "topics": "user-activity",
        "connection.url": "jdbc:postgresql://postgres:5432/mydatabase",
        "connection.user": "postgres",
        "connection.password": "postgres",
        "auto.create": "true",
        "auto.evolve": "true",
        "insert.mode": "upsert",
        "pk.mode": "record_value",
        "pk.fields": "user_id,product_id,timestamp"
    }
}
EOF

# ส่ง configuration ไปยัง Kafka Connect REST API
curl -X POST -H "Content-Type: application/json" --data @postgres-sink.json http://localhost:8083/connectors
```

## เทคนิคและแนวทางปฏิบัติที่ดี

### 1. การตั้งค่า Partitions

การตั้งค่าจำนวน partitions ที่เหมาะสมเป็นสิ่งสำคัญที่จะช่วยให้ Kafka ทำงานได้อย่างมีประสิทธิภาพ:

- **จำนวน Partitions**: ควรมีจำนวน partitions มากกว่าหรือเท่ากับจำนวน consumers ใน consumer group
- **การกระจาย Load**: partitions ช่วยในการกระจาย load ไปยัง brokers ต่างๆ
- **การรักษาลำดับ**: ข้อมูลใน partition เดียวกันจะถูกรับในลำดับเดียวกัน

```bash
# สร้าง topic ที่มี 10 partitions
kafka-topics --create --topic high-volume-topic --bootstrap-server broker:29092 --partitions 10 --replication-factor 1
```

### 2. การตั้งค่า Replication

Replication ช่วยเพิ่มความทนทานของข้อมูลโดยการสำรองข้อมูลไว้ในหลาย brokers:

- **Replication Factor**: ควรตั้งค่า replication factor เป็น 3 สำหรับ production
- **In-sync Replicas (ISR)**: ควรตั้งค่า min.insync.replicas เพื่อให้แน่ใจว่าข้อมูลถูกเขียนลงในจำนวน replicas ที่เพียงพอ

```bash
# สร้าง topic ที่มี replication factor เป็น 3
kafka-topics --create --topic critical-data --bootstrap-server broker:29092 --partitions 3 --replication-factor 3

# ตั้งค่า min.insync.replicas
kafka-configs --bootstrap-server broker:29092 --entity-type topics --entity-name critical-data --alter --add-config min.insync.replicas=2
```

### 3. การจัดการ Consumer Groups

การจัดการ consumer groups ที่ดีจะช่วยให้การรับข้อมูลเป็นไปอย่างมีประสิทธิภาพ:

- **Consumer Group ID**: ควรตั้งชื่อ group ID ให้มีความหมายและไม่ซ้ำกัน
- **Consumer Rebalancing**: เข้าใจกระบวนการ rebalancing เมื่อมี consumer เข้าหรือออกจาก group
- **Offset Management**: เลือกวิธีการจัดการ offset ที่เหมาะสม (auto commit หรือ manual commit)

```python
# ตัวอย่างการใช้ manual commit
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'my-topic',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=False,  # ปิด auto commit
    group_id='my-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

try:
    for message in consumer:
        data = message.value
        print(f"Received: {data}")
        
        # ประมวลผลข้อมูล
        process_data(data)
        
        # commit offset หลังจากประมวลผลเสร็จ
        consumer.commit()
except KeyboardInterrupt:
    consumer.close()
```

### 4. การจัดการ Performance

การปรับแต่งประสิทธิภาพของ Kafka เป็นสิ่งสำคัญสำหรับระบบที่มีปริมาณข้อมูลสูง:

- **Batch Size**: เพิ่ม batch.size สำหรับ producer เพื่อเพิ่มประสิทธิภาพ
- **Compression**: ใช้ compression เพื่อลดปริมาณข้อมูลที่ส่ง
- **Buffer Memory**: ปรับแต่ง buffer.memory สำหรับ producer ให้เหมาะสม
- **Fetch Size**: ปรับแต่ง fetch.min.bytes และ fetch.max.wait.ms สำหรับ consumer

```python
# ตัวอย่างการตั้งค่า producer ให้มีประสิทธิภาพสูง
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    batch_size=16384,  # เพิ่ม batch size
    compression_type='gzip',  # ใช้ compression
    buffer_memory=33554432,  # เพิ่ม buffer memory
    linger_ms=10  # รอสักครู่เพื่อรวม messages เป็น batch
)
```

## สรุป

Apache Kafka เป็นเครื่องมือที่ทรงพลังสำหรับ Data Engineer ในการสร้าง real-time data pipeline โดยมีจุดเด่นในด้านความเร็ว, ความทนทาน, และความสามารถในการขยายขนาด

ในบทความนี้ เราได้เรียนรู้เกี่ยวกับ:
- พื้นฐานของ Kafka และองค์ประกอบหลัก
- การติดตั้งและเริ่มต้นใช้งาน Kafka
- การสร้าง producer และ consumer ด้วย Python
- การใช้ Kafka Streams สำหรับ real-time analytics
- การเชื่อมต่อ Kafka กับระบบอื่นๆ ด้วย Kafka Connect
- เทคนิคและแนวทางปฏิบัติที่ดีในการใช้งาน Kafka

Kafka เป็นเทคโนโลยีที่มีความซับซ้อน แต่เมื่อเข้าใจพื้นฐานและหลักการทำงานแล้ว คุณจะสามารถนำไปประยุกต์ใช้ในการสร้าง real-time data pipeline ที่มีประสิทธิภาพและทนทานต่อความล้มเหลวได้

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจพื้นฐานของ Kafka และสามารถนำไปประยุกต์ใช้ในงาน Data Engineering ได้อย่างมีประสิทธิภาพนะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
