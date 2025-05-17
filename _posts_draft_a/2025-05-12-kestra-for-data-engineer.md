---
layout: post
title: "Kestra สำหรับ Data Engineer: เครื่องมือ Orchestration ยุคใหม่"
date: 2025-05-12
categories: [Data Engineering, Tools]
tags: [kestra, orchestration, workflow, data pipeline, draft-A]
image: assets/images/kestra-cover.jpg
---

## Table of Contents
- [เมื่อ Airflow ไม่ใช่คำตอบเดียว](#เมื่อ-airflow-ไม่ใช่คำตอบเดียว)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Kestra คืออะไร?](#kestra-คืออะไร)
- [การติดตั้งและเริ่มต้นใช้งาน Kestra](#การติดตั้งและเริ่มต้นใช้งาน-kestra)
- [การสร้าง Workflow ด้วย Kestra](#การสร้าง-workflow-ด้วย-kestra)
- [การใช้งาน Kestra ขั้นสูง](#การใช้งาน-kestra-ขั้นสูง)
- [เทคนิคและแนวทางปฏิบัติที่ดี](#เทคนิคและแนวทางปฏิบัติที่ดี)
- [สรุป](#สรุป)

## เมื่อ Airflow ไม่ใช่คำตอบเดียว

เคยเจอสถานการณ์แบบนี้มั้ย? คุณใช้ Airflow มาสักพักแล้ว แต่รู้สึกว่ามันซับซ้อนเกินไปสำหรับบาง use cases หรือต้องการเครื่องมือที่มี UI ที่ใช้งานง่ายกว่า หรือต้องการความยืดหยุ่นในการกำหนด workflow ที่มากกว่า

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่ทำงานกับทีมที่มีทั้ง Data Engineer และคนที่ไม่ใช่ developer ที่ต้องการใช้งาน data pipeline เช่นกัน Airflow เป็นเครื่องมือที่ยอดเยี่ยม แต่บางครั้งก็มีความซับซ้อนมากเกินไปสำหรับบางคน และการเขียน DAG ด้วย Python อาจเป็นอุปสรรคสำหรับคนที่ไม่คุ้นเคยกับการเขียนโค้ด

นี่คือจุดที่ Kestra เข้ามาเป็นอีกทางเลือกหนึ่งที่น่าสนใจ!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การใช้งาน Kestra เพื่อสร้างและจัดการ workflow
- การออกแบบ data pipeline ที่มีความยืดหยุ่นและทนทานต่อความล้มเหลว
- การใช้ YAML เพื่อกำหนด workflow
- การติดตามและแก้ไขปัญหาใน workflow
- การทำงานร่วมกันระหว่างทีมด้วย Kestra

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มเรียนรู้เกี่ยวกับ Kestra คุณควรมีความรู้พื้นฐานเกี่ยวกับ:
- ความรู้พื้นฐานเกี่ยวกับ command line
- ความเข้าใจพื้นฐานเกี่ยวกับ data pipeline และ workflow
- ความรู้เบื้องต้นเกี่ยวกับ YAML
- Java Runtime Environment (JRE) เวอร์ชัน 11 หรือสูงกว่า
- Docker (ถ้าต้องการใช้ Docker สำหรับการติดตั้ง)

## Kestra คืออะไร?

Kestra คือเครื่องมือ open-source สำหรับสร้างและจัดการ workflow และ data pipeline โดยมีจุดเด่นในเรื่องของ UI ที่ใช้งานง่าย, การกำหนด workflow ด้วย YAML, และความสามารถในการจัดการกับความล้มเหลว (fault-tolerance)

### คุณสมบัติหลักของ Kestra:

1. **Declarative Workflows**: กำหนด workflow ด้วย YAML ที่อ่านและเข้าใจง่าย
2. **User-friendly UI**: มี UI ที่ใช้งานง่ายและสวยงาม
3. **Real-time Execution**: ติดตามการทำงานของ workflow แบบ real-time
4. **Fault-tolerance**: มีกลไกในการจัดการกับความล้มเหลว
5. **Scalability**: สามารถขยายขนาดเพื่อรองรับ workflow จำนวนมากได้
6. **Versioning**: มีระบบ versioning สำหรับ workflow
7. **Plugins**: รองรับการเพิ่มความสามารถด้วย plugins

## การติดตั้งและเริ่มต้นใช้งาน Kestra

### 1. ติดตั้ง Kestra ด้วย Docker

วิธีที่ง่ายที่สุดในการเริ่มต้นใช้งาน Kestra คือการใช้ Docker:

```bash
# สร้างไฟล์ docker-compose.yml
cat > docker-compose.yml << EOF
version: '3'

services:
  kestra:
    image: kestra/kestra:latest
    ports:
      - "8080:8080"
    environment:
      KESTRA_CONFIGURATION: |
        kestra:
          repository:
            type: memory
          queue:
            type: memory
          storage:
            type: local
            local:
              base-path: /tmp/kestra-storage
    volumes:
      - kestra-data:/tmp/kestra-storage

volumes:
  kestra-data:
EOF

# รัน Docker Compose
docker-compose up -d
```

### 2. ติดตั้ง Kestra CLI

Kestra CLI ช่วยให้สามารถจัดการ workflow จาก command line ได้:

```bash
# ดาวน์โหลด Kestra CLI
curl -L https://cli.kestra.io/get | bash

# ตรวจสอบการติดตั้ง
kestra --version
```

### 3. เข้าถึง Kestra UI

เปิดเบราว์เซอร์และไปที่ `http://localhost:8080` เพื่อเข้าถึง Kestra UI

## การสร้าง Workflow ด้วย Kestra

### 1. สร้าง Simple Workflow

สร้างไฟล์ `simple-workflow.yml`:

```yaml
id: simple-workflow
namespace: dev
tasks:
  - id: hello
    type: io.kestra.core.tasks.scripts.Bash
    commands:
      - echo "Hello, Kestra!"
```

รัน workflow ด้วย Kestra CLI:

```bash
kestra flow create simple-workflow.yml
kestra flow run dev.simple-workflow
```

### 2. สร้าง Data Pipeline Workflow

สร้างไฟล์ `data-pipeline.yml`:

```yaml
id: data-pipeline
namespace: dev
inputs:
  - name: date
    type: STRING
    required: false
    defaults: "{{ now() | dateFormat('yyyy-MM-dd') }}"

tasks:
  - id: extract
    type: io.kestra.core.tasks.scripts.Python
    script: |
      import pandas as pd
      import os
      from datetime import datetime
      
      # รับค่า input
      date = "{{ inputs.date }}"
      print(f"Extracting data for date: {date}")
      
      # สร้างข้อมูลจำลอง
      data = {
          'id': range(1, 101),
          'name': [f'User {i}' for i in range(1, 101)],
          'date': [date] * 100,
          'value': [i * 10 for i in range(1, 101)]
      }
      
      # สร้าง DataFrame
      df = pd.DataFrame(data)
      
      # บันทึกเป็น CSV
      os.makedirs('data', exist_ok=True)
      output_file = f"data/extract_{date}.csv"
      df.to_csv(output_file, index=False)
      
      print(f"Data extracted to {output_file}")
      
      # ส่งค่ากลับไปยัง Kestra
      kestra_outputs = {
          "output_file": output_file,
          "record_count": len(df)
      }
    
  - id: transform
    type: io.kestra.core.tasks.scripts.Python
    dependsOn:
      - extract
    script: |
      import pandas as pd
      import os
      
      # รับค่าจาก task ก่อนหน้า
      input_file = "{{ outputs.extract.output_file }}"
      print(f"Transforming data from {input_file}")
      
      # อ่านข้อมูล
      df = pd.read_csv(input_file)
      
      # ทำ transformation
      df['value_squared'] = df['value'] ** 2
      df['category'] = df['value'].apply(lambda x: 'high' if x > 500 else 'low')
      
      # บันทึกผลลัพธ์
      os.makedirs('data', exist_ok=True)
      output_file = input_file.replace('extract_', 'transform_')
      df.to_csv(output_file, index=False)
      
      print(f"Data transformed and saved to {output_file}")
      
      # ส่งค่ากลับไปยัง Kestra
      kestra_outputs = {
          "output_file": output_file,
          "record_count": len(df),
          "high_count": len(df[df['category'] == 'high']),
          "low_count": len(df[df['category'] == 'low'])
      }
    
  - id: load
    type: io.kestra.core.tasks.scripts.Python
    dependsOn:
      - transform
    script: |
      import pandas as pd
      import sqlite3
      
      # รับค่าจาก task ก่อนหน้า
      input_file = "{{ outputs.transform.output_file }}"
      print(f"Loading data from {input_file}")
      
      # อ่านข้อมูล
      df = pd.read_csv(input_file)
      
      # โหลดข้อมูลลง SQLite
      conn = sqlite3.connect('data.db')
      df.to_sql('data', conn, if_exists='replace', index=False)
      conn.close()
      
      print(f"Data loaded to SQLite database")
      
      # ส่งค่ากลับไปยัง Kestra
      kestra_outputs = {
          "database": "data.db",
          "table": "data",
          "record_count": len(df)
      }
```

รัน workflow ด้วย Kestra CLI:

```bash
kestra flow create data-pipeline.yml
kestra flow run dev.data-pipeline
```

### 3. สร้าง Scheduled Workflow

สร้างไฟล์ `scheduled-workflow.yml`:

```yaml
id: scheduled-workflow
namespace: dev

schedule:
  cron: "0 0 * * *"  # รันทุกวันเวลาเที่ยงคืน

tasks:
  - id: daily-report
    type: io.kestra.core.tasks.scripts.Python
    script: |
      import pandas as pd
      import matplotlib.pyplot as plt
      from datetime import datetime
      
      # สร้างข้อมูลจำลอง
      date = datetime.now().strftime('%Y-%m-%d')
      data = {
          'date': [date] * 24,
          'hour': range(0, 24),
          'value': [i * 10 + (i % 5) * 20 for i in range(0, 24)]
      }
      
      # สร้าง DataFrame
      df = pd.DataFrame(data)
      
      # สร้างกราฟ
      plt.figure(figsize=(10, 6))
      plt.plot(df['hour'], df['value'], marker='o')
      plt.title(f'Daily Report - {date}')
      plt.xlabel('Hour')
      plt.ylabel('Value')
      plt.grid(True)
      
      # บันทึกกราฟ
      output_file = f"report_{date}.png"
      plt.savefig(output_file)
      
      print(f"Report generated: {output_file}")
      
      # ส่งค่ากลับไปยัง Kestra
      kestra_outputs = {
          "report_file": output_file,
          "date": date
      }
```

รัน workflow ด้วย Kestra CLI:

```bash
kestra flow create scheduled-workflow.yml
```

## การใช้งาน Kestra ขั้นสูง

### 1. การใช้ Flow Triggers

Flow Triggers ช่วยให้สามารถเริ่มต้น workflow จากเหตุการณ์ภายนอกได้:

```yaml
id: triggered-workflow
namespace: dev

triggers:
  - id: file-trigger
    type: io.kestra.core.models.triggers.types.FileTrigger
    directory: /data/input
    pattern: "*.csv"
    includeSubDirectories: true

tasks:
  - id: process-file
    type: io.kestra.core.tasks.scripts.Python
    script: |
      import pandas as pd
      
      # รับค่าจาก trigger
      file_path = "{{ trigger.uri }}"
      print(f"Processing file: {file_path}")
      
      # อ่านข้อมูล
      df = pd.read_csv(file_path)
      
      # ทำการประมวลผล
      result = df.describe()
      
      print(result)
      
      # ส่งค่ากลับไปยัง Kestra
      kestra_outputs = {
          "file_path": file_path,
          "record_count": len(df)
      }
```

### 2. การใช้ Flow Variables

Flow Variables ช่วยให้สามารถกำหนดตัวแปรที่ใช้ร่วมกันใน workflow ได้:

```yaml
id: variables-workflow
namespace: dev

variables:
  base_path: /data
  database_name: mydb
  table_prefix: data_

tasks:
  - id: use-variables
    type: io.kestra.core.tasks.scripts.Bash
    commands:
      - echo "Base path: {{ vars.base_path }}"
      - echo "Database name: {{ vars.database_name }}"
      - echo "Table prefix: {{ vars.table_prefix }}"
      - echo "Full table name: {{ vars.table_prefix }}users"
```

### 3. การใช้ Flow Conditions

Flow Conditions ช่วยให้สามารถกำหนดเงื่อนไขในการทำงานของ task ได้:

```yaml
id: conditional-workflow
namespace: dev

inputs:
  - name: environment
    type: STRING
    required: false
    defaults: "dev"

tasks:
  - id: check-environment
    type: io.kestra.core.tasks.scripts.Bash
    commands:
      - echo "Running in {{ inputs.environment }} environment"
  
  - id: dev-task
    type: io.kestra.core.tasks.scripts.Bash
    dependsOn:
      - check-environment
    when:
      condition: "{{ inputs.environment == 'dev' }}"
    commands:
      - echo "This task runs only in dev environment"
  
  - id: prod-task
    type: io.kestra.core.tasks.scripts.Bash
    dependsOn:
      - check-environment
    when:
      condition: "{{ inputs.environment == 'prod' }}"
    commands:
      - echo "This task runs only in prod environment"
```

### 4. การใช้ Error Handling

Error Handling ช่วยให้สามารถจัดการกับข้อผิดพลาดที่เกิดขึ้นใน workflow ได้:

```yaml
id: error-handling-workflow
namespace: dev

tasks:
  - id: risky-task
    type: io.kestra.core.tasks.scripts.Bash
    commands:
      - echo "This task might fail"
      - exit 1  # จงใจให้ task นี้ fail
    errors:
      - id: handle-error
        type: io.kestra.core.tasks.scripts.Bash
        commands:
          - echo "Handling error from risky-task"
          - echo "Sending notification..."
  
  - id: final-task
    type: io.kestra.core.tasks.scripts.Bash
    dependsOn:
      - risky-task
    commands:
      - echo "This task will run even if risky-task fails"
```

## เทคนิคและแนวทางปฏิบัติที่ดี

### 1. การแบ่ง Workflow เป็นส่วนย่อย

การแบ่ง workflow เป็นส่วนย่อยช่วยให้สามารถนำกลับมาใช้ใหม่และจัดการได้ง่ายขึ้น:

```yaml
id: extract-workflow
namespace: dev

tasks:
  - id: extract
    type: io.kestra.core.tasks.scripts.Python
    script: |
      # โค้ดสำหรับ extract ข้อมูล
      kestra_outputs = {
          "output_file": "data/extract.csv"
      }
```

```yaml
id: transform-workflow
namespace: dev

inputs:
  - name: input_file
    type: STRING
    required: true

tasks:
  - id: transform
    type: io.kestra.core.tasks.scripts.Python
    script: |
      # โค้ดสำหรับ transform ข้อมูล
      input_file = "{{ inputs.input_file }}"
      kestra_outputs = {
          "output_file": "data/transform.csv"
      }
```

```yaml
id: main-workflow
namespace: dev

tasks:
  - id: run-extract
    type: io.kestra.core.tasks.flows.Flow
    namespace: dev
    flowId: extract-workflow
  
  - id: run-transform
    type: io.kestra.core.tasks.flows.Flow
    dependsOn:
      - run-extract
    namespace: dev
    flowId: transform-workflow
    inputs:
      input_file: "{{ outputs.run-extract.output_file }}"
```

### 2. การใช้ Templates

Templates ช่วยให้สามารถสร้าง workflow ที่มีรูปแบบคล้ายกันได้อย่างรวดเร็ว:

```yaml
id: template-workflow
namespace: dev

inputs:
  - name: table_name
    type: STRING
    required: true
  - name: date
    type: STRING
    required: false
    defaults: "{{ now() | dateFormat('yyyy-MM-dd') }}"

tasks:
  - id: process-table
    type: io.kestra.core.tasks.scripts.Bash
    commands:
      - echo "Processing table {{ inputs.table_name }} for date {{ inputs.date }}"
      - echo "Query: SELECT * FROM {{ inputs.table_name }} WHERE date = '{{ inputs.date }}'"
```

รัน workflow ด้วยค่า input ต่างๆ:

```bash
kestra flow run dev.template-workflow -i table_name=users
kestra flow run dev.template-workflow -i table_name=orders -i date=2025-05-01
```

### 3. การใช้ Plugins

Kestra มี plugins มากมายที่ช่วยเพิ่มความสามารถ:

```yaml
id: plugin-workflow
namespace: dev

tasks:
  # ใช้ plugin สำหรับ Slack
  - id: send-slack
    type: io.kestra.plugin.notifications.slack.SlackMessage
    url: "{{ secrets.SLACK_WEBHOOK_URL }}"
    message: "Workflow completed successfully!"
    
  # ใช้ plugin สำหรับ AWS S3
  - id: upload-to-s3
    type: io.kestra.plugin.aws.s3.Upload
    accessKeyId: "{{ secrets.AWS_ACCESS_KEY_ID }}"
    secretKeyId: "{{ secrets.AWS_SECRET_ACCESS_KEY }}"
    region: us-east-1
    bucket: my-bucket
    key: data/file.csv
    from: data/local-file.csv
```

### 4. การใช้ Secrets

Secrets ช่วยในการจัดการข้อมูลที่เป็นความลับ:

```bash
# เพิ่ม secret
kestra secret create SLACK_WEBHOOK_URL https://hooks.slack.com/services/xxx/yyy/zzz
kestra secret create DB_PASSWORD mySecretPassword
```

```yaml
id: secrets-workflow
namespace: dev

tasks:
  - id: use-secrets
    type: io.kestra.core.tasks.scripts.Bash
    commands:
      - echo "Connecting to database with password: {{ secrets.DB_PASSWORD }}"
      - echo "Sending notification to Slack webhook: {{ secrets.SLACK_WEBHOOK_URL }}"
```

## สรุป

Kestra เป็นเครื่องมือ orchestration ยุคใหม่ที่มีจุดเด่นในเรื่องของ UI ที่ใช้งานง่าย, การกำหนด workflow ด้วย YAML, และความสามารถในการจัดการกับความล้มเหลว ทำให้เป็นอีกทางเลือกที่น่าสนใจสำหรับ Data Engineer

ในบทความนี้ เราได้เรียนรู้เกี่ยวกับ:
- พื้นฐานของ Kestra และการติดตั้ง
- การสร้าง workflow ด้วย Kestra
- การใช้งาน Kestra ขั้นสูง เช่น triggers, variables, conditions, error handling
- เทคนิคและแนวทางปฏิบัติที่ดีในการใช้ Kestra

Kestra อาจเป็นทางเลือกที่ดีสำหรับทีมที่ต้องการเครื่องมือ orchestration ที่ใช้งานง่าย, มี UI ที่สวยงาม, และสามารถกำหนด workflow ด้วย YAML แทนการเขียนโค้ด Python เหมือน Airflow

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจพื้นฐานของ Kestra และสามารถนำไปประยุกต์ใช้ในงาน Data Engineering ได้อย่างมีประสิทธิภาพนะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
