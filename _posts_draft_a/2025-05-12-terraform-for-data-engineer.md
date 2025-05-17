---
layout: post
title: "Terraform สำหรับ Data Engineer: สร้าง Infrastructure แบบอัตโนมัติ"
author: "Weerawat"
tags: [Infrastructure, Terraform, AWS, GCP, Azure, draft-A]
---

![Terraform for Data Engineers](https://www.datocms-assets.com/2885/1620155116-brandhcterraformverticalcolor.svg)

# Terraform สำหรับ Data Engineer: สร้าง Infrastructure แบบอัตโนมัติ

## Table of Contents
- [ปัญหาที่ Data Engineer มักเจอกับ Infrastructure](#ปัญหาที่-data-engineer-มักเจอกับ-infrastructure)
- [Knowledge](#knowledge)
- [Pre-Requirement](#pre-requirement)
- [Concept](#concept)
- [Pre-Setup](#pre-setup)
- [How to](#how-to)
- [Technic and Config](#technic-and-config)
- [สรุป](#สรุป)

## ปัญหาที่ Data Engineer มักเจอกับ Infrastructure

เคยเจอปัญหาแบบนี้มั้ยครับ? 

- ต้องสร้าง Data Pipeline ใหม่ แต่ต้องรอทีม DevOps หรือ Cloud Engineer สร้าง infrastructure ให้นานเป็นอาทิตย์
- เซ็ตอัพ infrastructure ด้วยมือผ่าน console แล้วลืมว่าตั้งค่าอะไรไปบ้าง
- ทำงานกับหลาย environment (dev, staging, prod) แล้วต้องทำซ้ำๆ กันหลายรอบ
- ต้องการย้าย pipeline จาก AWS ไป GCP แต่ไม่รู้จะเริ่มยังไง

ผมเองก็เคยเจอปัญหาเหล่านี้ตอนเริ่มทำงานเป็น Data Engineer ใหม่ๆ จนได้มารู้จักกับ Terraform ซึ่งเป็นเครื่องมือที่ช่วยให้เราสร้างและจัดการ infrastructure แบบอัตโนมัติได้ด้วยโค้ด

วันนี้ผมจะมาแชร์ประสบการณ์และความรู้เกี่ยวกับการใช้ Terraform สำหรับงาน Data Engineering ครับ

## Knowledge

การเรียนรู้ Terraform จะช่วยให้เราพัฒนาทักษะและความรู้ในด้านต่อไปนี้:

- **Infrastructure as Code (IaC)**: เรียนรู้การจัดการ infrastructure ด้วยโค้ด
- **Cloud Platforms**: เข้าใจการทำงานของ AWS, GCP, Azure และ cloud provider อื่นๆ
- **DevOps Practices**: เรียนรู้แนวคิด CI/CD และการทำ automation
- **Resource Management**: เข้าใจการจัดการทรัพยากรบนคลาวด์อย่างมีประสิทธิภาพ
- **Version Control**: การจัดการเวอร์ชันของ infrastructure
- **Collaboration**: การทำงานร่วมกันระหว่างทีม Data และทีม DevOps

## Pre-Requirement

ก่อนที่เราจะเริ่มใช้งาน Terraform มาดูสิ่งที่เราควรมีกันก่อน:

1. **Terraform CLI**: ต้องติดตั้ง Terraform บนเครื่องของเรา
2. **Cloud Provider Account**: บัญชีของ cloud provider ที่เราต้องการใช้งาน (AWS, GCP, Azure)
3. **Cloud Provider CLI**: เช่น AWS CLI, Google Cloud SDK, Azure CLI
4. **Code Editor**: เช่น VS Code พร้อม extension สำหรับ Terraform
5. **Git**: สำหรับการจัดการเวอร์ชันของโค้ด

## Concept

### Terraform คืออะไร?

Terraform เป็นเครื่องมือ Infrastructure as Code (IaC) ที่พัฒนาโดย HashiCorp ช่วยให้เราสามารถสร้าง เปลี่ยนแปลง และจัดการ infrastructure บนคลาวด์ได้อย่างมีประสิทธิภาพผ่านการเขียนโค้ด

### ทำไม Data Engineer ถึงควรรู้จัก Terraform?

Data Engineer ไม่ได้ทำงานแค่กับข้อมูลเท่านั้น แต่ยังต้องจัดการกับ infrastructure ที่รองรับ data pipeline ด้วย เช่น:

- สร้าง S3 bucket หรือ GCS bucket สำหรับเก็บข้อมูล
- ตั้งค่า EMR cluster หรือ Dataproc cluster สำหรับประมวลผลข้อมูล
- สร้าง Redshift, BigQuery หรือ Snowflake สำหรับ data warehouse
- ตั้งค่า Airflow, Dagster หรือ Prefect สำหรับ orchestration

การใช้ Terraform ช่วยให้เราสามารถจัดการสิ่งเหล่านี้ได้อย่างเป็นระบบและอัตโนมัติ

### หลักการทำงานของ Terraform

Terraform ทำงานด้วยหลักการ 3 ขั้นตอนหลัก:

1. **Write**: เขียนโค้ดที่อธิบายว่าต้องการ infrastructure แบบไหน
2. **Plan**: Terraform จะวิเคราะห์ว่าต้องทำอะไรบ้างเพื่อให้ได้ infrastructure ตามที่เราต้องการ
3. **Apply**: Terraform จะสร้างหรือเปลี่ยนแปลง infrastructure ตามแผนที่วางไว้

### คำศัพท์สำคัญใน Terraform

- **Provider**: ตัวเชื่อมต่อกับ cloud provider หรือ service ต่างๆ
- **Resource**: ทรัพยากรที่เราต้องการสร้าง เช่น VM, database, storage
- **Module**: ชุดของ resources ที่สามารถนำกลับมาใช้ใหม่ได้
- **State**: ไฟล์ที่เก็บสถานะปัจจุบันของ infrastructure
- **Variables**: ตัวแปรที่ใช้ในการกำหนดค่าต่างๆ
- **Output**: ค่าที่ได้จากการสร้าง infrastructure เช่น IP address, endpoint

## Pre-Setup

มาเริ่มติดตั้ง Terraform กันเลย!

### ติดตั้ง Terraform บน Windows

1. ดาวน์โหลด Terraform จาก [เว็บไซต์หลัก](https://www.terraform.io/downloads.html)
2. แตกไฟล์ ZIP และย้ายไฟล์ `terraform.exe` ไปยังโฟลเดอร์ที่อยู่ใน PATH เช่น `C:\Windows`
3. เปิด Command Prompt และรัน `terraform -v` เพื่อตรวจสอบว่าติดตั้งสำเร็จ

### ติดตั้ง Terraform บน macOS

```bash
brew install terraform
```

### ติดตั้ง Terraform บน Linux

```bash
wget https://releases.hashicorp.com/terraform/1.0.0/terraform_1.0.0_linux_amd64.zip
unzip terraform_1.0.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```

### ตั้งค่า Cloud Provider

#### AWS

1. ติดตั้ง AWS CLI
2. รัน `aws configure` และใส่ Access Key, Secret Key

#### GCP

1. ติดตั้ง Google Cloud SDK
2. รัน `gcloud auth application-default login`

#### Azure

1. ติดตั้ง Azure CLI
2. รัน `az login`

## How to

มาเริ่มใช้งาน Terraform กันเลย! เราจะลองสร้าง data lake อย่างง่ายบน AWS กัน

### โครงสร้างโปรเจค

```
data-lake-project/
├── main.tf         # ไฟล์หลักที่กำหนด resources
├── variables.tf    # ไฟล์สำหรับกำหนดตัวแปร
├── outputs.tf      # ไฟล์สำหรับกำหนดค่าที่ต้องการแสดงหลังจาก apply
└── terraform.tfvars # ไฟล์สำหรับกำหนดค่าตัวแปร (ไม่ควร commit ลง git)
```

### สร้าง S3 Bucket สำหรับ Data Lake

สร้างไฟล์ `main.tf`:

```hcl
provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "data_lake" {
  bucket = "${var.project_name}-data-lake-${var.environment}"
  
  tags = {
    Name        = "${var.project_name}-data-lake"
    Environment = var.environment
    Project     = var.project_name
  }
}

# กำหนดนโยบายการเข้าถึง bucket
resource "aws_s3_bucket_acl" "data_lake_acl" {
  bucket = aws_s3_bucket.data_lake.id
  acl    = "private"
}

# สร้างโฟลเดอร์ (prefixes) ใน bucket
resource "aws_s3_object" "raw_folder" {
  bucket = aws_s3_bucket.data_lake.id
  key    = "raw/"
  content_type = "application/x-directory"
}

resource "aws_s3_object" "processed_folder" {
  bucket = aws_s3_bucket.data_lake.id
  key    = "processed/"
  content_type = "application/x-directory"
}

resource "aws_s3_object" "curated_folder" {
  bucket = aws_s3_bucket.data_lake.id
  key    = "curated/"
  content_type = "application/x-directory"
}
```

สร้างไฟล์ `variables.tf`:

```hcl
variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}
```

สร้างไฟล์ `outputs.tf`:

```hcl
output "data_lake_bucket_name" {
  description = "Name of the data lake bucket"
  value       = aws_s3_bucket.data_lake.id
}

output "data_lake_bucket_arn" {
  description = "ARN of the data lake bucket"
  value       = aws_s3_bucket.data_lake.arn
}
```

สร้างไฟล์ `terraform.tfvars`:

```hcl
aws_region   = "ap-southeast-1"
project_name = "datadaily"
environment  = "dev"
```

### การใช้งาน Terraform

1. **Initialize**: เริ่มต้นโปรเจค Terraform

```bash
terraform init
```

2. **Plan**: ดูแผนการทำงาน

```bash
terraform plan
```

3. **Apply**: สร้าง infrastructure

```bash
terraform apply
```

4. **Destroy**: ลบ infrastructure เมื่อไม่ต้องการใช้งานแล้ว

```bash
terraform destroy
```

## Technic and Config

มาดูเทคนิคและการตั้งค่าที่น่าสนใจสำหรับ Data Engineer:

### การสร้าง Data Pipeline ด้วย Terraform

ลองมาสร้าง data pipeline อย่างง่ายที่ประกอบด้วย:
- S3 bucket สำหรับเก็บข้อมูล
- AWS Glue Crawler สำหรับสร้าง metadata
- AWS Athena สำหรับ query ข้อมูล

```hcl
# สร้าง S3 bucket สำหรับเก็บข้อมูล
resource "aws_s3_bucket" "data_bucket" {
  bucket = "${var.project_name}-data-${var.environment}"
}

# สร้าง Glue Database
resource "aws_glue_catalog_database" "glue_database" {
  name = "${var.project_name}_${var.environment}_db"
}

# สร้าง IAM Role สำหรับ Glue
resource "aws_iam_role" "glue_role" {
  name = "${var.project_name}-glue-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "glue.amazonaws.com"
        }
      }
    ]
  })
}

# แนบ policy ให้กับ role
resource "aws_iam_role_policy_attachment" "glue_service" {
  role       = aws_iam_role.glue_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole"
}

resource "aws_iam_role_policy" "s3_policy" {
  name = "s3_access"
  role = aws_iam_role.glue_role.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Effect   = "Allow"
        Resource = [
          aws_s3_bucket.data_bucket.arn,
          "${aws_s3_bucket.data_bucket.arn}/*"
        ]
      }
    ]
  })
}

# สร้าง Glue Crawler
resource "aws_glue_crawler" "data_crawler" {
  name          = "${var.project_name}-${var.environment}-crawler"
  role          = aws_iam_role.glue_role.arn
  database_name = aws_glue_catalog_database.glue_database.name
  
  s3_target {
    path = "s3://${aws_s3_bucket.data_bucket.bucket}/processed/"
  }
  
  schedule = "cron(0 0 * * ? *)"  # รันทุกวันเวลาเที่ยงคืน
}

# สร้าง S3 bucket สำหรับเก็บผลลัพธ์ของ Athena
resource "aws_s3_bucket" "athena_results" {
  bucket = "${var.project_name}-athena-results-${var.environment}"
}

# สร้าง Athena Workgroup
resource "aws_athena_workgroup" "data_workgroup" {
  name = "${var.project_name}_${var.environment}_workgroup"
  
  configuration {
    result_configuration {
      output_location = "s3://${aws_s3_bucket.athena_results.bucket}/output/"
    }
  }
}
```

### การใช้ Module

Module ช่วยให้เราสามารถนำโค้ด Terraform กลับมาใช้ใหม่ได้ ลองมาสร้าง module สำหรับ data lake:

สร้างโฟลเดอร์ `modules/data-lake` และไฟล์ `modules/data-lake/main.tf`:

```hcl
resource "aws_s3_bucket" "data_lake" {
  bucket = "${var.project_name}-data-lake-${var.environment}"
  
  tags = {
    Name        = "${var.project_name}-data-lake"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_s3_object" "folders" {
  for_each = toset(var.folders)
  
  bucket = aws_s3_bucket.data_lake.id
  key    = "${each.value}/"
  content_type = "application/x-directory"
}
```

สร้างไฟล์ `modules/data-lake/variables.tf`:

```hcl
variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
}

variable "folders" {
  description = "List of folders to create in the bucket"
  type        = list(string)
  default     = ["raw", "processed", "curated"]
}
```

สร้างไฟล์ `modules/data-lake/outputs.tf`:

```hcl
output "bucket_name" {
  description = "Name of the data lake bucket"
  value       = aws_s3_bucket.data_lake.id
}

output "bucket_arn" {
  description = "ARN of the data lake bucket"
  value       = aws_s3_bucket.data_lake.arn
}
```

จากนั้นเราสามารถใช้ module นี้ในไฟล์ `main.tf` หลักได้:

```hcl
provider "aws" {
  region = var.aws_region
}

module "data_lake" {
  source = "./modules/data-lake"
  
  project_name = var.project_name
  environment  = var.environment
  folders      = ["raw", "processed", "curated", "temp"]
}

output "data_lake_bucket_name" {
  value = module.data_lake.bucket_name
}
```

### การใช้ Terraform กับหลาย Environment

เราสามารถใช้ Terraform กับหลาย environment (dev, staging, prod) ได้โดยใช้ workspace:

```bash
# สร้าง workspace สำหรับแต่ละ environment
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

# เลือก workspace ที่ต้องการใช้งาน
terraform workspace select dev

# ดูว่ากำลังใช้ workspace อะไรอยู่
terraform workspace show
```

แล้วเราสามารถใช้ `terraform.workspace` ในโค้ดได้:

```hcl
locals {
  env_config = {
    dev = {
      instance_type = "t2.micro"
      instance_count = 1
    }
    staging = {
      instance_type = "t2.medium"
      instance_count = 2
    }
    prod = {
      instance_type = "t2.large"
      instance_count = 3
    }
  }
  
  config = local.env_config[terraform.workspace]
}

resource "aws_instance" "app" {
  count         = local.config.instance_count
  instance_type = local.config.instance_type
  # ...
}
```

### การจัดการ State

Terraform state เป็นไฟล์ที่เก็บสถานะปัจจุบันของ infrastructure ซึ่งควรเก็บไว้ในที่ปลอดภัยและสามารถแชร์กับทีมได้:

```hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state-bucket"
    key    = "data-pipeline/terraform.tfstate"
    region = "ap-southeast-1"
    dynamodb_table = "terraform-locks"
    encrypt = true
  }
}
```

## สรุป

Terraform เป็นเครื่องมือที่ทรงพลังสำหรับ Data Engineer ในการจัดการ infrastructure แบบอัตโนมัติ ช่วยให้เราสามารถ:

- สร้างและจัดการ data infrastructure ได้อย่างรวดเร็วและมีประสิทธิภาพ
- ทำงานร่วมกับทีมได้ดีขึ้นผ่านการใช้ version control
- ลดความผิดพลาดจากการทำงานด้วยมือ
- สร้าง infrastructure ที่เหมือนกันในหลาย environment
- ทำ automation ให้กับ data pipeline

การเริ่มต้นอาจจะดูยากในตอนแรก แต่เมื่อคุณเริ่มใช้งานและเห็นประโยชน์ คุณจะไม่อยากกลับไปสร้าง infrastructure ด้วยมืออีกเลย!

สำหรับ Data Engineer มือใหม่ ผมแนะนำให้เริ่มจากการสร้าง infrastructure เล็กๆ ก่อน เช่น S3 bucket หรือ database แล้วค่อยๆ เพิ่มความซับซ้อนขึ้นไปเรื่อยๆ

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจและเริ่มต้นใช้งาน Terraform ได้ง่ายขึ้นนะครับ แล้วพบกันใหม่ในบทความหน้า!
