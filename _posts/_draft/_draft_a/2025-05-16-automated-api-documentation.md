---
layout: post
title:  "เลิกเขียนเอกสาร API แบบเดิมๆ: เครื่องมืออัตโนมัติที่ช่วยให้ชีวิต Developer ง่ายขึ้น"
author: "Weerawat"
tags: [API Documentation, Developer Tools, Automation, draft-A]
---

![API Documentation](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Wr6Oc1bG9BwLFhFz-p3NxQ.jpeg)

# **เลิกเขียนเอกสาร API แบบเดิมๆ: เครื่องมืออัตโนมัติที่ช่วยให้ชีวิต Developer ง่ายขึ้น**

## Table of Contents
- [**เลิกเขียนเอกสาร API แบบเดิมๆ: เครื่องมืออัตโนมัติที่ช่วยให้ชีวิต Developer ง่ายขึ้น**](#เลิกเขียนเอกสาร-api-แบบเดิมๆ-เครื่องมืออัตโนมัติที่ช่วยให้ชีวิต-developer-ง่ายขึ้น)
  - [Table of Contents](#table-of-contents)
  - [เมื่อเอกสาร API กลายเป็นภาระหนักอึ้ง](#เมื่อเอกสาร-api-กลายเป็นภาระหนักอึ้ง)
  - [Knowledge](#knowledge)
  - [Pre-Requirement](#pre-requirement)
  - [เครื่องมือสร้างเอกสาร API อัตโนมัติคืออะไร?](#เครื่องมือสร้างเอกสาร-api-อัตโนมัติคืออะไร)
  - [Pre-Setup](#pre-setup)
  - [How to: การใช้ Swagger/OpenAPI](#how-to-การใช้-swaggeropenapi)
  - [How to: การใช้ Sphinx สำหรับ Python](#how-to-การใช้-sphinx-สำหรับ-python)
  - [เทคนิคและการตั้งค่า](#เทคนิคและการตั้งค่า)
  - [สรุป](#สรุป)

## เมื่อเอกสาร API กลายเป็นภาระหนักอึ้ง

เคยมั้ย? เขียนโค้ดเสร็จแล้ว แต่ต้องมานั่งเขียนเอกสาร API อธิบายว่าแต่ละ endpoint ทำอะไร รับพารามิเตอร์อะไรบ้าง ส่งค่ากลับมาเป็นอะไร... แล้วพอมีการเปลี่ยนแปลงโค้ด ก็ต้องมาอัพเดทเอกสารอีก บางทีลืมอัพเดท เอกสารก็เลยไม่ตรงกับโค้ดจริง ทำให้ทีมที่มาใช้งาน API เราสับสน

หรือบางทีเราเป็นคนใหม่ในทีม ต้องมาศึกษาโค้ดเก่าที่ไม่มีเอกสาร หรือเอกสารไม่อัพเดท ทำให้ต้องเสียเวลาไล่อ่านโค้ดทีละบรรทัด

ปัญหาเหล่านี้เป็นเรื่องที่ Data Engineer และ Developer ทุกคนต้องเจอ แต่ในปัจจุบัน เรามีเครื่องมือที่ช่วยสร้างและอัพเดทเอกสาร API แบบอัตโนมัติได้แล้ว! มาดูกันว่ามีอะไรบ้าง และใช้งานอย่างไร

## Knowledge

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การสร้างเอกสาร API แบบอัตโนมัติจากโค้ด
- การใช้เครื่องมือ Swagger/OpenAPI, Sphinx, และ JSDoc
- การเขียนโค้ดที่มี Documentation ในตัว
- การทำให้เอกสารอัพเดทอัตโนมัติเมื่อโค้ดเปลี่ยน
- การผสานการทำเอกสารเข้ากับ CI/CD pipeline

## Pre-Requirement

ก่อนที่จะเริ่มใช้เครื่องมือสร้างเอกสารอัตโนมัติ คุณควรมีความรู้พื้นฐานเกี่ยวกับ:
- ความเข้าใจพื้นฐานเกี่ยวกับ API (RESTful, GraphQL, etc.)
- ความรู้เบื้องต้นเกี่ยวกับภาษาโปรแกรมมิ่งที่คุณใช้ (Python, Java, JavaScript, etc.)
- พื้นฐานการใช้ Git และ CI/CD (สำหรับการอัพเดทเอกสารอัตโนมัติ)
- ความเข้าใจเกี่ยวกับ Markdown หรือ reStructuredText (สำหรับการเขียน docstring)

## เครื่องมือสร้างเอกสาร API อัตโนมัติคืออะไร?

เครื่องมือสร้างเอกสาร API อัตโนมัติ คือซอฟต์แวร์ที่ช่วยสร้างเอกสารจากโค้ดของเรา โดยอาศัยข้อมูลจาก:
1. **Comments และ Docstrings** ในโค้ด
2. **Annotations** หรือ **Decorators** พิเศษ
3. **โครงสร้างโค้ด** เช่น ชื่อฟังก์ชัน พารามิเตอร์ ค่าที่ส่งกลับ

เครื่องมือเหล่านี้จะสร้างเอกสารในรูปแบบต่างๆ เช่น HTML, PDF, หรือแม้แต่ UI แบบ Interactive ที่ผู้ใช้สามารถทดลองเรียก API ได้จริง

เครื่องมือยอดนิยมที่ใช้กันมากในปัจจุบัน ได้แก่:
- **Swagger/OpenAPI** - สำหรับ RESTful API
- **Sphinx** - นิยมใช้กับ Python
- **JSDoc** - สำหรับ JavaScript
- **Javadoc** - สำหรับ Java
- **Postman** - สำหรับทดสอบและสร้างเอกสาร API

ในบทความนี้ เราจะเน้นที่ Swagger/OpenAPI และ Sphinx เป็นหลัก เพราะเป็นเครื่องมือที่ Data Engineer มักจะได้ใช้บ่อย

## Pre-Setup

ก่อนจะเริ่มใช้งานเครื่องมือสร้างเอกสารอัตโนมัติ เราต้องติดตั้งและตั้งค่าเครื่องมือก่อน:

**สำหรับ Swagger/OpenAPI (ใช้กับ FastAPI ใน Python)**

```bash
# ติดตั้ง FastAPI และ Uvicorn (ASGI server)
pip install fastapi uvicorn

# หากต้องการใช้ Swagger UI แบบ standalone
pip install swagger-ui-bundle
```

**สำหรับ Sphinx (Python)**

```bash
# ติดตั้ง Sphinx และ theme ยอดนิยม
pip install sphinx sphinx-rtd-theme

# สำหรับ API documentation จาก docstrings
pip install sphinx-autoapi
```

**สำหรับ JSDoc (JavaScript)**

```bash
# ติดตั้ง JSDoc ผ่าน npm
npm install -g jsdoc

# หรือเพิ่มเป็น dev dependency ในโปรเจค
npm install --save-dev jsdoc
```

## How to: การใช้ Swagger/OpenAPI

Swagger/OpenAPI เป็นเครื่องมือที่ยอดเยี่ยมสำหรับการสร้างเอกสาร RESTful API โดยเฉพาะเมื่อใช้ร่วมกับ FastAPI ใน Python

### 1. สร้าง API ด้วย FastAPI

```python
from fastapi import FastAPI, Query, Path
from pydantic import BaseModel, Field
from typing import Optional, List

# สร้าง FastAPI instance
app = FastAPI(
    title="Data Pipeline API",
    description="API สำหรับจัดการ Data Pipeline",
    version="0.1.0"
)

# สร้าง Model ด้วย Pydantic
class PipelineStatus(BaseModel):
    pipeline_id: int = Field(..., description="ID ของ pipeline")
    status: str = Field(..., description="สถานะปัจจุบันของ pipeline (running, failed, completed)")
    last_run: str = Field(..., description="เวลาล่าสุดที่ pipeline ทำงาน")
    error_message: Optional[str] = Field(None, description="ข้อความแสดงข้อผิดพลาด (ถ้ามี)")

# สร้าง Endpoint พร้อม docstring
@app.get("/pipelines/", response_model=List[PipelineStatus], tags=["pipelines"])
async def get_pipelines(
    status: Optional[str] = Query(None, description="กรองตามสถานะ (running, failed, completed)")
):
    """
    ดึงรายการ pipelines ทั้งหมดในระบบ
    
    สามารถกรองตามสถานะได้โดยใช้ query parameter `status`
    
    Returns:
        List[PipelineStatus]: รายการ pipeline พร้อมสถานะ
    """
    # โค้ดจริงจะดึงข้อมูลจากฐานข้อมูล
    return [
        PipelineStatus(pipeline_id=1, status="running", last_run="2025-05-16T10:00:00Z", error_message=None),
        PipelineStatus(pipeline_id=2, status="failed", last_run="2025-05-16T09:30:00Z", error_message="Connection timeout")
    ]

@app.get("/pipelines/{pipeline_id}", response_model=PipelineStatus, tags=["pipelines"])
async def get_pipeline(
    pipeline_id: int = Path(..., description="ID ของ pipeline ที่ต้องการดูข้อมูล")
):
    """
    ดึงข้อมูลของ pipeline ตาม ID ที่ระบุ
    
    Args:
        pipeline_id: ID ของ pipeline ที่ต้องการดูข้อมูล
        
    Returns:
        PipelineStatus: ข้อมูลสถานะของ pipeline
        
    Raises:
        HTTPException: ถ้าไม่พบ pipeline ตาม ID ที่ระบุ
    """
    # โค้ดจริงจะดึงข้อมูลจากฐานข้อมูล
    return PipelineStatus(pipeline_id=pipeline_id, status="running", last_run="2025-05-16T10:00:00Z", error_message=None)
```

### 2. รัน FastAPI และเข้าถึงเอกสาร

```bash
# รัน FastAPI server
uvicorn main:app --reload
```

เมื่อรันแล้ว สามารถเข้าถึงเอกสาร Swagger UI ได้ที่:
- http://localhost:8000/docs (Swagger UI)
- http://localhost:8000/redoc (ReDoc - อีกรูปแบบหนึ่งของเอกสาร)

![Swagger UI](https://fastapi.tiangolo.com/img/tutorial/first-steps/image02.png)

### 3. Export OpenAPI Schema

หากต้องการ export OpenAPI schema เพื่อนำไปใช้กับเครื่องมืออื่น:

```bash
# ใช้ curl เพื่อดึง OpenAPI schema
curl http://localhost:8000/openapi.json > openapi.json
```

## How to: การใช้ Sphinx สำหรับ Python

Sphinx เป็นเครื่องมือที่ยอดเยี่ยมสำหรับการสร้างเอกสารโปรเจค Python โดยเฉพาะอย่างยิ่งสำหรับไลบรารีและ package

### 1. สร้างโครงสร้างเอกสาร Sphinx

```bash
# สร้างโฟลเดอร์สำหรับเอกสาร
mkdir docs
cd docs

# สร้างโครงสร้างเอกสาร Sphinx
sphinx-quickstart
```

ตอบคำถามตามที่ wizard ถาม โดยเฉพาะ:
- Separate source and build directories? ตอบ y
- Project name, author name, version? ตอบตามข้อมูลโปรเจคของคุณ

### 2. ปรับแต่งไฟล์ conf.py

แก้ไขไฟล์ `docs/source/conf.py` เพื่อเพิ่ม extension ที่จำเป็น:

```python
# เพิ่ม extensions
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'autoapi.extension',
]

# ตั้งค่า autoapi
autoapi_type = 'python'
autoapi_dirs = ['../../your_package']  # path ไปยังโค้ดของคุณ

# เลือก theme
html_theme = 'sphinx_rtd_theme'
```

### 3. เขียน docstring ในโค้ด

```python
def process_data(data, columns=None, filter_condition=None):
    """
    ประมวลผลข้อมูลตามเงื่อนไขที่กำหนด
    
    Function นี้จะทำการประมวลผลข้อมูลโดยเลือกเฉพาะคอลัมน์ที่ต้องการ
    และกรองข้อมูลตามเงื่อนไข
    
    Parameters
    ----------
    data : pandas.DataFrame
        ข้อมูลที่ต้องการประมวลผล
    columns : list, optional
        รายชื่อคอลัมน์ที่ต้องการเลือก ถ้าไม่ระบุจะเลือกทุกคอลัมน์
    filter_condition : str, optional
        เงื่อนไขในการกรองข้อมูล เช่น "column > 5"
        
    Returns
    -------
    pandas.DataFrame
        ข้อมูลที่ผ่านการประมวลผลแล้ว
        
    Examples
    --------
    >>> import pandas as pd
    >>> df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
    >>> process_data(df, columns=['A'])
       A
    0  1
    1  2
    2  3
    """
    result = data.copy()
    
    if columns:
        result = result[columns]
        
    if filter_condition:
        result = result.query(filter_condition)
        
    return result
```

### 4. สร้างเอกสาร

```bash
# ในโฟลเดอร์ docs
make html
```

เอกสารจะถูกสร้างใน `docs/build/html/` สามารถเปิดไฟล์ `index.html` ด้วยเบราว์เซอร์เพื่อดูเอกสาร

![Sphinx Documentation](https://sphinx-rtd-theme.readthedocs.io/en/stable/_images/screen_mobile.png)

## เทคนิคและการตั้งค่า

### 1. ผสาน Documentation เข้ากับ CI/CD

การสร้างเอกสารอัตโนมัติจะมีประโยชน์มากขึ้นเมื่อผสานเข้ากับ CI/CD pipeline เพื่อให้เอกสารอัพเดทโดยอัตโนมัติเมื่อมีการ push โค้ดใหม่

**ตัวอย่าง GitHub Actions สำหรับ Sphinx**

```yaml
name: Build and Deploy Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -e .
        pip install sphinx sphinx-rtd-theme sphinx-autoapi
    - name: Build documentation
      run: |
        cd docs
        make html
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs/build/html
```

### 2. เทคนิคการเขียน Docstring ที่ดี

1. **ใช้รูปแบบที่สม่ำเสมอ** - เลือกรูปแบบ docstring (Google, NumPy, reStructuredText) และใช้อย่างสม่ำเสมอทั้งโปรเจค

2. **อธิบายพารามิเตอร์และค่าที่ส่งกลับให้ชัดเจน** - ระบุประเภทข้อมูล (type) และคำอธิบายของพารามิเตอร์และค่าที่ส่งกลับ

3. **ใส่ตัวอย่างการใช้งาน** - ตัวอย่างช่วยให้ผู้ใช้เข้าใจวิธีใช้งานได้เร็วขึ้น

4. **อธิบาย Exceptions** - ระบุ exceptions ที่อาจเกิดขึ้นและเงื่อนไขที่ทำให้เกิด

### 3. การตั้งค่า Swagger UI ให้สวยงาม

สำหรับ FastAPI คุณสามารถปรับแต่ง Swagger UI ได้:

```python
app = FastAPI(
    title="Data Pipeline API",
    description="API สำหรับจัดการ Data Pipeline",
    version="0.1.0",
    docs_url="/documentation",  # เปลี่ยน URL ของ Swagger UI
    redoc_url=None,  # ปิด ReDoc ถ้าไม่ต้องการ
    openapi_tags=[
        {"name": "pipelines", "description": "Operations with data pipelines"},
        {"name": "users", "description": "User management"},
    ]
)
```

### 4. การสร้าง Interactive API Documentation

นอกจาก Swagger UI แล้ว คุณยังสามารถใช้ Postman เพื่อสร้างเอกสาร API แบบ interactive ได้:

1. สร้าง Collection ใน Postman
2. เพิ่ม Requests ต่างๆ พร้อมคำอธิบาย
3. ใช้ Postman API Network เพื่อเผยแพร่เอกสาร

![Postman Documentation](https://assets.postman.com/postman-docs/v10/publishing-your-docs-v10.jpg)

## สรุป

การใช้เครื่องมือสร้างเอกสาร API อัตโนมัติช่วยให้เราประหยัดเวลาและทำให้เอกสารอัพเดทอยู่เสมอ ซึ่งเป็นประโยชน์อย่างมากทั้งกับตัวเราเองและทีมที่ต้องใช้งาน API ของเรา

ประโยชน์ที่ได้รับ:
- ลดเวลาในการเขียนเอกสาร
- เอกสารอัพเดทตามโค้ดเสมอ
- มีมาตรฐานในการเขียนเอกสาร
- ผู้ใช้งานสามารถเข้าใจและทดลองใช้ API ได้ง่าย
- ช่วยในการ onboarding สมาชิกใหม่ในทีม

เครื่องมือที่แนะนำในบทความนี้เป็นเพียงส่วนหนึ่งเท่านั้น ยังมีเครื่องมืออื่นๆ อีกมากมายที่เหมาะกับภาษาและเฟรมเวิร์คต่างๆ ขึ้นอยู่กับความต้องการและบริบทของโปรเจคของคุณ

สุดท้ายนี้ การลงทุนเวลาในการเขียน docstring ที่ดีและตั้งค่าระบบสร้างเอกสารอัตโนมัติ อาจจะดูเหมือนเสียเวลาในตอนแรก แต่จะช่วยประหยัดเวลาและลดความผิดพลาดในระยะยาวอย่างมาก โดยเฉพาะเมื่อโปรเจคเติบโตขึ้นและมีคนใช้งาน API ของคุณมากขึ้น

หวังว่าบทความนี้จะช่วยให้คุณเริ่มต้นใช้เครื่องมือสร้างเอกสารอัตโนมัติได้อย่างมีประสิทธิภาพ และทำให้ชีวิตของ Developer ง่ายขึ้นนะครับ!
