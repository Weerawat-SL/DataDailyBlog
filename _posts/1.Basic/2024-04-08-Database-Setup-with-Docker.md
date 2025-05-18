---
layout: post
title: "ติดตั้งฐานข้อมูลแบบง่ายๆ ด้วย Docker"
author: "Weerawat"
categories: [Basic]
tags: [Database, Docker, MySQL, PostgreSQL, draft-A]
---

# ติดตั้งฐานข้อมูลแบบง่ายๆ ด้วย Docker

## Table of Contents
- [ปัญหาการติดตั้งฐานข้อมูลแบบดั้งเดิม](#ปัญหาการติดตั้งฐานข้อมูลแบบดั้งเดิม)
- [ความรู้ที่จะได้รับ](#ความรู้ที่จะได้รับ)
- [สิ่งที่ต้องเตรียมก่อนเริ่มต้น](#สิ่งที่ต้องเตรียมก่อนเริ่มต้น)
- [แนวคิดพื้นฐานของ Docker](#แนวคิดพื้นฐานของ-docker)
- [การติดตั้ง Docker](#การติดตั้ง-docker)
- [การติดตั้งฐานข้อมูลด้วย Docker](#การติดตั้งฐานข้อมูลด้วย-docker)
- [เทคนิคและการปรับแต่ง](#เทคนิคและการปรับแต่ง)

## ปัญหาการติดตั้งฐานข้อมูลแบบดั้งเดิม

โดยปกติแล้ว เราจะใช้งานฐานข้อมูลด้วยการติดตั้งฐานข้อมูลบนเครื่องตรงๆ แล้วมักจะเจอปัญหาต่างๆมากมาย ทั้งการตั้งค่าที่ยุ่งยาก การขัดแย้งกับโปรแกรมอื่น หรือเวลาลบออกก็ลบไม่หมด แถมถ้าต้องการใช้หลายฐานข้อมูลพร้อมกัน เช่น MySQL, PostgreSQL, MongoDB ก็จะทวีคุณปัญหาเหล่านั้นเข้าไปอีก

อย่างตอนแรกที่เริ่มเรียนรู้เรื่องฐานข้อมูล ผมก็ลองติดตั้ง MySQL ด้วยวิธีปกติ แต่พอจะติดตั้ง PostgreSQL เพิ่ม ก็เริ่มมีปัญหา port ชนกัน แถมเวลาอัพเกรดเวอร์ชันก็ยุ่งยาก จนมีเพื่อนที่รู้จักันแนะนำ Docker ที่ช่วยให้การติดตั้งและจัดการฐานข้อมูลง่ายขึ้นมาก 

ในบทความนี้ จะมาแนะนำวิธีการติดตั้งฐานข้อมูลแบบง่ายๆ ด้วย Docker ที่ต้องการทดลองใช้งานฐานข้อมูลหลายๆ ตัวภายในเครื่องตัวเองโดยไม่ต้องกังวลเรื่องการตั้งค่าที่ยุ่งยาก

## ความรู้ที่จะได้รับ

การเรียนรู้การติดตั้งฐานข้อมูลด้วย Docker จะช่วยพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Docker Basics** - เรียนรู้พื้นฐานการใช้งาน Docker
- **Database Management** - เข้าใจการจัดการฐานข้อมูลเบื้องต้น
- **Container Technology** - เรียนรู้เทคโนโลยี Container ที่เป็นที่นิยมในปัจจุบัน
- **DevOps Skills** - พัฒนาทักษะด้าน DevOps เบื้องต้น
- **Infrastructure as Code** - เข้าใจแนวคิดการจัดการโครงสร้างพื้นฐานด้วยโค้ด

## สิ่งที่ต้องเตรียมก่อนเริ่มต้น

ก่อนที่จะเริ่มติดตั้งฐานข้อมูลด้วย Docker เราจะต้องเตรียมสิ่งเหล่า:

1. **คอมพิวเตอร์** - Windows 10/11, macOS, หรือ Linux (แน่นอนละว่าต้องมี)
2. **พื้นที่ว่างในฮาร์ดดิสก์** - อย่างน้อย 10 GB
3. **การเชื่อมต่ออินเทอร์เน็ต** - สำหรับดาวน์โหลด Docker และ Image
4. **พื้นฐานการใช้งาน Command Line** - เข้าใจการใช้งาน Terminal หรือ Command Prompt เบื้องต้น

## แนวคิดพื้นฐานของ Docker

ก่อนที่จะเริ่มติดตั้งฐานข้อมูล มาทำความเข้าใจแนวคิดพื้นฐานของ Docker กันก่อน:

### Docker คืออะไร?

Docker เป็นแพลตฟอร์มที่ช่วยให้เราสามารถพัฒนา จัดส่ง และรันแอปพลิเคชันในสภาพแวดล้อมที่แยกออกจากระบบหลัก เรียกว่า "Container" ซึ่งมีข้อดีคือ:
- ทำงานได้เหมือนกันในทุกสภาพแวดล้อม
- ใช้ทรัพยากรน้อยกว่า Virtual Machine
- สร้างและลบได้ง่าย ไม่ทิ้งขยะไว้ในระบบ
- มี Image สำเร็จรูปให้ใช้งานมากมาย

ซึ่งจริงๆ มันสามารถใช้งานได้หลายรูปแบบ ไม่ใช่แค่ Setup Database เช่น ใช้จำลองสภาพแวดล้อมการทำงาน เมื่อเอางานไป Deployงานต่างๆ โดยการแพ๊คไปกับ Dockerfile และเอาไปรันที่เครื่องไหนก็ได้ ที่มี Docker และ Hardware เพียงพอต่อการทำงาน ซึ่งจะลดขั้นตอนการเตรียมสภาพแวดล้อม บน DEV กับ PRD ให้เมื่อกันไปได้มากๆ เลย

### คำศัพท์พื้นฐานที่ควรรู้

- **Image** - แม่แบบที่ใช้สร้าง Container เปรียบเสมือนแผ่น CD/DVD ติดตั้งโปรแกรม
- **Container** - Instance ที่รันจาก Image เปรียบเสมือนโปรแกรมที่ติดตั้งแล้ว
- **Docker Hub** - แหล่งรวม Image สำเร็จรูป เปรียบเสมือน App Store
- **Dockerfile** - ไฟล์ที่ใช้สร้าง Image
- **Docker Compose** - เครื่องมือที่ช่วยจัดการ Container หลายๆ ตัวพร้อมกัน

![Docker Concept](/assets/images/docker-concept.png)

## การติดตั้ง Docker

### สำหรับ Windows

1. ดาวน์โหลด [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
2. ติดตั้งตามขั้นตอนที่แนะนำ
3. เปิดใช้งาน WSL 2 (Windows Subsystem for Linux) ตามที่โปรแกรมแนะนำ
4. รีสตาร์ทเครื่อง
5. เปิด Docker Desktop และรอให้สถานะเป็น "Docker is running"

### สำหรับ macOS

1. ดาวน์โหลด [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
2. ลากไอคอน Docker ไปยังโฟลเดอร์ Applications
3. เปิด Docker จากโฟลเดอร์ Applications
4. รอให้สถานะเป็น "Docker is running"

### สำหรับ Linux (Ubuntu)

```bash
# อัพเดตแพ็คเกจ
sudo apt-get update

# ติดตั้งแพ็คเกจที่จำเป็น
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

# เพิ่ม Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# เพิ่ม repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# อัพเดตแพ็คเกจอีกครั้ง
sudo apt-get update

# ติดตั้ง Docker Engine
sudo apt-get install docker-ce docker-ce-cli containerd.io

# ติดตั้ง Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# เพิ่มผู้ใช้ปัจจุบันเข้ากลุ่ม docker
sudo usermod -aG docker $USER

# รีสตาร์ท session หรือรีบูตเครื่อง
newgrp docker
```

### ทดสอบการติดตั้ง

เปิด Terminal หรือ Command Prompt และรันคำสั่ง:

```bash
docker --version
docker-compose --version
docker run hello-world
```

ถ้าทุกอย่างถูกต้อง คุณจะเห็นเวอร์ชันของ Docker และข้อความต้อนรับจาก hello-world container

## การติดตั้งฐานข้อมูลด้วย Docker

ในส่วนนี้ พี่จะแนะนำวิธีการติดตั้งฐานข้อมูลที่นิยมใช้ในงาน ด้วย Docker

### 1. MySQL

#### วิธีที่ 1: ใช้ Docker Command

```bash
# สร้าง Container MySQL
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=mypassword -e MYSQL_DATABASE=mydb -p 3306:3306 -d mysql:latest
```

คำสั่งนี้จะ:
- สร้าง Container ชื่อ `mysql-container`
- ตั้งรหัสผ่าน root เป็น `mypassword`
- สร้างฐานข้อมูลชื่อ `mydb`
- เปิด port 3306 ให้เข้าถึงได้จากเครื่องเรา
- ใช้ MySQL เวอร์ชันล่าสุด

#### วิธีที่ 2: ใช้ Docker Compose

สร้างไฟล์ `docker-compose.yml` ด้วยเนื้อหาดังนี้:

```yml
version: '3.1'

services:
  mysql_db:
    image: mysql:latest
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      - MYSQL_DATABASE=mydb
      - MYSQL_ROOT_PASSWORD=mypassword
    volumes:
      - mysql_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      - PMA_ARBITRARY=1

volumes:
  mysql_data:
```

รันคำสั่ง:

```bash
docker-compose up -d
```

คำสั่งนี้จะสร้าง:
- Container MySQL พร้อมฐานข้อมูล `mydb`
- Container phpMyAdmin ที่เข้าถึงได้ที่ http://localhost:8080
- Volume สำหรับเก็บข้อมูล MySQL ถาวร

#### การเชื่อมต่อกับ MySQL

1. **ผ่าน MySQL CLI**
```bash
# เข้าไปใน Container
docker exec -it mysql bash

# เชื่อมต่อกับ MySQL
mysql -u root -p

# ใส่รหัสผ่าน
Enter password: mypassword
```

2. **ผ่าน phpMyAdmin**
เปิดเบราว์เซอร์และไปที่ http://localhost:8080
- Username: root
- Password: mypassword

![phpMyAdmin Login](/assets/database_setup/phpmyadmin_connection.png)

### 2. PostgreSQL

#### วิธีที่ 1: ใช้ Docker Command

```bash
# สร้าง Network
docker network create pg-network

# สร้าง Container PostgreSQL
docker run --detach -it -e POSTGRES_USER="root" -e POSTGRES_PASSWORD="mypassword" -e POSTGRES_DB="mydb" -v postgres_data:/var/lib/postgresql/data -p 5432:5432 --network=pg-network --name pg-database postgres:13

# สร้าง Container pgAdmin
docker run --detach -it -e PGADMIN_DEFAULT_EMAIL="admin@admin.com" -e PGADMIN_DEFAULT_PASSWORD="mypassword" -p 8081:80 --network=pg-network --name pgadmin dpage/pgadmin4
```

#### วิธีที่ 2: ใช้ Docker Compose

สร้างไฟล์ `docker-compose.yml` ด้วยเนื้อหาดังนี้:

```yml
version: '3.1'

services:
  postgres:
    image: postgres:14.0
    container_name: postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - pg-network

  pgadmin4:
    image: dpage/pgadmin4
    container_name: pgadmin4
    restart: always
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=mypassword
    ports:
      - "8081:80"
    networks:
      - pg-network

networks:
  pg-network:

volumes:
  postgres_data:
```

รันคำสั่ง:

```bash
docker-compose up -d
```

#### การเชื่อมต่อกับ PostgreSQL

1. **ผ่าน psql**
```bash
# เข้าไปใน Container
docker exec -it postgres bash

# เชื่อมต่อกับ PostgreSQL
psql -U postgres

# หรือเชื่อมต่อกับฐานข้อมูลเฉพาะ
psql -U postgres -d mydb
```

2. **ผ่าน pgAdmin**
เปิดเบราว์เซอร์และไปที่ http://localhost:8081
- Email: admin@admin.com
- Password: mypassword

หลังจาก Login เข้าสู่ระบบแล้ว ให้เพิ่ม Server:
- คลิกขวาที่ "Servers" และเลือก "Create" > "Server..."
- ในแท็บ "General" ใส่ชื่อ Server เช่น "Local PostgreSQL"
- ในแท็บ "Connection" ใส่:
  - Host name/address: postgres (ชื่อ service ใน docker-compose)
  - Port: 5432
  - Username: postgres
  - Password: mypassword

![pgAdmin Connection](/assets/database_setup/pgadmin4_connection.png)

### 3. MongoDB

#### วิธีที่ 1: ใช้ Docker Command

```bash
# สร้าง Container MongoDB
docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=mypassword -p 27017:27017 -d mongo:latest

# สร้าง Container Mongo Express (Web UI)
docker run --name mongo-express -e ME_CONFIG_MONGODB_ADMINUSERNAME=root -e ME_CONFIG_MONGODB_ADMINPASSWORD=mypassword -e ME_CONFIG_MONGODB_URL="mongodb://root:mypassword@mongodb:27017/" --link mongodb:mongodb -p 8082:8081 -d mongo-express
```

#### วิธีที่ 2: ใช้ Docker Compose

สร้างไฟล์ `docker-compose.yml` ด้วยเนื้อหาดังนี้:

```yml
version: '3.1'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=mypassword
    volumes:
      - mongodb_data:/data/db
    networks:
      - mongo-network

  mongo-express:
    image: mongo-express
    container_name: mongo-express
    restart: always
    ports:
      - "8082:8081"
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=root
      - ME_CONFIG_MONGODB_ADMINPASSWORD=mypassword
      - ME_CONFIG_MONGODB_URL=mongodb://root:mypassword@mongodb:27017/
    networks:
      - mongo-network
    depends_on:
      - mongodb

networks:
  mongo-network:

volumes:
  mongodb_data:
```

รันคำสั่ง:

```bash
docker-compose up -d
```

#### การเชื่อมต่อกับ MongoDB

1. **ผ่าน Mongo Shell**
```bash
# เข้าไปใน Container
docker exec -it mongodb bash

# เชื่อมต่อกับ MongoDB
mongo -u root -p mypassword
```

2. **ผ่าน Mongo Express**
เปิดเบราว์เซอร์และไปที่ http://localhost:8082
- Username: root
- Password: mypassword

### 4. การติดตั้งหลายฐานข้อมูลพร้อมกัน

สร้างไฟล์ `docker-compose.yml` ด้วยเนื้อหาดังนี้:

```yml
version: '3.1'

services:
  # MySQL
  mysql:
    image: mysql:latest
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      - MYSQL_DATABASE=mydb
      - MYSQL_ROOT_PASSWORD=mypassword
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - data-network

  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      - PMA_ARBITRARY=1
    networks:
      - data-network

  # PostgreSQL
  postgres:
    image: postgres:14.0
    container_name: postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - data-network

  pgadmin4:
    image: dpage/pgadmin4
    container_name: pgadmin4
    restart: always
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=mypassword
    ports:
      - "8081:80"
    networks:
      - data-network

  # MongoDB
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=mypassword
    volumes:
      - mongodb_data:/data/db
    networks:
      - data-network

  mongo-express:
    image: mongo-express
    container_name: mongo-express
    restart: always
    ports:
      - "8082:8081"
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=root
      - ME_CONFIG_MONGODB_ADMINPASSWORD=mypassword
      - ME_CONFIG_MONGODB_URL=mongodb://root:mypassword@mongodb:27017/
    networks:
      - data-network
    depends_on:
      - mongodb

networks:
  data-network:

volumes:
  mysql_data:
  postgres_data:
  mongodb_data:
```

รันคำสั่ง:

```bash
docker-compose up -d
```

คำสั่งนี้จะสร้าง:
- MySQL + phpMyAdmin (http://localhost:8080)
- PostgreSQL + pgAdmin (http://localhost:8081)
- MongoDB + Mongo Express (http://localhost:8082)

## เทคนิคและการปรับแต่ง

### 1. การจัดการ Container

```bash
# ดูรายการ Container ที่กำลังทำงาน
docker ps

# ดูรายการ Container ทั้งหมด (รวมที่หยุดทำงาน)
docker ps -a

# หยุดการทำงานของ Container
docker stop mysql

# เริ่มการทำงานของ Container
docker start mysql

# ลบ Container
docker rm mysql

# ดูรายละเอียดของ Container
docker inspect mysql
```

### 2. การจัดการ Volume

```bash
# ดูรายการ Volume
docker volume ls

# ดูรายละเอียดของ Volume
docker volume inspect mysql_data

# ลบ Volume
docker volume rm mysql_data
```

### 3. การสำรองและกู้คืนข้อมูล

#### MySQL

```bash
# สำรองข้อมูล
docker exec mysql sh -c 'exec mysqldump -u root -p"mypassword" mydb > /var/lib/mysql/backup.sql'

# คัดลอกไฟล์สำรองออกมา
docker cp mysql:/var/lib/mysql/backup.sql ./backup.sql

# กู้คืนข้อมูล
docker exec -i mysql sh -c 'exec mysql -u root -p"mypassword" mydb' < backup.sql
```

#### PostgreSQL

```bash
# สำรองข้อมูล
docker exec postgres pg_dump -U postgres -d mydb > backup.sql

# กู้คืนข้อมูล
docker exec -i postgres psql -U postgres -d mydb < backup.sql
```

### 4. การปรับแต่งการตั้งค่า

#### MySQL

สร้างไฟล์ `my.cnf` ด้วยเนื้อหาดังนี้:

```
[mysqld]
max_connections = 100
innodb_buffer_pool_size = 256M
```

แล้วแก้ไขไฟล์ `docker-compose.yml`:

```yml
services:
  mysql:
    # ...
    volumes:
      - mysql_data:/var/lib/mysql
      - ./my.cnf:/etc/mysql/conf.d/my.cnf
```

#### PostgreSQL

สร้างไฟล์ `postgresql.conf` ด้วยเนื้อหาดังนี้:

```
max_connections = 100
shared_buffers = 256MB
```

แล้วแก้ไขไฟล์ `docker-compose.yml`:

```yml
services:
  postgres:
    # ...
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgresql.conf:/etc/postgresql/postgresql.conf
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
```

---

หลังจากนี้ เราก็จะสามารถทดลองใช้งานฐานข้อมูลหลายๆ ตัวพร้อมกันได้อย่างง่ายดาย เอาไว้ฝึกทำโปรเจค และอื่นๆ โดยไม่ต้องกังวลเรื่องการตั้งค่าที่ยุ่งยากหรือการขัดแย้งกันของโปรแกรม

นอกจากนี้ การใช้ Docker ยังช่วยให้สามารถสร้างสภาพแวดล้อมการทำงานที่เหมือนกันทุกครั้ง ไม่ว่าจะทำงานบนเครื่องไหนก็ตาม ซึ่งเป็นประโยชน์มากสำหรับการทำงานเป็นทีมหรือการย้ายระบบไปยังเซิร์ฟเวอร์จริง

หวังว่าบทความนี้จะช่วยให้ เข้าใจวิธีการติดตั้งฐานข้อมูลด้วย Docker และสามารถนำไปใช้งานได้จริงนะครับ
