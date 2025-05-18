---
layout: post
title: "Docker สำหรับ Data Engineer: ทำไมต้องใช้และเริ่มต้นอย่างไร"
date: 2025-05-12
categories: [Data Engineering, Tools]
tags: [docker, containerization, infrastructure, deployment, draft-A]
image: assets/images/docker-cover.jpg
---

## Table of Contents
- [เมื่อการติดตั้งและรันโปรแกรมกลายเป็นฝันร้าย](#เมื่อการติดตั้งและรันโปรแกรมกลายเป็นฝันร้าย)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Docker คืออะไร?](#docker-คืออะไร)
- [ทำไม Data Engineer ต้องใช้ Docker](#ทำไม-data-engineer-ต้องใช้-docker)
- [การติดตั้งและเริ่มต้นใช้งาน Docker](#การติดตั้งและเริ่มต้นใช้งาน-docker)
- [การใช้ Docker สำหรับ Data Engineering](#การใช้-docker-สำหรับ-data-engineering)
- [เทคนิคและแนวทางปฏิบัติที่ดี](#เทคนิคและแนวทางปฏิบัติที่ดี)
- [สรุป](#สรุป)

## เมื่อการติดตั้งและรันโปรแกรมกลายเป็นฝันร้าย

เคยเจอปัญหาเหล่านี้มั้ย? ติดตั้ง Python package แล้วเกิด dependency conflict กับ package อื่น หรือโค้ดที่รันได้ดีบนเครื่องของคุณกลับรันไม่ได้บนเครื่อง production หรือต้องใช้เวลาหลายชั่วโมงในการตั้งค่าสภาพแวดล้อมใหม่ทุกครั้งที่มีคนใหม่เข้าทีม

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่ทำงานกับ data pipeline ที่มี dependencies หลายตัว บางครั้งก็ต้องใช้ Python เวอร์ชันหนึ่งสำหรับ pipeline นี้ แต่ต้องใช้อีกเวอร์ชันสำหรับอีก pipeline หนึ่ง หรือบางครั้งก็ต้องใช้ library ที่ต้องการ system dependencies เฉพาะ ทำให้การตั้งค่าสภาพแวดล้อมเป็นเรื่องที่ยุ่งยากและใช้เวลานาน

นี่คือจุดที่ Docker เข้ามาช่วยแก้ปัญหาเหล่านี้ได้อย่างลงตัว!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- ความเข้าใจเกี่ยวกับ containerization และประโยชน์ของมัน
- การใช้งาน Docker พื้นฐานสำหรับ Data Engineering
- การสร้าง Docker image สำหรับ data pipeline
- การใช้ Docker Compose เพื่อจัดการหลาย containers
- การ deploy data applications ด้วย Docker
- การทำ CI/CD กับ Docker

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มเรียนรู้เกี่ยวกับ Docker คุณควรมีสิ่งเหล่านี้:
- คอมพิวเตอร์ที่รัน Windows, macOS, หรือ Linux
- ความรู้พื้นฐานเกี่ยวกับ command line
- ความเข้าใจพื้นฐานเกี่ยวกับ data pipeline
- พื้นที่ว่างบนดิสก์อย่างน้อย 10GB

## Docker คืออะไร?

Docker คือแพลตฟอร์มที่ช่วยให้คุณสามารถพัฒนา, ส่งมอบ, และรันแอปพลิเคชันในรูปแบบของ containers ซึ่ง container คือหน่วยของซอฟต์แวร์ที่แพ็คโค้ด และ dependencies ทั้งหมดเข้าด้วยกัน ทำให้แอปพลิเคชันสามารถทำงานได้อย่างรวดเร็วและเชื่อถือได้ในสภาพแวดล้อมการคอมพิวติ้งที่แตกต่างกัน

### แนวคิดพื้นฐานของ Docker:

1. **Container**: หน่วยของซอฟต์แวร์ที่แพ็คโค้ดและ dependencies ทั้งหมดเข้าด้วยกัน
2. **Image**: Template ที่ใช้สร้าง container ประกอบด้วยโค้ด, runtime, libraries, environment variables, และ configuration files
3. **Dockerfile**: ไฟล์ที่ใช้กำหนดวิธีการสร้าง Docker image
4. **Registry**: ที่เก็บ Docker images เช่น Docker Hub
5. **Docker Engine**: Core ของ Docker ที่ทำหน้าที่สร้างและรัน containers

### ข้อดีของ Docker:

1. **Consistency**: รันได้เหมือนกันทุกที่ ไม่ว่าจะเป็นเครื่อง development, testing, หรือ production
2. **Isolation**: แยก dependencies และ configurations ของแต่ละแอปพลิเคชัน
3. **Portability**: ย้ายไปรันบนเครื่องหรือคลาวด์ไหนก็ได้
4. **Efficiency**: ใช้ทรัพยากรน้อยกว่า virtual machines
5. **Scalability**: ขยายขนาดได้ง่าย

## ทำไม Data Engineer ต้องใช้ Docker

Data Engineer มีความจำเป็นต้องใช้ Docker ด้วยเหตุผลหลายประการ:

### 1. จัดการกับ Dependencies ที่ซับซ้อน

Data pipeline มักมี dependencies ที่ซับซ้อน เช่น Python packages, system libraries, และ external services Docker ช่วยให้สามารถแพ็คทุกอย่างเข้าด้วยกันและรันได้อย่างสม่ำเสมอ

### 2. ทำให้ Data Pipeline เป็น Reproducible

การใช้ Docker ทำให้ data pipeline สามารถรันได้เหมือนกันทุกครั้ง ไม่ว่าจะรันที่ไหนหรือเมื่อไร ซึ่งเป็นสิ่งสำคัญสำหรับการทำ reproducible data science

### 3. ง่ายต่อการ Scale

Docker ทำให้การ scale data pipeline ทำได้ง่ายขึ้น โดยสามารถรัน containers หลายตัวพร้อมกันบนหลายเครื่อง

### 4. ทำงานร่วมกับ Orchestration Tools

Docker ทำงานร่วมกับ orchestration tools เช่น Kubernetes, Docker Swarm, หรือ Amazon ECS ได้ดี ทำให้สามารถจัดการ data pipeline ขนาดใหญ่ได้อย่างมีประสิทธิภาพ

### 5. ทดสอบได้ง่าย

Docker ทำให้การทดสอบ data pipeline ทำได้ง่ายขึ้น โดยสามารถสร้างสภาพแวดล้อมการทดสอบที่เหมือนกับ production ได้อย่างรวดเร็ว

## การติดตั้งและเริ่มต้นใช้งาน Docker

### 1. ติดตั้ง Docker

#### สำหรับ Windows:
1. ดาวน์โหลด Docker Desktop for Windows จาก [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
2. รันไฟล์ติดตั้งและทำตามขั้นตอน
3. เริ่มต้น Docker Desktop

#### สำหรับ macOS:
1. ดาวน์โหลด Docker Desktop for Mac จาก [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
2. รันไฟล์ติดตั้งและทำตามขั้นตอน
3. เริ่มต้น Docker Desktop

#### สำหรับ Linux (Ubuntu):
```bash
# อัพเดท package index
sudo apt-get update

# ติดตั้ง packages ที่จำเป็น
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

# เพิ่ม Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# ตั้งค่า stable repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# อัพเดท package index อีกครั้ง
sudo apt-get update

# ติดตั้ง Docker Engine
sudo apt-get install docker-ce docker-ce-cli containerd.io

# เพิ่ม user ปัจจุบันเข้ากลุ่ม docker
sudo usermod -aG docker $USER

# รีสตาร์ท shell หรือ logout และ login อีกครั้ง
```

### 2. ทดสอบการติดตั้ง

```bash
# ตรวจสอบเวอร์ชัน Docker
docker --version

# รัน hello-world container เพื่อทดสอบ
docker run hello-world
```

### 3. คำสั่งพื้นฐานของ Docker

```bash
# ดู images ทั้งหมด
docker images

# ดู containers ที่กำลังรัน
docker ps

# ดู containers ทั้งหมด (รวมที่หยุดแล้ว)
docker ps -a

# ดาวน์โหลด image จาก Docker Hub
docker pull python:3.9

# รัน container
docker run -it python:3.9 bash

# หยุด container
docker stop <container_id>

# ลบ container
docker rm <container_id>

# ลบ image
docker rmi <image_id>
```

## การใช้ Docker สำหรับ Data Engineering

### 1. สร้าง Docker Image สำหรับ Python Data Pipeline

#### 1.1 สร้าง Dockerfile

```dockerfile
# ใช้ Python 3.9 เป็น base image
FROM python:3.9-slim

# ตั้งค่า working directory
WORKDIR /app

# ติดตั้ง dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy โค้ด
COPY . .

# รัน script เมื่อ container เริ่มต้น
CMD ["python", "pipeline.py"]
```

#### 1.2 สร้างไฟล์ requirements.txt

```
pandas==1.3.5
numpy==1.21.5
scikit-learn==1.0.2
matplotlib==3.5.1
```

#### 1.3 สร้างไฟล์ pipeline.py

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import os
import time

def main():
    print("Starting data pipeline...")
    
    # สร้างข้อมูลจำลอง
    np.random.seed(42)
    data = {
        'feature1': np.random.rand(1000),
        'feature2': np.random.rand(1000),
        'feature3': np.random.rand(1000),
        'target': np.random.randint(0, 2, 1000)
    }
    
    df = pd.DataFrame(data)
    print(f"Data shape: {df.shape}")
    
    # แบ่งข้อมูลเป็น train และ test
    X = df[['feature1', 'feature2', 'feature3']]
    y = df['target']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print(f"Train shape: {X_train.shape}")
    print(f"Test shape: {X_test.shape}")
    
    # สร้างโฟลเดอร์สำหรับเก็บผลลัพธ์
    os.makedirs('output', exist_ok=True)
    
    # บันทึกข้อมูล
    df.to_csv('output/data.csv', index=False)
    
    # สร้างกราฟ
    plt.figure(figsize=(10, 6))
    plt.scatter(df['feature1'], df['feature2'], c=df['target'])
    plt.title('Feature1 vs Feature2')
    plt.xlabel('Feature1')
    plt.ylabel('Feature2')
    plt.savefig('output/scatter_plot.png')
    
    print("Pipeline completed successfully!")

if __name__ == "__main__":
    start_time = time.time()
    main()
    end_time = time.time()
    print(f"Pipeline execution time: {end_time - start_time:.2f} seconds")
```

#### 1.4 สร้าง Docker Image

```bash
# สร้าง image
docker build -t my-data-pipeline .

# ตรวจสอบว่า image ถูกสร้างแล้ว
docker images
```

#### 1.5 รัน Docker Container

```bash
# รัน container และ mount โฟลเดอร์ output
docker run -v $(pwd)/output:/app/output my-data-pipeline
```

### 2. ใช้ Docker Compose สำหรับ Data Stack

Docker Compose ช่วยให้สามารถกำหนดและรันหลาย containers พร้อมกันได้

#### 2.1 สร้างไฟล์ docker-compose.yml

```yaml
version: '3'

services:
  # PostgreSQL database
  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: datauser
      POSTGRES_PASSWORD: datapass
      POSTGRES_DB: datadb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - data_network

  # Jupyter Notebook
  jupyter:
    build:
      context: ./jupyter
      dockerfile: Dockerfile
    ports:
      - "8888:8888"
    volumes:
      - ./notebooks:/home/jovyan/work
    networks:
      - data_network
    depends_on:
      - postgres

  # Data pipeline
  pipeline:
    build:
      context: ./pipeline
      dockerfile: Dockerfile
    volumes:
      - ./pipeline:/app
      - ./output:/app/output
    networks:
      - data_network
    depends_on:
      - postgres

networks:
  data_network:

volumes:
  postgres_data:
```

#### 2.2 สร้างโฟลเดอร์และไฟล์ที่จำเป็น

```bash
# สร้างโฟลเดอร์
mkdir -p jupyter pipeline notebooks output

# สร้าง Dockerfile สำหรับ Jupyter
cat > jupyter/Dockerfile << EOF
FROM jupyter/scipy-notebook:latest

USER root

# ติดตั้ง PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

USER jovyan

# ติดตั้ง Python packages
RUN pip install --no-cache-dir \
    pandas \
    numpy \
    scikit-learn \
    matplotlib \
    psycopg2-binary \
    sqlalchemy

# เปิด Jupyter Notebook
CMD ["start-notebook.sh", "--NotebookApp.token=''", "--NotebookApp.password=''"]
EOF

# สร้าง Dockerfile สำหรับ pipeline
cat > pipeline/Dockerfile << EOF
FROM python:3.9-slim

WORKDIR /app

# ติดตั้ง dependencies
RUN pip install --no-cache-dir \
    pandas \
    numpy \
    scikit-learn \
    matplotlib \
    psycopg2-binary \
    sqlalchemy

# รัน script เมื่อ container เริ่มต้น
CMD ["python", "pipeline.py"]
EOF

# สร้างไฟล์ pipeline.py
cat > pipeline/pipeline.py << EOF
import pandas as pd
import numpy as np
from sqlalchemy import create_engine
import time
import os

def main():
    print("Starting data pipeline...")
    
    # สร้างข้อมูลจำลอง
    np.random.seed(42)
    data = {
        'feature1': np.random.rand(1000),
        'feature2': np.random.rand(1000),
        'feature3': np.random.rand(1000),
        'target': np.random.randint(0, 2, 1000)
    }
    
    df = pd.DataFrame(data)
    print(f"Data shape: {df.shape}")
    
    # เชื่อมต่อกับ PostgreSQL
    try:
        # รอให้ PostgreSQL พร้อมใช้งาน
        time.sleep(10)
        
        engine = create_engine('postgresql://datauser:datapass@postgres:5432/datadb')
        
        # บันทึกข้อมูลลง PostgreSQL
        df.to_sql('sample_data', engine, if_exists='replace', index=False)
        print("Data saved to PostgreSQL successfully!")
        
        # ตรวจสอบว่าข้อมูลถูกบันทึกแล้ว
        result = pd.read_sql("SELECT COUNT(*) FROM sample_data", engine)
        print(f"Number of rows in database: {result.iloc[0, 0]}")
        
    except Exception as e:
        print(f"Error connecting to PostgreSQL: {e}")
    
    # สร้างโฟลเดอร์สำหรับเก็บผลลัพธ์
    os.makedirs('/app/output', exist_ok=True)
    
    # บันทึกข้อมูล
    df.to_csv('/app/output/data.csv', index=False)
    
    print("Pipeline completed successfully!")

if __name__ == "__main__":
    start_time = time.time()
    main()
    end_time = time.time()
    print(f"Pipeline execution time: {end_time - start_time:.2f} seconds")
EOF
```

#### 2.3 รัน Docker Compose

```bash
# รัน containers
docker-compose up -d

# ตรวจสอบสถานะ
docker-compose ps

# ดู logs
docker-compose logs

# หยุด containers
docker-compose down
```

## เทคนิคและแนวทางปฏิบัติที่ดี

### 1. ใช้ Multi-stage Builds เพื่อลดขนาด Image

```dockerfile
# Build stage
FROM python:3.9 AS builder

WORKDIR /app

# ติดตั้ง build dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Final stage
FROM python:3.9-slim

WORKDIR /app

# Copy เฉพาะสิ่งที่จำเป็น
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY . .

CMD ["python", "pipeline.py"]
```

### 2. ใช้ .dockerignore เพื่อลดขนาด Context

```
# .dockerignore
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
*.egg-info/
.installed.cfg
*.egg
.git/
.gitignore
.env
.venv
venv/
ENV/
```

### 3. ใช้ Non-root User เพื่อความปลอดภัย

```dockerfile
FROM python:3.9-slim

# สร้าง non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# เปลี่ยนเจ้าของไฟล์
RUN chown -R appuser:appuser /app

# เปลี่ยนไปใช้ non-root user
USER appuser

CMD ["python", "pipeline.py"]
```

### 4. ใช้ Environment Variables สำหรับ Configuration

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# กำหนด environment variables
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_USER=datauser
ENV DB_PASSWORD=datapass
ENV DB_NAME=datadb

CMD ["python", "pipeline.py"]
```

```python
# pipeline.py
import os

# อ่าน environment variables
db_host = os.environ.get('DB_HOST', 'localhost')
db_port = os.environ.get('DB_PORT', '5432')
db_user = os.environ.get('DB_USER', 'postgres')
db_password = os.environ.get('DB_PASSWORD', 'postgres')
db_name = os.environ.get('DB_NAME', 'postgres')

# สร้าง connection string
connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
```

### 5. ใช้ Docker Volumes สำหรับ Persistent Data

```bash
# สร้าง volume
docker volume create my_data_volume

# รัน container กับ volume
docker run -v my_data_volume:/app/data my-data-pipeline
```

## สรุป

Docker เป็นเครื่องมือที่มีประโยชน์อย่างมากสำหรับ Data Engineer ช่วยให้สามารถจัดการกับ dependencies ที่ซับซ้อน, ทำให้ data pipeline เป็น reproducible, ง่ายต่อการ scale, ทำงานร่วมกับ orchestration tools ได้ดี, และทดสอบได้ง่าย

ในบทความนี้ เราได้เรียนรู้เกี่ยวกับ:
- พื้นฐานของ Docker และประโยชน์ของมันสำหรับ Data Engineer
- การติดตั้งและเริ่มต้นใช้งาน Docker
- การสร้าง Docker image สำหรับ Python data pipeline
- การใช้ Docker Compose สำหรับ data stack
- เทคนิคและแนวทางปฏิบัติที่ดีในการใช้ Docker

การนำ Docker มาใช้ในงาน Data Engineering จะช่วยให้การพัฒนาและ deploy data pipeline เป็นเรื่องที่ง่ายขึ้น, ลดปัญหา "works on my machine", และเพิ่มประสิทธิภาพในการทำงานร่วมกันในทีม

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจพื้นฐานของ Docker และสามารถนำไปประยุกต์ใช้ในงาน Data Engineering ได้อย่างมีประสิทธิภาพนะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
