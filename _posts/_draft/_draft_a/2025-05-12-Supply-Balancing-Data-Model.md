---
layout: post
title: "แก้ปัญหาการสมดุลอุปสงค์อุปทานด้วย Supply Balancing Data Model"
author: "Weerawat"
categories: [Data Modeling]
tags: [Data Model, Supply Chain, draft-A]
---

![Supply Balancing](https://images.unsplash.com/photo-1494961104209-3c223057bd26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

# การสมดุลอุปสงค์อุปทานด้วย Supply Balancing Data Model

## Table of Contents
- [ปัญหาการสมดุลอุปสงค์อุปทานที่มือใหม่มักเจอ](#ปัญหาการสมดุลอุปสงค์อุปทานที่มือใหม่มักเจอ)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept ของการสมดุลอุปสงค์อุปทาน](#concept-ของการสมดุลอุปสงค์อุปทาน)
- [Pre-Setup](#pre-setup)
- [How to สร้าง Supply Balancing Data Model](#how-to-สร้าง-supply-balancing-data-model)
- [Technic and Config](#technic-and-config)
- [การนำไปประยุกต์ใช้งาน](#การนำไปประยุกต์ใช้งาน)

## ปัญหาการสมดุลอุปสงค์อุปทานที่มือใหม่มักเจอ

น้องๆ เคยเจอปัญหาแบบนี้ไหม? ทีมวางแผนการผลิตต้องการข้อมูลเพื่อตัดสินใจว่าควรผลิตสินค้าอะไร เมื่อไหร่ และเท่าไร แต่ข้อมูลอุปสงค์และอุปทานกระจัดกระจายอยู่หลายระบบ? หรือบางทีเราพยายามสร้างรายงานเพื่อแสดงความสมดุลระหว่างอุปสงค์และอุปทาน แต่กลับพบว่าข้อมูลไม่สอดคล้องกัน? หรือแม้แต่การพยายามติดตามสถานะของการสมดุล แต่ไม่มีโมเดลข้อมูลที่เหมาะสม?

ปัญหาเหล่านี้เป็นเรื่องที่ Data Engineer มือใหม่มักจะเจอเมื่อต้องทำงานกับระบบ Supply Chain โดยเฉพาะในองค์กรที่มีความซับซ้อนสูง การออกแบบ Data Model ที่ดีจะช่วยให้การสมดุลอุปสงค์อุปทานเป็นไปอย่างมีประสิทธิภาพและแม่นยำ

วันนี้เราจะมาดูวิธีการออกแบบ Supply Balancing Data Model ที่จะช่วยแก้ปัญหาเหล่านี้กัน!

## Knowledge

การศึกษาเรื่อง Supply Balancing Data Model จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Supply Chain Data Integration**: เรียนรู้การรวบรวมและเชื่อมโยงข้อมูลจากหลายแหล่ง
- **Time Series Analysis**: การวิเคราะห์ข้อมูลอนุกรมเวลาสำหรับการพยากรณ์และวางแผน
- **Advanced SQL**: การใช้คำสั่ง SQL ขั้นสูงในการคำนวณความสมดุล
- **Data Visualization**: การนำเสนอข้อมูลความสมดุลในรูปแบบที่เข้าใจง่าย
- **Business Intelligence**: การแปลงข้อมูลให้เป็นข้อมูลเชิงลึกทางธุรกิจ

## Pre-Requirement

ก่อนที่จะเริ่มสร้าง Supply Balancing Data Model เราจำเป็นต้องมีสิ่งต่อไปนี้:

1. **Database System**: MySQL, PostgreSQL หรือ SQL Server
2. **ETL Tool**: เช่น Apache Airflow, Talend หรือ Python scripts
3. **BI Tool**: Power BI, Tableau หรือ Looker สำหรับการแสดงผล
4. **ความเข้าใจพื้นฐานเกี่ยวกับ**:
   - Supply Chain Management
   - Demand Planning
   - Production Planning
   - SQL และการใช้ Window Functions
   - การทำงานกับข้อมูลอนุกรมเวลา

## Concept ของการสมดุลอุปสงค์อุปทาน

การสมดุลอุปสงค์อุปทาน (Supply Balancing) คือกระบวนการจัดการให้อุปทาน (สินค้าที่ผลิตหรือจัดหาได้) สอดคล้องกับอุปสงค์ (ความต้องการของลูกค้า) โดยทั่วไปมักพิจารณาปัจจัยต่อไปนี้:

1. **Demand Forecast**: การพยากรณ์ความต้องการในอนาคต
2. **Current Inventory**: สินค้าคงคลังที่มีอยู่ในปัจจุบัน
3. **Production Capacity**: กำลังการผลิตที่มีอยู่
4. **Lead Time**: ระยะเวลาในการผลิตหรือจัดหา
5. **Safety Stock**: สินค้าคงคลังสำรองเพื่อรองรับความไม่แน่นอน

### โครงสร้างพื้นฐานของ Supply Balancing Data Model

โมเดลข้อมูลสำหรับการสมดุลอุปสงค์อุปทานควรประกอบด้วยตารางหลักๆ ดังนี้:

1. **Product Dimension**: ข้อมูลสินค้า
2. **Time Dimension**: มิติเวลา (วัน, สัปดาห์, เดือน)
3. **Location Dimension**: สถานที่ (คลังสินค้า, โรงงาน)
4. **Demand Forecast**: การพยากรณ์ความต้องการ
5. **Supply Plan**: แผนการผลิตหรือจัดหา
6. **Inventory**: สินค้าคงคลัง
7. **Balance Result**: ผลลัพธ์การสมดุล

## Pre-Setup

ก่อนที่จะเริ่มสร้างโมเดล เราต้องเตรียมสภาพแวดล้อมให้พร้อม:

1. **สร้างฐานข้อมูล**:
```sql
CREATE DATABASE supply_chain_balance;
USE supply_chain_balance;
```

2. **สร้างตารางมิติพื้นฐาน**:
```sql
-- ตารางมิติสินค้า
CREATE TABLE dim_product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    product_category VARCHAR(50),
    product_family VARCHAR(50),
    unit_of_measure VARCHAR(20),
    lead_time INT,
    is_active BOOLEAN DEFAULT TRUE
);

-- ตารางมิติเวลา
CREATE TABLE dim_time (
    time_id INT PRIMARY KEY,
    calendar_date DATE,
    day_of_week VARCHAR(10),
    week_of_year INT,
    month_name VARCHAR(10),
    month_number INT,
    quarter INT,
    year INT
);

-- ตารางมิติสถานที่
CREATE TABLE dim_location (
    location_id INT PRIMARY KEY,
    location_name VARCHAR(100),
    location_type ENUM('WAREHOUSE', 'FACTORY', 'DISTRIBUTION_CENTER'),
    region VARCHAR(50),
    country VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE
);
```

3. **เตรียม ETL Pipeline**:
   - สร้าง DAG ใน Airflow หรือ Job ใน ETL tool ที่ใช้
   - กำหนดตารางเวลาการรันเพื่ออัพเดทข้อมูลการสมดุล (เช่น รายวัน)

## How to สร้าง Supply Balancing Data Model

ตอนนี้เรามาเริ่มสร้าง Data Model สำหรับการสมดุลอุปสงค์อุปทานกัน:

### 1. สร้างตารางข้อมูลอุปสงค์

```sql
CREATE TABLE fact_demand (
    demand_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    location_id INT,
    time_id INT,
    forecast_quantity DECIMAL(10,2),
    actual_quantity DECIMAL(10,2),
    forecast_accuracy DECIMAL(5,2),
    demand_type ENUM('FORECAST', 'ACTUAL', 'PLANNED'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (location_id) REFERENCES dim_location(location_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id)
);

-- ตารางสำหรับรายละเอียดความต้องการ
CREATE TABLE demand_details (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    demand_id INT,
    customer_id INT,
    order_id VARCHAR(50),
    priority INT,
    notes TEXT,
    FOREIGN KEY (demand_id) REFERENCES fact_demand(demand_id)
);
```

### 2. สร้างตารางข้อมูลอุปทาน

```sql
CREATE TABLE fact_supply (
    supply_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    location_id INT,
    time_id INT,
    planned_quantity DECIMAL(10,2),
    actual_quantity DECIMAL(10,2),
    supply_type ENUM('PRODUCTION', 'PURCHASE', 'TRANSFER'),
    status ENUM('PLANNED', 'CONFIRMED', 'COMPLETED'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (location_id) REFERENCES dim_location(location_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id)
);

-- ตารางสำหรับรายละเอียดอุปทาน
CREATE TABLE supply_details (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    supply_id INT,
    source_location_id INT,
    batch_id VARCHAR(50),
    production_line VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (supply_id) REFERENCES fact_supply(supply_id),
    FOREIGN KEY (source_location_id) REFERENCES dim_location(location_id)
);
```

### 3. สร้างตารางข้อมูลสินค้าคงคลัง

```sql
CREATE TABLE fact_inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    location_id INT,
    time_id INT,
    beginning_quantity DECIMAL(10,2),
    ending_quantity DECIMAL(10,2),
    min_safety_stock DECIMAL(10,2),
    max_capacity DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (location_id) REFERENCES dim_location(location_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id)
);
```

### 4. สร้างตารางผลลัพธ์การสมดุล

```sql
CREATE TABLE fact_balance (
    balance_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    location_id INT,
    time_id INT,
    demand_quantity DECIMAL(10,2),
    supply_quantity DECIMAL(10,2),
    inventory_quantity DECIMAL(10,2),
    net_balance DECIMAL(10,2),
    balance_status ENUM('SURPLUS', 'BALANCED', 'SHORTAGE'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (location_id) REFERENCES dim_location(location_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id)
);
```

### 5. สร้าง View สำหรับการวิเคราะห์

```sql
CREATE VIEW supply_demand_balance AS
SELECT 
    t.calendar_date,
    t.year,
    t.month_name,
    p.product_id,
    p.product_name,
    p.product_category,
    l.location_id,
    l.location_name,
    COALESCE(d.forecast_quantity, 0) as demand_quantity,
    COALESCE(s.planned_quantity, 0) as supply_quantity,
    COALESCE(i.ending_quantity, 0) as inventory_quantity,
    COALESCE(i.ending_quantity, 0) + COALESCE(s.planned_quantity, 0) - COALESCE(d.forecast_quantity, 0) as net_balance,
    CASE 
        WHEN COALESCE(i.ending_quantity, 0) + COALESCE(s.planned_quantity, 0) - COALESCE(d.forecast_quantity, 0) > 0 THEN 'SURPLUS'
        WHEN COALESCE(i.ending_quantity, 0) + COALESCE(s.planned_quantity, 0) - COALESCE(d.forecast_quantity, 0) = 0 THEN 'BALANCED'
        ELSE 'SHORTAGE'
    END as balance_status
FROM 
    dim_time t
CROSS JOIN 
    dim_product p
CROSS JOIN 
    dim_location l
LEFT JOIN 
    fact_demand d ON t.time_id = d.time_id AND p.product_id = d.product_id AND l.location_id = d.location_id
LEFT JOIN 
    fact_supply s ON t.time_id = s.time_id AND p.product_id = s.product_id AND l.location_id = s.location_id
LEFT JOIN 
    fact_inventory i ON t.time_id = i.time_id AND p.product_id = i.product_id AND l.location_id = i.location_id
WHERE 
    t.calendar_date >= CURRENT_DATE
    AND t.calendar_date <= DATE_ADD(CURRENT_DATE, INTERVAL 12 WEEK)
    AND p.is_active = TRUE
    AND l.is_active = TRUE;
```

### 6. สร้าง Stored Procedure สำหรับการคำนวณสมดุล

```sql
DELIMITER //
CREATE PROCEDURE calculate_supply_demand_balance(IN p_horizon_days INT)
BEGIN
    DECLARE current_date DATE;
    SET current_date = CURDATE();
    
    -- ลบข้อมูลเก่า
    DELETE FROM fact_balance 
    WHERE time_id IN (
        SELECT time_id FROM dim_time 
        WHERE calendar_date >= current_date 
        AND calendar_date <= DATE_ADD(current_date, INTERVAL p_horizon_days DAY)
    );
    
    -- คำนวณและบันทึกผลลัพธ์การสมดุลใหม่
    INSERT INTO fact_balance (
        product_id, location_id, time_id, 
        demand_quantity, supply_quantity, inventory_quantity, 
        net_balance, balance_status
    )
    SELECT 
        p.product_id,
        l.location_id,
        t.time_id,
        COALESCE(d.forecast_quantity, 0) as demand_quantity,
        COALESCE(s.planned_quantity, 0) as supply_quantity,
        COALESCE(i.ending_quantity, 0) as inventory_quantity,
        COALESCE(i.ending_quantity, 0) + COALESCE(s.planned_quantity, 0) - COALESCE(d.forecast_quantity, 0) as net_balance,
        CASE 
            WHEN COALESCE(i.ending_quantity, 0) + COALESCE(s.planned_quantity, 0) - COALESCE(d.forecast_quantity, 0) > 0 THEN 'SURPLUS'
            WHEN COALESCE(i.ending_quantity, 0) + COALESCE(s.planned_quantity, 0) - COALESCE(d.forecast_quantity, 0) = 0 THEN 'BALANCED'
            ELSE 'SHORTAGE'
        END as balance_status
    FROM 
        dim_time t
    CROSS JOIN 
        dim_product p
    CROSS JOIN 
        dim_location l
    LEFT JOIN 
        fact_demand d ON t.time_id = d.time_id AND p.product_id = d.product_id AND l.location_id = d.location_id
    LEFT JOIN 
        fact_supply s ON t.time_id = s.time_id AND p.product_id = s.product_id AND l.location_id = s.location_id
    LEFT JOIN 
        fact_inventory i ON t.time_id = i.time_id AND p.product_id = i.product_id AND l.location_id = i.location_id
    WHERE 
        t.calendar_date >= current_date
        AND t.calendar_date <= DATE_ADD(current_date, INTERVAL p_horizon_days DAY)
        AND p.is_active = TRUE
        AND l.is_active = TRUE;
END //
DELIMITER ;
```

## Technic and Config

เพื่อให้ Supply Balancing Data Model ทำงานได้อย่างมีประสิทธิภาพ มีเทคนิคและการตั้งค่าที่ควรทำดังนี้:

### 1. การสร้างดัชนี (Index) เพื่อเพิ่มประสิทธิภาพ

```sql
-- สร้างดัชนีสำหรับการค้นหาข้อมูลอุปสงค์
CREATE INDEX idx_demand_product_location_time ON fact_demand(product_id, location_id, time_id);

-- สร้างดัชนีสำหรับการค้นหาข้อมูลอุปทาน
CREATE INDEX idx_supply_product_location_time ON fact_supply(product_id, location_id, time_id);

-- สร้างดัชนีสำหรับการค้นหาข้อมูลสินค้าคงคลัง
CREATE INDEX idx_inventory_product_location_time ON fact_inventory(product_id, location_id, time_id);

-- สร้างดัชนีสำหรับการค้นหาข้อมูลตามช่วงเวลา
CREATE INDEX idx_time_calendar_date ON dim_time(calendar_date);
```

### 2. การตั้งค่า Partitioning สำหรับตารางขนาดใหญ่

```sql
-- แบ่ง Partition ตารางผลลัพธ์การสมดุลตามปีและเดือน
ALTER TABLE fact_balance
PARTITION BY RANGE (YEAR(created_at) * 100 + MONTH(created_at)) (
    PARTITION p2023_01 VALUES LESS THAN (202302),
    PARTITION p2023_02 VALUES LESS THAN (202303),
    -- ... เพิ่มเติมตามต้องการ
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

### 3. การสร้าง Materialized View (หรือตาราง Summary) สำหรับการรายงาน

```sql
CREATE TABLE balance_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    calculation_date DATE,
    product_category VARCHAR(50),
    region VARCHAR(50),
    total_demand DECIMAL(15,2),
    total_supply DECIMAL(15,2),
    total_inventory DECIMAL(15,2),
    net_balance DECIMAL(15,2),
    shortage_count INT,
    surplus_count INT,
    balanced_count INT
);

-- Procedure สำหรับอัพเดทข้อมูล Summary
DELIMITER //
CREATE PROCEDURE update_balance_summary()
BEGIN
    INSERT INTO balance_summary (
        calculation_date, product_category, region,
        total_demand, total_supply, total_inventory,
        net_balance, shortage_count, surplus_count, balanced_count
    )
    SELECT 
        CURRENT_DATE as calculation_date,
        p.product_category,
        l.region,
        SUM(b.demand_quantity) as total_demand,
        SUM(b.supply_quantity) as total_supply,
        SUM(b.inventory_quantity) as total_inventory,
        SUM(b.net_balance) as net_balance,
        SUM(CASE WHEN b.balance_status = 'SHORTAGE' THEN 1 ELSE 0 END) as shortage_count,
        SUM(CASE WHEN b.balance_status = 'SURPLUS' THEN 1 ELSE 0 END) as surplus_count,
        SUM(CASE WHEN b.balance_status = 'BALANCED' THEN 1 ELSE 0 END) as balanced_count
    FROM 
        fact_balance b
    JOIN 
        dim_product p ON b.product_id = p.product_id
    JOIN 
        dim_location l ON b.location_id = l.location_id
    JOIN 
        dim_time t ON b.time_id = t.time_id
    WHERE 
        t.calendar_date >= CURRENT_DATE
        AND t.calendar_date <= DATE_ADD(CURRENT_DATE, INTERVAL 12 WEEK)
    GROUP BY 
        p.product_category, l.region;
END //
DELIMITER ;
```

### 4. การตั้งค่า Event Scheduler สำหรับการอัพเดทอัตโนมัติ

```sql
SET GLOBAL event_scheduler = ON;

DELIMITER //
CREATE EVENT event_daily_balance_calculation
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    CALL calculate_supply_demand_balance(90); -- คำนวณสมดุลล่วงหน้า 90 วัน
    CALL update_balance_summary();
END //
DELIMITER ;
```

## การนำไปประยุกต์ใช้งาน

Supply Balancing Data Model ที่เราสร้างขึ้นสามารถนำไปประยุกต์ใช้ได้หลากหลาย:

1. **การวางแผนการผลิต**: ใช้ข้อมูลความสมดุลเพื่อปรับแผนการผลิตให้สอดคล้องกับความต้องการ
2. **การจัดการสินค้าคงคลัง**: ระบุสินค้าที่มีความเสี่ยงจะขาดแคลนหรือมีมากเกินไป
3. **การวางแผนการจัดซื้อ**: กำหนดปริมาณและเวลาในการสั่งซื้อวัตถุดิบหรือสินค้า
4. **การวิเคราะห์แนวโน้ม**: ติดตามแนวโน้มของความสมดุลอุปสงค์อุปทานเพื่อการวางแผนระยะยาว
5. **การตัดสินใจเชิงกลยุทธ์**: ใช้ข้อมูลความสมดุลเพื่อตัดสินใจเกี่ยวกับการขยายกำลังการผลิตหรือการเข้าสู่ตลาดใหม่

การมี Supply Balancing Data Model ที่มีประสิทธิภาพจะช่วยให้องค์กรสามารถตอบสนองต่อการเปลี่ยนแปลงของตลาดได้อย่างรวดเร็ว ลดต้นทุนการถือครองสินค้าคงคลัง และเพิ่มระดับการให้บริการลูกค้า

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจวิธีการสร้าง Supply Balancing Data Model และสามารถนำไปประยุกต์ใช้กับงานของคุณได้ครับ! ถ้ามีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถแชร์ในคอมเมนต์ด้านล่างได้เลยนะครับ
