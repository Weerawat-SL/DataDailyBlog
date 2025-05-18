---
layout: post
title: "แก้ปัญหาการจัดการโควต้าด้วย Quota Data Model"
author: "Weerawat"
categories: [Data Modeling]
tags: [Data Model, Sales Management, draft-A]
---

![Quota Management](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

# การจัดการโควต้าด้วย Quota Data Model

## Table of Contents
- [ปัญหาการจัดการโควต้าที่มือใหม่มักเจอ](#ปัญหาการจัดการโควต้าที่มือใหม่มักเจอ)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept ของการจัดการโควต้า](#concept-ของการจัดการโควต้า)
- [Pre-Setup](#pre-setup)
- [How to สร้าง Quota Data Model](#how-to-สร้าง-quota-data-model)
- [Technic and Config](#technic-and-config)
- [การนำไปประยุกต์ใช้งาน](#การนำไปประยุกต์ใช้งาน)

## ปัญหาการจัดการโควต้าที่มือใหม่มักเจอ

น้องๆ เคยเจอปัญหาแบบนี้ไหม? ทีมขายต้องการระบบจัดการโควต้าการขาย แต่เราไม่รู้จะออกแบบฐานข้อมูลยังไงให้รองรับการกำหนดโควต้าที่ซับซ้อน? หรือบางทีเราพยายามติดตามผลการทำงานเทียบกับโควต้า แต่ข้อมูลกระจัดกระจายและยากต่อการวิเคราะห์? หรือแม้แต่การพยายามปรับโควต้าระหว่างช่วงเวลา แต่ไม่มีโครงสร้างข้อมูลที่เหมาะสมรองรับ?

ปัญหาเหล่านี้เป็นเรื่องที่ Data Engineer มือใหม่มักจะเจอเมื่อต้องทำงานกับระบบจัดการโควต้า ไม่ว่าจะเป็นโควต้าการขาย โควต้าการผลิต หรือโควต้าการใช้ทรัพยากร การออกแบบ Data Model ที่ดีจะช่วยให้ระบบจัดการโควต้าทำงานได้อย่างมีประสิทธิภาพและยืดหยุ่น

วันนี้เราจะมาดูวิธีการออกแบบ Quota Data Model ที่จะช่วยแก้ปัญหาเหล่านี้กัน!

## Knowledge

การศึกษาเรื่อง Quota Data Model จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Hierarchical Data Modeling**: เรียนรู้การออกแบบโมเดลข้อมูลแบบลำดับชั้น
- **Time-based Data Management**: การจัดการข้อมูลตามช่วงเวลา
- **Advanced SQL**: การใช้คำสั่ง SQL ขั้นสูงในการคำนวณและติดตามผลงาน
- **Data Visualization**: การนำเสนอข้อมูลผลงานเทียบกับโควต้า
- **Business Rules Implementation**: การแปลงกฎทางธุรกิจให้เป็นโครงสร้างข้อมูล

## Pre-Requirement

ก่อนที่จะเริ่มสร้าง Quota Data Model เราจำเป็นต้องมีสิ่งต่อไปนี้:

1. **Database System**: MySQL, PostgreSQL หรือ SQL Server
2. **ETL Tool**: เช่น Apache Airflow, Talend หรือ Python scripts
3. **BI Tool**: Power BI, Tableau หรือ Looker สำหรับการแสดงผล
4. **ความเข้าใจพื้นฐานเกี่ยวกับ**:
   - โครงสร้างองค์กรและลำดับชั้นการบริหาร
   - กระบวนการกำหนดและติดตามโควต้า
   - SQL และการใช้ Window Functions
   - การทำงานกับข้อมูลตามช่วงเวลา

## Concept ของการจัดการโควต้า

การจัดการโควต้า (Quota Management) คือกระบวนการกำหนดเป้าหมายและติดตามผลการทำงานเทียบกับเป้าหมายที่กำหนด โดยทั่วไปมีองค์ประกอบหลักดังนี้:

1. **Quota Targets**: เป้าหมายที่กำหนด (เช่น ยอดขาย, จำนวนลูกค้าใหม่)
2. **Quota Period**: ช่วงเวลาของโควต้า (เช่น รายวัน, รายสัปดาห์, รายเดือน, รายไตรมาส, รายปี)
3. **Quota Hierarchy**: ลำดับชั้นของโควต้า (เช่น บริษัท, ภูมิภาค, ทีม, พนักงาน)
4. **Quota Attainment**: ผลงานที่ทำได้เทียบกับโควต้า
5. **Quota Adjustments**: การปรับเปลี่ยนโควต้าระหว่างช่วงเวลา

### โครงสร้างพื้นฐานของ Quota Data Model

โมเดลข้อมูลสำหรับการจัดการโควต้าควรประกอบด้วยตารางหลักๆ ดังนี้:

1. **Time Dimension**: มิติเวลา (วัน, สัปดาห์, เดือน, ไตรมาส, ปี)
2. **Organization Dimension**: โครงสร้างองค์กร (บริษัท, ภูมิภาค, ทีม, พนักงาน)
3. **Product Dimension**: ข้อมูลสินค้าหรือบริการ
4. **Quota Definition**: นิยามของโควต้า
5. **Quota Targets**: เป้าหมายของโควต้า
6. **Quota Attainment**: ผลงานที่ทำได้
7. **Quota Adjustments**: การปรับเปลี่ยนโควต้า

## Pre-Setup

ก่อนที่จะเริ่มสร้างโมเดล เราต้องเตรียมสภาพแวดล้อมให้พร้อม:

1. **สร้างฐานข้อมูล**:
```sql
CREATE DATABASE quota_management;
USE quota_management;
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
    fiscal_month INT,
    fiscal_quarter INT,
    fiscal_year INT
);

-- ตารางมิติองค์กร
CREATE TABLE dim_organization (
    org_id INT AUTO_INCREMENT PRIMARY KEY,
    org_code VARCHAR(50) UNIQUE,
    org_name VARCHAR(100),
    org_level VARCHAR(50),
    parent_org_id INT,
    manager_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (parent_org_id) REFERENCES dim_organization(org_id)
);

-- ตารางมิติพนักงาน
CREATE TABLE dim_employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    org_id INT,
    manager_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (org_id) REFERENCES dim_organization(org_id),
    FOREIGN KEY (manager_id) REFERENCES dim_employee(employee_id)
);

-- ตารางมิติสินค้า
CREATE TABLE dim_product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE,
    product_name VARCHAR(100),
    product_category VARCHAR(50),
    product_subcategory VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE
);
```

3. **เตรียม ETL Pipeline**:
   - สร้าง DAG ใน Airflow หรือ Job ใน ETL tool ที่ใช้
   - กำหนดตารางเวลาการรันเพื่ออัพเดทข้อมูลและคำนวณผลงาน

## How to สร้าง Quota Data Model

ตอนนี้เรามาเริ่มสร้าง Data Model สำหรับการจัดการโควต้ากัน:

### 1. สร้างตารางนิยามโควต้า

```sql
CREATE TABLE quota_types (
    quota_type_id INT AUTO_INCREMENT PRIMARY KEY,
    quota_type_name VARCHAR(100),
    quota_type_description TEXT,
    measurement_unit VARCHAR(50),
    is_cumulative BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ตารางช่วงเวลาของโควต้า
CREATE TABLE quota_periods (
    period_id INT AUTO_INCREMENT PRIMARY KEY,
    period_name VARCHAR(100),
    period_type ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'),
    period_start_date DATE,
    period_end_date DATE,
    fiscal_year INT,
    fiscal_quarter INT,
    fiscal_month INT,
    is_active BOOLEAN DEFAULT TRUE
);
```

### 2. สร้างตารางเป้าหมายโควต้า

```sql
CREATE TABLE quota_targets (
    target_id INT AUTO_INCREMENT PRIMARY KEY,
    quota_type_id INT,
    period_id INT,
    org_id INT,
    employee_id INT,
    product_id INT,
    target_value DECIMAL(15,2),
    target_currency VARCHAR(3) DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (quota_type_id) REFERENCES quota_types(quota_type_id),
    FOREIGN KEY (period_id) REFERENCES quota_periods(period_id),
    FOREIGN KEY (org_id) REFERENCES dim_organization(org_id),
    FOREIGN KEY (employee_id) REFERENCES dim_employee(employee_id),
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (created_by) REFERENCES dim_employee(employee_id)
);

-- ตารางการกระจายโควต้า
CREATE TABLE quota_distribution (
    distribution_id INT AUTO_INCREMENT PRIMARY KEY,
    target_id INT,
    time_id INT,
    distribution_value DECIMAL(15,2),
    distribution_percentage DECIMAL(5,2),
    FOREIGN KEY (target_id) REFERENCES quota_targets(target_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id)
);
```

### 3. สร้างตารางผลงานที่ทำได้

```sql
CREATE TABLE quota_attainment (
    attainment_id INT AUTO_INCREMENT PRIMARY KEY,
    quota_type_id INT,
    time_id INT,
    org_id INT,
    employee_id INT,
    product_id INT,
    actual_value DECIMAL(15,2),
    actual_currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quota_type_id) REFERENCES quota_types(quota_type_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    FOREIGN KEY (org_id) REFERENCES dim_organization(org_id),
    FOREIGN KEY (employee_id) REFERENCES dim_employee(employee_id),
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id)
);
```

### 4. สร้างตารางการปรับเปลี่ยนโควต้า

```sql
CREATE TABLE quota_adjustments (
    adjustment_id INT AUTO_INCREMENT PRIMARY KEY,
    target_id INT,
    adjustment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    previous_value DECIMAL(15,2),
    new_value DECIMAL(15,2),
    adjustment_reason TEXT,
    adjusted_by INT,
    FOREIGN KEY (target_id) REFERENCES quota_targets(target_id),
    FOREIGN KEY (adjusted_by) REFERENCES dim_employee(employee_id)
);
```

### 5. สร้าง View สำหรับการวิเคราะห์

```sql
CREATE VIEW quota_performance AS
SELECT 
    qp.period_name,
    qp.period_type,
    qp.period_start_date,
    qp.period_end_date,
    qt.quota_type_name,
    o.org_name,
    o.org_level,
    CONCAT(e.first_name, ' ', e.last_name) as employee_name,
    p.product_name,
    p.product_category,
    qtar.target_value,
    SUM(qa.actual_value) as actual_value,
    (SUM(qa.actual_value) / qtar.target_value) * 100 as achievement_percentage,
    CASE 
        WHEN (SUM(qa.actual_value) / qtar.target_value) * 100 >= 100 THEN 'Achieved'
        WHEN (SUM(qa.actual_value) / qtar.target_value) * 100 >= 80 THEN 'Near Target'
        ELSE 'Below Target'
    END as status
FROM 
    quota_targets qtar
JOIN 
    quota_types qt ON qtar.quota_type_id = qt.quota_type_id
JOIN 
    quota_periods qp ON qtar.period_id = qp.period_id
JOIN 
    dim_organization o ON qtar.org_id = o.org_id
JOIN 
    dim_employee e ON qtar.employee_id = e.employee_id
JOIN 
    dim_product p ON qtar.product_id = p.product_id
LEFT JOIN 
    quota_attainment qa ON qtar.quota_type_id = qa.quota_type_id 
    AND qtar.org_id = qa.org_id 
    AND qtar.employee_id = qa.employee_id 
    AND qtar.product_id = qa.product_id
JOIN 
    dim_time t ON qa.time_id = t.time_id
WHERE 
    t.calendar_date BETWEEN qp.period_start_date AND qp.period_end_date
    AND qtar.is_active = TRUE
GROUP BY 
    qp.period_name, qp.period_type, qp.period_start_date, qp.period_end_date,
    qt.quota_type_name, o.org_name, o.org_level, employee_name,
    p.product_name, p.product_category, qtar.target_value;
```

### 6. สร้าง Stored Procedure สำหรับการคำนวณผลงาน

```sql
DELIMITER //
CREATE PROCEDURE calculate_quota_attainment(IN p_period_id INT)
BEGIN
    DECLARE v_start_date DATE;
    DECLARE v_end_date DATE;
    
    -- หาช่วงเวลาของโควต้า
    SELECT period_start_date, period_end_date INTO v_start_date, v_end_date
    FROM quota_periods
    WHERE period_id = p_period_id;
    
    -- ลบข้อมูลเก่า
    DELETE FROM quota_attainment
    WHERE time_id IN (
        SELECT time_id FROM dim_time
        WHERE calendar_date BETWEEN v_start_date AND v_end_date
    );
    
    -- สมมติว่าเรามีตาราง sales_transactions ที่เก็บข้อมูลการขาย
    -- เราจะคำนวณผลงานจากข้อมูลการขายและบันทึกลงในตาราง quota_attainment
    
    -- ตัวอย่างการคำนวณผลงานจากข้อมูลการขาย
    INSERT INTO quota_attainment (
        quota_type_id, time_id, org_id, employee_id, product_id, actual_value
    )
    SELECT 
        1 as quota_type_id, -- สมมติว่า 1 คือ Sales Revenue
        t.time_id,
        s.org_id,
        s.employee_id,
        s.product_id,
        SUM(s.sales_amount) as actual_value
    FROM 
        sales_transactions s
    JOIN 
        dim_time t ON s.transaction_date = t.calendar_date
    WHERE 
        t.calendar_date BETWEEN v_start_date AND v_end_date
    GROUP BY 
        t.time_id, s.org_id, s.employee_id, s.product_id;
END //
DELIMITER ;
```

## Technic and Config

เพื่อให้ Quota Data Model ทำงานได้อย่างมีประสิทธิภาพ มีเทคนิคและการตั้งค่าที่ควรทำดังนี้:

### 1. การสร้างดัชนี (Index) เพื่อเพิ่มประสิทธิภาพ

```sql
-- สร้างดัชนีสำหรับการค้นหาเป้าหมายโควต้า
CREATE INDEX idx_quota_targets_period ON quota_targets(period_id);
CREATE INDEX idx_quota_targets_org_employee ON quota_targets(org_id, employee_id);

-- สร้างดัชนีสำหรับการค้นหาผลงาน
CREATE INDEX idx_quota_attainment_time ON quota_attainment(time_id);
CREATE INDEX idx_quota_attainment_org_employee ON quota_attainment(org_id, employee_id);

-- สร้างดัชนีสำหรับการค้นหาตามช่วงเวลา
CREATE INDEX idx_time_calendar_date ON dim_time(calendar_date);
CREATE INDEX idx_quota_periods_dates ON quota_periods(period_start_date, period_end_date);
```

### 2. การตั้งค่า Partitioning สำหรับตารางขนาดใหญ่

```sql
-- แบ่ง Partition ตารางผลงานตามปีและเดือน
ALTER TABLE quota_attainment
PARTITION BY RANGE (YEAR(created_at) * 100 + MONTH(created_at)) (
    PARTITION p2023_01 VALUES LESS THAN (202302),
    PARTITION p2023_02 VALUES LESS THAN (202303),
    -- ... เพิ่มเติมตามต้องการ
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

### 3. การสร้าง Materialized View (หรือตาราง Summary) สำหรับการรายงาน

```sql
CREATE TABLE quota_performance_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    period_id INT,
    quota_type_id INT,
    org_id INT,
    total_target DECIMAL(15,2),
    total_actual DECIMAL(15,2),
    achievement_percentage DECIMAL(5,2),
    employees_above_target INT,
    employees_below_target INT,
    FOREIGN KEY (period_id) REFERENCES quota_periods(period_id),
    FOREIGN KEY (quota_type_id) REFERENCES quota_types(quota_type_id),
    FOREIGN KEY (org_id) REFERENCES dim_organization(org_id)
);

-- Procedure สำหรับอัพเดทข้อมูล Summary
DELIMITER //
CREATE PROCEDURE update_quota_performance_summary(IN p_period_id INT)
BEGIN
    -- ลบข้อมูลเก่า
    DELETE FROM quota_performance_summary WHERE period_id = p_period_id;
    
    -- คำนวณและบันทึกข้อมูล Summary ใหม่
    INSERT INTO quota_performance_summary (
        period_id, quota_type_id, org_id,
        total_target, total_actual, achievement_percentage,
        employees_above_target, employees_below_target
    )
    SELECT 
        qtar.period_id,
        qtar.quota_type_id,
        qtar.org_id,
        SUM(qtar.target_value) as total_target,
        SUM(qa_sum.actual_value) as total_actual,
        (SUM(qa_sum.actual_value) / SUM(qtar.target_value)) * 100 as achievement_percentage,
        SUM(CASE WHEN qa_sum.actual_value >= qtar.target_value THEN 1 ELSE 0 END) as employees_above_target,
        SUM(CASE WHEN qa_sum.actual_value < qtar.target_value THEN 1 ELSE 0 END) as employees_below_target
    FROM 
        quota_targets qtar
    JOIN 
        quota_periods qp ON qtar.period_id = qp.period_id
    LEFT JOIN (
        SELECT 
            qa.quota_type_id,
            qa.org_id,
            qa.employee_id,
            qa.product_id,
            SUM(qa.actual_value) as actual_value
        FROM 
            quota_attainment qa
        JOIN 
            dim_time t ON qa.time_id = t.time_id
        JOIN 
            quota_periods qp ON t.calendar_date BETWEEN qp.period_start_date AND qp.period_end_date
        WHERE 
            qp.period_id = p_period_id
        GROUP BY 
            qa.quota_type_id, qa.org_id, qa.employee_id, qa.product_id
    ) qa_sum ON qtar.quota_type_id = qa_sum.quota_type_id 
        AND qtar.org_id = qa_sum.org_id 
        AND qtar.employee_id = qa_sum.employee_id 
        AND qtar.product_id = qa_sum.product_id
    WHERE 
        qtar.period_id = p_period_id
        AND qtar.is_active = TRUE
    GROUP BY 
        qtar.period_id, qtar.quota_type_id, qtar.org_id;
END //
DELIMITER ;
```

### 4. การตั้งค่า Event Scheduler สำหรับการอัพเดทอัตโนมัติ

```sql
SET GLOBAL event_scheduler = ON;

DELIMITER //
CREATE EVENT event_daily_quota_calculation
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    -- หา period_id ของช่วงเวลาปัจจุบัน
    DECLARE v_period_id INT;
    
    SELECT period_id INTO v_period_id
    FROM quota_periods
    WHERE CURRENT_DATE BETWEEN period_start_date AND period_end_date
    LIMIT 1;
    
    IF v_period_id IS NOT NULL THEN
        CALL calculate_quota_attainment(v_period_id);
        CALL update_quota_performance_summary(v_period_id);
    END IF;
END //
DELIMITER ;
```

## การนำไปประยุกต์ใช้งาน

Quota Data Model ที่เราสร้างขึ้นสามารถนำไปประยุกต์ใช้ได้หลากหลาย:

1. **การบริหารทีมขาย**: ติดตามผลงานของพนักงานขายเทียบกับเป้าหมายที่กำหนด
2. **การจ่ายค่าคอมมิชชัน**: คำนวณค่าคอมมิชชันตามผลงานที่ทำได้เทียบกับโควต้า
3. **การวางแผนธุรกิจ**: ใช้ข้อมูลผลงานเทียบกับโควต้าเพื่อปรับแผนธุรกิจ
4. **การจัดสรรทรัพยากร**: จัดสรรทรัพยากรให้กับทีมหรือภูมิภาคตามผลงานที่ทำได้
5. **การวิเคราะห์แนวโน้ม**: วิเคราะห์แนวโน้มของผลงานเทียบกับโควต้าเพื่อปรับกลยุทธ์

การมี Quota Data Model ที่มีประสิทธิภาพจะช่วยให้องค์กรสามารถติดตามและวิเคราะห์ผลงานได้อย่างแม่นยำ นำไปสู่การตัดสินใจที่ดีขึ้นและการเพิ่มประสิทธิภาพของทีมงาน

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจวิธีการสร้าง Quota Data Model และสามารถนำไปประยุกต์ใช้กับงานของคุณได้ครับ! ถ้ามีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถแชร์ในคอมเมนต์ด้านล่างได้เลยนะครับ
