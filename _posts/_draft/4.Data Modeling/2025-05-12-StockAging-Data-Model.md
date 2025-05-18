---
layout: post
title: "การออกแบบ Data Model สำหรับวิเคราะห์อายุสินค้าคงคลัง (Stock Aging)"
author: "Weerawat"
categories: [Data Modeling]
tags: [Data-Modeling, Warehouse, Analytics, draft-A]
---

# การออกแบบ Data Model สำหรับวิเคราะห์อายุสินค้าคงคลัง (Stock Aging)

## Table of Contents
- [การออกแบบ Data Model สำหรับวิเคราะห์อายุสินค้าคงคลัง (Stock Aging)](#การออกแบบ-data-model-สำหรับวิเคราะห์อายุสินค้าคงคลัง-stock-aging)
  - [Table of Contents](#table-of-contents)
  - [ปัญหาที่มักพบในการวิเคราะห์อายุสินค้าคงคลัง](#ปัญหาที่มักพบในการวิเคราะห์อายุสินค้าคงคลัง)
  - [ความรู้ที่จะได้รับ](#ความรู้ที่จะได้รับ)
  - [สิ่งที่ต้องเตรียมก่อนเริ่มต้น](#สิ่งที่ต้องเตรียมก่อนเริ่มต้น)
  - [แนวคิดพื้นฐานของ Stock Aging](#แนวคิดพื้นฐานของ-stock-aging)
    - [Stock Aging คืออะไร?](#stock-aging-คืออะไร)
    - [ทำไมต้องวิเคราะห์ Stock Aging?](#ทำไมต้องวิเคราะห์-stock-aging)
    - [วิธีการคำนวณ Stock Aging](#วิธีการคำนวณ-stock-aging)
  - [การออกแบบ Data Model](#การออกแบบ-data-model)
    - [Dimension Tables](#dimension-tables)
    - [Fact Tables](#fact-tables)
  - [การสร้างและเตรียมข้อมูล](#การสร้างและเตรียมข้อมูล)
    - [1. สร้างข้อมูลใน Dimension Tables](#1-สร้างข้อมูลใน-dimension-tables)
    - [2. สร้างข้อมูลใน Fact Tables](#2-สร้างข้อมูลใน-fact-tables)
  - [การวิเคราะห์และแสดงผล](#การวิเคราะห์และแสดงผล)
    - [1. คำนวณอายุสินค้าคงคลังแบบ FIFO](#1-คำนวณอายุสินค้าคงคลังแบบ-fifo)
    - [2. สร้าง View สำหรับรายงาน Stock Aging](#2-สร้าง-view-สำหรับรายงาน-stock-aging)
  - [เทคนิคและการปรับแต่ง](#เทคนิคและการปรับแต่ง)
    - [1. สร้าง Indexed View เพื่อเพิ่มประสิทธิภาพ](#1-สร้าง-indexed-view-เพื่อเพิ่มประสิทธิภาพ)
    - [2. สร้าง Materialized View (สำหรับ PostgreSQL)](#2-สร้าง-materialized-view-สำหรับ-postgresql)
    - [3. การแสดงผลด้วย Power BI หรือ Tableau](#3-การแสดงผลด้วย-power-bi-หรือ-tableau)

## ปัญหาที่มักพบในการวิเคราะห์อายุสินค้าคงคลัง

น้องๆ เคยเจอปัญหาแบบนี้มั้ย? ทีมคลังสินค้าต้องการรายงานอายุของสินค้าคงคลัง แต่ข้อมูลที่มีอยู่กระจัดกระจาย ทั้งในระบบ ERP, ไฟล์ Excel และระบบ WMS ทำให้การวิเคราะห์ทำได้ยาก หรือบางครั้งต้องการดูว่าสินค้าชนิดไหนอยู่ในคลังนานเกินไป แต่ไม่รู้จะออกแบบ Data Model อย่างไรให้สามารถวิเคราะห์ได้อย่างมีประสิทธิภาพ

พี่เคยเจอปัญหานี้ตอนทำงานกับบริษัทค้าปลีกขนาดใหญ่แห่งหนึ่ง ที่มีสินค้าในคลังหลายหมื่นรายการ และต้องการวิเคราะห์ว่าสินค้าไหนอยู่ในคลังนานเกินไป เพื่อจัดโปรโมชั่นระบายสินค้า หรือพิจารณาตัดจำหน่ายออกจากระบบ แต่ข้อมูลที่มีอยู่ไม่เอื้อต่อการวิเคราะห์แบบนี้เลย

ในบทความนี้ พี่จะมาแชร์วิธีการออกแบบ Data Model สำหรับวิเคราะห์อายุสินค้าคงคลัง (Stock Aging) ที่จะช่วยให้น้องๆ สามารถติดตามอายุของสินค้าในคลังได้อย่างมีประสิทธิภาพ

## ความรู้ที่จะได้รับ

การศึกษาเรื่องการออกแบบ Data Model สำหรับ Stock Aging จะช่วยพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Data Modeling** - เรียนรู้การออกแบบโครงสร้างข้อมูลแบบ Dimensional Model
- **SQL** - พัฒนาทักษะการเขียน SQL Query ที่ซับซ้อนสำหรับการวิเคราะห์
- **Business Intelligence** - เข้าใจการนำข้อมูลไปใช้ในการตัดสินใจทางธุรกิจ
- **Inventory Management** - เรียนรู้หลักการบริหารสินค้าคงคลังและการวิเคราะห์อายุสินค้า
- **Data Visualization** - เรียนรู้การนำเสนอข้อมูลด้วยกราฟและตารางที่เข้าใจง่าย

## สิ่งที่ต้องเตรียมก่อนเริ่มต้น

ก่อนที่จะเริ่มออกแบบ Data Model สำหรับ Stock Aging น้องๆ ควรมีสิ่งต่อไปนี้:

1. **ระบบฐานข้อมูล** - เช่น MySQL, PostgreSQL, SQL Server
2. **เครื่องมือออกแบบฐานข้อมูล** - เช่น MySQL Workbench, pgAdmin, DBeaver
3. **เครื่องมือวิเคราะห์ข้อมูล** - เช่น Power BI, Tableau, Excel
4. **ความเข้าใจพื้นฐานเกี่ยวกับ**:
   - โครงสร้างข้อมูลแบบ Star Schema หรือ Snowflake Schema
   - หลักการของ Fact Table และ Dimension Table
   - การเขียน SQL Query พื้นฐาน

## แนวคิดพื้นฐานของ Stock Aging

ก่อนที่จะเริ่มออกแบบ Data Model เรามาทำความเข้าใจแนวคิดพื้นฐานของ Stock Aging กันก่อน:

### Stock Aging คืออะไร?

Stock Aging คือการวิเคราะห์อายุของสินค้าคงคลังว่าอยู่ในคลังนานเท่าไรแล้ว โดยทั่วไปจะแบ่งเป็นช่วงอายุ (Age Buckets) เช่น:
- 0-30 วัน
- 31-60 วัน
- 61-90 วัน
- 91-180 วัน
- มากกว่า 180 วัน

### ทำไมต้องวิเคราะห์ Stock Aging?

1. **ลดต้นทุนการเก็บรักษา** - สินค้าที่อยู่ในคลังนานเกินไปทำให้เสียค่าใช้จ่ายในการเก็บรักษา
2. **ป้องกันสินค้าเสื่อมสภาพ** - สินค้าบางประเภทมีอายุการใช้งานจำกัด
3. **เพิ่มสภาพคล่องทางการเงิน** - สินค้าคงคลังคือเงินทุนที่จมอยู่
4. **วางแผนการตลาด** - ใช้ข้อมูลเพื่อจัดโปรโมชั่นระบายสินค้าที่อยู่นาน

### วิธีการคำนวณ Stock Aging

มีหลายวิธีในการคำนวณอายุสินค้า แต่วิธีที่นิยมใช้คือ:

1. **FIFO (First In, First Out)** - สินค้าที่เข้าคลังก่อนจะถูกขายออกไปก่อน
2. **LIFO (Last In, First Out)** - สินค้าที่เข้าคลังล่าสุดจะถูกขายออกไปก่อน
3. **Weighted Average** - คำนวณอายุเฉลี่ยถ่วงน้ำหนักตามจำนวนสินค้า

ในบทความนี้ เราจะใช้วิธี FIFO ซึ่งเป็นวิธีที่นิยมใช้มากที่สุด

## การออกแบบ Data Model

เราจะออกแบบ Data Model แบบ Star Schema ซึ่งประกอบด้วย Fact Table และ Dimension Tables ดังนี้:

### Dimension Tables

1. **DimProduct** - ข้อมูลเกี่ยวกับสินค้า
```sql
CREATE TABLE DimProduct (
    ProductKey INT PRIMARY KEY,
    ProductID VARCHAR(50),
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    SubCategory VARCHAR(50),
    Brand VARCHAR(50),
    UnitCost DECIMAL(10,2),
    UnitPrice DECIMAL(10,2)
);
```

2. **DimWarehouse** - ข้อมูลเกี่ยวกับคลังสินค้า
```sql
CREATE TABLE DimWarehouse (
    WarehouseKey INT PRIMARY KEY,
    WarehouseID VARCHAR(20),
    WarehouseName VARCHAR(100),
    Location VARCHAR(100),
    Region VARCHAR(50)
);
```

3. **DimDate** - ข้อมูลเกี่ยวกับวันที่
```sql
CREATE TABLE DimDate (
    DateKey INT PRIMARY KEY,
    Date DATE,
    Day INT,
    Month INT,
    Year INT,
    Quarter INT,
    DayOfWeek INT,
    WeekOfYear INT,
    MonthName VARCHAR(20),
    QuarterName VARCHAR(20)
);
```

### Fact Tables

1. **FactInventoryReceipt** - ข้อมูลการรับสินค้าเข้าคลัง
```sql
CREATE TABLE FactInventoryReceipt (
    ReceiptKey INT PRIMARY KEY,
    ProductKey INT,
    WarehouseKey INT,
    ReceiptDateKey INT,
    ReceiptID VARCHAR(50),
    Quantity INT,
    UnitCost DECIMAL(10,2),
    TotalCost DECIMAL(10,2),
    FOREIGN KEY (ProductKey) REFERENCES DimProduct(ProductKey),
    FOREIGN KEY (WarehouseKey) REFERENCES DimWarehouse(WarehouseKey),
    FOREIGN KEY (ReceiptDateKey) REFERENCES DimDate(DateKey)
);
```

2. **FactInventoryIssue** - ข้อมูลการเบิกสินค้าออกจากคลัง
```sql
CREATE TABLE FactInventoryIssue (
    IssueKey INT PRIMARY KEY,
    ProductKey INT,
    WarehouseKey INT,
    IssueDateKey INT,
    IssueID VARCHAR(50),
    Quantity INT,
    UnitCost DECIMAL(10,2),
    TotalCost DECIMAL(10,2),
    FOREIGN KEY (ProductKey) REFERENCES DimProduct(ProductKey),
    FOREIGN KEY (WarehouseKey) REFERENCES DimWarehouse(WarehouseKey),
    FOREIGN KEY (IssueDateKey) REFERENCES DimDate(DateKey)
);
```

3. **FactCurrentInventory** - ข้อมูลสินค้าคงคลังปัจจุบัน
```sql
CREATE TABLE FactCurrentInventory (
    InventoryKey INT PRIMARY KEY,
    ProductKey INT,
    WarehouseKey INT,
    AsOfDateKey INT,
    QuantityOnHand INT,
    UnitCost DECIMAL(10,2),
    TotalCost DECIMAL(10,2),
    FOREIGN KEY (ProductKey) REFERENCES DimProduct(ProductKey),
    FOREIGN KEY (WarehouseKey) REFERENCES DimWarehouse(WarehouseKey),
    FOREIGN KEY (AsOfDateKey) REFERENCES DimDate(DateKey)
);
```

![Stock Aging Data Model](/assets/images/stock-aging-model.png)

## การสร้างและเตรียมข้อมูล

หลังจากที่เราออกแบบ Data Model แล้ว ขั้นตอนต่อไปคือการสร้างและเตรียมข้อมูล:

### 1. สร้างข้อมูลใน Dimension Tables

```sql
-- เพิ่มข้อมูลสินค้า
INSERT INTO DimProduct (ProductKey, ProductID, ProductName, Category, SubCategory, Brand, UnitCost, UnitPrice)
VALUES 
(1, 'P001', 'เสื้อยืดคอกลม', 'เสื้อผ้า', 'เสื้อยืด', 'BrandA', 150.00, 299.00),
(2, 'P002', 'กางเกงยีนส์', 'เสื้อผ้า', 'กางเกง', 'BrandB', 350.00, 799.00),
(3, 'P003', 'รองเท้าผ้าใบ', 'รองเท้า', 'รองเท้าผ้าใบ', 'BrandC', 450.00, 1290.00);

-- เพิ่มข้อมูลคลังสินค้า
INSERT INTO DimWarehouse (WarehouseKey, WarehouseID, WarehouseName, Location, Region)
VALUES 
(1, 'W001', 'คลังกรุงเทพ', 'กรุงเทพมหานคร', 'กลาง'),
(2, 'W002', 'คลังเชียงใหม่', 'เชียงใหม่', 'เหนือ'),
(3, 'W003', 'คลังขอนแก่น', 'ขอนแก่น', 'ตะวันออกเฉียงเหนือ');

-- เพิ่มข้อมูลวันที่ (ตัวอย่างบางส่วน)
INSERT INTO DimDate (DateKey, Date, Day, Month, Year, Quarter, DayOfWeek, WeekOfYear, MonthName, QuarterName)
VALUES 
(20250101, '2025-01-01', 1, 1, 2025, 1, 3, 1, 'มกราคม', 'Q1'),
(20250102, '2025-01-02', 2, 1, 2025, 1, 4, 1, 'มกราคม', 'Q1'),
(20250103, '2025-01-03', 3, 1, 2025, 1, 5, 1, 'มกราคม', 'Q1');
```

### 2. สร้างข้อมูลใน Fact Tables

```sql
-- เพิ่มข้อมูลการรับสินค้า
INSERT INTO FactInventoryReceipt (ReceiptKey, ProductKey, WarehouseKey, ReceiptDateKey, ReceiptID, Quantity, UnitCost, TotalCost)
VALUES 
(1, 1, 1, 20250101, 'REC001', 100, 150.00, 15000.00),
(2, 2, 1, 20250101, 'REC001', 50, 350.00, 17500.00),
(3, 3, 1, 20250102, 'REC002', 30, 450.00, 13500.00);

-- เพิ่มข้อมูลการเบิกสินค้า
INSERT INTO FactInventoryIssue (IssueKey, ProductKey, WarehouseKey, IssueDateKey, IssueID, Quantity, UnitCost, TotalCost)
VALUES 
(1, 1, 1, 20250102, 'ISS001', 20, 150.00, 3000.00),
(2, 2, 1, 20250103, 'ISS002', 10, 350.00, 3500.00),
(3, 3, 1, 20250103, 'ISS002', 5, 450.00, 2250.00);

-- เพิ่มข้อมูลสินค้าคงคลังปัจจุบัน
INSERT INTO FactCurrentInventory (InventoryKey, ProductKey, WarehouseKey, AsOfDateKey, QuantityOnHand, UnitCost, TotalCost)
VALUES 
(1, 1, 1, 20250103, 80, 150.00, 12000.00),
(2, 2, 1, 20250103, 40, 350.00, 14000.00),
(3, 3, 1, 20250103, 25, 450.00, 11250.00);
```

## การวิเคราะห์และแสดงผล

เมื่อเรามีข้อมูลแล้ว เราสามารถเขียน SQL Query เพื่อวิเคราะห์อายุสินค้าคงคลังได้:

### 1. คำนวณอายุสินค้าคงคลังแบบ FIFO

```sql
WITH InventoryBalance AS (
    -- รับสินค้าเข้าคลัง
    SELECT 
        ProductKey,
        WarehouseKey,
        ReceiptDateKey AS TransactionDateKey,
        Quantity AS QuantityIn,
        0 AS QuantityOut
    FROM 
        FactInventoryReceipt
    
    UNION ALL
    
    -- เบิกสินค้าออกจากคลัง
    SELECT 
        ProductKey,
        WarehouseKey,
        IssueDateKey AS TransactionDateKey,
        0 AS QuantityIn,
        Quantity AS QuantityOut
    FROM 
        FactInventoryIssue
),
InventoryRunningBalance AS (
    SELECT 
        ProductKey,
        WarehouseKey,
        TransactionDateKey,
        QuantityIn,
        QuantityOut,
        SUM(QuantityIn - QuantityOut) OVER (
            PARTITION BY ProductKey, WarehouseKey
            ORDER BY TransactionDateKey
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS RunningBalance
    FROM 
        InventoryBalance
),
CurrentInventoryAge AS (
    SELECT 
        ci.ProductKey,
        ci.WarehouseKey,
        ci.AsOfDateKey,
        ci.QuantityOnHand,
        irb.TransactionDateKey,
        DATEDIFF(
            (SELECT Date FROM DimDate WHERE DateKey = ci.AsOfDateKey),
            (SELECT Date FROM DimDate WHERE DateKey = irb.TransactionDateKey)
        ) AS AgeDays
    FROM 
        FactCurrentInventory ci
    JOIN 
        InventoryRunningBalance irb ON ci.ProductKey = irb.ProductKey AND ci.WarehouseKey = irb.WarehouseKey
    WHERE 
        irb.RunningBalance > 0
)
SELECT 
    p.ProductID,
    p.ProductName,
    p.Category,
    w.WarehouseID,
    w.WarehouseName,
    SUM(CASE WHEN AgeDays BETWEEN 0 AND 30 THEN cia.QuantityOnHand ELSE 0 END) AS Age0_30Days,
    SUM(CASE WHEN AgeDays BETWEEN 31 AND 60 THEN cia.QuantityOnHand ELSE 0 END) AS Age31_60Days,
    SUM(CASE WHEN AgeDays BETWEEN 61 AND 90 THEN cia.QuantityOnHand ELSE 0 END) AS Age61_90Days,
    SUM(CASE WHEN AgeDays BETWEEN 91 AND 180 THEN cia.QuantityOnHand ELSE 0 END) AS Age91_180Days,
    SUM(CASE WHEN AgeDays > 180 THEN cia.QuantityOnHand ELSE 0 END) AS AgeOver180Days,
    SUM(cia.QuantityOnHand) AS TotalQuantity
FROM 
    CurrentInventoryAge cia
JOIN 
    DimProduct p ON cia.ProductKey = p.ProductKey
JOIN 
    DimWarehouse w ON cia.WarehouseKey = w.WarehouseKey
GROUP BY 
    p.ProductID,
    p.ProductName,
    p.Category,
    w.WarehouseID,
    w.WarehouseName
ORDER BY 
    p.Category,
    p.ProductName;
```

### 2. สร้าง View สำหรับรายงาน Stock Aging

```sql
CREATE VIEW vw_StockAging AS
WITH InventoryBalance AS (
    -- รับสินค้าเข้าคลัง
    SELECT 
        ProductKey,
        WarehouseKey,
        ReceiptDateKey AS TransactionDateKey,
        Quantity AS QuantityIn,
        0 AS QuantityOut
    FROM 
        FactInventoryReceipt
    
    UNION ALL
    
    -- เบิกสินค้าออกจากคลัง
    SELECT 
        ProductKey,
        WarehouseKey,
        IssueDateKey AS TransactionDateKey,
        0 AS QuantityIn,
        Quantity AS QuantityOut
    FROM 
        FactInventoryIssue
),
InventoryRunningBalance AS (
    SELECT 
        ProductKey,
        WarehouseKey,
        TransactionDateKey,
        QuantityIn,
        QuantityOut,
        SUM(QuantityIn - QuantityOut) OVER (
            PARTITION BY ProductKey, WarehouseKey
            ORDER BY TransactionDateKey
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS RunningBalance
    FROM 
        InventoryBalance
),
CurrentInventoryAge AS (
    SELECT 
        ci.ProductKey,
        ci.WarehouseKey,
        ci.AsOfDateKey,
        ci.QuantityOnHand,
        irb.TransactionDateKey,
        DATEDIFF(
            (SELECT Date FROM DimDate WHERE DateKey = ci.AsOfDateKey),
            (SELECT Date FROM DimDate WHERE DateKey = irb.TransactionDateKey)
        ) AS AgeDays
    FROM 
        FactCurrentInventory ci
    JOIN 
        InventoryRunningBalance irb ON ci.ProductKey = irb.ProductKey AND ci.WarehouseKey = irb.WarehouseKey
    WHERE 
        irb.RunningBalance > 0
)
SELECT 
    p.ProductID,
    p.ProductName,
    p.Category,
    p.SubCategory,
    p.Brand,
    w.WarehouseID,
    w.WarehouseName,
    w.Region,
    SUM(CASE WHEN AgeDays BETWEEN 0 AND 30 THEN cia.QuantityOnHand ELSE 0 END) AS Age0_30Days,
    SUM(CASE WHEN AgeDays BETWEEN 31 AND 60 THEN cia.QuantityOnHand ELSE 0 END) AS Age31_60Days,
    SUM(CASE WHEN AgeDays BETWEEN 61 AND 90 THEN cia.QuantityOnHand ELSE 0 END) AS Age61_90Days,
    SUM(CASE WHEN AgeDays BETWEEN 91 AND 180 THEN cia.QuantityOnHand ELSE 0 END) AS Age91_180Days,
    SUM(CASE WHEN AgeDays > 180 THEN cia.QuantityOnHand ELSE 0 END) AS AgeOver180Days,
    SUM(cia.QuantityOnHand) AS TotalQuantity,
    SUM(cia.QuantityOnHand * p.UnitCost) AS TotalCost
FROM 
    CurrentInventoryAge cia
JOIN 
    DimProduct p ON cia.ProductKey = p.ProductKey
JOIN 
    DimWarehouse w ON cia.WarehouseKey = w.WarehouseKey
GROUP BY 
    p.ProductID,
    p.ProductName,
    p.Category,
    p.SubCategory,
    p.Brand,
    w.WarehouseID,
    w.WarehouseName,
    w.Region;
```

## เทคนิคและการปรับแต่ง

เพื่อให้การวิเคราะห์อายุสินค้าคงคลังมีประสิทธิภาพมากขึ้น พี่มีเทคนิคเพิ่มเติมดังนี้:

### 1. สร้าง Indexed View เพื่อเพิ่มประสิทธิภาพ

```sql
-- สำหรับ SQL Server
CREATE VIEW vw_StockAgingIndexed
WITH SCHEMABINDING
AS
-- SQL Query ที่ใช้ในการสร้าง View
```

### 2. สร้าง Materialized View (สำหรับ PostgreSQL)

```sql
-- สำหรับ PostgreSQL
CREATE MATERIALIZED VIEW mv_StockAging
AS
-- SQL Query ที่ใช้ในการสร้าง View
WITH DATA;

-- สร้าง Index บน Materialized View
CREATE INDEX idx_mv_StockAging_Product ON mv_StockAging(ProductID);
CREATE INDEX idx_mv_StockAging_Warehouse ON mv_StockAging(WarehouseID);
```

### 3. การแสดงผลด้วย Power BI หรือ Tableau

เมื่อเรามี View สำหรับข้อมูล Stock Aging แล้ว เราสามารถนำไปสร้างรายงานใน Power BI หรือ Tableau ได้ โดยสร้าง Dashboard ที่แสดง:

1. **Heat Map** แสดงสัดส่วนของสินค้าในแต่ละช่วงอายุ
2. **Bar Chart** แสดงมูลค่าสินค้าคงคลังตามช่วงอายุ
3. **Table** แสดงรายละเอียดสินค้าที่มีอายุมากกว่า 90 วัน
4. **Line Chart** แสดงแนวโน้มของอายุสินค้าคงคลังเฉลี่ยตามเวลา

![Stock Aging Dashboard](/assets/images/stock-aging-dashboard.png)

---

การออกแบบ Data Model สำหรับวิเคราะห์อายุสินค้าคงคลังที่ดีจะช่วยให้ธุรกิจสามารถบริหารจัดการสินค้าคงคลังได้อย่างมีประสิทธิภาพ ลดต้นทุนการเก็บรักษา และเพิ่มสภาพคล่องทางการเงิน นอกจากนี้ยังสามารถนำไปประยุกต์ใช้กับธุรกิจได้หลากหลายประเภท ไม่ว่าจะเป็นค้าปลีก, ผลิตสินค้า, หรือธุรกิจอาหาร

พี่หวังว่าบทความนี้จะช่วยให้น้องๆ เข้าใจวิธีการออกแบบ Data Model สำหรับวิเคราะห์อายุสินค้าคงคลัง และสามารถนำไปประยุกต์ใช้กับงานจริงได้ หากมีคำถามหรือต้องการคำแนะนำเพิ่มเติม สามารถติดต่อพี่ได้เสมอนะครับ!
