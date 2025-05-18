---
layout: post
title: "เริ่มต้นเขียน OOP ด้วย Python สำหรับ Data Engineer มือใหม่"
author: "Weerawat"
categories: [Basic]
tags: [Python, OOP, Programming, draft-A]
---

# เริ่มต้นเขียน OOP ด้วย Python สำหรับ Data Engineer มือใหม่

## Table of Contents
- [ทำไมต้องเรียนรู้ OOP?](#ทำไมต้องเรียนรู้-oop)
- [ความรู้ที่จะได้รับ](#ความรู้ที่จะได้รับ)
- [สิ่งที่ต้องเตรียมก่อนเริ่มต้น](#สิ่งที่ต้องเตรียมก่อนเริ่มต้น)
- [แนวคิดพื้นฐานของ OOP](#แนวคิดพื้นฐานของ-oop)
- [การเขียน OOP ด้วย Python](#การเขียน-oop-ด้วย-python)
- [การประยุกต์ใช้ OOP ในงาน Data Engineering](#การประยุกต์ใช้-oop-ในงาน-data-engineering)
- [เทคนิคและแนวทางปฏิบัติที่ดี](#เทคนิคและแนวทางปฏิบัติที่ดี)

## ทำไมต้องเรียนรู้ OOP?

น้องๆ เคยเจอปัญหาแบบนี้มั้ย? เขียนโค้ด Python ไปเรื่อยๆ จนกลายเป็นไฟล์ยาวเหยียด มีฟังก์ชันเต็มไปหมด แก้โค้ดตรงนี้แล้วพังตรงนั้น หรือต้องการนำโค้ดไปใช้ซ้ำแต่ทำได้ยาก

พี่เคยเจอปัญหาแบบนี้เหมือนกัน! ตอนแรกที่เริ่มเขียน Python สำหรับงาน Data Engineering พี่เขียนแบบ Procedural Programming คือเขียนฟังก์ชันไปเรื่อยๆ แต่พอโปรเจกต์ใหญ่ขึ้น โค้ดก็เริ่มยุ่งเหยิง จัดการยาก จนได้มาเจอกับ Object-Oriented Programming (OOP) ที่ช่วยให้จัดการโค้ดได้เป็นระเบียบมากขึ้น

ในบทความนี้ พี่จะมาแนะนำการเขียน OOP ด้วย Python แบบง่ายๆ สำหรับ Data Engineer มือใหม่ ที่จะช่วยให้น้องๆ เขียนโค้ดได้เป็นระเบียบ นำกลับมาใช้ใหม่ได้ง่าย และทำงานร่วมกับผู้อื่นได้ดีขึ้น

## ความรู้ที่จะได้รับ

การเรียนรู้ OOP ด้วย Python จะช่วยพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Object-Oriented Programming** - เข้าใจแนวคิดพื้นฐานของการเขียนโปรแกรมเชิงวัตถุ
- **Python Programming** - พัฒนาทักษะการเขียน Python ขั้นสูง
- **Code Organization** - เรียนรู้การจัดระเบียบโค้ดให้เป็นสัดส่วน
- **Reusable Code** - เข้าใจการเขียนโค้ดที่นำกลับมาใช้ใหม่ได้
- **Software Design** - เรียนรู้หลักการออกแบบซอฟต์แวร์เบื้องต้น

## สิ่งที่ต้องเตรียมก่อนเริ่มต้น

ก่อนที่จะเริ่มเรียนรู้ OOP ด้วย Python น้องๆ ควรมีสิ่งต่อไปนี้:

1. **Python** - ติดตั้ง Python เวอร์ชัน 3.6 ขึ้นไป
2. **IDE หรือ Text Editor** - เช่น VS Code, PyCharm, หรือ Jupyter Notebook
3. **พื้นฐาน Python** - เข้าใจการเขียน Python เบื้องต้น เช่น ตัวแปร, ฟังก์ชัน, ลูป
4. **ความอยากรู้อยากเห็น** - สำคัญที่สุด! 😊

## แนวคิดพื้นฐานของ OOP

ก่อนที่จะเริ่มเขียนโค้ด มาทำความเข้าใจแนวคิดพื้นฐานของ OOP กันก่อน:

### OOP คืออะไร?

Object-Oriented Programming (OOP) คือรูปแบบการเขียนโปรแกรมที่มองทุกอย่างเป็น "วัตถุ" (Object) ซึ่งมีคุณสมบัติ (Properties) และพฤติกรรม (Behaviors) เหมือนสิ่งต่างๆ ในโลกจริง

### หลักการสำคัญของ OOP

1. **Encapsulation (การห่อหุ้ม)** - การซ่อนรายละเอียดภายในและเปิดเผยเฉพาะส่วนที่จำเป็น
2. **Inheritance (การสืบทอด)** - การสร้างคลาสใหม่โดยอิงจากคลาสที่มีอยู่แล้ว
3. **Polymorphism (การพ้องรูป)** - ความสามารถในการใช้อินเตอร์เฟซเดียวกันกับวัตถุที่แตกต่างกัน
4. **Abstraction (การทำให้เป็นนามธรรม)** - การแสดงเฉพาะข้อมูลที่สำคัญและซ่อนรายละเอียดที่ซับซ้อน

### คำศัพท์พื้นฐานที่ควรรู้

- **Class** - แม่แบบหรือพิมพ์เขียวสำหรับสร้าง Object
- **Object** - Instance ของ Class ที่มีคุณสมบัติและพฤติกรรมตามที่กำหนดใน Class
- **Attribute** - คุณสมบัติหรือข้อมูลของ Object
- **Method** - ฟังก์ชันที่กำหนดพฤติกรรมของ Object
- **Constructor** - วิธีพิเศษที่ถูกเรียกเมื่อสร้าง Object ใหม่
- **Inheritance** - การสืบทอดคุณสมบัติและพฤติกรรมจาก Class หนึ่งไปยังอีก Class หนึ่ง

## การเขียน OOP ด้วย Python

มาเริ่มเขียน OOP ด้วย Python กันเลย:

### 1. การสร้าง Class และ Object

```python
# สร้าง Class ชื่อ Person
class Person:
    # Constructor
    def __init__(self, name, age):
        self.name = name  # Attribute
        self.age = age    # Attribute
    
    # Method
    def greet(self):
        return f"สวัสดี! ฉันชื่อ {self.name} อายุ {self.age} ปี"

# สร้าง Object จาก Class Person
person1 = Person("สมชาย", 30)
person2 = Person("สมหญิง", 25)

# เรียกใช้ Method
print(person1.greet())  # สวัสดี! ฉันชื่อ สมชาย อายุ 30 ปี
print(person2.greet())  # สวัสดี! ฉันชื่อ สมหญิง อายุ 25 ปี

# เข้าถึง Attribute
print(person1.name)  # สมชาย
print(person2.age)   # 25
```

### 2. Encapsulation (การห่อหุ้ม)

ใน Python เราใช้ convention ในการกำหนดว่า attribute หรือ method ใดควรเป็น private โดยใช้ underscore (`_`) นำหน้า:

```python
class BankAccount:
    def __init__(self, account_number, balance):
        self.account_number = account_number  # Public attribute
        self._balance = balance               # Private attribute
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return True
        return False
    
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return True
        return False
    
    def get_balance(self):
        return self._balance

# สร้าง Object
account = BankAccount("123456789", 1000)

# เรียกใช้ Method
account.deposit(500)
print(account.get_balance())  # 1500

account.withdraw(200)
print(account.get_balance())  # 1300

# เข้าถึง Private attribute (ไม่ควรทำแบบนี้)
print(account._balance)  # 1300
```

### 3. Property Decorator

Python มี decorator `@property` ที่ช่วยให้เราสามารถเข้าถึง private attribute ผ่าน method ได้เหมือนเป็น attribute:

```python
class Person:
    def __init__(self, first_name, last_name):
        self._first_name = first_name
        self._last_name = last_name
    
    @property
    def full_name(self):
        return f"{self._first_name} {self._last_name}"
    
    @property
    def first_name(self):
        return self._first_name
    
    @first_name.setter
    def first_name(self, value):
        if value.strip():  # ตรวจสอบว่าไม่ใช่ string ว่าง
            self._first_name = value
        else:
            raise ValueError("ชื่อต้องไม่เป็นค่าว่าง")

# สร้าง Object
person = Person("สมชาย", "ใจดี")

# เข้าถึง Property
print(person.full_name)  # สมชาย ใจดี
print(person.first_name)  # สมชาย

# เปลี่ยนค่า Property
person.first_name = "มานะ"
print(person.full_name)  # มานะ ใจดี

# ทดสอบ Validation
try:
    person.first_name = ""
except ValueError as e:
    print(f"เกิดข้อผิดพลาด: {e}")  # เกิดข้อผิดพลาด: ชื่อต้องไม่เป็นค่าว่าง
```

### 4. Inheritance (การสืบทอด)

การสืบทอดช่วยให้เราสามารถสร้าง Class ใหม่โดยอิงจาก Class ที่มีอยู่แล้ว:

```python
# Base Class (Parent Class)
class Employee:
    def __init__(self, name, employee_id):
        self.name = name
        self.employee_id = employee_id
    
    def display_info(self):
        return f"พนักงาน: {self.name}, รหัส: {self.employee_id}"

# Derived Class (Child Class)
class DataEngineer(Employee):
    def __init__(self, name, employee_id, skills):
        # เรียก Constructor ของ Parent Class
        super().__init__(name, employee_id)
        self.skills = skills
    
    # Override Method
    def display_info(self):
        # เรียก Method ของ Parent Class
        basic_info = super().display_info()
        return f"{basic_info}, ทักษะ: {', '.join(self.skills)}"

# สร้าง Object
employee = Employee("สมชาย", "E001")
data_engineer = DataEngineer("มานะ", "E002", ["Python", "SQL", "Spark"])

# เรียกใช้ Method
print(employee.display_info())
# พนักงาน: สมชาย, รหัส: E001

print(data_engineer.display_info())
# พนักงาน: มานะ, รหัส: E002, ทักษะ: Python, SQL, Spark
```

### 5. Polymorphism (การพ้องรูป)

Polymorphism ช่วยให้เราสามารถใช้อินเตอร์เฟซเดียวกันกับวัตถุที่แตกต่างกัน:

```python
class DataSource:
    def read_data(self):
        raise NotImplementedError("Subclass must implement abstract method")
    
    def process_data(self):
        data = self.read_data()
        return f"กำลังประมวลผลข้อมูล: {data}"

class CSVDataSource(DataSource):
    def __init__(self, file_path):
        self.file_path = file_path
    
    def read_data(self):
        return f"อ่านข้อมูลจาก CSV: {self.file_path}"

class DatabaseDataSource(DataSource):
    def __init__(self, connection_string):
        self.connection_string = connection_string
    
    def read_data(self):
        return f"อ่านข้อมูลจากฐานข้อมูล: {self.connection_string}"

# ฟังก์ชันที่ทำงานกับ DataSource ทุกประเภท
def extract_and_process(data_source):
    return data_source.process_data()

# สร้าง Object
csv_source = CSVDataSource("data.csv")
db_source = DatabaseDataSource("postgresql://localhost:5432/mydb")

# เรียกใช้ฟังก์ชันเดียวกันกับ Object ต่างประเภท
print(extract_and_process(csv_source))
# กำลังประมวลผลข้อมูล: อ่านข้อมูลจาก CSV: data.csv

print(extract_and_process(db_source))
# กำลังประมวลผลข้อมูล: อ่านข้อมูลจากฐานข้อมูล: postgresql://localhost:5432/mydb
```

## การประยุกต์ใช้ OOP ในงาน Data Engineering

มาดูตัวอย่างการประยุกต์ใช้ OOP ในงาน Data Engineering กัน:

### 1. การสร้าง ETL Pipeline

```python
class DataExtractor:
    def __init__(self, source_config):
        self.source_config = source_config
    
    def extract(self):
        # โค้ดสำหรับดึงข้อมูลจากแหล่งต่างๆ
        print(f"กำลังดึงข้อมูลจาก {self.source_config['type']}: {self.source_config['path']}")
        # ในสถานการณ์จริง จะคืนค่าเป็น DataFrame หรือข้อมูลที่ดึงมา
        return [{"id": 1, "name": "สมชาย"}, {"id": 2, "name": "สมหญิง"}]

class DataTransformer:
    def transform(self, data):
        # โค้ดสำหรับแปลงข้อมูล
        print(f"กำลังแปลงข้อมูลจำนวน {len(data)} รายการ")
        # ในสถานการณ์จริง จะทำการแปลงข้อมูลและคืนค่า
        return [{"id": item["id"], "name": item["name"], "name_upper": item["name"].upper()} for item in data]

class DataLoader:
    def __init__(self, target_config):
        self.target_config = target_config
    
    def load(self, data):
        # โค้ดสำหรับโหลดข้อมูลไปยังปลายทาง
        print(f"กำลังโหลดข้อมูลจำนวน {len(data)} รายการไปยัง {self.target_config['type']}: {self.target_config['path']}")
        # ในสถานการณ์จริง จะทำการบันทึกข้อมูลลงในปลายทาง
        return True

class ETLPipeline:
    def __init__(self, extractor, transformer, loader):
        self.extractor = extractor
        self.transformer = transformer
        self.loader = loader
    
    def run(self):
        print("เริ่มกระบวนการ ETL")
        # Extract
        data = self.extractor.extract()
        # Transform
        transformed_data = self.transformer.transform(data)
        # Load
        result = self.loader.load(transformed_data)
        print("กระบวนการ ETL เสร็จสิ้น" if result else "กระบวนการ ETL ล้มเหลว")
        return result

# สร้าง Object
extractor = DataExtractor({"type": "CSV", "path": "data.csv"})
transformer = DataTransformer()
loader = DataLoader({"type": "Database", "path": "postgresql://localhost:5432/mydb"})

# สร้าง Pipeline
pipeline = ETLPipeline(extractor, transformer, loader)

# รัน Pipeline
pipeline.run()
```

### 2. การสร้าง Data Validator

```python
class DataValidator:
    def __init__(self, rules=None):
        self.rules = rules or {}
        self.errors = []
    
    def add_rule(self, field, rule_func, error_message):
        if field not in self.rules:
            self.rules[field] = []
        self.rules[field].append((rule_func, error_message))
    
    def validate(self, data):
        self.errors = []
        
        for item in data:
            item_errors = {}
            
            for field, rules in self.rules.items():
                if field not in item:
                    item_errors[field] = ["ไม่พบฟิลด์นี้"]
                    continue
                
                value = item[field]
                
                for rule_func, error_message in rules:
                    if not rule_func(value):
                        if field not in item_errors:
                            item_errors[field] = []
                        item_errors[field].append(error_message)
            
            if item_errors:
                self.errors.append({"data": item, "errors": item_errors})
        
        return len(self.errors) == 0
    
    def get_errors(self):
        return self.errors

# สร้าง Validator
validator = DataValidator()

# เพิ่มกฎการตรวจสอบ
validator.add_rule("age", lambda x: isinstance(x, int), "อายุต้องเป็นตัวเลข")
validator.add_rule("age", lambda x: x >= 0, "อายุต้องไม่ติดลบ")
validator.add_rule("name", lambda x: isinstance(x, str), "ชื่อต้องเป็นข้อความ")
validator.add_rule("name", lambda x: len(x) > 0, "ชื่อต้องไม่เป็นค่าว่าง")

# ข้อมูลตัวอย่าง
data = [
    {"name": "สมชาย", "age": 30},
    {"name": "", "age": -5},
    {"name": "สมหญิง", "age": "25"},
    {"age": 40}
]

# ตรวจสอบข้อมูล
is_valid = validator.validate(data)
print(f"ข้อมูลถูกต้อง: {is_valid}")

# แสดงข้อผิดพลาด
if not is_valid:
    for error in validator.get_errors():
        print(f"ข้อมูล: {error['data']}")
        print(f"ข้อผิดพลาด: {error['errors']}")
        print("---")
```

## เทคนิคและแนวทางปฏิบัติที่ดี

เมื่อน้องๆ เริ่มคุ้นเคยกับการเขียน OOP ด้วย Python แล้ว พี่มีเทคนิคและแนวทางปฏิบัติที่ดีที่อยากแนะนำ:

### 1. ใช้ SOLID Principles

SOLID เป็นหลักการออกแบบ OOP ที่ช่วยให้โค้ดมีคุณภาพดีขึ้น:

- **S (Single Responsibility)** - แต่ละ Class ควรมีหน้าที่เพียงอย่างเดียว
- **O (Open/Closed)** - Class ควรเปิดให้ขยาย แต่ปิดไม่ให้แก้ไข
- **L (Liskov Substitution)** - Class ลูกควรใช้แทน Class แม่ได้
- **I (Interface Segregation)** - แยก Interface ให้เล็กและเฉพาะเจาะจง
- **D (Dependency Inversion)** - พึ่งพา abstraction ไม่ใช่ implementation

### 2. ใช้ Type Hints

Python 3.5+ รองรับ Type Hints ซึ่งช่วยให้โค้ดอ่านง่ายขึ้นและลดข้อผิดพลาด:

```python
from typing import List, Dict, Any, Optional

class DataProcessor:
    def process_data(self, data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        result = []
        for item in data:
            processed_item = self._transform_item(item)
            result.append(processed_item)
        return result
    
    def _transform_item(self, item: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "id": item.get("id", 0),
            "name": item.get("name", "").upper(),
            "processed_at": self._get_current_timestamp()
        }
    
    def _get_current_timestamp(self) -> str:
        from datetime import datetime
        return datetime.now().isoformat()
```

### 3. ใช้ Dataclasses

Python 3.7+ มี Dataclasses ที่ช่วยลดโค้ดซ้ำซ้อนในการสร้าง Class ที่เน้นเก็บข้อมูล:

```python
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class User:
    id: int
    name: str
    email: str
    created_at: datetime = datetime.now()
    active: bool = True
    roles: List[str] = None
    
    def __post_init__(self):
        if self.roles is None:
            self.roles = ["user"]
    
    def is_admin(self) -> bool:
        return "admin" in self.roles

# สร้าง Object
user1 = User(1, "สมชาย", "somchai@example.com")
user2 = User(2, "สมหญิง", "somying@example.com", roles=["user", "admin"])

print(user1)  # User(id=1, name='สมชาย', email='somchai@example.com', created_at=datetime.datetime(...), active=True, roles=['user'])
print(user2.is_admin())  # True
```

### 4. ใช้ Abstract Base Classes

Abstract Base Classes (ABC) ช่วยให้เราสามารถกำหนด interface ที่ Class ลูกต้องปฏิบัติตาม:

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any

class DataSource(ABC):
    @abstractmethod
    def connect(self) -> bool:
        pass
    
    @abstractmethod
    def read_data(self) -> List[Dict[str, Any]]:
        pass
    
    @abstractmethod
    def close(self) -> None:
        pass

class CSVDataSource(DataSource):
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.file = None
    
    def connect(self) -> bool:
        try:
            self.file = open(self.file_path, 'r')
            return True
        except Exception as e:
            print(f"เกิดข้อผิดพลาด: {e}")
            return False
    
    def read_data(self) -> List[Dict[str, Any]]:
        if not self.file:
            raise ValueError("ต้องเรียก connect() ก่อน")
        
        # ในสถานการณ์จริง จะอ่านข้อมูลจาก CSV
        return [{"id": 1, "name": "สมชาย"}, {"id": 2, "name": "สมหญิง"}]
    
    def close(self) -> None:
        if self.file:
            self.file.close()
            self.file = None
```

---

การเขียน OOP ด้วย Python เป็นทักษะที่สำคัญมากสำหรับ Data Engineer! ด้วยความรู้พื้นฐานที่น้องๆ ได้เรียนรู้จากบทความนี้ น้องๆ จะสามารถเขียนโค้ดได้เป็นระเบียบ นำกลับมาใช้ใหม่ได้ง่าย และทำงานร่วมกับผู้อื่นได้ดีขึ้น

OOP ไม่ใช่คำตอบสำหรับทุกปัญหา แต่เป็นเครื่องมือที่มีประโยชน์มากในการจัดการโค้ดที่ซับซ้อน โดยเฉพาะในโปรเจกต์ขนาดใหญ่หรือโปรเจกต์ที่ต้องทำงานร่วมกับผู้อื่น

พี่หวังว่าบทความนี้จะช่วยให้น้องๆ เข้าใจพื้นฐานของ OOP ด้วย Python และสามารถนำไปใช้งานได้จริง หากมีคำถามหรือต้องการคำแนะนำเพิ่มเติม สามารถติดต่อพี่ได้เสมอนะครับ สู้ๆ!
