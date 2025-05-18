---
layout: post
title: "Data Quality สำหรับ Data Engineer: ทำอย่างไรให้ข้อมูลน่าเชื่อถือ"
date: 2025-05-12
categories: [Data Engineering, Best Practices]
tags: [data quality, testing, monitoring, validation, draft-A]
image: assets/images/data-quality-cover.jpg
---

## Table of Contents
- [เมื่อไม่มีใครเชื่อถือข้อมูลของคุณ](#เมื่อไม่มีใครเชื่อถือข้อมูลของคุณ)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Data Quality คืออะไร?](#data-quality-คืออะไร)
- [ทำไม Data Quality ถึงสำคัญ](#ทำไม-data-quality-ถึงสำคัญ)
- [การวัดและประเมิน Data Quality](#การวัดและประเมิน-data-quality)
- [เครื่องมือและเทคนิคสำหรับ Data Quality](#เครื่องมือและเทคนิคสำหรับ-data-quality)
- [การสร้างวัฒนธรรม Data Quality](#การสร้างวัฒนธรรม-data-quality)
- [สรุป](#สรุป)

## เมื่อไม่มีใครเชื่อถือข้อมูลของคุณ

เคยเจอสถานการณ์แบบนี้มั้ย? คุณสร้าง dashboard สวยงามเพื่อนำเสนอข้อมูลสำคัญให้ผู้บริหาร แต่กลับถูกตั้งคำถามว่า "ข้อมูลนี้เชื่อถือได้หรือเปล่า?" หรือแย่กว่านั้น คุณอาจจะได้ยินประโยคที่ว่า "ตัวเลขนี้ไม่ตรงกับที่ฝ่ายการเงินรายงาน" หรือ "ข้อมูลนี้ดูแปลกๆ นะ ไม่น่าจะถูกต้อง"

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่เริ่มทำงานเป็น Data Engineer ใหม่ๆ ซึ่งเป็นประสบการณ์ที่ทั้งน่าอึดอัดและน่าผิดหวัง เพราะเราทุ่มเทเวลาและความพยายามไปกับการสร้าง pipeline และรายงาน แต่สุดท้ายกลับไม่มีใครเชื่อถือข้อมูลที่เรานำเสนอ

นี่คือจุดที่ Data Quality เข้ามามีบทบาทสำคัญ!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การระบุและวัด Data Quality
- การออกแบบและสร้าง data validation tests
- การติดตามและแก้ไขปัญหา Data Quality
- การสร้างระบบ monitoring และ alerting สำหรับ Data Quality
- การสื่อสารเรื่อง Data Quality กับผู้มีส่วนได้ส่วนเสีย
- การสร้างวัฒนธรรม Data Quality ในองค์กร

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มเรียนรู้เกี่ยวกับ Data Quality คุณควรมีความรู้พื้นฐานเกี่ยวกับ:
- ความรู้พื้นฐานเกี่ยวกับ data pipeline และการจัดเก็บข้อมูล
- ความเข้าใจพื้นฐานเกี่ยวกับ SQL และการ query ข้อมูล
- ความรู้เบื้องต้นเกี่ยวกับการเขียน tests
- ความเข้าใจเกี่ยวกับกระบวนการทางธุรกิจที่เกี่ยวข้องกับข้อมูล

## Data Quality คืออะไร?

Data Quality คือระดับความถูกต้อง, ความสมบูรณ์, ความสอดคล้อง, ความทันสมัย, ความน่าเชื่อถือ, และความเกี่ยวข้องของข้อมูล โดยมีมิติหลักๆ ดังนี้:

### 1. Accuracy (ความถูกต้อง)
ข้อมูลควรสะท้อนความเป็นจริง เช่น ชื่อลูกค้า, ที่อยู่, หรือยอดขายควรถูกต้องตรงกับความเป็นจริง

### 2. Completeness (ความสมบูรณ์)
ข้อมูลควรมีครบถ้วนตามที่ต้องการ ไม่มีค่า null หรือค่าว่างในฟิลด์ที่สำคัญ

### 3. Consistency (ความสอดคล้อง)
ข้อมูลควรมีความสอดคล้องกันทั้งภายในชุดข้อมูลเดียวกันและระหว่างชุดข้อมูลต่างๆ

### 4. Timeliness (ความทันสมัย)
ข้อมูลควรเป็นปัจจุบันและพร้อมใช้งานเมื่อต้องการ

### 5. Validity (ความถูกต้องตามกฎ)
ข้อมูลควรเป็นไปตามกฎและข้อกำหนดที่ตั้งไว้ เช่น รูปแบบอีเมล, รหัสไปรษณีย์, หรือหมายเลขโทรศัพท์

### 6. Uniqueness (ความเป็นเอกลักษณ์)
ข้อมูลไม่ควรซ้ำซ้อนกัน โดยเฉพาะในฟิลด์ที่ควรเป็น unique

## ทำไม Data Quality ถึงสำคัญ

Data Quality มีความสำคัญต่อองค์กรในหลายด้าน:

### 1. การตัดสินใจที่ดีขึ้น
ข้อมูลที่มีคุณภาพสูงช่วยให้ผู้บริหารและทีมงานสามารถตัดสินใจได้อย่างถูกต้องและมั่นใจ

### 2. ความน่าเชื่อถือ
เมื่อข้อมูลมีคุณภาพสูง ผู้ใช้จะเชื่อถือและใช้ข้อมูลในการตัดสินใจมากขึ้น

### 3. ประสิทธิภาพการทำงาน
การแก้ไขปัญหาข้อมูลที่ไม่มีคุณภาพต้องใช้เวลาและทรัพยากรมาก การมี Data Quality ที่ดีช่วยลดเวลาและทรัพยากรที่ต้องใช้ในการแก้ไขปัญหา

### 4. ความพึงพอใจของลูกค้า
ข้อมูลที่มีคุณภาพช่วยให้สามารถให้บริการลูกค้าได้อย่างถูกต้องและรวดเร็ว

### 5. การปฏิบัติตามกฎระเบียบ
ในหลายอุตสาหกรรม มีกฎระเบียบที่กำหนดให้ต้องมีการจัดการข้อมูลอย่างมีคุณภาพ

## การวัดและประเมิน Data Quality

การวัดและประเมิน Data Quality เป็นขั้นตอนแรกในการปรับปรุงคุณภาพข้อมูล โดยมีวิธีการดังนี้:

### 1. กำหนด Data Quality Metrics

```python
# ตัวอย่างการกำหนด Data Quality Metrics
data_quality_metrics = {
    'completeness': {
        'description': 'Percentage of non-null values',
        'threshold': 0.95  # 95% ของข้อมูลต้องไม่เป็น null
    },
    'uniqueness': {
        'description': 'Percentage of unique values in a column that should be unique',
        'threshold': 1.0  # 100% ของข้อมูลต้องเป็น unique
    },
    'accuracy': {
        'description': 'Percentage of values that match the expected pattern or range',
        'threshold': 0.98  # 98% ของข้อมูลต้องถูกต้อง
    },
    'consistency': {
        'description': 'Percentage of values that are consistent across related datasets',
        'threshold': 0.99  # 99% ของข้อมูลต้องสอดคล้องกัน
    },
    'timeliness': {
        'description': 'Percentage of data that is up-to-date',
        'threshold': 0.97  # 97% ของข้อมูลต้องเป็นปัจจุบัน
    }
}
```

### 2. วัด Data Quality

```python
# ตัวอย่างการวัด Data Quality ด้วย Python และ Pandas
import pandas as pd
import numpy as np

def measure_completeness(df, column):
    """วัดความสมบูรณ์ของข้อมูลในคอลัมน์"""
    total_rows = len(df)
    non_null_rows = df[column].count()
    return non_null_rows / total_rows

def measure_uniqueness(df, column):
    """วัดความเป็นเอกลักษณ์ของข้อมูลในคอลัมน์"""
    total_rows = len(df)
    unique_rows = df[column].nunique()
    return unique_rows / total_rows

def measure_accuracy(df, column, pattern=None, min_val=None, max_val=None):
    """วัดความถูกต้องของข้อมูลในคอลัมน์"""
    total_rows = len(df)
    
    if pattern:
        # ตรวจสอบรูปแบบด้วย regex
        import re
        valid_rows = sum(df[column].astype(str).str.match(pattern))
    elif min_val is not None and max_val is not None:
        # ตรวจสอบช่วงค่า
        valid_rows = sum((df[column] >= min_val) & (df[column] <= max_val))
    else:
        return None
    
    return valid_rows / total_rows

def measure_consistency(df1, df2, key_column, value_column):
    """วัดความสอดคล้องของข้อมูลระหว่างสองตาราง"""
    # รวมข้อมูลจากสองตาราง
    merged = pd.merge(df1, df2, on=key_column, suffixes=('_1', '_2'))
    
    # ตรวจสอบความสอดคล้อง
    total_rows = len(merged)
    consistent_rows = sum(merged[f'{value_column}_1'] == merged[f'{value_column}_2'])
    
    return consistent_rows / total_rows

def measure_timeliness(df, date_column, max_days_old):
    """วัดความทันสมัยของข้อมูล"""
    total_rows = len(df)
    current_date = pd.Timestamp.now().date()
    
    # แปลงคอลัมน์วันที่เป็น date
    df[date_column] = pd.to_datetime(df[date_column]).dt.date
    
    # คำนวณจำนวนวันที่ผ่านมา
    days_old = (current_date - df[date_column]).dt.days
    
    # นับจำนวนแถวที่ไม่เกิน max_days_old
    timely_rows = sum(days_old <= max_days_old)
    
    return timely_rows / total_rows
```

### 3. สร้าง Data Quality Dashboard

```python
# ตัวอย่างการสร้าง Data Quality Dashboard ด้วย Matplotlib
import matplotlib.pyplot as plt

def create_data_quality_dashboard(metrics_results):
    """สร้าง dashboard แสดงผล Data Quality Metrics"""
    metrics = list(metrics_results.keys())
    values = list(metrics_results.values())
    thresholds = [data_quality_metrics[metric]['threshold'] for metric in metrics]
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # สร้าง bar chart
    bars = ax.bar(metrics, values, color='skyblue')
    
    # เพิ่มเส้น threshold
    for i, threshold in enumerate(thresholds):
        ax.hlines(y=threshold, xmin=i-0.4, xmax=i+0.4, colors='red', linestyles='dashed')
    
    # ตกแต่ง chart
    ax.set_ylim(0, 1.1)
    ax.set_ylabel('Score (0-1)')
    ax.set_title('Data Quality Metrics')
    
    # เพิ่มค่าบน bar
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height:.2f}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 3),
                    textcoords="offset points",
                    ha='center', va='bottom')
    
    plt.tight_layout()
    plt.savefig('data_quality_dashboard.png')
    plt.show()
```

## เครื่องมือและเทคนิคสำหรับ Data Quality

### 1. Data Validation

Data Validation เป็นกระบวนการตรวจสอบว่าข้อมูลเป็นไปตามกฎและข้อกำหนดที่ตั้งไว้หรือไม่

#### 1.1 Great Expectations

[Great Expectations](https://greatexpectations.io/) เป็นเครื่องมือ open-source สำหรับ data validation ที่ช่วยให้คุณสามารถกำหนด "expectations" หรือกฎสำหรับข้อมูลได้

```python
# ตัวอย่างการใช้ Great Expectations
import great_expectations as ge

# โหลดข้อมูล
df = ge.read_csv("customers.csv")

# กำหนด expectations
df.expect_column_values_to_not_be_null("customer_id")
df.expect_column_values_to_be_unique("email")
df.expect_column_values_to_match_regex("email", r"[^@]+@[^@]+\.[^@]+")
df.expect_column_values_to_be_between("age", 18, 120)

# ตรวจสอบ expectations
results = df.validate()
print(results)
```

#### 1.2 dbt Tests

[dbt (data build tool)](https://www.getdbt.com/) มีฟีเจอร์สำหรับทดสอบข้อมูลที่ช่วยให้คุณสามารถกำหนดกฎและตรวจสอบข้อมูลได้

```yaml
# ตัวอย่าง dbt test ใน schema.yml
version: 2

models:
  - name: customers
    columns:
      - name: customer_id
        tests:
          - unique
          - not_null
      - name: email
        tests:
          - unique
          - not_null
          - accepted_values:
              values: ['@gmail.com', '@yahoo.com', '@hotmail.com']
              quote: false
              where: "email LIKE '%' || value"
      - name: age
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: ">= 18 AND <= 120"
```

### 2. Data Profiling

Data Profiling เป็นกระบวนการวิเคราะห์ข้อมูลเพื่อเข้าใจลักษณะและคุณภาพของข้อมูล

#### 2.1 pandas-profiling

[pandas-profiling](https://github.com/pandas-profiling/pandas-profiling) เป็นไลบรารี Python ที่ช่วยสร้างรายงานการวิเคราะห์ข้อมูลอย่างละเอียด

```python
# ตัวอย่างการใช้ pandas-profiling
import pandas as pd
from pandas_profiling import ProfileReport

# โหลดข้อมูล
df = pd.read_csv("customers.csv")

# สร้างรายงาน
profile = ProfileReport(df, title="Customers Data Profiling Report")

# บันทึกรายงานเป็น HTML
profile.to_file("customers_profile.html")
```

### 3. Data Monitoring

Data Monitoring เป็นกระบวนการติดตามคุณภาพข้อมูลอย่างต่อเนื่อง เพื่อตรวจจับปัญหาได้อย่างรวดเร็ว

#### 3.1 Monte Carlo

[Monte Carlo](https://www.montecarlodata.com/) เป็นแพลตฟอร์ม data observability ที่ช่วยในการติดตามและตรวจจับปัญหาคุณภาพข้อมูล

#### 3.2 Datadog

[Datadog](https://www.datadoghq.com/) เป็นแพลตฟอร์ม monitoring ที่สามารถใช้ติดตามคุณภาพข้อมูลได้

```python
# ตัวอย่างการส่งข้อมูล Data Quality ไปยัง Datadog
from datadog import initialize, statsd

# ตั้งค่า Datadog
options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}
initialize(**options)

# ส่งข้อมูล Data Quality Metrics
def send_data_quality_metrics(metrics_results):
    for metric, value in metrics_results.items():
        statsd.gauge(f'data_quality.{metric}', value)
```

### 4. Data Cleaning

Data Cleaning เป็นกระบวนการแก้ไขหรือลบข้อมูลที่ไม่ถูกต้อง ไม่สมบูรณ์ หรือซ้ำซ้อน

```python
# ตัวอย่างการทำ Data Cleaning ด้วย Python และ Pandas
import pandas as pd
import numpy as np

def clean_data(df):
    # ลบแถวที่มีค่า null ในคอลัมน์สำคัญ
    df = df.dropna(subset=['customer_id', 'email'])
    
    # แทนที่ค่า null ในคอลัมน์ที่ไม่สำคัญด้วยค่าเฉลี่ย
    df['age'] = df['age'].fillna(df['age'].mean())
    
    # แก้ไขรูปแบบอีเมล
    df['email'] = df['email'].str.lower()
    
    # ลบช่องว่างหน้าและหลังข้อความ
    df['name'] = df['name'].str.strip()
    
    # แปลงวันที่ให้เป็นรูปแบบมาตรฐาน
    df['birth_date'] = pd.to_datetime(df['birth_date'], errors='coerce')
    
    # ลบแถวที่ซ้ำกัน
    df = df.drop_duplicates()
    
    return df
```

## การสร้างวัฒนธรรม Data Quality

การสร้างวัฒนธรรม Data Quality เป็นสิ่งสำคัญที่จะช่วยให้องค์กรมี Data Quality ที่ดีอย่างยั่งยืน โดยมีแนวทางดังนี้:

### 1. กำหนดเจ้าของข้อมูล (Data Ownership)

กำหนดให้มีผู้รับผิดชอบหลักสำหรับแต่ละชุดข้อมูล เพื่อให้มีคนดูแลและรับผิดชอบคุณภาพของข้อมูล

```python
# ตัวอย่างการกำหนดเจ้าของข้อมูล
data_ownership = {
    'customers': {
        'owner': 'John Doe',
        'email': 'john.doe@example.com',
        'department': 'Customer Service'
    },
    'orders': {
        'owner': 'Jane Smith',
        'email': 'jane.smith@example.com',
        'department': 'Sales'
    },
    'products': {
        'owner': 'Bob Johnson',
        'email': 'bob.johnson@example.com',
        'department': 'Product Management'
    }
}
```

### 2. สร้าง Data Quality SLA (Service Level Agreement)

กำหนด SLA สำหรับ Data Quality เพื่อให้ทุกคนเข้าใจว่าข้อมูลควรมีคุณภาพระดับใด

```python
# ตัวอย่าง Data Quality SLA
data_quality_sla = {
    'customers': {
        'completeness': 0.99,  # 99% ของข้อมูลต้องไม่เป็น null
        'accuracy': 0.98,      # 98% ของข้อมูลต้องถูกต้อง
        'timeliness': 1        # ข้อมูลต้องอัพเดททุกวัน
    },
    'orders': {
        'completeness': 0.95,  # 95% ของข้อมูลต้องไม่เป็น null
        'accuracy': 0.99,      # 99% ของข้อมูลต้องถูกต้อง
        'timeliness': 1        # ข้อมูลต้องอัพเดททุกวัน
    }
}
```

### 3. จัดทำ Data Quality Report

สร้างรายงาน Data Quality และแชร์ให้กับทุกคนในองค์กร เพื่อให้ทุกคนเห็นความสำคัญของ Data Quality

```python
# ตัวอย่างการสร้าง Data Quality Report
def create_data_quality_report(metrics_results, data_quality_sla):
    """สร้างรายงาน Data Quality"""
    report = {
        'timestamp': pd.Timestamp.now().isoformat(),
        'overall_score': sum(metrics_results.values()) / len(metrics_results),
        'metrics': {},
        'issues': []
    }
    
    # เพิ่มรายละเอียดของแต่ละ metric
    for metric, value in metrics_results.items():
        threshold = data_quality_sla.get(metric, 0.9)
        status = 'PASS' if value >= threshold else 'FAIL'
        
        report['metrics'][metric] = {
            'value': value,
            'threshold': threshold,
            'status': status
        }
        
        # เพิ่มปัญหาที่พบ
        if status == 'FAIL':
            report['issues'].append(f"{metric} is below threshold: {value:.2f} < {threshold}")
    
    return report
```

### 4. จัดอบรมและให้ความรู้

จัดอบรมและให้ความรู้เกี่ยวกับ Data Quality แก่พนักงานทุกคนในองค์กร เพื่อให้ทุกคนเข้าใจความสำคัญและวิธีการรักษาคุณภาพข้อมูล

### 5. สร้างระบบ Incentive

สร้างระบบ incentive เพื่อส่งเสริมให้ทุกคนใส่ใจเรื่อง Data Quality เช่น การให้รางวัลแก่ทีมที่มี Data Quality ดีที่สุด

## สรุป

Data Quality เป็นเรื่องสำคัญที่ Data Engineer ต้องให้ความใส่ใจ เพราะข้อมูลที่มีคุณภาพจะนำไปสู่การตัดสินใจที่ดีขึ้น, ความน่าเชื่อถือ, และประสิทธิภาพการทำงานที่สูงขึ้น

การจัดการ Data Quality ประกอบด้วยหลายขั้นตอน ตั้งแต่การวัดและประเมิน, การตรวจสอบและทดสอบ, การติดตามอย่างต่อเนื่อง, ไปจนถึงการสร้างวัฒนธรรม Data Quality ในองค์กร

มีเครื่องมือมากมายที่ช่วยในการจัดการ Data Quality เช่น Great Expectations, dbt, pandas-profiling, Monte Carlo เป็นต้น ซึ่งคุณสามารถเลือกใช้ให้เหมาะสมกับความต้องการและบริบทขององค์กร

สุดท้ายนี้ การสร้างวัฒนธรรม Data Quality เป็นสิ่งสำคัญที่จะช่วยให้องค์กรมี Data Quality ที่ดีอย่างยั่งยืน โดยต้องอาศัยความร่วมมือจากทุกคนในองค์กร ไม่ใช่เพียงแค่ Data Engineer หรือทีม Data เท่านั้น

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจความสำคัญของ Data Quality และสามารถนำไปประยุกต์ใช้ในการทำงานได้อย่างมีประสิทธิภาพนะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
