---
layout: post
title: "Jekyll สำหรับวิศวกรข้อมูล"
date: 2025-05-12
categories: [Web Development, Draft]
tags: [Jekyll, Static Site Generator, Blog, Documentation, GitHub Pages]
---

# Jekyll สำหรับวิศวกรข้อมูล

## บทนำ

Jekyll เป็น static site generator ที่ช่วยให้สามารถสร้างเว็บไซต์และบล็อกได้อย่างง่ายดาย โดยไม่จำเป็นต้องใช้ฐานข้อมูลหรือภาษาโปรแกรมฝั่งเซิร์ฟเวอร์ สำหรับวิศวกรข้อมูล Jekyll เป็นเครื่องมือที่มีประโยชน์ในการสร้างเอกสาร บล็อก และเว็บไซต์สำหรับโปรเจคต่างๆ บทความนี้จะกล่าวถึงหลักการพื้นฐาน การใช้งาน และประโยชน์ของ Jekyll สำหรับวิศวกรข้อมูล

## Jekyll คืออะไร?

Jekyll เป็น static site generator ที่เขียนด้วยภาษา Ruby ซึ่งแปลงไฟล์ Markdown, HTML, CSS, และอื่นๆ เป็นเว็บไซต์ static ที่สามารถโฮสต์บนเซิร์ฟเวอร์ใดๆ ก็ได้ Jekyll ได้รับความนิยมอย่างมากเนื่องจากความเรียบง่าย ความยืดหยุ่น และการบูรณาการกับ GitHub Pages

### คุณลักษณะหลักของ Jekyll

- **Simple**: เรียบง่ายและใช้งานง่าย
- **Static**: สร้างไฟล์ HTML static ที่โหลดเร็วและปลอดภัย
- **Blog-aware**: มีฟีเจอร์สำหรับการเขียนบล็อก เช่น posts, categories, tags
- **Markdown Support**: รองรับการเขียนเนื้อหาด้วย Markdown
- **Liquid Templating**: ใช้ Liquid templating language สำหรับการสร้างเทมเพลต
- **GitHub Pages Integration**: บูรณาการกับ GitHub Pages อย่างลงตัว

## ประโยชน์ของ Jekyll สำหรับวิศวกรข้อมูล

### 1. การสร้างเอกสารและบล็อก

Jekyll เหมาะสำหรับการสร้างเอกสารและบล็อกเกี่ยวกับงานวิศวกรรมข้อมูล:

- **Documentation**: สร้างเอกสารสำหรับโปรเจคและ data pipeline
- **Technical Blog**: เขียนบล็อกเกี่ยวกับเทคนิคและแนวปฏิบัติในงานวิศวกรรมข้อมูล
- **Knowledge Sharing**: แชร์ความรู้และประสบการณ์กับทีมและชุมชน
- **Portfolio**: สร้างพอร์ตโฟลิโอแสดงผลงานและทักษะ

### 2. การบูรณาการกับ GitHub

Jekyll บูรณาการกับ GitHub อย่างลงตัว:

- **GitHub Pages**: โฮสต์เว็บไซต์บน GitHub Pages ได้ฟรี
- **Version Control**: ใช้ Git สำหรับการควบคุมเวอร์ชันของเนื้อหา
- **Collaboration**: ทำงานร่วมกันบนเนื้อหาผ่าน pull requests
- **Automation**: ใช้ GitHub Actions สำหรับการ build และ deploy อัตโนมัติ

### 3. การสร้างเว็บไซต์สำหรับโปรเจค

Jekyll เหมาะสำหรับการสร้างเว็บไซต์สำหรับโปรเจคด้านวิศวกรรมข้อมูล:

- **Project Websites**: สร้างเว็บไซต์สำหรับโปรเจค data engineering
- **API Documentation**: สร้างเอกสาร API สำหรับบริการข้อมูล
- **Data Catalogs**: สร้าง data catalogs แบบง่ายๆ
- **Dashboards**: สร้าง static dashboards สำหรับการนำเสนอข้อมูล

## การเริ่มต้นใช้งาน Jekyll

### 1. การติดตั้ง Jekyll

Jekyll ต้องการ Ruby และ RubyGems ในการติดตั้ง:

#### Windows

```powershell
# ติดตั้ง Ruby+Devkit จาก RubyInstaller
# ดาวน์โหลดจาก https://rubyinstaller.org/downloads/

# ติดตั้ง Jekyll และ Bundler
gem install jekyll bundler
```

#### macOS

```bash
# ติดตั้ง Ruby (หากยังไม่มี)
brew install ruby

# เพิ่ม Ruby path ใน ~/.zshrc หรือ ~/.bash_profile
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# ติดตั้ง Jekyll และ Bundler
gem install jekyll bundler
```

#### Linux (Ubuntu/Debian)

```bash
# ติดตั้ง Ruby และ dependencies
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev

# ตั้งค่า environment variables
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# ติดตั้ง Jekyll และ Bundler
gem install jekyll bundler
```

### 2. การสร้างเว็บไซต์ Jekyll ใหม่

```bash
# สร้างเว็บไซต์ใหม่
jekyll new my-data-blog

# เข้าไปในโฟลเดอร์ของเว็บไซต์
cd my-data-blog

# รันเซิร์ฟเวอร์ local
bundle exec jekyll serve
```

หลังจากรันคำสั่งข้างต้น เว็บไซต์จะสามารถเข้าถึงได้ที่ http://localhost:4000

### 3. โครงสร้างของเว็บไซต์ Jekyll

```
my-data-blog/
├── _config.yml          # ไฟล์คอนฟิกของเว็บไซต์
├── _data/               # ไฟล์ข้อมูล (YAML, JSON, CSV)
├── _drafts/             # บทความที่ยังไม่เผยแพร่
├── _includes/           # ส่วนย่อยของเทมเพลต
├── _layouts/            # เทมเพลตสำหรับหน้าต่างๆ
├── _posts/              # บทความบล็อก
├── _sass/               # ไฟล์ SASS
├── _site/               # เว็บไซต์ที่ถูกสร้างขึ้น (ไม่ควรแก้ไขโดยตรง)
├── assets/              # ไฟล์ static เช่น รูปภาพ, CSS, JavaScript
├── index.md             # หน้าแรกของเว็บไซต์
└── Gemfile              # dependencies ของ Ruby
```

## การใช้งาน Jekyll สำหรับวิศวกรข้อมูล

### 1. การเขียนบทความด้วย Markdown

Jekyll ใช้ Markdown สำหรับการเขียนเนื้อหา ซึ่งเป็นรูปแบบที่อ่านและเขียนง่าย:

```markdown
---
layout: post
title: "การวิเคราะห์ข้อมูลด้วย Python"
date: 2025-05-12
categories: [Data Analysis, Python]
tags: [pandas, numpy, matplotlib]
---

# การวิเคราะห์ข้อมูลด้วย Python

ในบทความนี้ เราจะมาเรียนรู้วิธีการวิเคราะห์ข้อมูลด้วย Python โดยใช้ libraries ยอดนิยมอย่าง pandas, numpy, และ matplotlib

## การเตรียมข้อมูล

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# โหลดข้อมูล
df = pd.read_csv('data.csv')

# แสดงข้อมูล 5 แถวแรก
print(df.head())
```

## การวิเคราะห์ข้อมูลเบื้องต้น

...
```

### 2. การใช้ Front Matter

Front Matter เป็นส่วนที่อยู่ด้านบนของไฟล์ Markdown ซึ่งใช้สำหรับกำหนดค่าต่างๆ ของหน้า:

```yaml
---
layout: post
title: "การสร้าง Data Pipeline ด้วย Apache Airflow"
date: 2025-05-12
author: "Data Engineer"
categories: [Data Engineering, ETL]
tags: [Airflow, Python, DAG, ETL]
image: /assets/images/airflow-logo.png
description: "เรียนรู้วิธีการสร้าง data pipeline ด้วย Apache Airflow"
---
```

### 3. การใช้ Liquid Tags

Liquid เป็น templating language ที่ใช้ใน Jekyll สำหรับการสร้างเนื้อหาแบบไดนามิก:

```liquid
{% if page.categories contains "Data Engineering" %}
  <p>บทความนี้เกี่ยวกับ Data Engineering</p>
{% endif %}

{% for post in site.posts limit:5 %}
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <p>{{ post.excerpt }}</p>
{% endfor %}

{% assign popular_tags = site.tags | sort %}
{% for tag in popular_tags limit:10 %}
  <a href="/tags/{{ tag[0] }}">{{ tag[0] }}</a> ({{ tag[1].size }})
{% endfor %}
```

### 4. การใช้ Data Files

Jekyll สามารถใช้ไฟล์ข้อมูลใน format ต่างๆ เช่น YAML, JSON, CSV:

```yaml
# _data/tools.yml
- name: Apache Airflow
  category: Workflow Orchestration
  url: https://airflow.apache.org/
  description: Platform to programmatically author, schedule, and monitor workflows

- name: Apache Spark
  category: Data Processing
  url: https://spark.apache.org/
  description: Unified analytics engine for large-scale data processing
```

```liquid
{% for tool in site.data.tools %}
  <h2>{{ tool.name }}</h2>
  <p>Category: {{ tool.category }}</p>
  <p>{{ tool.description }}</p>
  <a href="{{ tool.url }}">Official Website</a>
{% endfor %}
```

### 5. การสร้าง Collections

Collections ใน Jekyll ช่วยให้สามารถจัดกลุ่มเนื้อหาที่เกี่ยวข้องกัน:

```yaml
# _config.yml
collections:
  tutorials:
    output: true
    permalink: /tutorials/:path/
  projects:
    output: true
    permalink: /projects/:path/
```

```markdown
---
layout: tutorial
title: "การใช้งาน pandas สำหรับการวิเคราะห์ข้อมูล"
level: Beginner
duration: "1 hour"
---

# การใช้งาน pandas สำหรับการวิเคราะห์ข้อมูล

...
```

```liquid
{% for tutorial in site.tutorials %}
  <h2><a href="{{ tutorial.url }}">{{ tutorial.title }}</a></h2>
  <p>Level: {{ tutorial.level }}</p>
  <p>Duration: {{ tutorial.duration }}</p>
{% endfor %}
```

## การใช้ Jekyll กับ GitHub Pages

GitHub Pages เป็นบริการฟรีของ GitHub ที่ช่วยให้สามารถโฮสต์เว็บไซต์ static ได้ โดยบูรณาการกับ Jekyll อย่างลงตัว:

### 1. การสร้าง GitHub Pages Repository

1. สร้าง repository ใหม่บน GitHub ชื่อ `username.github.io` (แทน `username` ด้วยชื่อผู้ใช้ของคุณ)
2. โคลน repository ลงเครื่อง
3. สร้างเว็บไซต์ Jekyll ในโฟลเดอร์ของ repository
4. Push โค้ดขึ้น GitHub

```bash
git clone https://github.com/username/username.github.io.git
cd username.github.io
jekyll new .
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. การใช้ Custom Domain

หากต้องการใช้โดเมนของตัวเอง:

1. สร้างไฟล์ `CNAME` ในโฟลเดอร์หลักของ repository:

```
yourdomain.com
```

2. ตั้งค่า DNS records ที่ provider ของโดเมน:

```
A record: @ -> 185.199.108.153
A record: @ -> 185.199.109.153
A record: @ -> 185.199.110.153
A record: @ -> 185.199.111.153
CNAME record: www -> username.github.io
```

3. เปิดใช้งาน HTTPS ใน repository settings

### 3. การใช้ GitHub Actions สำหรับการ Build และ Deploy

GitHub Actions ช่วยให้สามารถ build และ deploy เว็บไซต์ Jekyll โดยอัตโนมัติ:

```yaml
# .github/workflows/jekyll.yml
name: Build and Deploy Jekyll site

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.0'
        bundler-cache: true
    - name: Install dependencies
      run: bundle install
    - name: Build site
      run: bundle exec jekyll build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

## ตัวอย่างการใช้ Jekyll สำหรับวิศวกรข้อมูล

### 1. การสร้างบล็อกเกี่ยวกับ Data Engineering

```yaml
# _config.yml
title: Data Engineering Blog
description: บล็อกเกี่ยวกับ Data Engineering, ETL, และ Big Data
author: Data Engineer
url: https://dataengineer.github.io
baseurl: ""

# Build settings
markdown: kramdown
theme: minima
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# Collections
collections:
  tutorials:
    output: true
    permalink: /tutorials/:path/
  projects:
    output: true
    permalink: /projects/:path/

# Defaults
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Data Engineer"
  - scope:
      path: ""
      type: "tutorials"
    values:
      layout: "tutorial"
  - scope:
      path: ""
      type: "projects"
    values:
      layout: "project"
```

```markdown
---
layout: post
title: "การสร้าง Data Pipeline ด้วย Apache Airflow"
date: 2025-05-12
categories: [Data Engineering, ETL]
tags: [Airflow, Python, DAG, ETL]
---

# การสร้าง Data Pipeline ด้วย Apache Airflow

Apache Airflow เป็นเครื่องมือสำหรับการสร้างและจัดการ workflow ที่ได้รับความนิยมอย่างมากในงานวิศวกรรมข้อมูล ในบทความนี้ เราจะมาเรียนรู้วิธีการสร้าง data pipeline ด้วย Apache Airflow

## การติดตั้ง Airflow

```python
# ติดตั้ง Airflow
pip install apache-airflow

# เริ่มต้น Airflow
airflow db init
airflow users create \
    --username admin \
    --password admin \
    --firstname Admin \
    --lastname User \
    --role Admin \
    --email admin@example.com
```

## การสร้าง DAG

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator

default_args = {
    'owner': 'data_engineer',
    'depends_on_past': False,
    'start_date': datetime(2025, 5, 1),
    'email': ['data_engineer@example.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'example_data_pipeline',
    default_args=default_args,
    description='A simple data pipeline example',
    schedule_interval='0 0 * * *',
)

def extract():
    # Extract data from source
    pass

def transform():
    # Transform data
    pass

def load():
    # Load data to destination
    pass

extract_task = PythonOperator(
    task_id='extract',
    python_callable=extract,
    dag=dag,
)

transform_task = PythonOperator(
    task_id='transform',
    python_callable=transform,
    dag=dag,
)

load_task = PythonOperator(
    task_id='load',
    python_callable=load,
    dag=dag,
)

extract_task >> transform_task >> load_task
```

...
```

### 2. การสร้างเอกสารสำหรับ Data Pipeline

```markdown
---
layout: page
title: "Data Pipeline Documentation"
permalink: /docs/data-pipeline/
---

# Data Pipeline Documentation

เอกสารนี้อธิบายเกี่ยวกับ data pipeline ของเรา

## Overview

Data pipeline ของเรามีขั้นตอนดังนี้:

1. Extract data from source systems
2. Transform data
3. Load data to data warehouse
4. Create reports and dashboards

## Architecture

![Data Pipeline Architecture](/assets/images/data-pipeline-architecture.png)

## Components

### Extract

- **Source Systems**: CRM, ERP, Web Analytics
- **Extraction Method**: API, Database Connection, File Transfer
- **Frequency**: Daily at 1 AM

### Transform

- **Transformation Logic**: Data Cleaning, Normalization, Aggregation
- **Technology**: Apache Spark, dbt
- **Environment**: AWS EMR

### Load

- **Destination**: Snowflake Data Warehouse
- **Loading Method**: Bulk Load
- **Partitioning Strategy**: Date Partitioning

## Monitoring

- **Metrics**: Pipeline Success Rate, Data Latency, Data Quality
- **Alerting**: Email, Slack
- **Dashboard**: Grafana

## Troubleshooting

### Common Issues

1. **Source System Unavailable**
   - Check source system status
   - Retry extraction after 15 minutes
   - Contact source system team if issue persists

2. **Transformation Errors**
   - Check error logs
   - Validate input data
   - Run data quality checks

3. **Loading Failures**
   - Check destination system status
   - Verify permissions
   - Check disk space
```

## แนวปฏิบัติที่ดีในการใช้ Jekyll สำหรับวิศวกรข้อมูล

### 1. การจัดโครงสร้างเนื้อหา

- **Organize by Topic**: จัดกลุ่มเนื้อหาตามหัวข้อหรือเทคโนโลยี
- **Use Collections**: ใช้ collections สำหรับเนื้อหาที่เกี่ยวข้องกัน
- **Consistent Naming**: ใช้รูปแบบการตั้งชื่อที่สม่ำเสมอ
- **Clear Navigation**: สร้างเมนูนำทางที่ชัดเจนและใช้งานง่าย

### 2. การเขียนเนื้อหา

- **Clear and Concise**: เขียนเนื้อหาที่ชัดเจนและกระชับ
- **Use Code Examples**: ใช้ตัวอย่างโค้ดที่ทำงานได้จริง
- **Include Diagrams**: ใช้แผนภาพเพื่ออธิบายแนวคิดที่ซับซ้อน
- **Proper Formatting**: ใช้การจัดรูปแบบที่เหมาะสม เช่น หัวข้อ, รายการ, ตาราง

### 3. การปรับแต่งเว็บไซต์

- **Custom Theme**: ปรับแต่งธีมให้เหมาะกับเนื้อหาและแบรนด์
- **Responsive Design**: ตรวจสอบว่าเว็บไซต์แสดงผลได้ดีบนทุกอุปกรณ์
- **Performance Optimization**: ปรับแต่งประสิทธิภาพของเว็บไซต์
- **SEO**: ปรับแต่ง SEO เพื่อให้เว็บไซต์ติดอันดับใน search engines

### 4. การบำรุงรักษา

- **Regular Updates**: อัปเดตเนื้อหาอย่างสม่ำเสมอ
- **Version Control**: ใช้ Git สำหรับการควบคุมเวอร์ชัน
- **Backup**: สำรองข้อมูลเว็บไซต์อย่างสม่ำเสมอ
- **Monitor Analytics**: ติดตามสถิติการเข้าชมเว็บไซต์

## สรุป

Jekyll เป็นเครื่องมือที่มีประโยชน์อย่างมากสำหรับวิศวกรข้อมูลในการสร้างเอกสาร บล็อก และเว็บไซต์สำหรับโปรเจคต่างๆ ด้วยความเรียบง่าย ความยืดหยุ่น และการบูรณาการกับ GitHub Pages Jekyll จึงเป็นทางเลือกที่ดีสำหรับการสร้างเนื้อหาเกี่ยวกับงานวิศวกรรมข้อมูล

การใช้ Jekyll ช่วยให้วิศวกรข้อมูลสามารถแชร์ความรู้ ประสบการณ์ และแนวปฏิบัติที่ดีกับทีมและชุมชน นอกจากนี้ Jekyll ยังช่วยในการสร้างเอกสารสำหรับโปรเจคและ data pipeline ซึ่งเป็นสิ่งสำคัญในงานวิศวกรรมข้อมูล

หากคุณเป็นวิศวกรข้อมูลที่ต้องการสร้างเว็บไซต์หรือบล็อกอย่างง่ายและรวดเร็ว Jekyll เป็นเครื่องมือที่คุ้มค่าที่จะเรียนรู้และใช้งาน
