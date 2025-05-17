---
layout: post
title: "Dagster สำหรับ Data Engineer: เครื่องมือ Orchestration ยุคใหม่"
date: 2025-05-12
categories: [Data Engineering, Tools]
tags: [dagster, orchestration, data pipeline, workflow, draft-A]
image: assets/images/dagster-cover.jpg
---

## Table of Contents
- [เมื่อ Airflow ไม่ตอบโจทย์ทุกอย่าง](#เมื่อ-airflow-ไม่ตอบโจทย์ทุกอย่าง)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Dagster คืออะไร?](#dagster-คืออะไร)
- [การติดตั้ง Dagster](#การติดตั้ง-dagster)
- [การใช้งาน Dagster เบื้องต้น](#การใช้งาน-dagster-เบื้องต้น)
- [เทคนิคและการตั้งค่า](#เทคนิคและการตั้งค่า)
- [สรุป](#สรุป)

## เมื่อ Airflow ไม่ตอบโจทย์ทุกอย่าง

เคยเจอปัญหาเหล่านี้มั้ย? ต้องการทดสอบ data pipeline บนเครื่องตัวเองก่อน deploy แต่ทำได้ยาก หรือต้องการติดตามข้อมูลที่ไหลผ่าน pipeline แต่ไม่มีเครื่องมือที่เหมาะสม หรือแม้แต่การจัดการ dependencies ระหว่าง tasks ที่ซับซ้อนก็ทำได้ไม่สะดวก

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่ทำงานกับ Airflow ซึ่งแม้จะเป็นเครื่องมือที่ดีและใช้กันอย่างแพร่หลาย แต่ก็มีข้อจำกัดบางอย่าง เช่น การทดสอบ pipeline ทำได้ยาก, การติดตาม data lineage ไม่สะดวก, และการจัดการ dependencies แบบ dynamic ทำได้ไม่ง่ายนัก

นี่คือจุดที่ Dagster เข้ามาแก้ปัญหาเหล่านี้ได้อย่างลงตัว!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การใช้งาน Dagster เพื่อสร้างและจัดการ data pipeline
- การออกแบบ pipeline ที่มีความยืดหยุ่นและทดสอบได้
- การติดตาม data lineage และ data quality
- การทำ local development และ testing
- การ deploy Dagster บน production

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มใช้งาน Dagster คุณควรมีสิ่งเหล่านี้:
- Python (เวอร์ชั่น 3.7 หรือสูงกว่า)
- ความรู้พื้นฐานเกี่ยวกับ Python
- ความเข้าใจพื้นฐานเกี่ยวกับ data pipeline และ workflow
- Terminal หรือ Command Line Interface
- Text editor หรือ IDE (เช่น VS Code)

## Dagster คืออะไร?

Dagster เป็นเครื่องมือ open-source สำหรับสร้างและจัดการ data pipeline ที่เน้นเรื่อง data-aware orchestration โดยมีแนวคิดหลักๆ ดังนี้:

1. **Data-Aware Orchestration**: Dagster เข้าใจข้อมูลที่ไหลผ่าน pipeline ทำให้สามารถติดตามและตรวจสอบข้อมูลได้
2. **Software-Defined Assets**: กำหนด assets (ผลลัพธ์ของการประมวลผล) แทนที่จะกำหนดแค่ tasks
3. **Testability**: ออกแบบมาให้ทดสอบได้ง่าย ทั้งในระดับ unit test และ integration test
4. **Gradual Adoption**: สามารถนำมาใช้ทีละส่วนโดยไม่ต้องเปลี่ยนทั้งระบบ
5. **Type System**: มีระบบ type checking ที่ช่วยตรวจจับปัญหาตั้งแต่ช่วง development

ข้อดีของ Dagster เมื่อเทียบกับเครื่องมืออื่นๆ:
- **Local Development**: ทดสอบ pipeline บนเครื่องตัวเองได้ง่าย
- **Data Lineage**: ติดตามการไหลของข้อมูลได้อย่างละเอียด
- **Flexible Scheduling**: กำหนดตารางเวลาได้หลากหลายรูปแบบ
- **UI ที่ทันสมัย**: มี UI ที่ใช้งานง่ายและมีข้อมูลครบถ้วน
- **Integration**: บูรณาการกับเครื่องมืออื่นๆ ได้ง่าย เช่น dbt, Spark, Pandas

## การติดตั้ง Dagster

การติดตั้ง Dagster ทำได้ง่ายๆ ผ่าน pip:

```bash
# สร้าง virtual environment
python -m venv dagster-env

# เปิดใช้งาน virtual environment
# สำหรับ Windows
dagster-env\Scripts\activate
# สำหรับ Linux/Mac
source dagster-env/bin/activate

# ติดตั้ง Dagster
pip install dagster dagster-webserver

# ติดตั้ง libraries เพิ่มเติมตามความต้องการ
pip install dagster-postgres  # สำหรับใช้ PostgreSQL เป็น storage
pip install dagster-aws  # สำหรับใช้งานกับ AWS
pip install dagster-dbt  # สำหรับใช้งานกับ dbt
```

## การใช้งาน Dagster เบื้องต้น

### 1. สร้าง Project แรก

สร้างโฟลเดอร์สำหรับ project และไฟล์พื้นฐาน:

```bash
mkdir my_dagster_project
cd my_dagster_project
```

สร้างไฟล์ `my_dagster_project/__init__.py`:

```python
# ไฟล์นี้อาจเป็นไฟล์เปล่า
```

### 2. กำหนด Assets

สร้างไฟล์ `my_dagster_project/assets.py`:

```python
import pandas as pd
from dagster import asset

@asset
def raw_customers():
    """
    ดึงข้อมูลลูกค้าจากแหล่งข้อมูลต้นทาง
    """
    # ในตัวอย่างนี้เราจะสร้างข้อมูลจำลอง
    data = {
        'customer_id': range(1, 101),
        'name': [f'Customer {i}' for i in range(1, 101)],
        'email': [f'customer{i}@example.com' for i in range(1, 101)],
        'signup_date': pd.date_range(start='2023-01-01', periods=100)
    }
    return pd.DataFrame(data)

@asset
def raw_orders():
    """
    ดึงข้อมูลคำสั่งซื้อจากแหล่งข้อมูลต้นทาง
    """
    # สร้างข้อมูลจำลอง
    data = {
        'order_id': range(1, 201),
        'customer_id': [i % 100 + 1 for i in range(1, 201)],
        'order_date': pd.date_range(start='2023-01-01', periods=200),
        'amount': [round(100 * (i % 10 + 1) + 0.99, 2) for i in range(1, 201)]
    }
    return pd.DataFrame(data)

@asset
def customer_orders(raw_customers, raw_orders):
    """
    รวมข้อมูลลูกค้าและคำสั่งซื้อ
    """
    # Join ข้อมูลลูกค้าและคำสั่งซื้อ
    df = pd.merge(raw_orders, raw_customers, on='customer_id')
    return df

@asset
def customer_stats(customer_orders):
    """
    คำนวณสถิติของลูกค้า
    """
    # Group by customer_id และคำนวณสถิติ
    stats = customer_orders.groupby('customer_id').agg(
        order_count=('order_id', 'count'),
        total_amount=('amount', 'sum'),
        avg_amount=('amount', 'mean'),
        first_order=('order_date', 'min'),
        last_order=('order_date', 'max')
    ).reset_index()
    
    # คำนวณ days_since_last_order
    stats['days_since_last_order'] = (pd.Timestamp.now() - stats['last_order']).dt.days
    
    return stats
```

### 3. กำหนด Definitions

สร้างไฟล์ `my_dagster_project/definitions.py`:

```python
from dagster import Definitions, load_assets_from_modules

from . import assets

all_assets = load_assets_from_modules([assets])

defs = Definitions(
    assets=all_assets,
)
```

### 4. รัน Dagster UI

```bash
dagster dev
```

เปิดเบราว์เซอร์และไปที่ `http://localhost:3000` เพื่อเข้าถึง Dagster UI

### 5. Materialize Assets

ใน Dagster UI:
1. ไปที่ "Assets"
2. เลือก assets ที่ต้องการ materialize (หรือเลือกทั้งหมด)
3. คลิกที่ "Materialize selected"
4. ดูผลลัพธ์และ logs ใน "Runs" tab

## เทคนิคและการตั้งค่า

### 1. การใช้ I/O Manager

I/O Manager ช่วยในการจัดการการอ่านและเขียนข้อมูลของ assets:

```python
from dagster import IOManager, io_manager
import pandas as pd
import os

class LocalParquetIOManager(IOManager):
    def __init__(self, base_path):
        self.base_path = base_path
        os.makedirs(base_path, exist_ok=True)
    
    def _get_path(self, context):
        return os.path.join(self.base_path, f"{context.asset_key.path[-1]}.parquet")
    
    def handle_output(self, context, obj):
        if isinstance(obj, pd.DataFrame):
            obj.to_parquet(self._get_path(context))
        else:
            raise TypeError(f"Unexpected output type: {type(obj)}")
    
    def load_input(self, context):
        path = self._get_path(context.upstream_output)
        return pd.read_parquet(path)

@io_manager
def local_parquet_io_manager():
    return LocalParquetIOManager("./data")

# ใน definitions.py
defs = Definitions(
    assets=all_assets,
    resources={
        "io_manager": local_parquet_io_manager,
    }
)
```

### 2. การใช้ Resources

Resources ช่วยในการจัดการการเชื่อมต่อกับระบบภายนอก:

```python
from dagster import resource
import psycopg2

@resource
def postgres_connection(context):
    conn = psycopg2.connect(
        host=context.resource_config["host"],
        port=context.resource_config["port"],
        database=context.resource_config["database"],
        user=context.resource_config["user"],
        password=context.resource_config["password"],
    )
    yield conn
    conn.close()

# ใน definitions.py
defs = Definitions(
    assets=all_assets,
    resources={
        "io_manager": local_parquet_io_manager,
        "postgres": postgres_connection.configured({
            "host": "localhost",
            "port": 5432,
            "database": "mydb",
            "user": "postgres",
            "password": "password",
        }),
    }
)

# ใน assets.py
@asset
def database_customers(context):
    conn = context.resources.postgres
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM customers")
    columns = [desc[0] for desc in cursor.description]
    data = cursor.fetchall()
    return pd.DataFrame(data, columns=columns)
```

### 3. การใช้ Schedules

กำหนดตารางเวลาในการ materialize assets:

```python
from dagster import ScheduleDefinition, define_asset_job

# กำหนด job ที่จะ materialize assets
all_assets_job = define_asset_job("all_assets_job", selection="*")

# กำหนด schedule
daily_schedule = ScheduleDefinition(
    job=all_assets_job,
    cron_schedule="0 0 * * *",  # ทุกวันเวลาเที่ยงคืน
)

# ใน definitions.py
defs = Definitions(
    assets=all_assets,
    resources={
        "io_manager": local_parquet_io_manager,
    },
    schedules=[daily_schedule],
)
```

### 4. การใช้ Sensors

Sensors ช่วยในการตรวจจับเหตุการณ์และ trigger การทำงาน:

```python
from dagster import sensor, RunRequest, SensorResult

@sensor(job=all_assets_job)
def new_file_sensor(context):
    # ตรวจสอบว่ามีไฟล์ใหม่หรือไม่
    files = os.listdir("./incoming")
    new_files = [f for f in files if f.endswith(".csv") and not context.cursor or f > context.cursor]
    
    if not new_files:
        return SensorResult(skip_reason="No new files found")
    
    # เรียงลำดับไฟล์
    new_files.sort()
    
    # สร้าง run request สำหรับแต่ละไฟล์
    run_requests = []
    for file in new_files:
        run_requests.append(
            RunRequest(
                run_key=file,
                run_config={"ops": {"process_file": {"config": {"file_path": f"./incoming/{file}"}}}},
            )
        )
    
    # อัพเดท cursor
    return SensorResult(
        run_requests=run_requests,
        cursor=new_files[-1],
    )

# ใน definitions.py
defs = Definitions(
    assets=all_assets,
    resources={
        "io_manager": local_parquet_io_manager,
    },
    schedules=[daily_schedule],
    sensors=[new_file_sensor],
)
```

### 5. การทำ Testing

Dagster ออกแบบมาให้ทดสอบได้ง่าย:

```python
# ใน tests/test_assets.py
from dagster import build_op_context, materialize
from my_dagster_project.assets import raw_customers, customer_stats

def test_raw_customers():
    # ทดสอบ asset raw_customers
    result = raw_customers()
    assert len(result) == 100
    assert "customer_id" in result.columns
    assert "name" in result.columns

def test_customer_stats():
    # ทดสอบ asset customer_stats โดยใช้ข้อมูลจำลอง
    import pandas as pd
    
    # สร้างข้อมูลจำลอง
    customer_orders_data = pd.DataFrame({
        'customer_id': [1, 1, 2],
        'order_id': [101, 102, 103],
        'amount': [100.0, 200.0, 150.0],
        'order_date': pd.to_datetime(['2023-01-01', '2023-01-15', '2023-01-10'])
    })
    
    # ทดสอบ asset
    result = customer_stats(customer_orders_data)
    
    # ตรวจสอบผลลัพธ์
    assert len(result) == 2
    assert result.loc[result['customer_id'] == 1, 'order_count'].values[0] == 2
    assert result.loc[result['customer_id'] == 1, 'total_amount'].values[0] == 300.0
    assert result.loc[result['customer_id'] == 2, 'order_count'].values[0] == 1
```

## สรุป

Dagster เป็นเครื่องมือที่ทรงพลังสำหรับ Data Engineer ที่ต้องการสร้างและจัดการ data pipeline ที่มีความยืดหยุ่น, ทดสอบได้, และติดตามได้ โดยมีจุดเด่นที่แตกต่างจากเครื่องมืออื่นๆ ดังนี้:

1. **Data-Aware Orchestration**: เข้าใจข้อมูลที่ไหลผ่าน pipeline
2. **Software-Defined Assets**: เน้นที่ผลลัพธ์ (assets) มากกว่าขั้นตอน (tasks)
3. **Testability**: ทดสอบได้ง่ายทั้งในระดับ unit test และ integration test
4. **Local Development**: พัฒนาและทดสอบบนเครื่องตัวเองได้ง่าย
5. **Modern UI**: มี UI ที่ทันสมัยและใช้งานง่าย

สำหรับ Data Engineer ที่กำลังมองหาเครื่องมือใหม่ๆ สำหรับจัดการ data pipeline Dagster เป็นตัวเลือกที่น่าสนใจ โดยเฉพาะถ้าคุณให้ความสำคัญกับการทดสอบ, การติดตาม data lineage, และการพัฒนาแบบ local-first

ลองนำ Dagster ไปใช้ในโปรเจคต่อไปของคุณดูนะครับ รับรองว่าจะช่วยให้การทำงานกับ data pipeline ของคุณเป็นระบบและมีประสิทธิภาพมากขึ้นแน่นอน!

หวังว่าบทความนี้จะเป็นประโยชน์สำหรับทุกคนที่กำลังมองหาเครื่องมือใหม่ๆ สำหรับจัดการ data pipeline นะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
