---
layout: post
title: "แปลงข้อมูลจาก Chain-level ให้ไปเป็น flat-level ใน Bigquery"
date: 2025-05-16
categories: [Logic, SQL]
tags: [ฺBigquery, draft-A]
image: 
---

# แปลงข้อมูลจาก Chain-level ให้ไปเป็น flat-level ใน Bigquery
## Table of Contents
- [โจทย์และปัญหาที่พบ](#โจทย์และปัญหาที่พบ)
- [How to](#how-to)


## โจทย์และปัญหาที่พบ
เนื่องจากผมได้รับงานชิ้นหนึ่ง ที่จะต้องแปลงข้อมูลจาก Chain-level ให้ไปเป็น flat-level ใน Bigquery โดยมีโจทย์อยู่ว่า
อยากให้ช่วยMapping หน่วยของสินค้า จากบริษัทคู่ค้าให้หน่อย โดยที่เขาไม่ได้มี ตาราง Unit Convert มาให้ และ สินค้าที่ขาย มีการขายมากกว่า 1 รูปแบบ และ สินค้ามีการบรรจุหลายขนาด ในลักษณะ Chain-level กัน และเราไม่สามารถทราบได้ ว่ามีสูงสุด กี่ level ตามตัวอย่างนี้

ProductID | Source_Unit | Source_qty | Target_Unit | Target_qty 
---|---|---|---|---
A001 | ชิ้น | 10 | ถุง | 1 
A001 | ถุง | 5 | แพ๊ค | 1 
A001 | แพ๊ค | 10 | กล่อง | 1 

ซึ่งหมายความว่า เราจะต้องทำการConvert จากชิ้นไปเป็นกล่องได้

## How to
โจทย์ลักษณะนี้ ผมเคยเจอตอนเข้ามาทำงานใหม่ๆ ตอนนั้นถ้าจำไม่ผิด ใช้วิธีเขียน Stored Procedure ในการสร้าง Loop แล้วก็ไปหา logic ที่จะทราบให้ได้ว่า ข้อมูล chain กนัอยู่ กี่ Level แต่ยังทำไม่เสร็จดี โดนพับโครงการไปก่อน 555555+

แต่รอบนี้ ก็เจอโจทย์คล้ายๆเดิม เลยลองวิธีใหม่ๆ และมาโน๊ตไว้กันลืมที่นี่

วิธีหลักๆที่เราจะใช้ก็คือ WITH RECURSIVE เป็นการสร้าง CTE แบบที่สามารถเรียกวนใช้งานซ้ำในตัวมันเองได้ คล้ายๆ Loop แต่ทำจนหมดเงื่อนไข (*เนื่องจากทำจนหมดเงื่อนไข อาจจะต้องระวังเงื่อนไขที่เป็นจริงเสมอ)

เริ่มจากสร้าง Mock ข้อมูล ที่เราจะใช้ทดสอบกันก่อน
```sql
CREATE TABLE `DEVBI.TEST_PAO`
AS
SELECT * FROM UNNEST([
STRUCT('A001' AS ProductID, 'ชิ้น' AS Source_Unit, 10 AS Source_qty, 'ถุง' AS Target_Unit, 1 AS Target_qty),
STRUCT('A001' AS ProductID, 'ถุง' AS Source_Unit, 5 AS Source_qty, 'แพ๊ค' AS Target_Unit, 1 AS Target_qty),
STRUCT('A001' AS ProductID, 'แพ๊ค' AS Source_Unit, 10 AS Source_qty, 'กล่อง' AS Target_Unit, 1 AS Target_qty)
])
```
จะได้หน้าตาข้อมูลเหมือนโจทย์ด้านบน ประมาณนี้
ProductID | Source_Unit | Source_qty | Target_Unit | Target_qty 
---|---|---|---|---
A001 | ชิ้น | 10 | ถุง | 1 
A001 | ถุง | 5 | แพ๊ค | 1 
A001 | แพ๊ค | 10 | กล่อง | 1 


จากนั้น ใช้ RECURSIVE เรียกตัวเองมา Join ซ้ำ และจับชน Source_Unit และ Target_Unit ที่ ProductID เดียวกัน จะได้ว่า
```sql
WITH RECURSIVE conversion_chain AS (
  SELECT
    ProductID,
    Source_Unit,
    Source_qty,
    Target_Unit,
    Target_qty,
    Source_qty * 1.0 / Target_qty AS factor
  FROM
    `cp-freshmarts.DEVBI.TEST_PAO`  

  UNION ALL

  SELECT
    cc.ProductID,
    cc.Source_Unit,
    cc.Source_qty,
    t.Target_Unit,
    t.Target_qty,
    cc.factor * (t.Source_qty * 1.0 / t.Target_qty) AS factor
  FROM
    conversion_chain cc
  JOIN
    `cp-freshmarts.DEVBI.TEST_PAO` t
  ON
    cc.Target_Unit = t.Source_Unit AND cc.ProductID = t.ProductID
)

SELECT
  ProductID,
  Source_Unit,
  factor AS Source_qty,
  Target_Unit,
  Target_qty
FROM
  conversion_chain
GROUP BY
  ProductID, Source_Unit, Source_qty, Target_Unit, Target_qty, factor
ORDER BY
  ProductID, Source_Unit, Target_Unit
```
ซึ่ง มันจะ Join loop กันไปจนกว่า จะถึง level สุดท้ายและ join กันไม่ได้ในที่สุด จนได้หน้าตาข้อมูลประมาณนี้ 

ProductID | Source_Unit | Source_qty | Target_Unit | Target_qty 
---|---|---|---|---
A001 | ชิ้น | 10 | ถุง | 1 
A001 | ชิ้น | 50 | แพ๊ค | 1 
A001 | ชิ้น | 500 | กล่อง | 1 
A001 | ถุง | 5 | แพ๊ค | 1 
A001 | ถุง | 50 | กล่อง | 1 
A001 | แพ๊ค | 10 | กล่อง | 1

![alt text](image.png)