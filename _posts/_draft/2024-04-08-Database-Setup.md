---
author: Weerawat
layout: post
tags: Basic
title: 'DataBase Setup (Local)'
---
# Basic Database Setup (local)
## MySQL
การติดตั้ง Service ทั้งหมดจะขอยกตัวอย่าง 3 รูปแบบ คือ 

Service|Installer|Docker Image|Docker Compose
---|---|---|---
![MySQL](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSY8fRwNDP6MH_omT3-QKJApphTNURSg_H6c7vKVajzg&s){: style="float: right; margin-right: 1em;"}{: width="150" }|[Installer](https://dev.mysql.com/downloads/installer/)|[Docker Image](#mysql-docker-image)|[Docker Compose](#mysql-docker-compose)
![phpMyAdmin](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIaP0uU7mXPdI2hqLSQh_eT3lR5x_AGjZCOJzslpEG3Q&s){: style="float: right; margin-right: 1em;"}{: width="150" }|[Installer](https://www.phpmyadmin.net/downloads/)|[Docker Image](#phpmyadmin-docker-image)|[Docker Compose](#phpmyadmin-docker-compose)
![Adminer](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo3Gj4Mnx_hlTxAkk0ncf6KjTBLTCjQjK1Yg&s){: style="float: right; margin-right: 1em;"}{: width="150" }|[Installer](https://www.adminer.org/)|[Docker Image](#adminer-docker-image)|[Docker Compose](#adminer-docker-compose)

และ นอกจาก`phpMyAdmin`,`Adminer` และ เรายังสามารถใช้งาน [MySQL Cli](#mysql-cli) ที่ให้มากับ MySQL โดยตรงก็ได้

>**ไม่แนะนำให้ติดตั้ง Database แบบ Installer เพราะถ้าต้องการลบออก จะลบออกได้ไม่ค่อยหมด

Tip: [เปลี่ยน Pass word](#เปลี่ยน-pass-word)

### MySQL Docker Image
```bash
# Download "Container Image" ชื่อ "mysql:latest" และสร้าง Container ชื่อ "Container_Mysql"

docker run --name=Container_Mysql -e MYSQL_ROOT_PASSWORD=test1234 -e MYSQL_DATABASE=Schema_DEV -p 3306:3306 -d mysql:latest
```

```bash
# ดูรายละเอียด ของ Container ที่ชื่อ "Container_Mysql"
docker inspect Container_Mysql
```
```json
[
    {
        "Id": "e99a47b8c3cc83aa658afe510389a892a8b24200cf0ea99056285baac06a9861",
        "Created": "2024-04-08T05:32:10.241256105Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "mysqld"
            ...
            },
            "AutoRemove": false,
            }
        }
    }
]
```

---

### MySQL Docker Compose
สร้างไฟล์ yaml ชื่อ `docker-compose.yml`
```yml
version: '3.1'

services:
  mysql_db:
    image: mysql:latest
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      - MYSQL_DATABASE=stream_mysql
      # - MYSQL_USER=user
      # - MYSQL_PASSWORD=password
      - MYSQL_ROOT_PASSWORD=password
```
เปิด `cmd` และมาที่ path ดังกล่าว แล้วรัน `docker-compose up -d`

--------

### MySQL Cli
```bash
# docker exec -it <Mysql_Container_ID> bash
docker exec -it e99a47b8c3cc83aa658afe510389a892a8b24200cf0ea99056285baac06a9861 bash

# Login
mysql -u root -p

mysql> Enter password: #Password
```
![alt text](/assets/database_setup/Mysql_cli.png)

```bash
mysql> show databases;
```
![alt text](/assets/database_setup/Mysql_cli_test.png)

---

### phpMyAdmin Installer

![image.png](/assets/database_setup/MySQL_Workbench_connection.png)

---

### phpMyAdmin Docker Image

```bash
docker run --name myadmin -d --link Container_Mysql:db -p 8080:80 phpmyadmin/phpmyadmin
```

`http://localhost:8080`

![alt text](/assets/database_setup/Myadmin_console.png)

---

### phpMyAdmin Docker Compose
```yml
version: '3.1'

services:
  <...Mysql...>

  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      - PMA_ARBITRARY=1
```

![alt text](/assets/database_setup/phpmyadmin_docker-compose.png)

---

### Adminer Docker Image

```bash
docker run --link some_database:mysql -p 8080:8080 adminer
```

---

### Adminer Docker Compose

```yml
version: '3.1'

services:
  <...Mysql...>

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
    networks:
      - RTPUG-network

networks:
  RTPUG-network:
```
```bash
docker-compose up

docker-compose down
```

`http://localhost:8080`

![alt text](/assets/database_setup/adminer_login.png)
![alt text](/assets/database_setup/adminer_ui.png)

#### เปลี่ยน Pass word
```bash
# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'youpassword';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test1234';

# NOTE: use of "mysql_native_password" is not recommended: https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password
```

---

## PostgreSQL

### PostgreSQL Docker Image
```bash
docker network create pg-network

docker run --detach -it -e POSTGRES_USER="root" -e POSTGRES_PASSWORD="root" -e POSTGRES_DB="ny_taxi" -v D:/Git/Project2/PostgreSQL:/var/lib/postgresql/data -p 5432:5432 --network=pg-network --name pg-database postgres:13

docker run --detach -it -e PGADMIN_DEFAULT_EMAIL="admin@admin.com" -e PGADMIN_DEFAULT_PASSWORD="root" -p 8080:80 --network=pg-network --name pgadmin dpage/pgadmin4
```

![alt text](/assets/database_setup/pgAdmin4_Docker_Image.png)

![alt text](/assets/database_setup/see_ip_for_pgAdmin4_connection.png)

![alt text](/assets/database_setup/pgAdmin4_connection.png)

### PostgreSQL Docker Compose

```yml
version: '3.1'

services:
  postgres:
    image: postgres:14.0
    environment:
      - POSTGRES_USER=airflow
      - POSTGRES_PASSWORD=airflow
      - POSTGRES_DB=airflow
    logging:
      options:
        max-size: 10m
        max-file: "3"
    networks:
      - RTPUG-network

  pgadmin4:
    image: dpage/pgadmin4
    container_name: pgadmin4_container
    restart: always
    environment:
        - PGADMIN_DEFAULT_EMAIL=admin@admin.com
        - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - "8080:80"
    networks:
      - RTPUG-network

networks:
  RTPUG-network:
```

`http://localhost:8080`

---

## Cassandra

```yml
version: '3.1'

services:
  cassandra_db:
    image: cassandra:latest
    container_name: cassandra
    hostname: cassandra
    ports:
      - "9042:9042"
    environment:
      - MAX_HEAP_SIZE=512M
      - HEAP_NEWSIZE=100M
      - CASSANDRA_USERNAME=cassandra
      - CASSANDRA_PASSWORD=cassandra
    networks:
      - RTPUG-network

networks:
  RTPUG-network:
```