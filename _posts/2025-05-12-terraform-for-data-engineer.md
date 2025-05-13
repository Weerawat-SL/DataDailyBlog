---
layout: post
title: "Terraform สำหรับวิศวกรข้อมูล"
date: 2025-05-12
categories: [Infrastructure as Code, Draft]
tags: [Terraform, IaC, DevOps, Cloud, Data Engineering]
---

# Terraform สำหรับวิศวกรข้อมูล

## บทนำ

Terraform เป็นเครื่องมือ Infrastructure as Code (IaC) ที่ช่วยให้สามารถสร้างและจัดการโครงสร้างพื้นฐานด้วยโค้ด สำหรับวิศวกรข้อมูล Terraform เป็นเครื่องมือที่มีประโยชน์อย่างมากในการสร้างและจัดการโครงสร้างพื้นฐานสำหรับ data platform บทความนี้จะกล่าวถึงหลักการพื้นฐาน การใช้งาน และแนวปฏิบัติที่ดีในการใช้ Terraform สำหรับงานวิศวกรรมข้อมูล

## Terraform คืออะไร?

Terraform เป็นเครื่องมือ Infrastructure as Code (IaC) ที่พัฒนาโดย HashiCorp ช่วยให้สามารถกำหนดโครงสร้างพื้นฐานด้วยไฟล์การกำหนดค่า (configuration files) แทนที่จะต้องสร้างและจัดการด้วยมือผ่าน UI หรือ CLI

### คุณลักษณะหลักของ Terraform

- **Declarative Syntax**: ใช้ภาษา HCL (HashiCorp Configuration Language) ที่อ่านและเข้าใจง่าย
- **Multi-provider**: รองรับผู้ให้บริการคลาวด์และบริการต่างๆ มากมาย
- **State Management**: จัดการสถานะของโครงสร้างพื้นฐานเพื่อติดตามการเปลี่ยนแปลง
- **Plan and Apply**: แสดงการเปลี่ยนแปลงที่จะเกิดขึ้นก่อนที่จะนำไปใช้จริง
- **Modularity**: สนับสนุนการสร้างโค้ดที่นำกลับมาใช้ใหม่ได้ผ่าน modules

## ประโยชน์ของ Terraform สำหรับวิศวกรข้อมูล

### 1. การสร้างและจัดการโครงสร้างพื้นฐานสำหรับ Data Platform

Terraform ช่วยให้วิศวกรข้อมูลสามารถสร้างและจัดการโครงสร้างพื้นฐานสำหรับ data platform ได้อย่างมีประสิทธิภาพ:

- **Reproducibility**: สร้างสภาพแวดล้อมที่เหมือนกันทุกครั้ง
- **Version Control**: เก็บโครงสร้างพื้นฐานไว้ใน version control
- **Collaboration**: ทำงานร่วมกันบนโครงสร้างพื้นฐานเดียวกัน
- **Documentation**: โค้ดเป็นเอกสารที่แสดงว่าโครงสร้างพื้นฐานถูกสร้างอย่างไร

### 2. การสร้างสภาพแวดล้อมที่สม่ำเสมอ

Terraform ช่วยให้สามารถสร้างสภาพแวดล้อมที่สม่ำเสมอสำหรับการพัฒนา ทดสอบ และการผลิต:

- **Environment Parity**: สร้างสภาพแวดล้อมที่เหมือนกันสำหรับการพัฒนา ทดสอบ และการผลิต
- **Immutable Infrastructure**: สร้างโครงสร้างพื้นฐานใหม่แทนที่จะแก้ไขโครงสร้างพื้นฐานที่มีอยู่
- **Disaster Recovery**: สร้างโครงสร้างพื้นฐานใหม่ได้อย่างรวดเร็วในกรณีที่เกิดปัญหา

### 3. การทำ CI/CD สำหรับโครงสร้างพื้นฐาน

Terraform สามารถใช้ในการทำ CI/CD สำหรับโครงสร้างพื้นฐาน:

- **Automated Testing**: ทดสอบการเปลี่ยนแปลงโครงสร้างพื้นฐานก่อนนำไปใช้จริง
- **Automated Deployment**: นำโครงสร้างพื้นฐานไปใช้งานโดยอัตโนมัติ
- **Rollback**: ย้อนกลับไปยังเวอร์ชันก่อนหน้าได้อย่างรวดเร็ว

## การใช้งาน Terraform ในงานวิศวกรรมข้อมูล

### 1. การสร้างโครงสร้างพื้นฐานสำหรับ Data Lake

Terraform สามารถใช้ในการสร้างโครงสร้างพื้นฐานสำหรับ data lake:

- **Storage**: สร้าง storage accounts, buckets, containers
- **Access Control**: กำหนดสิทธิ์การเข้าถึง
- **Networking**: กำหนดการเชื่อมต่อเครือข่าย
- **Monitoring**: ตั้งค่าการติดตามและการแจ้งเตือน

### 2. การสร้างโครงสร้างพื้นฐานสำหรับ Data Warehouse

Terraform สามารถใช้ในการสร้างโครงสร้างพื้นฐานสำหรับ data warehouse:

- **Database**: สร้างและกำหนดค่า data warehouse
- **Scaling**: กำหนดการขยายขนาด
- **Security**: กำหนดการรักษาความปลอดภัย
- **Backup**: กำหนดการสำรองข้อมูล

### 3. การสร้างโครงสร้างพื้นฐานสำหรับ Data Processing

Terraform สามารถใช้ในการสร้างโครงสร้างพื้นฐานสำหรับการประมวลผลข้อมูล:

- **Compute**: สร้าง VMs, containers, serverless functions
- **Orchestration**: สร้าง Kubernetes clusters, orchestration services
- **Streaming**: สร้าง streaming services
- **Batch Processing**: สร้าง batch processing services

## การเริ่มต้นใช้งาน Terraform

### 1. การติดตั้ง Terraform

Terraform สามารถติดตั้งได้หลายวิธี:

#### Windows

```powershell
# ใช้ Chocolatey
choco install terraform

# หรือดาวน์โหลดและติดตั้งด้วยตนเอง
# 1. ดาวน์โหลดจาก https://www.terraform.io/downloads.html
# 2. แตกไฟล์และเพิ่มลงใน PATH
```

#### macOS

```bash
# ใช้ Homebrew
brew install terraform
```

#### Linux

```bash
# ใช้ apt (Ubuntu/Debian)
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform

# หรือใช้ yum (CentOS/RHEL)
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install terraform
```

### 2. โครงสร้างของโปรเจค Terraform

โปรเจค Terraform ประกอบด้วยไฟล์ต่างๆ ดังนี้:

```
my_terraform_project/
├── main.tf          # ไฟล์หลักที่กำหนดทรัพยากร
├── variables.tf     # ไฟล์ที่กำหนดตัวแปร
├── outputs.tf       # ไฟล์ที่กำหนดผลลัพธ์
├── terraform.tfvars # ไฟล์ที่กำหนดค่าตัวแปร
└── modules/         # โฟลเดอร์สำหรับ modules
    ├── data_lake/   # Module สำหรับ data lake
    ├── data_warehouse/ # Module สำหรับ data warehouse
    └── data_processing/ # Module สำหรับการประมวลผลข้อมูล
```

### 3. คำสั่งพื้นฐานของ Terraform

```bash
# เริ่มต้นโปรเจค Terraform
terraform init

# ตรวจสอบการเปลี่ยนแปลงที่จะเกิดขึ้น
terraform plan

# นำการเปลี่ยนแปลงไปใช้งาน
terraform apply

# ลบทรัพยากรที่สร้างด้วย Terraform
terraform destroy

# ตรวจสอบสถานะปัจจุบัน
terraform state list
```

## ตัวอย่างการใช้ Terraform สำหรับงานวิศวกรรมข้อมูล

### ตัวอย่าง: การสร้าง Data Lake บน AWS

```hcl
# main.tf

provider "aws" {
  region = var.region
}

# สร้าง S3 bucket สำหรับ data lake
resource "aws_s3_bucket" "data_lake" {
  bucket = "${var.project_name}-data-lake"
  acl    = "private"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 90
      storage_class = "GLACIER"
    }
  }

  tags = {
    Name        = "${var.project_name}-data-lake"
    Environment = var.environment
  }
}

# สร้าง IAM role สำหรับการเข้าถึง data lake
resource "aws_iam_role" "data_lake_access" {
  name = "${var.project_name}-data-lake-access"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# สร้าง IAM policy สำหรับการเข้าถึง data lake
resource "aws_iam_policy" "data_lake_access" {
  name        = "${var.project_name}-data-lake-access"
  description = "Policy for accessing data lake"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ]
        Effect   = "Allow"
        Resource = [
          aws_s3_bucket.data_lake.arn,
          "${aws_s3_bucket.data_lake.arn}/*"
        ]
      }
    ]
  })
}

# แนบ policy เข้ากับ role
resource "aws_iam_role_policy_attachment" "data_lake_access" {
  role       = aws_iam_role.data_lake_access.name
  policy_arn = aws_iam_policy.data_lake_access.arn
}

# สร้าง Glue Catalog Database
resource "aws_glue_catalog_database" "data_lake_catalog" {
  name        = "${var.project_name}_data_lake_catalog"
  description = "Glue Catalog Database for Data Lake"
}

# สร้าง Glue Crawler
resource "aws_glue_crawler" "data_lake_crawler" {
  name          = "${var.project_name}-data-lake-crawler"
  role          = aws_iam_role.data_lake_access.arn
  database_name = aws_glue_catalog_database.data_lake_catalog.name

  s3_target {
    path = "s3://${aws_s3_bucket.data_lake.bucket}/processed/"
  }

  schedule = "cron(0 0 * * ? *)"
}
```

```hcl
# variables.tf

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
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

```hcl
# outputs.tf

output "data_lake_bucket" {
  description = "Name of the data lake bucket"
  value       = aws_s3_bucket.data_lake.bucket
}

output "data_lake_catalog_database" {
  description = "Name of the Glue Catalog Database"
  value       = aws_glue_catalog_database.data_lake_catalog.name
}

output "data_lake_access_role" {
  description = "ARN of the IAM role for data lake access"
  value       = aws_iam_role.data_lake_access.arn
}
```

```hcl
# terraform.tfvars

region       = "us-west-2"
project_name = "my-data-project"
environment  = "dev"
```

### ตัวอย่าง: การสร้าง Data Warehouse บน GCP

```hcl
# main.tf

provider "google" {
  project = var.project_id
  region  = var.region
}

# สร้าง BigQuery dataset
resource "google_bigquery_dataset" "data_warehouse" {
  dataset_id                  = "${var.project_name}_data_warehouse"
  friendly_name               = "${var.project_name} Data Warehouse"
  description                 = "Data Warehouse for ${var.project_name}"
  location                    = var.location
  default_table_expiration_ms = 2592000000  # 30 days

  labels = {
    environment = var.environment
  }

  access {
    role          = "OWNER"
    special_group = "projectOwners"
  }

  access {
    role          = "READER"
    special_group = "projectReaders"
  }

  access {
    role          = "WRITER"
    special_group = "projectWriters"
  }
}

# สร้าง Cloud Storage bucket สำหรับ staging
resource "google_storage_bucket" "data_warehouse_staging" {
  name          = "${var.project_id}-${var.project_name}-staging"
  location      = var.location
  force_destroy = true

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }

  labels = {
    environment = var.environment
  }
}

# สร้าง service account สำหรับการเข้าถึง data warehouse
resource "google_service_account" "data_warehouse_access" {
  account_id   = "${var.project_name}-dw-access"
  display_name = "${var.project_name} Data Warehouse Access"
}

# ให้สิทธิ์ BigQuery Admin แก่ service account
resource "google_project_iam_member" "data_warehouse_access" {
  project = var.project_id
  role    = "roles/bigquery.admin"
  member  = "serviceAccount:${google_service_account.data_warehouse_access.email}"
}

# ให้สิทธิ์ Storage Admin แก่ service account
resource "google_project_iam_member" "storage_access" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.data_warehouse_access.email}"
}
```

```hcl
# variables.tf

variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "location" {
  description = "GCP location for BigQuery and Cloud Storage"
  type        = string
  default     = "US"
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

```hcl
# outputs.tf

output "data_warehouse_dataset" {
  description = "ID of the BigQuery dataset"
  value       = google_bigquery_dataset.data_warehouse.dataset_id
}

output "staging_bucket" {
  description = "Name of the staging bucket"
  value       = google_storage_bucket.data_warehouse_staging.name
}

output "service_account_email" {
  description = "Email of the service account for data warehouse access"
  value       = google_service_account.data_warehouse_access.email
}
```

```hcl
# terraform.tfvars

project_id   = "my-gcp-project"
region       = "us-central1"
location     = "US"
project_name = "my-data-project"
environment  = "dev"
```

### ตัวอย่าง: การสร้าง Data Processing Infrastructure บน Azure

```hcl
# main.tf

provider "azurerm" {
  features {}
}

# สร้าง resource group
resource "azurerm_resource_group" "data_processing" {
  name     = "${var.project_name}-${var.environment}-rg"
  location = var.location
}

# สร้าง storage account
resource "azurerm_storage_account" "data_processing" {
  name                     = "${var.project_name}${var.environment}sa"
  resource_group_name      = azurerm_resource_group.data_processing.name
  location                 = azurerm_resource_group.data_processing.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# สร้าง container สำหรับ data lake
resource "azurerm_storage_container" "data_lake" {
  name                  = "data-lake"
  storage_account_name  = azurerm_storage_account.data_processing.name
  container_access_type = "private"
}

# สร้าง Databricks workspace
resource "azurerm_databricks_workspace" "data_processing" {
  name                = "${var.project_name}-${var.environment}-databricks"
  resource_group_name = azurerm_resource_group.data_processing.name
  location            = azurerm_resource_group.data_processing.location
  sku                 = "standard"
}

# สร้าง Data Factory
resource "azurerm_data_factory" "data_processing" {
  name                = "${var.project_name}-${var.environment}-adf"
  resource_group_name = azurerm_resource_group.data_processing.name
  location            = azurerm_resource_group.data_processing.location
}

# สร้าง linked service สำหรับ storage account
resource "azurerm_data_factory_linked_service_azure_blob_storage" "data_lake" {
  name                = "LinkedServiceDataLake"
  data_factory_id     = azurerm_data_factory.data_processing.id
  connection_string   = azurerm_storage_account.data_processing.primary_connection_string
}

# สร้าง linked service สำหรับ Databricks
resource "azurerm_data_factory_linked_service_azure_databricks" "data_processing" {
  name            = "LinkedServiceDatabricks"
  data_factory_id = azurerm_data_factory.data_processing.id
  access_token    = var.databricks_access_token
  adb_domain      = "https://${azurerm_databricks_workspace.data_processing.workspace_url}"
}
```

```hcl
# variables.tf

variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
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

variable "databricks_access_token" {
  description = "Databricks access token"
  type        = string
  sensitive   = true
}
```

```hcl
# outputs.tf

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.data_processing.name
}

output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.data_processing.name
}

output "databricks_workspace_url" {
  description = "URL of the Databricks workspace"
  value       = azurerm_databricks_workspace.data_processing.workspace_url
}

output "data_factory_name" {
  description = "Name of the Data Factory"
  value       = azurerm_data_factory.data_processing.name
}
```

```hcl
# terraform.tfvars

location     = "East US"
project_name = "my-data-project"
environment  = "dev"
# databricks_access_token = "dapi..." # ไม่ควรเก็บใน version control
```

## แนวปฏิบัติที่ดีในการใช้ Terraform สำหรับวิศวกรรมข้อมูล

### 1. การจัดการโค้ด

- **ใช้ Version Control**: เก็บโค้ด Terraform ใน Git หรือระบบ version control อื่นๆ
- **แบ่งโค้ดเป็นส่วนย่อย**: แบ่งโค้ดเป็นไฟล์และ modules ที่มีความหมาย
- **ใช้ Consistent Naming**: ใช้รูปแบบการตั้งชื่อที่สม่ำเสมอ
- **เขียน Documentation**: เขียนคำอธิบายสำหรับตัวแปร, outputs, และ resources

### 2. การจัดการ State

- **ใช้ Remote State**: เก็บ state ไว้ใน remote backend เช่น S3, Azure Blob Storage, GCS
- **ใช้ State Locking**: ป้องกันการแก้ไข state พร้อมกัน
- **แบ่ง State**: แบ่ง state ตามสภาพแวดล้อมหรือส่วนประกอบ
- **ระวังข้อมูลที่อ่อนไหว**: หลีกเลี่ยงการเก็บข้อมูลที่อ่อนไหวใน state

### 3. การจัดการ Variables และ Secrets

- **ใช้ Variable Files**: แยกค่าตัวแปรออกจากโค้ด
- **ใช้ Environment Variables**: ใช้ environment variables สำหรับค่าที่อ่อนไหว
- **ใช้ Secret Management**: ใช้ HashiCorp Vault หรือ AWS Secrets Manager
- **ไม่เก็บ Secrets ใน Version Control**: หลีกเลี่ยงการเก็บ secrets ใน Git

### 4. การทำ CI/CD

- **ใช้ Automated Testing**: ทดสอบโค้ด Terraform ด้วย tools เช่น Terratest
- **ใช้ Terraform Plan ใน CI**: รัน terraform plan ใน CI เพื่อตรวจสอบการเปลี่ยนแปลง
- **ใช้ Approval Process**: ต้องมีการอนุมัติก่อนที่จะรัน terraform apply
- **ใช้ Workspaces**: ใช้ Terraform workspaces สำหรับสภาพแวดล้อมที่แตกต่างกัน

## กรณีศึกษา: การใช้ Terraform ในโครงการวิศวกรรมข้อมูล

### กรณีศึกษา: Data Platform บน AWS

บริษัทแห่งหนึ่งต้องการสร้าง data platform บน AWS โดยใช้ Terraform:

1. **ความต้องการ**:
   - สร้าง data lake บน S3
   - สร้าง data warehouse บน Redshift
   - สร้าง data processing infrastructure บน EMR
   - สร้าง data pipeline ด้วย Glue

2. **การใช้ Terraform**:
   - สร้าง modules สำหรับแต่ละส่วนประกอบ
   - ใช้ remote state บน S3 กับ DynamoDB สำหรับ locking
   - ใช้ workspaces สำหรับสภาพแวดล้อมที่แตกต่างกัน
   - ใช้ CI/CD pipeline สำหรับการ deploy

3. **ผลลัพธ์**:
   - ลดเวลาในการสร้างโครงสร้างพื้นฐานลง 80%
   - เพิ่มความสม่ำเสมอระหว่างสภาพแวดล้อม
   - ปรับปรุงความร่วมมือระหว่างทีม
   - ลดข้อผิดพลาดในการ deploy

## สรุป

Terraform เป็นเครื่องมือที่มีประโยชน์อย่างมากสำหรับวิศวกรข้อมูลในการสร้างและจัดการโครงสร้างพื้นฐานสำหรับ data platform ด้วยการใช้ Infrastructure as Code วิศวกรข้อมูลสามารถสร้างโครงสร้างพื้นฐานที่สม่ำเสมอ ทำซ้ำได้ และจัดการได้ง่าย

การใช้ Terraform อย่างมีประสิทธิภาพต้องคำนึงถึงการจัดการโค้ด การจัดการ state การจัดการ variables และ secrets และการทำ CI/CD นอกจากนี้ การใช้ modules และการปฏิบัติตามแนวทางที่ดีจะช่วยให้สามารถสร้างโครงสร้างพื้นฐานที่มีคุณภาพสูงและบำรุงรักษาได้ง่าย

สำหรับวิศวกรข้อมูลที่ต้องการเริ่มต้นใช้ Terraform แนะนำให้เริ่มจากโครงการขนาดเล็ก เรียนรู้หลักการพื้นฐาน และค่อยๆ ขยายไปสู่โครงการที่ซับซ้อนมากขึ้น การลงทุนเวลาในการเรียนรู้ Terraform จะช่วยให้สามารถสร้างและจัดการโครงสร้างพื้นฐานสำหรับ data platform ได้อย่างมีประสิทธิภาพมากขึ้น
