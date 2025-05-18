---
layout: post
title: "แก้ปัญหาการพยากรณ์ด้วย Forecast Data Model"
author: "Weerawat"
categories: [Data Modeling]
tags: [Data Model, Forecasting, draft-A]
---

![Forecasting](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

# การพยากรณ์ข้อมูลด้วย Forecast Data Model

## Table of Contents
- [ปัญหาการพยากรณ์ข้อมูลที่มือใหม่มักเจอ](#ปัญหาการพยากรณ์ข้อมูลที่มือใหม่มักเจอ)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept ของการพยากรณ์ข้อมูล](#concept-ของการพยากรณ์ข้อมูล)
- [Pre-Setup](#pre-setup)
- [How to สร้าง Forecast Data Model](#how-to-สร้าง-forecast-data-model)
- [Technic and Config](#technic-and-config)
- [การนำไปประยุกต์ใช้งาน](#การนำไปประยุกต์ใช้งาน)

## ปัญหาการพยากรณ์ข้อมูลที่มือใหม่มักเจอ

น้องๆ เคยเจอปัญหาแบบนี้ไหม? ทีมธุรกิจต้องการระบบพยากรณ์ยอดขายล่วงหน้า แต่เราไม่รู้จะออกแบบฐานข้อมูลยังไงให้รองรับทั้งข้อมูลจริงและข้อมูลพยากรณ์? หรือบางทีเราพยายามเก็บประวัติการพยากรณ์เพื่อวัดความแม่นยำ แต่ไม่รู้จะจัดโครงสร้างข้อมูลอย่างไร? หรือแม้แต่การพยายามเปรียบเทียบผลการพยากรณ์จากหลายโมเดล แต่ข้อมูลกระจัดกระจายและยากต่อการวิเคราะห์?

ปัญหาเหล่านี้เป็นเรื่องที่ Data Engineer มือใหม่มักจะเจอเมื่อต้องทำงานกับระบบพยากรณ์ข้อมูล ไม่ว่าจะเป็นการพยากรณ์ยอดขาย การพยากรณ์ความต้องการสินค้า หรือการพยากรณ์ทรัพยากรที่ต้องใช้ การออกแบบ Data Model ที่ดีจะช่วยให้ระบบพยากรณ์ทำงานได้อย่างมีประสิทธิภาพและสามารถวัดผลได้อย่างแม่นยำ

วันนี้เราจะมาดูวิธีการออกแบบ Forecast Data Model ที่จะช่วยแก้ปัญหาเหล่านี้กัน!

## Knowledge

การศึกษาเรื่อง Forecast Data Model จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Time Series Data Management**: เรียนรู้การจัดการข้อมูลอนุกรมเวลา
- **Forecasting Methods**: ความเข้าใจเกี่ยวกับวิธีการพยากรณ์แบบต่างๆ
- **Advanced SQL**: การใช้คำสั่ง SQL ขั้นสูงในการวิเคราะห์ข้อมูลอนุกรมเวลา
- **Data Visualization**: การนำเสนอข้อมูลพยากรณ์เทียบกับข้อมูลจริง
- **Forecast Accuracy Metrics**: การวัดความแม่นยำของการพยากรณ์

## Pre-Requirement

ก่อนที่จะเริ่มสร้าง Forecast Data Model เราจำเป็นต้องมีสิ่งต่อไปนี้:

1. **Database System**: MySQL, PostgreSQL หรือ SQL Server
2. **ETL Tool**: เช่น Apache Airflow, Talend หรือ Python scripts
3. **BI Tool**: Power BI, Tableau หรือ Looker สำหรับการแสดงผล
4. **ความเข้าใจพื้นฐานเกี่ยวกับ**:
   - Time Series Analysis
   - Forecasting Methods (เช่น Moving Average, Exponential Smoothing, ARIMA)
   - SQL และการใช้ Window Functions
   - การทำงานกับข้อมูลอนุกรมเวลา

## Concept ของการพยากรณ์ข้อมูล

การพยากรณ์ข้อมูล (Forecasting) คือกระบวนการทำนายค่าในอนาคตโดยใช้ข้อมูลในอดีต โดยทั่วไปมีองค์ประกอบหลักดังนี้:

1. **Historical Data**: ข้อมูลในอดีตที่ใช้เป็นพื้นฐานในการพยากรณ์
2. **Forecast Models**: โมเดลหรือวิธีการที่ใช้ในการพยากรณ์
3. **Forecast Horizon**: ระยะเวลาในอนาคตที่ต้องการพยากรณ์
4. **Forecast Granularity**: ความละเอียดของการพยากรณ์ (เช่น รายวัน, รายสัปดาห์, รายเดือน)
5. **Forecast Accuracy**: การวัดความแม่นยำของการพยากรณ์

### โครงสร้างพื้นฐานของ Forecast Data Model

โมเดลข้อมูลสำหรับการพยากรณ์ควรประกอบด้วยตารางหลักๆ ดังนี้:

1. **Time Dimension**: มิติเวลา (วัน, สัปดาห์, เดือน)
2. **Product Dimension**: ข้อมูลสินค้าหรือบริการ
3. **Location Dimension**: ข้อมูลสถานที่หรือภูมิภาค
4. **Actual Data**: ข้อมูลจริงที่เกิดขึ้น
5. **Forecast Data**: ข้อมูลพยากรณ์
6. **Forecast Models**: ข้อมูลโมเดลที่ใช้ในการพยากรณ์
7. **Forecast Accuracy**: ข้อมูลความแม่นยำของการพยากรณ์

## Pre-Setup

ก่อนที่จะเริ่มสร้างโมเดล เราต้องเตรียมสภาพแวดล้อมให้พร้อม:

1. **สร้างฐานข้อมูล**:
```sql
CREATE DATABASE forecasting_system;
USE forecasting_system;
```

2. **สร้างตารางมิติพื้นฐาน**:
```sql
-- ตารางมิติเวลา
CREATE TABLE dim_time (
    time_id INT AUTO_INCREMENT PRIMARY KEY,
    calendar_date DATE UNIQUE,
    day_of_week VARCHAR(10),
    day_of_month INT,
    week_of_year INT,
    month_name VARCHAR(10),
    month_number INT,
    quarter INT,
    year INT,
    is_holiday BOOLEAN,
    is_weekend BOOLEAN
);

-- ตารางมิติสินค้า
CREATE TABLE dim_product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE,
    product_name VARCHAR(100),
    product_category VARCHAR(50),
    product_subcategory VARCHAR(50),
    product_family VARCHAR(50),
    unit_cost DECIMAL(10,2),
    unit_price DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE
);

-- ตารางมิติสถานที่
CREATE TABLE dim_location (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    location_code VARCHAR(50) UNIQUE,
    location_name VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    region VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE
);
```

3. **เตรียม ETL Pipeline**:
   - สร้าง DAG ใน Airflow หรือ Job ใน ETL tool ที่ใช้
   - กำหนดตารางเวลาการรันเพื่ออัพเดทข้อมูลและสร้างการพยากรณ์

## How to สร้าง Forecast Data Model

ตอนนี้เรามาเริ่มสร้าง Data Model สำหรับการพยากรณ์ข้อมูลกัน:

### 1. สร้างตารางข้อมูลจริง

```sql
CREATE TABLE fact_actual_sales (
    actual_id INT AUTO_INCREMENT PRIMARY KEY,
    time_id INT,
    product_id INT,
    location_id INT,
    sales_quantity INT,
    sales_amount DECIMAL(15,2),
    cost_amount DECIMAL(15,2),
    profit_amount DECIMAL(15,2),
    transaction_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (location_id) REFERENCES dim_location(location_id),
    UNIQUE KEY (time_id, product_id, location_id)
);
```

### 2. สร้างตารางข้อมูลโมเดลพยากรณ์

```sql
CREATE TABLE forecast_models (
    model_id INT AUTO_INCREMENT PRIMARY KEY,
    model_name VARCHAR(100),
    model_description TEXT,
    model_type VARCHAR(50),
    model_parameters TEXT,
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- ตารางเวอร์ชันของโมเดล
CREATE TABLE forecast_model_versions (
    version_id INT AUTO_INCREMENT PRIMARY KEY,
    model_id INT,
    version_number VARCHAR(20),
    training_start_date DATE,
    training_end_date DATE,
    validation_start_date DATE,
    validation_end_date DATE,
    model_accuracy DECIMAL(10,2),
    model_parameters TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (model_id) REFERENCES forecast_models(model_id)
);
```

### 3. สร้างตารางข้อมูลพยากรณ์

```sql
CREATE TABLE fact_forecast_sales (
    forecast_id INT AUTO_INCREMENT PRIMARY KEY,
    time_id INT,
    product_id INT,
    location_id INT,
    version_id INT,
    forecast_quantity INT,
    forecast_amount DECIMAL(15,2),
    forecast_cost DECIMAL(15,2),
    forecast_profit DECIMAL(15,2),
    confidence_level DECIMAL(5,2),
    lower_bound DECIMAL(15,2),
    upper_bound DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (location_id) REFERENCES dim_location(location_id),
    FOREIGN KEY (version_id) REFERENCES forecast_model_versions(version_id)
);

-- ตารางประวัติการพยากรณ์
CREATE TABLE forecast_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    forecast_date DATE,
    time_id INT,
    product_id INT,
    location_id INT,
    version_id INT,
    forecast_quantity INT,
    forecast_amount DECIMAL(15,2),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (location_id) REFERENCES dim_location(location_id),
    FOREIGN KEY (version_id) REFERENCES forecast_model_versions(version_id)
);
```

### 4. สร้างตารางความแม่นยำของการพยากรณ์

```sql
CREATE TABLE forecast_accuracy (
    accuracy_id INT AUTO_INCREMENT PRIMARY KEY,
    time_id INT,
    product_id INT,
    location_id INT,
    version_id INT,
    actual_quantity INT,
    forecast_quantity INT,
    absolute_error INT,
    percentage_error DECIMAL(10,2),
    mape DECIMAL(10,2),
    rmse DECIMAL(10,2),
    mae DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (location_id) REFERENCES dim_location(location_id),
    FOREIGN KEY (version_id) REFERENCES forecast_model_versions(version_id)
);
```

### 5. สร้าง View สำหรับการวิเคราะห์

```sql
CREATE VIEW forecast_vs_actual AS
SELECT 
    t.calendar_date,
    t.year,
    t.month_name,
    p.product_name,
    p.product_category,
    l.location_name,
    l.region,
    fa.sales_quantity as actual_quantity,
    fa.sales_amount as actual_amount,
    ff.forecast_quantity,
    ff.forecast_amount,
    (fa.sales_quantity - ff.forecast_quantity) as quantity_variance,
    (fa.sales_amount - ff.forecast_amount) as amount_variance,
    CASE 
        WHEN ff.forecast_quantity > 0 
        THEN ((fa.sales_quantity - ff.forecast_quantity) / ff.forecast_quantity) * 100 
        ELSE 0 
    END as percentage_variance,
    fm.model_name,
    fmv.version_number
FROM 
    dim_time t
JOIN 
    fact_actual_sales fa ON t.time_id = fa.time_id
JOIN 
    dim_product p ON fa.product_id = p.product_id
JOIN 
    dim_location l ON fa.location_id = l.location_id
LEFT JOIN 
    fact_forecast_sales ff ON t.time_id = ff.time_id 
    AND fa.product_id = ff.product_id 
    AND fa.location_id = ff.location_id
LEFT JOIN 
    forecast_model_versions fmv ON ff.version_id = fmv.version_id
LEFT JOIN 
    forecast_models fm ON fmv.model_id = fm.model_id;
```

### 6. สร้าง Stored Procedure สำหรับการคำนวณความแม่นยำ

```sql
DELIMITER //
CREATE PROCEDURE calculate_forecast_accuracy(IN p_version_id INT)
BEGIN
    -- ลบข้อมูลเก่า
    DELETE FROM forecast_accuracy WHERE version_id = p_version_id;
    
    -- คำนวณและบันทึกความแม่นยำใหม่
    INSERT INTO forecast_accuracy (
        time_id, product_id, location_id, version_id,
        actual_quantity, forecast_quantity,
        absolute_error, percentage_error
    )
    SELECT 
        fa.time_id,
        fa.product_id,
        fa.location_id,
        ff.version_id,
        fa.sales_quantity as actual_quantity,
        ff.forecast_quantity,
        ABS(fa.sales_quantity - ff.forecast_quantity) as absolute_error,
        CASE 
            WHEN fa.sales_quantity > 0 
            THEN (ABS(fa.sales_quantity - ff.forecast_quantity) / fa.sales_quantity) * 100 
            ELSE 0 
        END as percentage_error
    FROM 
        fact_actual_sales fa
    JOIN 
        fact_forecast_sales ff ON fa.time_id = ff.time_id 
        AND fa.product_id = ff.product_id 
        AND fa.location_id = ff.location_id
    WHERE 
        ff.version_id = p_version_id;
    
    -- อัพเดท MAPE, RMSE, MAE
    UPDATE forecast_model_versions fmv
    SET 
        model_accuracy = (
            SELECT AVG(percentage_error)
            FROM forecast_accuracy
            WHERE version_id = p_version_id
        )
    WHERE 
        version_id = p_version_id;
END //
DELIMITER ;
```

## Technic and Config

เพื่อให้ Forecast Data Model ทำงานได้อย่างมีประสิทธิภาพ มีเทคนิคและการตั้งค่าที่ควรทำดังนี้:

### 1. การสร้างดัชนี (Index) เพื่อเพิ่มประสิทธิภาพ

```sql
-- สร้างดัชนีสำหรับการค้นหาข้อมูลจริงตามช่วงเวลา
CREATE INDEX idx_actual_time ON fact_actual_sales(time_id);

-- สร้างดัชนีสำหรับการค้นหาข้อมูลพยากรณ์ตามช่วงเวลา
CREATE INDEX idx_forecast_time ON fact_forecast_sales(time_id);

-- สร้างดัชนีสำหรับการค้นหาข้อมูลตามสินค้าและสถานที่
CREATE INDEX idx_actual_product_location ON fact_actual_sales(product_id, location_id);
CREATE INDEX idx_forecast_product_location ON fact_forecast_sales(product_id, location_id);

-- สร้างดัชนีสำหรับการค้นหาข้อมูลตามเวอร์ชันโมเดล
CREATE INDEX idx_forecast_version ON fact_forecast_sales(version_id);
```

### 2. การตั้งค่า Partitioning สำหรับตารางขนาดใหญ่

```sql
-- แบ่ง Partition ตารางข้อมูลจริงตามปีและเดือน
ALTER TABLE fact_actual_sales
PARTITION BY RANGE (YEAR(created_at) * 100 + MONTH(created_at)) (
    PARTITION p2023_01 VALUES LESS THAN (202302),
    PARTITION p2023_02 VALUES LESS THAN (202303),
    -- ... เพิ่มเติมตามต้องการ
    PARTITION pmax VALUES LESS THAN MAXVALUE
);

-- แบ่ง Partition ตารางข้อมูลพยากรณ์ตามปีและเดือน
ALTER TABLE fact_forecast_sales
PARTITION BY RANGE (YEAR(created_at) * 100 + MONTH(created_at)) (
    PARTITION p2023_01 VALUES LESS THAN (202302),
    PARTITION p2023_02 VALUES LESS THAN (202303),
    -- ... เพิ่มเติมตามต้องการ
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

### 3. การสร้าง Materialized View (หรือตาราง Summary) สำหรับการรายงาน

```sql
CREATE TABLE forecast_accuracy_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    calculation_date DATE,
    version_id INT,
    product_category VARCHAR(50),
    region VARCHAR(50),
    mape DECIMAL(10,2),
    rmse DECIMAL(10,2),
    mae DECIMAL(10,2),
    bias DECIMAL(10,2),
    FOREIGN KEY (version_id) REFERENCES forecast_model_versions(version_id)
);

-- Procedure สำหรับอัพเดทข้อมูล Summary
DELIMITER //
CREATE PROCEDURE update_forecast_accuracy_summary(IN p_version_id INT)
BEGIN
    INSERT INTO forecast_accuracy_summary (
        calculation_date, version_id, product_category, region,
        mape, rmse, mae, bias
    )
    SELECT 
        CURRENT_DATE as calculation_date,
        fa.version_id,
        p.product_category,
        l.region,
        AVG(fa.percentage_error) as mape,
        SQRT(AVG(POWER(fa.absolute_error, 2))) as rmse,
        AVG(fa.absolute_error) as mae,
        AVG((fa.actual_quantity - fa.forecast_quantity) / NULLIF(fa.actual_quantity, 0)) * 100 as bias
    FROM 
        forecast_accuracy fa
    JOIN 
        dim_product p ON fa.product_id = p.product_id
    JOIN 
        dim_location l ON fa.location_id = l.location_id
    WHERE 
        fa.version_id = p_version_id
    GROUP BY 
        fa.version_id, p.product_category, l.region;
END //
DELIMITER ;
```

### 4. การตั้งค่า Event Scheduler สำหรับการอัพเดทอัตโนมัติ

```sql
SET GLOBAL event_scheduler = ON;

DELIMITER //
CREATE EVENT event_daily_forecast_accuracy
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    -- หาเวอร์ชันโมเดลที่ active
    DECLARE v_version_id INT;
    
    SELECT version_id INTO v_version_id
    FROM forecast_model_versions
    WHERE is_active = TRUE
    ORDER BY created_at DESC
    LIMIT 1;
    
    IF v_version_id IS NOT NULL THEN
        CALL calculate_forecast_accuracy(v_version_id);
        CALL update_forecast_accuracy_summary(v_version_id);
    END IF;
END //
DELIMITER ;
```

## การนำไปประยุกต์ใช้งาน

Forecast Data Model ที่เราสร้างขึ้นสามารถนำไปประยุกต์ใช้ได้หลากหลาย:

1. **การวางแผนการขาย**: ใช้ข้อมูลพยากรณ์เพื่อวางแผนกลยุทธ์การขายและการตลาด
2. **การบริหารสินค้าคงคลัง**: ใช้ข้อมูลพยากรณ์เพื่อวางแผนการสั่งซื้อและการจัดเก็บสินค้า
3. **การวางแผนกำลังการผลิต**: ใช้ข้อมูลพยากรณ์เพื่อวางแผนกำลังการผลิตและทรัพยากรที่ต้องใช้
4. **การวางแผนงบประมาณ**: ใช้ข้อมูลพยากรณ์เพื่อประมาณการรายได้และค่าใช้จ่าย
5. **การวิเคราะห์แนวโน้ม**: ใช้ข้อมูลพยากรณ์เพื่อวิเคราะห์แนวโน้มของตลาดและพฤติกรรมผู้บริโภค

การมี Forecast Data Model ที่มีประสิทธิภาพจะช่วยให้องค์กรสามารถตัดสินใจได้อย่างมีข้อมูลมากขึ้น ลดความเสี่ยงในการดำเนินธุรกิจ และเพิ่มโอกาสในการสร้างกำไร

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจวิธีการสร้าง Forecast Data Model และสามารถนำไปประยุกต์ใช้กับงานของคุณได้ครับ! ถ้ามีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถแชร์ในคอมเมนต์ด้านล่างได้เลยนะครับ
