---
layout: post
title: "Airflow สำหรับ Data Engineer: จัดการ Data Pipeline อย่างมืออาชีพ"
date: 2025-05-12
categories: [Data Engineering, Tools]
tags: [airflow, data pipeline, workflow, orchestration, draft-A]
image: assets/images/airflow-cover.jpg
---

## Table of Contents
- [Table of Contents](#table-of-contents)
- [เมื่อ Cron Job ไม่เพียงพออีกต่อไป](#เมื่อ-cron-job-ไม่เพียงพออีกต่อไป)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Airflow คืออะไร?](#airflow-คืออะไร)
- [การติดตั้ง Airflow](#การติดตั้ง-airflow)
  - [วิธีที่ 1: ติดตั้งด้วย Docker Compose](#วิธีที่-1-ติดตั้งด้วย-docker-compose)
  - [วิธีที่ 2: ติดตั้งด้วย pip](#วิธีที่-2-ติดตั้งด้วย-pip)
- [การใช้งาน Airflow เบื้องต้น](#การใช้งาน-airflow-เบื้องต้น)
  - [1. สร้าง DAG แรกของคุณ](#1-สร้าง-dag-แรกของคุณ)
  - [2. เปิด Airflow UI](#2-เปิด-airflow-ui)
  - [3. เปิดใช้งาน DAG](#3-เปิดใช้งาน-dag)
- [เทคนิคและการตั้งค่า](#เทคนิคและการตั้งค่า)
  - [1. การใช้ Sensor เพื่อรอข้อมูล](#1-การใช้-sensor-เพื่อรอข้อมูล)
  - [2. การใช้ Variable เพื่อเก็บค่าคงที่](#2-การใช้-variable-เพื่อเก็บค่าคงที่)
  - [3. การใช้ Connection เพื่อเชื่อมต่อกับระบบอื่น](#3-การใช้-connection-เพื่อเชื่อมต่อกับระบบอื่น)
  - [4. การใช้ XCom เพื่อส่งข้อมูลระหว่าง Tasks](#4-การใช้-xcom-เพื่อส่งข้อมูลระหว่าง-tasks)
  - [5. การใช้ TaskGroup เพื่อจัดกลุ่ม Tasks](#5-การใช้-taskgroup-เพื่อจัดกลุ่ม-tasks)
- [สรุป](#สรุป)

## เมื่อ Cron Job ไม่เพียงพออีกต่อไป

เคยเจอปัญหาเหล่านี้มั้ย? ต้องเขียน script หลายๆ ตัวที่ต้องทำงานตามลำดับ แต่ไม่รู้ว่าจะจัดการยังไงให้มันทำงานอัตโนมัติ หรือเวลา script ตัวใดตัวหนึ่งทำงานผิดพลาด ก็ไม่รู้ว่าจะจัดการยังไง หรือต้องการดู log การทำงานแต่ละขั้นตอน แต่ไม่รู้ว่าจะดูยังไง

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่เริ่มทำงานกับ data pipeline ที่มีหลายขั้นตอน ตอนแรกก็ใช้ cron job ธรรมดา แต่พอ pipeline เริ่มซับซ้อนขึ้น ก็เริ่มมีปัญหา ทั้งเรื่องการจัดการ dependency ระหว่าง task, การ retry เมื่อเกิด error, การ monitor การทำงาน และอื่นๆ อีกมากมาย

นี่คือจุดที่ Apache Airflow เข้ามาช่วยแก้ปัญหาเหล่านี้ได้อย่างลงตัว!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การออกแบบและสร้าง data pipeline ด้วย Airflow
- การจัดการ workflow และ task dependency
- การ schedule และ trigger การทำงานของ pipeline
- การ monitor และ debug data pipeline
- การใช้ Airflow operators ต่างๆ
- การจัดการ error และ retry mechanism

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มใช้งาน Airflow คุณควรมีสิ่งเหล่านี้:
- Python (เวอร์ชั่น 3.6 หรือสูงกว่า)
- ความรู้พื้นฐานเกี่ยวกับ Python
- ความเข้าใจพื้นฐานเกี่ยวกับ data pipeline
- Docker (ถ้าต้องการใช้ Docker สำหรับการติดตั้ง)
- Terminal หรือ Command Line Interface
- Text editor หรือ IDE (เช่น VS Code)

## Airflow คืออะไร?

Apache Airflow คือเครื่องมือที่ใช้สำหรับจัดการ workflow และ orchestrate data pipeline โดยใช้ Python เป็นภาษาหลักในการกำหนด workflow ทำให้สามารถสร้าง pipeline ที่ซับซ้อนได้อย่างยืดหยุ่น

Airflow มีแนวคิดหลักๆ ดังนี้:
- **DAG (Directed Acyclic Graph)**: คือ workflow ที่กำหนดลำดับการทำงานของ tasks
- **Operator**: คือ template สำหรับ task ที่ต้องการทำ เช่น PythonOperator, BashOperator
- **Task**: คือ unit ย่อยที่สุดของการทำงานใน Airflow
- **Task Instance**: คือ instance ของ task ที่ทำงานในช่วงเวลาหนึ่งๆ
- **Scheduler**: คือส่วนที่จัดการการทำงานของ tasks ตาม schedule ที่กำหนด
- **Executor**: คือส่วนที่กำหนดว่า task จะถูกรันที่ไหนและอย่างไร

ข้อดีของ Airflow คือ มันเป็น open-source, มีความยืดหยุ่นสูง, มี UI สำหรับ monitor และ debug, และมี community ขนาดใหญ่ที่พัฒนาและสนับสนุน

## การติดตั้ง Airflow

การติดตั้ง Airflow ทำได้หลายวิธี แต่วิธีที่ง่ายที่สุดคือการใช้ Docker:

### วิธีที่ 1: ติดตั้งด้วย Docker Compose

1. สร้างไฟล์ `docker-compose.yaml`:

```yaml
version: '3'
x-airflow-common:
  &airflow-common
  image: apache/airflow:2.7.1
  environment:
    &airflow-common-env
    AIRFLOW__CORE__EXECUTOR: LocalExecutor
    AIRFLOW__CORE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    AIRFLOW__CORE__FERNET_KEY: ''
    AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'true'
    AIRFLOW__CORE__LOAD_EXAMPLES: 'false'
  volumes:
    - ./dags:/opt/airflow/dags
    - ./logs:/opt/airflow/logs
    - ./plugins:/opt/airflow/plugins
  depends_on:
    &airflow-common-depends-on
    postgres:
      condition: service_healthy

services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: airflow
      POSTGRES_PASSWORD: airflow
      POSTGRES_DB: airflow
    volumes:
      - postgres-db-volume:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "airflow"]
      interval: 5s
      retries: 5
    restart: always

  airflow-webserver:
    <<: *airflow-common
    command: webserver
    ports:
      - 8080:8080
    healthcheck:
      test: ["CMD", "curl", "--fail", "http://localhost:8080/health"]
      interval: 10s
      timeout: 10s
      retries: 5
    restart: always
    depends_on:
      <<: *airflow-common-depends-on
      airflow-init:
        condition: service_completed_successfully

  airflow-scheduler:
    <<: *airflow-common
    command: scheduler
    restart: always
    depends_on:
      <<: *airflow-common-depends-on
      airflow-init:
        condition: service_completed_successfully

  airflow-init:
    <<: *airflow-common
    entrypoint: /bin/bash
    command:
      - -c
      - |
        function ver() {
          printf "%04d%04d%04d%04d" $${1//./ }
        }
        airflow_version=$$(gosu airflow airflow version)
        airflow_version_comparable=$$(ver $${airflow_version})
        min_airflow_version=2.2.0
        min_airflow_version_comparable=$$(ver $${min_airflow_version})
        if (( airflow_version_comparable < min_airflow_version_comparable )); then
          echo
          echo -e "\033[1;31mERROR!!!: Too old Airflow version $${airflow_version}!\e[0m"
          echo "The minimum Airflow version supported: $${min_airflow_version}. Only use this or higher!"
          echo
          exit 1
        fi
        if [[ -z "${AIRFLOW_UID}" ]]; then
          echo
          echo -e "\033[1;33mWARNING!!!: AIRFLOW_UID not set!\e[0m"
          echo "If you are on Linux, you SHOULD follow the instructions below to set "
          echo "AIRFLOW_UID environment variable, otherwise files will be owned by root."
          echo "For other operating systems you can get rid of the warning with manually created .env file:"
          echo "    See: https://airflow.apache.org/docs/apache-airflow/stable/start/docker.html#setting-the-right-airflow-user"
          echo
        fi
        one_meg=1048576
        mem_available=$$(($$(getconf _PHYS_PAGES) * $$(getconf PAGE_SIZE) / one_meg))
        cpus_available=$$(grep -c ^processor /proc/cpuinfo)
        disk_available=$$(df / | tail -1 | awk '{print $$4}')
        disk_available=$$(($${disk_available} / one_meg))
        if (( mem_available < 4000 )) ; then
          echo
          echo -e "\033[1;33mWARNING!!!: Not enough memory available for Docker.\e[0m"
          echo "At least 4GB of memory required. You have $$(numfmt --to iec $$((mem_available * one_meg)))"
          echo
        fi
        if (( cpus_available < 2 )); then
          echo
          echo -e "\033[1;33mWARNING!!!: Not enough CPUS available for Docker.\e[0m"
          echo "At least 2 CPUs recommended. You have $${cpus_available}"
          echo
        fi
        if (( disk_available < 10000 )); then
          echo
          echo -e "\033[1;33mWARNING!!!: Not enough Disk space available for Docker.\e[0m"
          echo "At least 10 GBs recommended. You have $$(numfmt --to iec $$((disk_available * one_meg)))"
          echo
        fi
        mkdir -p /sources/logs /sources/dags /sources/plugins
        chown -R "${AIRFLOW_UID}:0" /sources/{logs,dags,plugins}
        exec /entrypoint airflow version

volumes:
  postgres-db-volume:
```

2. สร้างโฟลเดอร์สำหรับ DAGs, logs และ plugins:

```bash
mkdir -p ./dags ./logs ./plugins
```

3. รัน Docker Compose:

```bash
docker-compose up -d
```

### วิธีที่ 2: ติดตั้งด้วย pip

```bash
# สร้าง virtual environment
python -m venv airflow-env

# เปิดใช้งาน virtual environment
# สำหรับ Windows
airflow-env\Scripts\activate
# สำหรับ Linux/Mac
source airflow-env/bin/activate

# ติดตั้ง Airflow
pip install apache-airflow

# ตั้งค่า Airflow home directory
export AIRFLOW_HOME=~/airflow

# สร้าง Airflow database
airflow db init

# สร้าง user
airflow users create \
    --username admin \
    --firstname Admin \
    --lastname User \
    --role Admin \
    --email admin@example.com \
    --password admin

# เริ่มต้น Airflow webserver
airflow webserver --port 8080

# เปิด terminal อีกอันและเริ่มต้น Airflow scheduler
airflow scheduler
```

## การใช้งาน Airflow เบื้องต้น

### 1. สร้าง DAG แรกของคุณ

สร้างไฟล์ `dags/my_first_dag.py`:

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator

# Default arguments สำหรับ DAG
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# สร้าง DAG
dag = DAG(
    'my_first_dag',
    default_args=default_args,
    description='A simple DAG',
    schedule_interval=timedelta(days=1),
    start_date=datetime(2025, 5, 1),
    catchup=False,
    tags=['example'],
)

# สร้าง task ที่ใช้ BashOperator
t1 = BashOperator(
    task_id='print_date',
    bash_command='date',
    dag=dag,
)

# สร้างฟังก์ชัน Python สำหรับ PythonOperator
def print_hello():
    return 'Hello from Airflow!'

# สร้าง task ที่ใช้ PythonOperator
t2 = PythonOperator(
    task_id='print_hello',
    python_callable=print_hello,
    dag=dag,
)

# กำหนด dependency ระหว่าง tasks
t1 >> t2  # t1 ต้องทำงานเสร็จก่อน t2
```

### 2. เปิด Airflow UI

เปิดเบราว์เซอร์และไปที่ `http://localhost:8080`

- Username: admin
- Password: admin (หรือตามที่คุณตั้งไว้)

### 3. เปิดใช้งาน DAG

1. ไปที่หน้า DAGs
2. ค้นหา DAG ชื่อ "my_first_dag"
3. เปิดสวิตช์เพื่อเปิดใช้งาน DAG
4. คลิกที่ชื่อ DAG เพื่อดูรายละเอียด
5. คลิกที่ปุ่ม "Trigger DAG" เพื่อรัน DAG ทันที

## เทคนิคและการตั้งค่า

### 1. การใช้ Sensor เพื่อรอข้อมูล

```python
from airflow.sensors.filesystem import FileSensor

wait_for_file = FileSensor(
    task_id='wait_for_file',
    filepath='/path/to/file',
    fs_conn_id='fs_default',
    poke_interval=60,  # ตรวจสอบทุก 60 วินาที
    timeout=3600,  # timeout หลังจาก 1 ชั่วโมง
    dag=dag,
)
```

### 2. การใช้ Variable เพื่อเก็บค่าคงที่

```python
from airflow.models import Variable

# ตั้งค่า Variable ผ่าน UI หรือ CLI ก่อน
# airflow variables set data_path /path/to/data

data_path = Variable.get("data_path")

process_data = BashOperator(
    task_id='process_data',
    bash_command=f'python /scripts/process.py --input {data_path}',
    dag=dag,
)
```

### 3. การใช้ Connection เพื่อเชื่อมต่อกับระบบอื่น

```python
from airflow.providers.postgres.operators.postgres import PostgresOperator

create_table = PostgresOperator(
    task_id='create_table',
    postgres_conn_id='postgres_default',  # ตั้งค่า connection ผ่าน UI ก่อน
    sql="""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100)
        );
    """,
    dag=dag,
)
```

### 4. การใช้ XCom เพื่อส่งข้อมูลระหว่าง Tasks

```python
def extract_data(**kwargs):
    data = {"count": 42, "message": "Hello"}
    kwargs['ti'].xcom_push(key='extracted_data', value=data)
    return "Data extracted"

def process_data(**kwargs):
    ti = kwargs['ti']
    data = ti.xcom_pull(task_ids='extract_data', key='extracted_data')
    count = data['count']
    message = data['message']
    return f"Processed data: {message} (count: {count})"

extract = PythonOperator(
    task_id='extract_data',
    python_callable=extract_data,
    provide_context=True,
    dag=dag,
)

process = PythonOperator(
    task_id='process_data',
    python_callable=process_data,
    provide_context=True,
    dag=dag,
)

extract >> process
```

### 5. การใช้ TaskGroup เพื่อจัดกลุ่ม Tasks

```python
from airflow.utils.task_group import TaskGroup

with TaskGroup(group_id='process_group', dag=dag) as process_group:
    task1 = BashOperator(
        task_id='task1',
        bash_command='echo "Task 1"',
    )
    
    task2 = BashOperator(
        task_id='task2',
        bash_command='echo "Task 2"',
    )
    
    task1 >> task2

extract >> process_group >> load
```

## สรุป

Apache Airflow เป็นเครื่องมือที่ทรงพลังสำหรับการจัดการ data pipeline ที่ช่วยให้ Data Engineer สามารถออกแบบ, จัดการ, และ monitor workflow ได้อย่างมีประสิทธิภาพ

สำหรับ Data Engineer มือใหม่ การเริ่มต้นใช้ Airflow อาจจะดูซับซ้อนในตอนแรก แต่เมื่อเข้าใจแนวคิดพื้นฐานแล้ว คุณจะเห็นว่ามันช่วยให้การจัดการ pipeline ง่ายขึ้นมาก โดยเฉพาะเมื่อ pipeline เริ่มซับซ้อนขึ้น

ข้อดีของ Airflow คือ:
- ใช้ Python ในการกำหนด workflow ทำให้มีความยืดหยุ่นสูง
- มี UI ที่ช่วยให้ monitor และ debug ได้ง่าย
- มี operators และ hooks มากมายที่รองรับการทำงานกับระบบต่างๆ
- มี community ขนาดใหญ่ที่พัฒนาและสนับสนุน
- รองรับการทำงานแบบ distributed

ลองนำ Airflow ไปใช้ในโปรเจคต่อไปของคุณดูนะครับ รับรองว่าจะช่วยให้การจัดการ data pipeline ของคุณเป็นระบบและมีประสิทธิภาพมากขึ้นแน่นอน!

หวังว่าบทความนี้จะเป็นประโยชน์สำหรับทุกคนที่กำลังมองหาวิธีจัดการ data pipeline ให้เป็นระบบมากขึ้นนะครับ
