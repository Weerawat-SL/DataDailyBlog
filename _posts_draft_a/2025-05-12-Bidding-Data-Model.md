---
layout: post
title: "แก้ปัญหาการประมูลด้วย Bidding Data Model"
author: "Weerawat"
categories: [Data Modeling]
tags: [Data Model, E-commerce, draft-A]
---

![Bidding System](https://images.unsplash.com/photo-1607944024060-0450380ddd33?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

# การออกแบบระบบประมูลด้วย Bidding Data Model

## Table of Contents
- [ปัญหาการออกแบบระบบประมูลที่มือใหม่มักเจอ](#ปัญหาการออกแบบระบบประมูลที่มือใหม่มักเจอ)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept ของระบบประมูล](#concept-ของระบบประมูล)
- [Pre-Setup](#pre-setup)
- [How to สร้าง Bidding Data Model](#how-to-สร้าง-bidding-data-model)
- [Technic and Config](#technic-and-config)
- [การนำไปประยุกต์ใช้งาน](#การนำไปประยุกต์ใช้งาน)

## ปัญหาการออกแบบระบบประมูลที่มือใหม่มักเจอ

น้องๆ เคยเจอปัญหาแบบนี้ไหม? ทีมธุรกิจต้องการสร้างระบบประมูลออนไลน์ แต่เราไม่รู้จะออกแบบฐานข้อมูลยังไงให้รองรับการประมูลแบบเรียลไทม์? หรือบางทีเราพยายามติดตามประวัติการประมูล แต่ข้อมูลกระจัดกระจายและไม่สอดคล้องกัน? หรือแม้แต่การพยายามวิเคราะห์พฤติกรรมการประมูล แต่ไม่มีโครงสร้างข้อมูลที่เหมาะสม?

ปัญหาเหล่านี้เป็นเรื่องที่ Data Engineer มือใหม่มักจะเจอเมื่อต้องทำงานกับระบบประมูล ไม่ว่าจะเป็นการประมูลสินค้า การประมูลโฆษณา หรือการประมูลโครงการ การออกแบบ Data Model ที่ดีจะช่วยให้ระบบประมูลทำงานได้อย่างมีประสิทธิภาพ โปร่งใส และสามารถวิเคราะห์ข้อมูลได้อย่างลึกซึ้ง

วันนี้เราจะมาดูวิธีการออกแบบ Bidding Data Model ที่จะช่วยแก้ปัญหาเหล่านี้กัน!

## Knowledge

การศึกษาเรื่อง Bidding Data Model จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Real-time Data Processing**: เรียนรู้การจัดการข้อมูลแบบเรียลไทม์
- **Transaction Management**: การจัดการธุรกรรมที่มีความถี่สูง
- **Advanced SQL**: การใช้คำสั่ง SQL ขั้นสูงในการวิเคราะห์การประมูล
- **Data Security**: การรักษาความปลอดภัยของข้อมูลในระบบประมูล
- **Business Intelligence**: การวิเคราะห์พฤติกรรมการประมูลเพื่อหาข้อมูลเชิงลึก

## Pre-Requirement

ก่อนที่จะเริ่มสร้าง Bidding Data Model เราจำเป็นต้องมีสิ่งต่อไปนี้:

1. **Database System**: MySQL, PostgreSQL หรือ SQL Server
2. **ETL Tool**: เช่น Apache Airflow, Talend หรือ Python scripts
3. **BI Tool**: Power BI, Tableau หรือ Looker สำหรับการแสดงผล
4. **ความเข้าใจพื้นฐานเกี่ยวกับ**:
   - ระบบประมูลและกฎการประมูลแบบต่างๆ
   - การจัดการธุรกรรมแบบเรียลไทม์
   - SQL และการใช้ Indexes
   - การทำงานกับ Timestamps และ Time zones

## Concept ของระบบประมูล

ระบบประมูล (Bidding System) คือระบบที่ให้ผู้เข้าร่วมเสนอราคาเพื่อซื้อสินค้าหรือบริการ โดยทั่วไปมีองค์ประกอบหลักดังนี้:

1. **Auction Items**: สินค้าหรือบริการที่นำมาประมูล
2. **Bidders**: ผู้เข้าร่วมประมูล
3. **Bids**: การเสนอราคา
4. **Auction Rules**: กฎการประมูล (เช่น English Auction, Dutch Auction, Sealed-bid)
5. **Auction Timeline**: ระยะเวลาการประมูล (เริ่มต้น-สิ้นสุด)

### โครงสร้างพื้นฐานของ Bidding Data Model

โมเดลข้อมูลสำหรับระบบประมูลควรประกอบด้วยตารางหลักๆ ดังนี้:

1. **Items**: ข้อมูลสินค้าหรือบริการที่นำมาประมูล
2. **Auctions**: ข้อมูลการประมูล
3. **Bidders**: ข้อมูลผู้เข้าร่วมประมูล
4. **Bids**: ข้อมูลการเสนอราคา
5. **Auction Results**: ผลลัพธ์การประมูล
6. **Auction History**: ประวัติการประมูล

## Pre-Setup

ก่อนที่จะเริ่มสร้างโมเดล เราต้องเตรียมสภาพแวดล้อมให้พร้อม:

1. **สร้างฐานข้อมูล**:
```sql
CREATE DATABASE bidding_system;
USE bidding_system;
```

2. **สร้างตารางพื้นฐาน**:
```sql
-- ตารางข้อมูลผู้ใช้งาน
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- ตารางข้อมูลสินค้าหรือบริการ
CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    category VARCHAR(50),
    condition_status VARCHAR(20),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- ตารางรูปภาพสินค้า
CREATE TABLE item_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    image_url VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);
```

3. **เตรียม ETL Pipeline**:
   - สร้าง DAG ใน Airflow หรือ Job ใน ETL tool ที่ใช้
   - กำหนดตารางเวลาการรันเพื่อวิเคราะห์ข้อมูลการประมูล

## How to สร้าง Bidding Data Model

ตอนนี้เรามาเริ่มสร้าง Data Model สำหรับระบบประมูลกัน:

### 1. สร้างตารางข้อมูลการประมูล

```sql
CREATE TABLE auctions (
    auction_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    seller_id INT,
    title VARCHAR(100),
    description TEXT,
    start_price DECIMAL(15,2),
    reserve_price DECIMAL(15,2),
    buy_now_price DECIMAL(15,2),
    bid_increment DECIMAL(10,2),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    status ENUM('DRAFT', 'SCHEDULED', 'ACTIVE', 'ENDED', 'CANCELLED'),
    auction_type ENUM('ENGLISH', 'DUTCH', 'SEALED', 'REVERSE'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (seller_id) REFERENCES users(user_id)
);

-- ตารางกฎการประมูลเพิ่มเติม
CREATE TABLE auction_rules (
    rule_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_id INT,
    rule_type VARCHAR(50),
    rule_value TEXT,
    FOREIGN KEY (auction_id) REFERENCES auctions(auction_id)
);
```

### 2. สร้างตารางข้อมูลผู้เข้าร่วมประมูล

```sql
CREATE TABLE bidders (
    bidder_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    auction_id INT,
    max_auto_bid DECIMAL(15,2),
    is_auto_bidding BOOLEAN DEFAULT FALSE,
    registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (auction_id) REFERENCES auctions(auction_id),
    UNIQUE KEY (user_id, auction_id)
);

-- ตารางข้อมูลการยืนยันตัวตนของผู้ประมูล
CREATE TABLE bidder_verification (
    verification_id INT AUTO_INCREMENT PRIMARY KEY,
    bidder_id INT,
    verification_type VARCHAR(50),
    verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED'),
    verification_time TIMESTAMP,
    FOREIGN KEY (bidder_id) REFERENCES bidders(bidder_id)
);
```

### 3. สร้างตารางข้อมูลการเสนอราคา

```sql
CREATE TABLE bids (
    bid_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_id INT,
    bidder_id INT,
    bid_amount DECIMAL(15,2),
    bid_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_auto_bid BOOLEAN DEFAULT FALSE,
    is_winning_bid BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    device_info VARCHAR(255),
    FOREIGN KEY (auction_id) REFERENCES auctions(auction_id),
    FOREIGN KEY (bidder_id) REFERENCES bidders(bidder_id)
);

-- ตารางประวัติการเปลี่ยนแปลงการประมูล
CREATE TABLE bid_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_id INT,
    event_type ENUM('BID_PLACED', 'BID_RETRACTED', 'PRICE_CHANGED', 'AUCTION_EXTENDED'),
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    related_bid_id INT,
    FOREIGN KEY (auction_id) REFERENCES auctions(auction_id),
    FOREIGN KEY (related_bid_id) REFERENCES bids(bid_id)
);
```

### 4. สร้างตารางผลลัพธ์การประมูล

```sql
CREATE TABLE auction_results (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_id INT,
    winning_bid_id INT,
    winner_id INT,
    final_price DECIMAL(15,2),
    result_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('SUCCESSFUL', 'RESERVE_NOT_MET', 'NO_BIDS', 'CANCELLED'),
    payment_status ENUM('PENDING', 'PAID', 'FAILED'),
    FOREIGN KEY (auction_id) REFERENCES auctions(auction_id),
    FOREIGN KEY (winning_bid_id) REFERENCES bids(bid_id),
    FOREIGN KEY (winner_id) REFERENCES users(user_id)
);

-- ตารางการชำระเงิน
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    result_id INT,
    amount DECIMAL(15,2),
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    payment_time TIMESTAMP,
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'),
    FOREIGN KEY (result_id) REFERENCES auction_results(result_id)
);
```

### 5. สร้าง View สำหรับการวิเคราะห์

```sql
CREATE VIEW auction_analytics AS
SELECT 
    a.auction_id,
    a.title as auction_title,
    i.title as item_title,
    a.start_price,
    a.reserve_price,
    a.start_time,
    a.end_time,
    a.status as auction_status,
    COUNT(DISTINCT b.bidder_id) as bidder_count,
    COUNT(b.bid_id) as bid_count,
    MAX(b.bid_amount) as highest_bid,
    MIN(b.bid_amount) as lowest_bid,
    AVG(b.bid_amount) as average_bid,
    ar.final_price,
    ar.status as result_status,
    CASE 
        WHEN ar.final_price IS NOT NULL AND a.start_price > 0 
        THEN ((ar.final_price - a.start_price) / a.start_price) * 100 
        ELSE 0 
    END as price_increase_percentage
FROM 
    auctions a
JOIN 
    items i ON a.item_id = i.item_id
LEFT JOIN 
    bids b ON a.auction_id = b.auction_id
LEFT JOIN 
    auction_results ar ON a.auction_id = ar.auction_id
GROUP BY 
    a.auction_id, a.title, i.title, a.start_price, a.reserve_price, 
    a.start_time, a.end_time, a.status, ar.final_price, ar.status;
```

### 6. สร้าง Stored Procedure สำหรับการจัดการประมูล

```sql
DELIMITER //
CREATE PROCEDURE place_bid(
    IN p_auction_id INT,
    IN p_user_id INT,
    IN p_bid_amount DECIMAL(15,2),
    IN p_ip_address VARCHAR(45),
    IN p_device_info VARCHAR(255)
)
BEGIN
    DECLARE v_auction_status VARCHAR(20);
    DECLARE v_current_highest DECIMAL(15,2);
    DECLARE v_bid_increment DECIMAL(10,2);
    DECLARE v_bidder_id INT;
    DECLARE v_is_valid BOOLEAN DEFAULT TRUE;
    
    -- ตรวจสอบสถานะการประมูล
    SELECT status, bid_increment INTO v_auction_status, v_bid_increment
    FROM auctions
    WHERE auction_id = p_auction_id;
    
    IF v_auction_status != 'ACTIVE' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Auction is not active';
    END IF;
    
    -- หาราคาสูงสุดปัจจุบัน
    SELECT COALESCE(MAX(bid_amount), 0) INTO v_current_highest
    FROM bids
    WHERE auction_id = p_auction_id;
    
    -- ตรวจสอบว่าราคาที่เสนอสูงกว่าราคาปัจจุบัน + bid_increment
    IF p_bid_amount <= v_current_highest + v_bid_increment THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Bid amount must be higher than current bid plus increment';
    END IF;
    
    -- หา bidder_id หรือสร้างใหม่ถ้ายังไม่มี
    SELECT bidder_id INTO v_bidder_id
    FROM bidders
    WHERE user_id = p_user_id AND auction_id = p_auction_id;
    
    IF v_bidder_id IS NULL THEN
        INSERT INTO bidders (user_id, auction_id, registration_time)
        VALUES (p_user_id, p_auction_id, NOW());
        
        SET v_bidder_id = LAST_INSERT_ID();
    END IF;
    
    -- บันทึกการประมูล
    INSERT INTO bids (auction_id, bidder_id, bid_amount, bid_time, ip_address, device_info)
    VALUES (p_auction_id, v_bidder_id, p_bid_amount, NOW(), p_ip_address, p_device_info);
    
    -- อัพเดทสถานะการชนะประมูลปัจจุบัน
    UPDATE bids SET is_winning_bid = FALSE WHERE auction_id = p_auction_id;
    UPDATE bids SET is_winning_bid = TRUE WHERE bid_id = LAST_INSERT_ID();
    
    -- บันทึกประวัติ
    INSERT INTO bid_history (auction_id, event_type, description, related_bid_id)
    VALUES (p_auction_id, 'BID_PLACED', CONCAT('New bid placed: ', p_bid_amount), LAST_INSERT_ID());
    
    -- ตรวจสอบว่าควรขยายเวลาประมูลหรือไม่ (ถ้าเหลือเวลาน้อยกว่า 5 นาที)
    IF (SELECT TIMESTAMPDIFF(MINUTE, NOW(), end_time) FROM auctions WHERE auction_id = p_auction_id) < 5 THEN
        UPDATE auctions SET end_time = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE auction_id = p_auction_id;
        
        INSERT INTO bid_history (auction_id, event_type, description)
        VALUES (p_auction_id, 'AUCTION_EXTENDED', 'Auction extended by 5 minutes due to last-minute bidding');
    END IF;
END //
DELIMITER ;
```

## Technic and Config

เพื่อให้ Bidding Data Model ทำงานได้อย่างมีประสิทธิภาพ มีเทคนิคและการตั้งค่าที่ควรทำดังนี้:

### 1. การสร้างดัชนี (Index) เพื่อเพิ่มประสิทธิภาพ

```sql
-- สร้างดัชนีสำหรับการค้นหาการประมูลที่กำลังดำเนินอยู่
CREATE INDEX idx_auctions_status_time ON auctions(status, start_time, end_time);

-- สร้างดัชนีสำหรับการค้นหาการประมูลตามหมวดหมู่
CREATE INDEX idx_items_category ON items(category);

-- สร้างดัชนีสำหรับการค้นหาการเสนอราคาล่าสุด
CREATE INDEX idx_bids_auction_time ON bids(auction_id, bid_time);

-- สร้างดัชนีสำหรับการค้นหาการเสนอราคาสูงสุด
CREATE INDEX idx_bids_auction_amount ON bids(auction_id, bid_amount);
```

### 2. การตั้งค่า Partitioning สำหรับตารางขนาดใหญ่

```sql
-- แบ่ง Partition ตารางการเสนอราคาตามเดือน
ALTER TABLE bids
PARTITION BY RANGE (YEAR(bid_time) * 100 + MONTH(bid_time)) (
    PARTITION p2023_01 VALUES LESS THAN (202302),
    PARTITION p2023_02 VALUES LESS THAN (202303),
    -- ... เพิ่มเติมตามต้องการ
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

### 3. การสร้าง Materialized View (หรือตาราง Summary) สำหรับการรายงาน

```sql
CREATE TABLE auction_daily_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    summary_date DATE,
    total_auctions INT,
    active_auctions INT,
    ended_auctions INT,
    total_bids INT,
    total_bidders INT,
    average_final_price DECIMAL(15,2),
    total_revenue DECIMAL(15,2)
);

-- Procedure สำหรับอัพเดทข้อมูล Summary
DELIMITER //
CREATE PROCEDURE update_auction_summary()
BEGIN
    INSERT INTO auction_daily_summary (
        summary_date, total_auctions, active_auctions, ended_auctions,
        total_bids, total_bidders, average_final_price, total_revenue
    )
    SELECT 
        CURRENT_DATE as summary_date,
        COUNT(DISTINCT a.auction_id) as total_auctions,
        SUM(CASE WHEN a.status = 'ACTIVE' THEN 1 ELSE 0 END) as active_auctions,
        SUM(CASE WHEN a.status = 'ENDED' THEN 1 ELSE 0 END) as ended_auctions,
        COUNT(b.bid_id) as total_bids,
        COUNT(DISTINCT b.bidder_id) as total_bidders,
        AVG(ar.final_price) as average_final_price,
        SUM(CASE WHEN ar.status = 'SUCCESSFUL' THEN ar.final_price ELSE 0 END) as total_revenue
    FROM 
        auctions a
    LEFT JOIN 
        bids b ON a.auction_id = b.auction_id
    LEFT JOIN 
        auction_results ar ON a.auction_id = ar.auction_id
    WHERE 
        a.created_at >= CURRENT_DATE - INTERVAL 1 DAY
        AND a.created_at < CURRENT_DATE;
END //
DELIMITER ;
```

### 4. การตั้งค่า Event Scheduler สำหรับการอัพเดทอัตโนมัติ

```sql
SET GLOBAL event_scheduler = ON;

-- Event สำหรับการปิดการประมูลที่หมดเวลา
DELIMITER //
CREATE EVENT event_close_expired_auctions
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    DECLARE v_auction_id INT;
    DECLARE v_highest_bid_id INT;
    DECLARE v_highest_bidder_id INT;
    DECLARE v_highest_bid_amount DECIMAL(15,2);
    DECLARE v_reserve_price DECIMAL(15,2);
    DECLARE v_result_status VARCHAR(20);
    DECLARE done INT DEFAULT FALSE;
    
    DECLARE expired_auctions CURSOR FOR 
        SELECT auction_id, reserve_price
        FROM auctions
        WHERE status = 'ACTIVE' AND end_time <= NOW();
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN expired_auctions;
    
    auction_loop: LOOP
        FETCH expired_auctions INTO v_auction_id, v_reserve_price;
        IF done THEN
            LEAVE auction_loop;
        END IF;
        
        -- หาการเสนอราคาสูงสุด
        SELECT bid_id, bidder_id, bid_amount INTO v_highest_bid_id, v_highest_bidder_id, v_highest_bid_amount
        FROM bids
        WHERE auction_id = v_auction_id
        ORDER BY bid_amount DESC
        LIMIT 1;
        
        -- กำหนดสถานะผลลัพธ์
        IF v_highest_bid_id IS NULL THEN
            SET v_result_status = 'NO_BIDS';
        ELSEIF v_highest_bid_amount < v_reserve_price THEN
            SET v_result_status = 'RESERVE_NOT_MET';
        ELSE
            SET v_result_status = 'SUCCESSFUL';
        END IF;
        
        -- อัพเดทสถานะการประมูล
        UPDATE auctions SET status = 'ENDED' WHERE auction_id = v_auction_id;
        
        -- บันทึกผลลัพธ์
        INSERT INTO auction_results (
            auction_id, winning_bid_id, winner_id, final_price, status
        )
        VALUES (
            v_auction_id, v_highest_bid_id, v_highest_bidder_id, v_highest_bid_amount, v_result_status
        );
    END LOOP;
    
    CLOSE expired_auctions;
END //
DELIMITER ;

-- Event สำหรับการอัพเดทข้อมูล Summary รายวัน
DELIMITER //
CREATE EVENT event_daily_auction_summary
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    CALL update_auction_summary();
END //
DELIMITER ;
```

## การนำไปประยุกต์ใช้งาน

Bidding Data Model ที่เราสร้างขึ้นสามารถนำไปประยุกต์ใช้ได้หลากหลาย:

1. **ระบบประมูลออนไลน์**: สร้างแพลตฟอร์มประมูลสินค้าออนไลน์แบบเรียลไทม์
2. **ระบบประมูลโฆษณา**: จัดการการประมูลพื้นที่โฆษณาบนเว็บไซต์หรือแอปพลิเคชัน
3. **ระบบประมูลโครงการ**: จัดการการประมูลโครงการก่อสร้างหรือบริการ
4. **การวิเคราะห์พฤติกรรมการประมูล**: ศึกษาพฤติกรรมของผู้เข้าร่วมประมูลเพื่อปรับปรุงระบบ
5. **การตรวจจับการทุจริต**: ระบุรูปแบบการประมูลที่ผิดปกติหรือน่าสงสัย

การมี Bidding Data Model ที่มีประสิทธิภาพจะช่วยให้องค์กรสามารถจัดการระบบประมูลได้อย่างโปร่งใส มีประสิทธิภาพ และสามารถวิเคราะห์ข้อมูลเพื่อปรับปรุงกระบวนการได้อย่างต่อเนื่อง

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจวิธีการสร้าง Bidding Data Model และสามารถนำไปประยุกต์ใช้กับงานของคุณได้ครับ! ถ้ามีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถแชร์ในคอมเมนต์ด้านล่างได้เลยนะครับ
