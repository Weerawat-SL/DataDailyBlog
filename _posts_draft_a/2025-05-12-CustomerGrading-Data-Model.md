---
layout: post
title: "แก้ปัญหาการจัดเกรดลูกค้าด้วย Customer Grading Data Model"
author: "Weerawat"
categories: [Data Modeling]
tags: [Data Model, Customer Analytics, draft-A]
---

![Customer Grading](https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

# การจัดเกรดลูกค้าด้วย Customer Grading Data Model

## Table of Contents
- [ปัญหาการจัดเกรดลูกค้าที่มือใหม่มักเจอ](#ปัญหาการจัดเกรดลูกค้าที่มือใหม่มักเจอ)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept ของ Customer Grading](#concept-ของ-customer-grading)
- [Pre-Setup](#pre-setup)
- [How to สร้าง Customer Grading Data Model](#how-to-สร้าง-customer-grading-data-model)
- [Technic and Config](#technic-and-config)
- [การนำไปประยุกต์ใช้งาน](#การนำไปประยุกต์ใช้งาน)

## ปัญหาการจัดเกรดลูกค้าที่มือใหม่มักเจอ

เคยไหมครับ ที่เราต้องจัดกลุ่มลูกค้าเพื่อทำแคมเปญการตลาด แต่ไม่รู้จะเริ่มยังไง? หรือบอสสั่งให้แบ่งลูกค้าเป็นเกรด A B C แต่เราไม่รู้ว่าควรใช้เกณฑ์อะไรในการแบ่ง? หรือแม้แต่การพยายามสร้าง Data Model ที่รองรับการจัดเกรดลูกค้าแบบไดนามิก แต่กลับพบว่าโมเดลที่ออกแบบไว้ไม่ยืดหยุ่นพอ?

ปัญหาเหล่านี้เป็นเรื่องที่ Data Engineer มือใหม่มักจะเจอกันบ่อยๆ เพราะการจัดเกรดลูกค้าไม่ใช่แค่การแบ่งกลุ่มธรรมดา แต่ต้องคำนึงถึงความยืดหยุ่น การปรับเปลี่ยนเกณฑ์ในอนาคต และการนำไปใช้งานจริงในระบบธุรกิจ

วันนี้เราจะมาดูวิธีการออกแบบ Customer Grading Data Model ที่ทั้งยืดหยุ่นและใช้งานได้จริงกัน!

## Knowledge

การศึกษาเรื่อง Customer Grading Data Model จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Data Modeling**: เรียนรู้การออกแบบโครงสร้างข้อมูลที่เหมาะสมสำหรับการจัดเกรดลูกค้า
- **Business Rules Implementation**: การแปลงกฎทางธุรกิจให้เป็นโครงสร้างข้อมูลและโลจิก
- **SQL**: การใช้คำสั่ง SQL ขั้นสูงในการคำนวณและจัดกลุ่มข้อมูล
- **ETL Process**: การออกแบบกระบวนการ ETL ที่มีประสิทธิภาพสำหรับการอัพเดทเกรดลูกค้า
- **Data Visualization**: การนำเสนอข้อมูลการจัดเกรดลูกค้าในรูปแบบที่เข้าใจง่าย

## Pre-Requirement

ก่อนที่จะเริ่มสร้าง Customer Grading Data Model เราจำเป็นต้องมีสิ่งต่อไปนี้:

1. **Database System**: MySQL, PostgreSQL หรือ SQL Server
2. **ETL Tool**: เช่น Apache Airflow, Talend หรือ Python scripts
3. **BI Tool**: Power BI, Tableau หรือ Looker สำหรับการแสดงผล
4. **ความเข้าใจพื้นฐานเกี่ยวกับ**:
   - Dimensional Modeling
   - SQL และการใช้ Window Functions
   - การทำงานของ Stored Procedures (ถ้าจำเป็น)

## Concept ของ Customer Grading

การจัดเกรดลูกค้า (Customer Grading) คือกระบวนการแบ่งกลุ่มลูกค้าตามเกณฑ์ที่กำหนด เพื่อให้สามารถบริหารจัดการลูกค้าได้อย่างมีประสิทธิภาพ โดยทั่วไปมักใช้ปัจจัยต่อไปนี้:

1. **RFM Analysis**:
   - **Recency**: ระยะเวลาตั้งแต่การซื้อครั้งล่าสุด
   - **Frequency**: ความถี่ในการซื้อ
   - **Monetary**: มูลค่าการซื้อรวม

2. **Customer Lifetime Value (CLV)**: มูลค่ารวมที่คาดว่าจะได้รับจากลูกค้าตลอดความสัมพันธ์

3. **Customer Behavior**: พฤติกรรมการใช้บริการหรือซื้อสินค้า

4. **Profitability**: กำไรที่ได้รับจากลูกค้า

### โครงสร้างพื้นฐานของ Customer Grading Data Model

โมเดลข้อมูลสำหรับการจัดเกรดลูกค้าควรประกอบด้วยตารางหลักๆ ดังนี้:

1. **Customer Dimension**: ข้อมูลพื้นฐานของลูกค้า
2. **Grading Criteria**: เกณฑ์ที่ใช้ในการจัดเกรด
3. **Grade Definition**: นิยามของแต่ละเกรด
4. **Customer Grade**: ผลการจัดเกรดของลูกค้าแต่ละราย
5. **Grade History**: ประวัติการเปลี่ยนแปลงเกรดของลูกค้า

## Pre-Setup

ก่อนที่จะเริ่มสร้างโมเดล เราต้องเตรียมสภาพแวดล้อมให้พร้อม:

1. **สร้างฐานข้อมูล**:
```sql
CREATE DATABASE customer_analytics;
USE customer_analytics;
```

2. **สร้างตารางพื้นฐาน**:
```sql
-- ตารางข้อมูลลูกค้า
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    registration_date DATE,
    segment VARCHAR(50),
    region VARCHAR(50)
);

-- ตารางธุรกรรม
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY,
    customer_id INT,
    transaction_date DATE,
    amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

3. **เตรียม ETL Pipeline**:
   - สร้าง DAG ใน Airflow หรือ Job ใน ETL tool ที่ใช้
   - กำหนดตารางเวลาการรันเพื่ออัพเดทเกรดลูกค้า (เช่น รายวัน, รายสัปดาห์, รายเดือน)

## How to สร้าง Customer Grading Data Model

ตอนนี้เรามาเริ่มสร้าง Data Model สำหรับการจัดเกรดลูกค้ากัน:

### 1. สร้างตารางเกณฑ์การจัดเกรด

```sql
CREATE TABLE grading_criteria (
    criteria_id INT PRIMARY KEY,
    criteria_name VARCHAR(50),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    weight DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE criteria_thresholds (
    threshold_id INT PRIMARY KEY,
    criteria_id INT,
    grade CHAR(1),
    min_value DECIMAL(10,2),
    max_value DECIMAL(10,2),
    FOREIGN KEY (criteria_id) REFERENCES grading_criteria(criteria_id)
);
```

### 2. สร้างตารางนิยามเกรด

```sql
CREATE TABLE grade_definitions (
    grade CHAR(1) PRIMARY KEY,
    description VARCHAR(100),
    priority INT,
    color_code VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- เพิ่มข้อมูลเกรดพื้นฐาน
INSERT INTO grade_definitions (grade, description, priority, color_code)
VALUES 
('A', 'Premium Customer', 1, '#FFD700'),
('B', 'High Value Customer', 2, '#C0C0C0'),
('C', 'Regular Customer', 3, '#CD7F32'),
('D', 'Occasional Customer', 4, '#A9A9A9');
```

### 3. สร้างตารางผลการจัดเกรด

```sql
CREATE TABLE customer_grades (
    customer_id INT,
    grade CHAR(1),
    effective_date DATE,
    expiry_date DATE,
    is_current BOOLEAN,
    calculated_at TIMESTAMP,
    PRIMARY KEY (customer_id, effective_date),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (grade) REFERENCES grade_definitions(grade)
);

CREATE TABLE grade_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    old_grade CHAR(1),
    new_grade CHAR(1),
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(200),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (old_grade) REFERENCES grade_definitions(grade),
    FOREIGN KEY (new_grade) REFERENCES grade_definitions(grade)
);
```

### 4. สร้าง View สำหรับการคำนวณเกรด

```sql
CREATE VIEW customer_rfm_analysis AS
SELECT 
    c.customer_id,
    c.customer_name,
    DATEDIFF(CURRENT_DATE, MAX(t.transaction_date)) as recency_days,
    COUNT(t.transaction_id) as frequency,
    SUM(t.amount) as monetary
FROM 
    customers c
LEFT JOIN 
    transactions t ON c.customer_id = t.customer_id
GROUP BY 
    c.customer_id, c.customer_name;
```

### 5. สร้าง Stored Procedure สำหรับการจัดเกรด

```sql
DELIMITER //
CREATE PROCEDURE update_customer_grades()
BEGIN
    DECLARE current_date DATE;
    SET current_date = CURDATE();
    
    -- ปรับสถานะเกรดเก่าให้ไม่เป็นปัจจุบัน
    UPDATE customer_grades
    SET is_current = FALSE
    WHERE expiry_date < current_date;
    
    -- เพิ่มเกรดใหม่จากการคำนวณ RFM
    INSERT INTO customer_grades (customer_id, grade, effective_date, expiry_date, is_current, calculated_at)
    SELECT 
        rfm.customer_id,
        CASE 
            WHEN rfm.recency_days <= 30 AND rfm.frequency >= 10 AND rfm.monetary >= 5000 THEN 'A'
            WHEN rfm.recency_days <= 90 AND rfm.frequency >= 5 AND rfm.monetary >= 2000 THEN 'B'
            WHEN rfm.recency_days <= 180 AND rfm.frequency >= 2 AND rfm.monetary >= 500 THEN 'C'
            ELSE 'D'
        END as grade,
        current_date as effective_date,
        DATE_ADD(current_date, INTERVAL 3 MONTH) as expiry_date,
        TRUE as is_current,
        NOW() as calculated_at
    FROM 
        customer_rfm_analysis rfm
    LEFT JOIN 
        customer_grades cg ON rfm.customer_id = cg.customer_id AND cg.is_current = TRUE
    WHERE 
        cg.customer_id IS NULL OR cg.expiry_date < current_date;
    
    -- บันทึกประวัติการเปลี่ยนเกรด
    INSERT INTO grade_history (customer_id, old_grade, new_grade, reason)
    SELECT 
        new.customer_id,
        old.grade as old_grade,
        new.grade as new_grade,
        'Periodic Update' as reason
    FROM 
        customer_grades new
    JOIN 
        customer_grades old ON new.customer_id = old.customer_id
    WHERE 
        new.is_current = TRUE 
        AND old.is_current = FALSE
        AND new.effective_date = current_date
        AND old.grade <> new.grade;
END //
DELIMITER ;
```

## Technic and Config

เพื่อให้ Customer Grading Data Model ทำงานได้อย่างมีประสิทธิภาพ มีเทคนิคและการตั้งค่าที่ควรทำดังนี้:

### 1. การสร้างดัชนี (Index) เพื่อเพิ่มประสิทธิภาพ

```sql
-- สร้างดัชนีสำหรับการค้นหาเกรดปัจจุบันของลูกค้า
CREATE INDEX idx_customer_grades_current ON customer_grades(customer_id, is_current);

-- สร้างดัชนีสำหรับการค้นหาธุรกรรมตามช่วงเวลา
CREATE INDEX idx_transactions_date ON transactions(customer_id, transaction_date);
```

### 2. การตั้งค่า Partitioning สำหรับตารางขนาดใหญ่

```sql
-- แบ่ง Partition ตารางธุรกรรมตามปี
ALTER TABLE transactions
PARTITION BY RANGE (YEAR(transaction_date)) (
    PARTITION p2020 VALUES LESS THAN (2021),
    PARTITION p2021 VALUES LESS THAN (2022),
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

### 3. การสร้าง Materialized View (หรือตาราง Summary) สำหรับการรายงาน

```sql
CREATE TABLE customer_grade_summary (
    calculation_date DATE,
    grade CHAR(1),
    customer_count INT,
    total_monetary DECIMAL(15,2),
    avg_frequency DECIMAL(10,2),
    PRIMARY KEY (calculation_date, grade)
);

-- Procedure สำหรับอัพเดทข้อมูล Summary
DELIMITER //
CREATE PROCEDURE update_grade_summary()
BEGIN
    INSERT INTO customer_grade_summary
    SELECT 
        CURRENT_DATE as calculation_date,
        cg.grade,
        COUNT(DISTINCT cg.customer_id) as customer_count,
        SUM(rfm.monetary) as total_monetary,
        AVG(rfm.frequency) as avg_frequency
    FROM 
        customer_grades cg
    JOIN 
        customer_rfm_analysis rfm ON cg.customer_id = rfm.customer_id
    WHERE 
        cg.is_current = TRUE
    GROUP BY 
        cg.grade;
END //
DELIMITER ;
```

### 4. การตั้งค่า Event Scheduler สำหรับการอัพเดทอัตโนมัติ

```sql
SET GLOBAL event_scheduler = ON;

DELIMITER //
CREATE EVENT event_update_customer_grades
ON SCHEDULE EVERY 1 WEEK
STARTS CURRENT_DATE
DO
BEGIN
    CALL update_customer_grades();
    CALL update_grade_summary();
END //
DELIMITER ;
```

## การนำไปประยุกต์ใช้งาน

Customer Grading Data Model ที่เราสร้างขึ้นสามารถนำไปประยุกต์ใช้ได้หลากหลาย:

1. **การทำ Personalized Marketing**: ส่งข้อเสนอพิเศษให้กับลูกค้าแต่ละเกรดที่แตกต่างกัน
2. **การจัดสรรทรัพยากร**: จัดสรรพนักงานดูแลลูกค้าให้เหมาะสมกับเกรดของลูกค้า
3. **การวางแผนกลยุทธ์**: วิเคราะห์การเปลี่ยนแปลงของเกรดลูกค้าเพื่อปรับกลยุทธ์ทางธุรกิจ
4. **การตั้งเป้าหมาย KPI**: กำหนด KPI ในการยกระดับลูกค้าจากเกรดต่ำไปสู่เกรดที่สูงขึ้น
5. **การวิเคราะห์ความเสี่ยง**: ระบุลูกค้าที่มีแนวโน้มจะลดเกรดเพื่อทำการรักษาลูกค้า

การมี Customer Grading Data Model ที่ยืดหยุ่นและมีประสิทธิภาพจะช่วยให้องค์กรสามารถเข้าใจลูกค้าได้ดีขึ้น และนำไปสู่การตัดสินใจทางธุรกิจที่ดีขึ้น

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจวิธีการสร้าง Customer Grading Data Model และสามารถนำไปประยุกต์ใช้กับงานของคุณได้ครับ! ถ้ามีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถแชร์ในคอมเมนต์ด้านล่างได้เลยนะครับ
