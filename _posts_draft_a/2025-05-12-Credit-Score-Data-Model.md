---
layout: post
title: "แก้ปัญหาการจัดการเครดิตสกอร์ด้วย Credit Score Data Model"
author: "Weerawat"
categories: [Data Modeling]
tags: [Data Model, Credit Risk, draft-A]
---

![Credit Score](https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

# การจัดการเครดิตสกอร์ด้วย Credit Score Data Model

## Table of Contents
- [ปัญหาการจัดการเครดิตสกอร์ที่มือใหม่มักเจอ](#ปัญหาการจัดการเครดิตสกอร์ที่มือใหม่มักเจอ)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept ของการจัดการเครดิตสกอร์](#concept-ของการจัดการเครดิตสกอร์)
- [Pre-Setup](#pre-setup)
- [How to สร้าง Credit Score Data Model](#how-to-สร้าง-credit-score-data-model)
- [Technic and Config](#technic-and-config)
- [การนำไปประยุกต์ใช้งาน](#การนำไปประยุกต์ใช้งาน)

## ปัญหาการจัดการเครดิตสกอร์ที่มือใหม่มักเจอ

น้องๆ เคยเจอปัญหาแบบนี้ไหม? ทีมสินเชื่อต้องการระบบคำนวณเครดิตสกอร์ของลูกค้า แต่เราไม่รู้จะออกแบบฐานข้อมูลยังไงให้รองรับการคำนวณที่ซับซ้อน? หรือบางทีเราพยายามติดตามการเปลี่ยนแปลงของเครดิตสกอร์ แต่ข้อมูลกระจัดกระจายและยากต่อการวิเคราะห์? หรือแม้แต่การพยายามปรับปรุงโมเดลการให้คะแนน แต่ไม่มีโครงสร้างข้อมูลที่เหมาะสมรองรับ?

ปัญหาเหล่านี้เป็นเรื่องที่ Data Engineer มือใหม่มักจะเจอเมื่อต้องทำงานกับระบบเครดิตสกอร์ ไม่ว่าจะเป็นในธนาคาร บริษัทสินเชื่อ หรือแม้แต่ธุรกิจที่ต้องการประเมินความเสี่ยงของลูกค้า การออกแบบ Data Model ที่ดีจะช่วยให้ระบบเครดิตสกอร์ทำงานได้อย่างมีประสิทธิภาพและแม่นยำ

วันนี้เราจะมาดูวิธีการออกแบบ Credit Score Data Model ที่จะช่วยแก้ปัญหาเหล่านี้กัน!

## Knowledge

การศึกษาเรื่อง Credit Score Data Model จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Risk Assessment Modeling**: เรียนรู้การออกแบบโมเดลประเมินความเสี่ยง
- **Historical Data Analysis**: การวิเคราะห์ข้อมูลย้อนหลังเพื่อการประเมินเครดิต
- **Advanced SQL**: การใช้คำสั่ง SQL ขั้นสูงในการคำนวณคะแนนเครดิต
- **Data Security**: การรักษาความปลอดภัยของข้อมูลทางการเงินที่อ่อนไหว
- **Regulatory Compliance**: การออกแบบระบบให้สอดคล้องกับกฎระเบียบด้านการเงิน

## Pre-Requirement

ก่อนที่จะเริ่มสร้าง Credit Score Data Model เราจำเป็นต้องมีสิ่งต่อไปนี้:

1. **Database System**: MySQL, PostgreSQL หรือ SQL Server
2. **ETL Tool**: เช่น Apache Airflow, Talend หรือ Python scripts
3. **BI Tool**: Power BI, Tableau หรือ Looker สำหรับการแสดงผล
4. **ความเข้าใจพื้นฐานเกี่ยวกับ**:
   - หลักการประเมินความเสี่ยงทางการเงิน
   - ปัจจัยที่มีผลต่อเครดิตสกอร์
   - SQL และการใช้ Window Functions
   - การรักษาความปลอดภัยของข้อมูล

## Concept ของการจัดการเครดิตสกอร์

การจัดการเครดิตสกอร์ (Credit Score Management) คือกระบวนการประเมินความน่าเชื่อถือทางการเงินของลูกค้าหรือองค์กร โดยทั่วไปมีองค์ประกอบหลักดังนี้:

1. **Credit Factors**: ปัจจัยที่ใช้ในการคำนวณเครดิตสกอร์ (เช่น ประวัติการชำระเงิน, ระดับหนี้, ระยะเวลาการเป็นลูกค้า)
2. **Scoring Models**: โมเดลหรือวิธีการที่ใช้ในการคำนวณคะแนน
3. **Score Ranges**: ช่วงคะแนนและการแปลความหมาย
4. **Risk Categories**: การจัดกลุ่มความเสี่ยงตามคะแนน
5. **Score History**: ประวัติการเปลี่ยนแปลงของคะแนน

### โครงสร้างพื้นฐานของ Credit Score Data Model

โมเดลข้อมูลสำหรับการจัดการเครดิตสกอร์ควรประกอบด้วยตารางหลักๆ ดังนี้:

1. **Customer Dimension**: ข้อมูลลูกค้า
2. **Credit Factors**: ปัจจัยที่ใช้ในการคำนวณคะแนน
3. **Scoring Models**: โมเดลการให้คะแนน
4. **Credit Scores**: คะแนนเครดิตที่คำนวณได้
5. **Score History**: ประวัติการเปลี่ยนแปลงของคะแนน
6. **Risk Categories**: การจัดกลุ่มความเสี่ยง

## Pre-Setup

ก่อนที่จะเริ่มสร้างโมเดล เราต้องเตรียมสภาพแวดล้อมให้พร้อม:

1. **สร้างฐานข้อมูล**:
```sql
CREATE DATABASE credit_scoring;
USE credit_scoring;
```

2. **สร้างตารางพื้นฐาน**:
```sql
-- ตารางข้อมูลลูกค้า
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_code VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    gender VARCHAR(10),
    marital_status VARCHAR(20),
    occupation VARCHAR(100),
    annual_income DECIMAL(15,2),
    registration_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ตารางข้อมูลการติดต่อ
CREATE TABLE customer_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    contact_type VARCHAR(20),
    contact_value VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- ตารางข้อมูลที่อยู่
CREATE TABLE customer_addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    address_type VARCHAR(20),
    address_line1 VARCHAR(100),
    address_line2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50),
    is_current BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

3. **เตรียม ETL Pipeline**:
   - สร้าง DAG ใน Airflow หรือ Job ใน ETL tool ที่ใช้
   - กำหนดตารางเวลาการรันเพื่ออัพเดทข้อมูลและคำนวณเครดิตสกอร์

## How to สร้าง Credit Score Data Model

ตอนนี้เรามาเริ่มสร้าง Data Model สำหรับการจัดการเครดิตสกอร์กัน:

### 1. สร้างตารางปัจจัยที่ใช้ในการคำนวณ

```sql
CREATE TABLE credit_factors (
    factor_id INT AUTO_INCREMENT PRIMARY KEY,
    factor_code VARCHAR(50) UNIQUE,
    factor_name VARCHAR(100),
    factor_description TEXT,
    factor_weight DECIMAL(5,2),
    min_value DECIMAL(10,2),
    max_value DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ตารางค่าปัจจัยของลูกค้า
CREATE TABLE customer_factor_values (
    value_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    factor_id INT,
    factor_value DECIMAL(10,2),
    calculation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (factor_id) REFERENCES credit_factors(factor_id)
);
```

### 2. สร้างตารางโมเดลการให้คะแนน

```sql
CREATE TABLE scoring_models (
    model_id INT AUTO_INCREMENT PRIMARY KEY,
    model_code VARCHAR(50) UNIQUE,
    model_name VARCHAR(100),
    model_description TEXT,
    min_score INT,
    max_score INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ตารางความสัมพันธ์ระหว่างโมเดลและปัจจัย
CREATE TABLE model_factors (
    model_factor_id INT AUTO_INCREMENT PRIMARY KEY,
    model_id INT,
    factor_id INT,
    weight DECIMAL(5,2),
    FOREIGN KEY (model_id) REFERENCES scoring_models(model_id),
    FOREIGN KEY (factor_id) REFERENCES credit_factors(factor_id)
);
```

### 3. สร้างตารางการจัดกลุ่มความเสี่ยง

```sql
CREATE TABLE risk_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    model_id INT,
    category_name VARCHAR(50),
    min_score INT,
    max_score INT,
    risk_level VARCHAR(20),
    description TEXT,
    FOREIGN KEY (model_id) REFERENCES scoring_models(model_id)
);
```

### 4. สร้างตารางคะแนนเครดิต

```sql
CREATE TABLE credit_scores (
    score_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    model_id INT,
    score INT,
    category_id INT,
    calculation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_current BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (model_id) REFERENCES scoring_models(model_id),
    FOREIGN KEY (category_id) REFERENCES risk_categories(category_id)
);

-- ตารางประวัติคะแนนเครดิต
CREATE TABLE score_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    model_id INT,
    previous_score INT,
    new_score INT,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    change_reason TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (model_id) REFERENCES scoring_models(model_id)
);
```

### 5. สร้างตารางข้อมูลทางการเงิน

```sql
CREATE TABLE financial_transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    transaction_date DATE,
    transaction_type VARCHAR(50),
    amount DECIMAL(15,2),
    status VARCHAR(20),
    due_date DATE,
    payment_date DATE,
    days_overdue INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- ตารางสรุปข้อมูลทางการเงิน
CREATE TABLE financial_summaries (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total_credit_limit DECIMAL(15,2),
    current_debt DECIMAL(15,2),
    available_credit DECIMAL(15,2),
    debt_to_income_ratio DECIMAL(5,2),
    payment_history_score INT,
    calculation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### 6. สร้าง View สำหรับการวิเคราะห์

```sql
CREATE VIEW customer_credit_profile AS
SELECT 
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    c.annual_income,
    fs.total_credit_limit,
    fs.current_debt,
    fs.available_credit,
    fs.debt_to_income_ratio,
    cs.score as credit_score,
    rc.category_name as risk_category,
    rc.risk_level,
    sm.model_name as scoring_model,
    cs.calculation_date as last_score_update
FROM 
    customers c
LEFT JOIN 
    financial_summaries fs ON c.customer_id = fs.customer_id AND fs.calculation_date = (
        SELECT MAX(calculation_date) FROM financial_summaries WHERE customer_id = c.customer_id
    )
LEFT JOIN 
    credit_scores cs ON c.customer_id = cs.customer_id AND cs.is_current = TRUE
LEFT JOIN 
    risk_categories rc ON cs.category_id = rc.category_id
LEFT JOIN 
    scoring_models sm ON cs.model_id = sm.model_id
WHERE 
    c.is_active = TRUE;
```

### 7. สร้าง Stored Procedure สำหรับการคำนวณเครดิตสกอร์

```sql
DELIMITER //
CREATE PROCEDURE calculate_credit_score(IN p_customer_id INT, IN p_model_id INT)
BEGIN
    DECLARE v_total_score INT DEFAULT 0;
    DECLARE v_category_id INT;
    DECLARE v_previous_score INT;
    DECLARE v_has_previous BOOLEAN DEFAULT FALSE;
    
    -- ตรวจสอบว่ามีคะแนนเก่าหรือไม่
    SELECT score, TRUE INTO v_previous_score, v_has_previous
    FROM credit_scores
    WHERE customer_id = p_customer_id AND model_id = p_model_id AND is_current = TRUE
    LIMIT 1;
    
    -- คำนวณคะแนนใหม่
    SELECT SUM(cfv.factor_value * mf.weight) INTO v_total_score
    FROM customer_factor_values cfv
    JOIN model_factors mf ON cfv.factor_id = mf.factor_id
    WHERE cfv.customer_id = p_customer_id AND mf.model_id = p_model_id;
    
    -- หมวดหมู่ความเสี่ยง
    SELECT category_id INTO v_category_id
    FROM risk_categories
    WHERE model_id = p_model_id AND v_total_score BETWEEN min_score AND max_score
    LIMIT 1;
    
    -- ปรับสถานะคะแนนเก่าให้ไม่เป็นปัจจุบัน
    IF v_has_previous THEN
        UPDATE credit_scores
        SET is_current = FALSE
        WHERE customer_id = p_customer_id AND model_id = p_model_id AND is_current = TRUE;
        
        -- บันทึกประวัติการเปลี่ยนแปลง
        INSERT INTO score_history (
            customer_id, model_id, previous_score, new_score, change_reason
        )
        VALUES (
            p_customer_id, p_model_id, v_previous_score, v_total_score, 'Periodic Update'
        );
    END IF;
    
    -- บันทึกคะแนนใหม่
    INSERT INTO credit_scores (
        customer_id, model_id, score, category_id, is_current
    )
    VALUES (
        p_customer_id, p_model_id, v_total_score, v_category_id, TRUE
    );
END //
DELIMITER ;
```

## Technic and Config

เพื่อให้ Credit Score Data Model ทำงานได้อย่างมีประสิทธิภาพ มีเทคนิคและการตั้งค่าที่ควรทำดังนี้:

### 1. การสร้างดัชนี (Index) เพื่อเพิ่มประสิทธิภาพ

```sql
-- สร้างดัชนีสำหรับการค้นหาคะแนนเครดิตปัจจุบัน
CREATE INDEX idx_credit_scores_current ON credit_scores(customer_id, model_id, is_current);

-- สร้างดัชนีสำหรับการค้นหาค่าปัจจัยล่าสุด
CREATE INDEX idx_factor_values_date ON customer_factor_values(customer_id, factor_id, calculation_date);

-- สร้างดัชนีสำหรับการค้นหาธุรกรรมทางการเงิน
CREATE INDEX idx_transactions_customer_date ON financial_transactions(customer_id, transaction_date);
```

### 2. การตั้งค่า Partitioning สำหรับตารางขนาดใหญ่

```sql
-- แบ่ง Partition ตารางธุรกรรมทางการเงินตามปีและเดือน
ALTER TABLE financial_transactions
PARTITION BY RANGE (YEAR(transaction_date) * 100 + MONTH(transaction_date)) (
    PARTITION p2023_01 VALUES LESS THAN (202302),
    PARTITION p2023_02 VALUES LESS THAN (202303),
    -- ... เพิ่มเติมตามต้องการ
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

### 3. การสร้าง Materialized View (หรือตาราง Summary) สำหรับการรายงาน

```sql
CREATE TABLE credit_score_distribution (
    distribution_id INT AUTO_INCREMENT PRIMARY KEY,
    calculation_date DATE,
    model_id INT,
    category_id INT,
    customer_count INT,
    average_score DECIMAL(10,2),
    min_score INT,
    max_score INT,
    FOREIGN KEY (model_id) REFERENCES scoring_models(model_id),
    FOREIGN KEY (category_id) REFERENCES risk_categories(category_id)
);

-- Procedure สำหรับอัพเดทข้อมูล Summary
DELIMITER //
CREATE PROCEDURE update_score_distribution(IN p_model_id INT)
BEGIN
    INSERT INTO credit_score_distribution (
        calculation_date, model_id, category_id,
        customer_count, average_score, min_score, max_score
    )
    SELECT 
        CURRENT_DATE as calculation_date,
        cs.model_id,
        cs.category_id,
        COUNT(DISTINCT cs.customer_id) as customer_count,
        AVG(cs.score) as average_score,
        MIN(cs.score) as min_score,
        MAX(cs.score) as max_score
    FROM 
        credit_scores cs
    WHERE 
        cs.model_id = p_model_id
        AND cs.is_current = TRUE
    GROUP BY 
        cs.model_id, cs.category_id;
END //
DELIMITER ;
```

### 4. การตั้งค่า Event Scheduler สำหรับการอัพเดทอัตโนมัติ

```sql
SET GLOBAL event_scheduler = ON;

DELIMITER //
CREATE EVENT event_monthly_credit_score_update
ON SCHEDULE EVERY 1 MONTH
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    DECLARE v_model_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE model_cursor CURSOR FOR 
        SELECT model_id FROM scoring_models WHERE is_active = TRUE;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN model_cursor;
    
    model_loop: LOOP
        FETCH model_cursor INTO v_model_id;
        IF done THEN
            LEAVE model_loop;
        END IF;
        
        -- อัพเดทค่าปัจจัย
        CALL update_customer_factors();
        
        -- คำนวณเครดิตสกอร์สำหรับลูกค้าทุกคน
        BEGIN
            DECLARE v_customer_id INT;
            DECLARE customer_done INT DEFAULT FALSE;
            DECLARE customer_cursor CURSOR FOR 
                SELECT customer_id FROM customers WHERE is_active = TRUE;
            DECLARE CONTINUE HANDLER FOR NOT FOUND SET customer_done = TRUE;
            
            OPEN customer_cursor;
            
            customer_loop: LOOP
                FETCH customer_cursor INTO v_customer_id;
                IF customer_done THEN
                    LEAVE customer_loop;
                END IF;
                
                CALL calculate_credit_score(v_customer_id, v_model_id);
            END LOOP;
            
            CLOSE customer_cursor;
        END;
        
        -- อัพเดทข้อมูล Summary
        CALL update_score_distribution(v_model_id);
    END LOOP;
    
    CLOSE model_cursor;
END //
DELIMITER ;
```

### 5. การรักษาความปลอดภัยของข้อมูล

```sql
-- สร้าง View ที่มีการปกปิดข้อมูลส่วนตัว
CREATE VIEW masked_customer_credit AS
SELECT 
    c.customer_id,
    CONCAT(LEFT(c.first_name, 1), '***') as masked_first_name,
    CONCAT(LEFT(c.last_name, 1), '***') as masked_last_name,
    YEAR(c.birth_date) as birth_year,
    c.gender,
    CASE 
        WHEN c.annual_income < 300000 THEN 'Low'
        WHEN c.annual_income < 600000 THEN 'Medium'
        ELSE 'High'
    END as income_bracket,
    cs.score as credit_score,
    rc.risk_level
FROM 
    customers c
LEFT JOIN 
    credit_scores cs ON c.customer_id = cs.customer_id AND cs.is_current = TRUE
LEFT JOIN 
    risk_categories rc ON cs.category_id = rc.category_id;

-- สร้าง Role สำหรับการเข้าถึงข้อมูล
CREATE ROLE credit_analyst, credit_admin, customer_service;

-- กำหนดสิทธิ์การเข้าถึง
GRANT SELECT ON masked_customer_credit TO customer_service;
GRANT SELECT ON customer_credit_profile TO credit_analyst;
GRANT ALL PRIVILEGES ON credit_scoring.* TO credit_admin;
```

## การนำไปประยุกต์ใช้งาน

Credit Score Data Model ที่เราสร้างขึ้นสามารถนำไปประยุกต์ใช้ได้หลากหลาย:

1. **การอนุมัติสินเชื่อ**: ใช้เครดิตสกอร์เพื่อประกอบการตัดสินใจในการอนุมัติสินเชื่อ
2. **การกำหนดอัตราดอกเบี้ย**: ปรับอัตราดอกเบี้ยตามระดับความเสี่ยงที่ประเมินจากเครดิตสกอร์
3. **การบริหารความเสี่ยง**: วิเคราะห์การกระจายตัวของลูกค้าตามระดับความเสี่ยง
4. **การติดตามลูกหนี้**: ระบุลูกค้าที่มีแนวโน้มจะมีปัญหาในการชำระหนี้
5. **การพัฒนาผลิตภัณฑ์**: ออกแบบผลิตภัณฑ์ทางการเงินที่เหมาะสมกับแต่ละกลุ่มลูกค้า

การมี Credit Score Data Model ที่มีประสิทธิภาพจะช่วยให้องค์กรสามารถประเมินความเสี่ยงได้อย่างแม่นยำ ลดความเสี่ยงในการให้สินเชื่อ และเพิ่มโอกาสในการสร้างกำไร

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจวิธีการสร้าง Credit Score Data Model และสามารถนำไปประยุกต์ใช้กับงานของคุณได้ครับ! ถ้ามีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถแชร์ในคอมเมนต์ด้านล่างได้เลยนะครับ
