---
layout: post
title: "แก้ปัญหาการจัดสรรสินค้าด้วย Allocate Supply Data Model"
author: "Weerawat"
categories: [Data Modeling]
tags: [Data Model, Supply Chain, draft-A]
---

![Supply Allocation](https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

# การจัดสรรสินค้าด้วย Allocate Supply Data Model

## Table of Contents
- [ปัญหาการจัดสรรสินค้าที่มือใหม่มักเจอ](#ปัญหาการจัดสรรสินค้าที่มือใหม่มักเจอ)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept ของการจัดสรรสินค้า](#concept-ของการจัดสรรสินค้า)
- [Pre-Setup](#pre-setup)
- [How to สร้าง Allocate Supply Data Model](#how-to-สร้าง-allocate-supply-data-model)
- [Technic and Config](#technic-and-config)
- [การนำไปประยุกต์ใช้งาน](#การนำไปประยุกต์ใช้งาน)

## ปัญหาการจัดสรรสินค้าที่มือใหม่มักเจอ

น้องๆ เคยเจอปัญหาแบบนี้ไหม? ทีมขายต้องการข้อมูลว่าสินค้าที่มีอยู่จำกัดควรจัดสรรให้ลูกค้ารายไหนบ้าง แต่เราไม่รู้จะเริ่มออกแบบฐานข้อมูลยังไง? หรือบางทีเราพยายามสร้างระบบจัดสรรสินค้าแบบอัตโนมัติ แต่กลับพบว่าโมเดลข้อมูลที่มีอยู่ไม่รองรับกฎการจัดสรรที่ซับซ้อน? หรือแม้แต่การพยายามติดตามประวัติการจัดสรรสินค้า แต่ข้อมูลกระจัดกระจายอยู่หลายที่?

ปัญหาเหล่านี้เป็นเรื่องที่ Data Engineer มือใหม่มักจะเจอเมื่อต้องทำงานกับระบบ Supply Chain โดยเฉพาะในช่วงที่สินค้าขาดตลาดหรือมีข้อจำกัดในการผลิต การออกแบบ Data Model ที่ดีจะช่วยให้การจัดสรรสินค้าเป็นไปอย่างมีประสิทธิภาพและเป็นธรรม

วันนี้เราจะมาดูวิธีการออกแบบ Allocate Supply Data Model ที่จะช่วยแก้ปัญหาเหล่านี้กัน!

## Knowledge

การศึกษาเรื่อง Allocate Supply Data Model จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Supply Chain Data Modeling**: เรียนรู้การออกแบบโครงสร้างข้อมูลสำหรับระบบ Supply Chain
- **Business Rules Engine**: การสร้างกฎการจัดสรรที่ซับซ้อนและยืดหยุ่น
- **Advanced SQL**: การใช้คำสั่ง SQL ขั้นสูงในการคำนวณและจัดสรรทรัพยากร
- **Optimization Algorithms**: การประยุกต์ใช้อัลกอริทึมการหาค่าเหมาะสมที่สุด
- **Data Integration**: การเชื่อมโยงข้อมูลจากหลายระบบเพื่อการตัดสินใจ

## Pre-Requirement

ก่อนที่จะเริ่มสร้าง Allocate Supply Data Model เราจำเป็นต้องมีสิ่งต่อไปนี้:

1. **Database System**: MySQL, PostgreSQL หรือ SQL Server
2. **ETL Tool**: เช่น Apache Airflow, Talend หรือ Python scripts
3. **BI Tool**: Power BI, Tableau หรือ Looker สำหรับการแสดงผล
4. **ความเข้าใจพื้นฐานเกี่ยวกับ**:
   - Supply Chain Management
   - Inventory Management
   - SQL และการใช้ Window Functions
   - การทำงานของ Stored Procedures

## Concept ของการจัดสรรสินค้า

การจัดสรรสินค้า (Supply Allocation) คือกระบวนการกำหนดว่าสินค้าหรือทรัพยากรที่มีอยู่จำกัดควรถูกจัดสรรให้กับลูกค้าหรือช่องทางการขายใดบ้าง โดยทั่วไปมักใช้ปัจจัยต่อไปนี้:

1. **Customer Priority**: ลำดับความสำคัญของลูกค้า (เช่น ตามเกรดลูกค้า A, B, C)
2. **Historical Demand**: ความต้องการในอดีต
3. **Contractual Obligations**: ข้อผูกพันตามสัญญา
4. **Profitability**: กำไรที่คาดว่าจะได้รับ
5. **Fair Share**: การจัดสรรแบบเป็นธรรมตามสัดส่วน

### โครงสร้างพื้นฐานของ Allocate Supply Data Model

โมเดลข้อมูลสำหรับการจัดสรรสินค้าควรประกอบด้วยตารางหลักๆ ดังนี้:

1. **Product Dimension**: ข้อมูลสินค้า
2. **Customer Dimension**: ข้อมูลลูกค้า
3. **Inventory**: ข้อมูลสินค้าคงคลัง
4. **Demand**: ความต้องการสินค้า
5. **Allocation Rules**: กฎการจัดสรรสินค้า
6. **Allocation Results**: ผลลัพธ์การจัดสรร
7. **Allocation History**: ประวัติการจัดสรร

## Pre-Setup

ก่อนที่จะเริ่มสร้างโมเดล เราต้องเตรียมสภาพแวดล้อมให้พร้อม:

1. **สร้างฐานข้อมูล**:
```sql
CREATE DATABASE supply_chain;
USE supply_chain;
```

2. **สร้างตารางพื้นฐาน**:
```sql
-- ตารางข้อมูลสินค้า
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    product_category VARCHAR(50),
    unit_cost DECIMAL(10,2),
    unit_price DECIMAL(10,2)
);

-- ตารางข้อมูลลูกค้า
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_grade CHAR(1),
    region VARCHAR(50)
);

-- ตารางสินค้าคงคลัง
CREATE TABLE inventory (
    inventory_id INT PRIMARY KEY,
    product_id INT,
    warehouse_id INT,
    quantity INT,
    available_date DATE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- ตารางความต้องการสินค้า
CREATE TABLE demand (
    demand_id INT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    request_date DATE,
    required_date DATE,
    priority INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

3. **เตรียม ETL Pipeline**:
   - สร้าง DAG ใน Airflow หรือ Job ใน ETL tool ที่ใช้
   - กำหนดตารางเวลาการรันเพื่ออัพเดทข้อมูลการจัดสรร (เช่น รายวัน)

## How to สร้าง Allocate Supply Data Model

ตอนนี้เรามาเริ่มสร้าง Data Model สำหรับการจัดสรรสินค้ากัน:

### 1. สร้างตารางกฎการจัดสรร

```sql
CREATE TABLE allocation_rules (
    rule_id INT PRIMARY KEY,
    rule_name VARCHAR(100),
    description TEXT,
    product_category VARCHAR(50),
    customer_grade CHAR(1),
    priority INT,
    allocation_method ENUM('FIFO', 'FAIR_SHARE', 'PRIORITY', 'CUSTOM'),
    allocation_percentage DECIMAL(5,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ตารางสำหรับกฎการจัดสรรแบบกำหนดเอง
CREATE TABLE custom_allocation_rules (
    custom_rule_id INT PRIMARY KEY,
    rule_id INT,
    sql_condition TEXT,
    allocation_formula TEXT,
    FOREIGN KEY (rule_id) REFERENCES allocation_rules(rule_id)
);
```

### 2. สร้างตารางผลลัพธ์การจัดสรร

```sql
CREATE TABLE allocation_results (
    allocation_id INT AUTO_INCREMENT PRIMARY KEY,
    demand_id INT,
    inventory_id INT,
    allocated_quantity INT,
    allocation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rule_id INT,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED'),
    FOREIGN KEY (demand_id) REFERENCES demand(demand_id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id),
    FOREIGN KEY (rule_id) REFERENCES allocation_rules(rule_id)
);

CREATE TABLE allocation_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    allocation_id INT,
    previous_quantity INT,
    new_quantity INT,
    change_reason VARCHAR(200),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(50),
    FOREIGN KEY (allocation_id) REFERENCES allocation_results(allocation_id)
);
```

### 3. สร้าง View สำหรับการวิเคราะห์

```sql
CREATE VIEW allocation_summary AS
SELECT 
    p.product_id,
    p.product_name,
    p.product_category,
    c.customer_id,
    c.customer_name,
    c.customer_grade,
    SUM(d.quantity) as total_demand,
    SUM(ar.allocated_quantity) as total_allocated,
    SUM(d.quantity) - SUM(ar.allocated_quantity) as unfulfilled_demand,
    (SUM(ar.allocated_quantity) / SUM(d.quantity)) * 100 as fulfillment_rate
FROM 
    products p
JOIN 
    demand d ON p.product_id = d.product_id
JOIN 
    customers c ON d.customer_id = c.customer_id
LEFT JOIN 
    allocation_results ar ON d.demand_id = ar.demand_id
GROUP BY 
    p.product_id, p.product_name, p.product_category, 
    c.customer_id, c.customer_name, c.customer_grade;
```

### 4. สร้าง Stored Procedure สำหรับการจัดสรรสินค้า

```sql
DELIMITER //
CREATE PROCEDURE allocate_supply()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_product_id, v_rule_id INT;
    DECLARE v_product_cursor CURSOR FOR 
        SELECT DISTINCT product_id 
        FROM demand 
        WHERE product_id IN (SELECT product_id FROM inventory WHERE quantity > 0);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- เริ่มการจัดสรรสินค้า
    OPEN v_product_cursor;
    
    product_loop: LOOP
        FETCH v_product_cursor INTO v_product_id;
        IF done THEN
            LEAVE product_loop;
        END IF;
        
        -- หากฎการจัดสรรที่เหมาะสมสำหรับสินค้านี้
        SELECT rule_id INTO v_rule_id
        FROM allocation_rules ar
        JOIN products p ON ar.product_category = p.product_category
        WHERE p.product_id = v_product_id AND ar.is_active = TRUE
        ORDER BY ar.priority
        LIMIT 1;
        
        -- จัดสรรตามวิธีที่กำหนดในกฎ
        IF v_rule_id IS NOT NULL THEN
            -- ตรวจสอบวิธีการจัดสรร
            CASE (SELECT allocation_method FROM allocation_rules WHERE rule_id = v_rule_id)
                WHEN 'FIFO' THEN
                    CALL allocate_fifo(v_product_id, v_rule_id);
                WHEN 'FAIR_SHARE' THEN
                    CALL allocate_fair_share(v_product_id, v_rule_id);
                WHEN 'PRIORITY' THEN
                    CALL allocate_priority(v_product_id, v_rule_id);
                WHEN 'CUSTOM' THEN
                    CALL allocate_custom(v_product_id, v_rule_id);
            END CASE;
        END IF;
    END LOOP;
    
    CLOSE v_product_cursor;
END //
DELIMITER ;
```

### 5. สร้าง Stored Procedure สำหรับวิธีการจัดสรรแบบ FIFO

```sql
DELIMITER //
CREATE PROCEDURE allocate_fifo(IN p_product_id INT, IN p_rule_id INT)
BEGIN
    DECLARE v_inventory_id, v_demand_id, v_available_qty, v_requested_qty, v_to_allocate INT;
    DECLARE done INT DEFAULT FALSE;
    
    -- Cursor สำหรับสินค้าคงคลังเรียงตามวันที่รับเข้า (FIFO)
    DECLARE inventory_cursor CURSOR FOR 
        SELECT inventory_id, quantity 
        FROM inventory 
        WHERE product_id = p_product_id AND quantity > 0
        ORDER BY available_date;
        
    -- Cursor สำหรับความต้องการเรียงตามวันที่ร้องขอ (FIFO)
    DECLARE demand_cursor CURSOR FOR 
        SELECT demand_id, quantity 
        FROM demand 
        WHERE product_id = p_product_id 
          AND demand_id NOT IN (
              SELECT demand_id FROM allocation_results 
              GROUP BY demand_id 
              HAVING SUM(allocated_quantity) >= quantity
          )
        ORDER BY request_date;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN inventory_cursor;
    
    inventory_loop: LOOP
        FETCH inventory_cursor INTO v_inventory_id, v_available_qty;
        IF done OR v_available_qty <= 0 THEN
            LEAVE inventory_loop;
        END IF;
        
        SET done = FALSE;
        OPEN demand_cursor;
        
        demand_loop: LOOP
            FETCH demand_cursor INTO v_demand_id, v_requested_qty;
            IF done THEN
                LEAVE demand_loop;
            END IF;
            
            -- คำนวณจำนวนที่จะจัดสรร
            SET v_to_allocate = LEAST(v_available_qty, v_requested_qty);
            
            IF v_to_allocate > 0 THEN
                -- บันทึกผลการจัดสรร
                INSERT INTO allocation_results 
                    (demand_id, inventory_id, allocated_quantity, rule_id, status)
                VALUES 
                    (v_demand_id, v_inventory_id, v_to_allocate, p_rule_id, 'PENDING');
                    
                -- อัพเดทจำนวนคงเหลือ
                UPDATE inventory SET quantity = quantity - v_to_allocate 
                WHERE inventory_id = v_inventory_id;
                
                SET v_available_qty = v_available_qty - v_to_allocate;
                
                IF v_available_qty <= 0 THEN
                    LEAVE demand_loop;
                END IF;
            END IF;
        END LOOP;
        
        CLOSE demand_cursor;
    END LOOP;
    
    CLOSE inventory_cursor;
END //
DELIMITER ;
```

## Technic and Config

เพื่อให้ Allocate Supply Data Model ทำงานได้อย่างมีประสิทธิภาพ มีเทคนิคและการตั้งค่าที่ควรทำดังนี้:

### 1. การสร้างดัชนี (Index) เพื่อเพิ่มประสิทธิภาพ

```sql
-- สร้างดัชนีสำหรับการค้นหาความต้องการที่ยังไม่ได้รับการจัดสรร
CREATE INDEX idx_demand_product ON demand(product_id, request_date);

-- สร้างดัชนีสำหรับการค้นหาสินค้าคงคลังที่พร้อมจัดสรร
CREATE INDEX idx_inventory_available ON inventory(product_id, quantity, available_date);

-- สร้างดัชนีสำหรับการค้นหาผลการจัดสรร
CREATE INDEX idx_allocation_demand ON allocation_results(demand_id, allocated_quantity);
```

### 2. การตั้งค่า Partitioning สำหรับตารางขนาดใหญ่

```sql
-- แบ่ง Partition ตารางผลการจัดสรรตามเดือน
ALTER TABLE allocation_results
PARTITION BY RANGE (MONTH(allocation_date)) (
    PARTITION p1 VALUES LESS THAN (2),
    PARTITION p2 VALUES LESS THAN (3),
    PARTITION p3 VALUES LESS THAN (4),
    PARTITION p4 VALUES LESS THAN (5),
    PARTITION p5 VALUES LESS THAN (6),
    PARTITION p6 VALUES LESS THAN (7),
    PARTITION p7 VALUES LESS THAN (8),
    PARTITION p8 VALUES LESS THAN (9),
    PARTITION p9 VALUES LESS THAN (10),
    PARTITION p10 VALUES LESS THAN (11),
    PARTITION p11 VALUES LESS THAN (12),
    PARTITION p12 VALUES LESS THAN (13)
);
```

### 3. การสร้าง Materialized View (หรือตาราง Summary) สำหรับการรายงาน

```sql
CREATE TABLE allocation_daily_summary (
    summary_date DATE,
    product_id INT,
    product_category VARCHAR(50),
    total_demand INT,
    total_allocated INT,
    fulfillment_rate DECIMAL(5,2),
    PRIMARY KEY (summary_date, product_id)
);

-- Procedure สำหรับอัพเดทข้อมูล Summary
DELIMITER //
CREATE PROCEDURE update_allocation_summary()
BEGIN
    INSERT INTO allocation_daily_summary
    SELECT 
        CURRENT_DATE as summary_date,
        p.product_id,
        p.product_category,
        SUM(d.quantity) as total_demand,
        SUM(IFNULL(ar.allocated_quantity, 0)) as total_allocated,
        CASE 
            WHEN SUM(d.quantity) > 0 THEN (SUM(IFNULL(ar.allocated_quantity, 0)) / SUM(d.quantity)) * 100
            ELSE 0
        END as fulfillment_rate
    FROM 
        products p
    JOIN 
        demand d ON p.product_id = d.product_id
    LEFT JOIN 
        allocation_results ar ON d.demand_id = ar.demand_id
    GROUP BY 
        p.product_id, p.product_category;
END //
DELIMITER ;
```

### 4. การตั้งค่า Event Scheduler สำหรับการอัพเดทอัตโนมัติ

```sql
SET GLOBAL event_scheduler = ON;

DELIMITER //
CREATE EVENT event_daily_allocation
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    CALL allocate_supply();
    CALL update_allocation_summary();
END //
DELIMITER ;
```

## การนำไปประยุกต์ใช้งาน

Allocate Supply Data Model ที่เราสร้างขึ้นสามารถนำไปประยุกต์ใช้ได้หลากหลาย:

1. **การจัดการในช่วงสินค้าขาดตลาด**: ช่วยให้การจัดสรรสินค้าที่มีจำกัดเป็นไปอย่างเป็นธรรมและมีประสิทธิภาพ
2. **การวางแผนการผลิต**: ใช้ข้อมูลความต้องการที่ไม่ได้รับการจัดสรรเพื่อวางแผนการผลิตในอนาคต
3. **การบริหารความสัมพันธ์กับลูกค้า**: แจ้งลูกค้าล่วงหน้าเกี่ยวกับสถานะการจัดสรรสินค้า
4. **การวิเคราะห์ประสิทธิภาพ**: ติดตามอัตราการตอบสนองความต้องการของลูกค้าในแต่ละกลุ่ม
5. **การปรับปรุงกระบวนการ**: ระบุจุดคอขวดในกระบวนการจัดสรรและปรับปรุงให้ดีขึ้น

การมี Allocate Supply Data Model ที่ยืดหยุ่นและมีประสิทธิภาพจะช่วยให้องค์กรสามารถรับมือกับสถานการณ์ที่สินค้ามีจำกัดได้อย่างมีประสิทธิภาพ และสร้างความพึงพอใจให้กับลูกค้าแม้ในช่วงที่มีข้อจำกัดด้านสินค้า

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจวิธีการสร้าง Allocate Supply Data Model และสามารถนำไปประยุกต์ใช้กับงานของคุณได้ครับ! ถ้ามีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถแชร์ในคอมเมนต์ด้านล่างได้เลยนะครับ
