---
author: Weerawat
layout: post
tags: Basic
title: 'ETL with python'
---

## ETL with python
refer to "Basic Database Setup" create Mysql,PostgreSQL with docker-compose
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
    networks:
      - ETL-network

  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      - PMA_ARBITRARY=1
    networks:
      - ETL-network

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
      - ETL-network

  pgadmin4:
    image: dpage/pgadmin4
    container_name: pgadmin4_container
    restart: always
    environment:
        - PGADMIN_DEFAULT_EMAIL=admin@admin.com
        - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - "8081:80"
    networks:
      - ETL-network

networks:
    ETL-network:
```

Build container by command `docker-compose up -d`

go to phpmyadmin `http://localhost:8080`
    ![alt text](/assets/Basic_ETL/phpmyadmin_connection.png)
go to pgadmin4 `http://localhost:8081`
    ![alt text](/assets/Basic_ETL/pgadmin4_connection.png)

create venv for python
```bash
python - m venv env


.\env\Scripts\activate
```