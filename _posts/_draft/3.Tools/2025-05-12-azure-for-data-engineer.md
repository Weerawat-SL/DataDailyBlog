---
layout: post
title: "Azure สำหรับ Data Engineer: เริ่มต้นใช้งานคลาวด์จาก Microsoft"
date: 2025-05-12
categories: [Data Engineering, Cloud]
tags: [azure, cloud computing, data factory, synapse analytics, data lake, draft-A]
image: assets/images/azure-cover.jpg
---

## Table of Contents
- [เมื่อต้องทำงานกับข้อมูลบนคลาวด์ของ Microsoft](#เมื่อต้องทำงานกับข้อมูลบนคลาวด์ของ-microsoft)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Azure คืออะไร?](#azure-คืออะไร)
- [บริการของ Azure สำหรับ Data Engineer](#บริการของ-azure-สำหรับ-data-engineer)
- [การเริ่มต้นใช้งาน Azure](#การเริ่มต้นใช้งาน-azure)
- [การสร้าง Data Pipeline บน Azure](#การสร้าง-data-pipeline-บน-azure)
- [เทคนิคและการตั้งค่า](#เทคนิคและการตั้งค่า)
- [สรุป](#สรุป)

## เมื่อต้องทำงานกับข้อมูลบนคลาวด์ของ Microsoft

เคยเจอสถานการณ์แบบนี้มั้ย? องค์กรของคุณใช้ระบบของ Microsoft อยู่แล้ว ไม่ว่าจะเป็น Office 365, Dynamics 365 หรือ Power BI แต่ต้องการขยับขึ้นไปใช้บริการคลาวด์เพื่อจัดการกับข้อมูลขนาดใหญ่ หรือต้องการสร้าง data pipeline ที่ทำงานอัตโนมัติ แต่ไม่รู้จะเริ่มต้นยังไง

ผมเองก็เคยเจอปัญหานี้มาก่อน โดยเฉพาะตอนที่ต้องย้ายระบบจาก on-premise ไปยังคลาวด์ ซึ่งองค์กรใช้ผลิตภัณฑ์ของ Microsoft อยู่แล้ว การเลือก Azure จึงเป็นทางเลือกที่สมเหตุสมผล แต่ก็ต้องเผชิญกับความท้าทายในการเรียนรู้บริการต่างๆ ที่มีมากมาย และการปรับเปลี่ยนวิธีคิดจากการทำงานแบบ on-premise มาเป็นแบบคลาวด์

นี่คือจุดที่บทความนี้จะช่วยคุณได้ โดยจะแนะนำพื้นฐานของ Azure สำหรับ Data Engineer และวิธีการเริ่มต้นใช้งานอย่างมีประสิทธิภาพ!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การใช้งานบริการต่างๆ ของ Azure สำหรับ Data Engineering
- การออกแบบและสร้าง data pipeline บน Azure
- การจัดการกับข้อมูลขนาดใหญ่บนคลาวด์ของ Microsoft
- การทำงานร่วมกับระบบนิเวศของ Microsoft
- การประหยัดค่าใช้จ่ายในการใช้งาน Azure

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มใช้งาน Azure คุณควรมีสิ่งเหล่านี้:
- บัญชี Microsoft (สามารถสมัครได้ฟรี)
- บัญชี Azure (สามารถสมัครได้ฟรีและมี Free Tier สำหรับทดลองใช้งาน)
- ความรู้พื้นฐานเกี่ยวกับ data pipeline
- บัตรเครดิตหรือเดบิต (สำหรับยืนยันตัวตนกับ Azure แม้จะใช้ Free Tier)
- Azure CLI (ถ้าต้องการใช้งานผ่าน command line)

## Azure คืออะไร?

Azure คือแพลตฟอร์มคลาวด์คอมพิวติ้งของ Microsoft ที่ให้บริการมากมายครอบคลุมความต้องการต่างๆ ในการพัฒนาและดำเนินการระบบไอที ไม่ว่าจะเป็นการคำนวณ (compute), การจัดเก็บข้อมูล (storage), ฐานข้อมูล (database), การวิเคราะห์ข้อมูล (analytics) และอื่นๆ อีกมากมาย

สำหรับ Data Engineer, Azure มีบริการมากมายที่ช่วยให้การทำงานกับข้อมูลเป็นเรื่องง่าย ตั้งแต่การจัดเก็บข้อมูล, การประมวลผล, การวิเคราะห์, ไปจนถึงการสร้าง data pipeline แบบอัตโนมัติ

## บริการของ Azure สำหรับ Data Engineer

### 1. การจัดเก็บข้อมูล (Storage)

- **Azure Blob Storage**: บริการจัดเก็บข้อมูลแบบ object storage ที่เหมาะสำหรับเก็บข้อมูลทุกประเภท
- **Azure Data Lake Storage Gen2**: บริการจัดเก็บข้อมูลที่ออกแบบมาเพื่อ big data analytics
- **Azure Files**: บริการจัดเก็บข้อมูลแบบ file share ที่สามารถเข้าถึงได้ผ่าน SMB protocol

### 2. ฐานข้อมูล (Database)

- **Azure SQL Database**: บริการฐานข้อมูล SQL แบบ managed service
- **Azure Cosmos DB**: บริการฐานข้อมูล NoSQL ที่รองรับหลาย API (SQL, MongoDB, Cassandra, Gremlin, Table)
- **Azure Database for PostgreSQL/MySQL**: บริการฐานข้อมูล PostgreSQL และ MySQL แบบ managed service
- **Azure Synapse Analytics (เดิมคือ SQL Data Warehouse)**: บริการ data warehouse ที่เหมาะสำหรับการวิเคราะห์ข้อมูลขนาดใหญ่

### 3. การประมวลผลข้อมูล (Data Processing)

- **Azure Data Factory**: บริการสำหรับสร้าง data pipeline และ orchestration
- **Azure Databricks**: แพลตฟอร์มวิเคราะห์ข้อมูลที่ใช้ Apache Spark
- **Azure HDInsight**: บริการ Hadoop แบบ managed service
- **Azure Functions**: บริการ serverless computing ที่สามารถรันโค้ดโดยไม่ต้องจัดการเซิร์ฟเวอร์

### 4. การวิเคราะห์ข้อมูล (Analytics)

- **Azure Synapse Analytics**: แพลตฟอร์มวิเคราะห์ข้อมูลแบบครบวงจร
- **Power BI**: บริการ business intelligence สำหรับสร้าง dashboard และ visualization
- **Azure Analysis Services**: บริการสำหรับสร้าง semantic model

### 5. การจัดการ Workflow

- **Azure Logic Apps**: บริการสำหรับสร้างและจัดการ workflow แบบ low-code
- **Azure Data Factory Pipelines**: บริการสำหรับสร้างและจัดการ data pipeline

## การเริ่มต้นใช้งาน Azure

### 1. สมัครบัญชี Azure

1. ไปที่ [azure.microsoft.com](https://azure.microsoft.com/)
2. คลิกที่ "Start free" หรือ "Free account"
3. ล็อกอินด้วยบัญชี Microsoft หรือสร้างบัญชีใหม่
4. กรอกข้อมูลที่จำเป็น (ข้อมูลส่วนตัว, ข้อมูลการชำระเงิน)
5. ยืนยันตัวตนผ่านโทรศัพท์หรืออีเมล

### 2. ทำความรู้จักกับ Azure Portal

1. ล็อกอินเข้าสู่ [Azure Portal](https://portal.azure.com/)
2. สำรวจหน้า Dashboard และส่วนประกอบต่างๆ
3. ลองสร้าง Resource Group ซึ่งเป็นพื้นฐานสำหรับการจัดการทรัพยากรใน Azure

### 3. ติดตั้ง Azure CLI

**สำหรับ Windows:**
1. ดาวน์โหลด Azure CLI installer จาก [เว็บไซต์ Microsoft](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows)
2. รันไฟล์ installer และทำตามขั้นตอน
3. เปิด Command Prompt และรัน `az --version` เพื่อตรวจสอบการติดตั้ง

**สำหรับ macOS:**
```bash
brew install azure-cli
```

**สำหรับ Linux:**
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### 4. ล็อกอินผ่าน Azure CLI

```bash
az login
```

หลังจากรันคำสั่งนี้ เบราว์เซอร์จะเปิดขึ้นเพื่อให้คุณล็อกอินด้วยบัญชี Microsoft

## การสร้าง Data Pipeline บน Azure

ในส่วนนี้ เราจะสร้าง simple data pipeline บน Azure โดยใช้บริการต่างๆ ดังนี้:
1. **Azure Blob Storage** สำหรับเก็บข้อมูล
2. **Azure Data Factory** สำหรับสร้าง pipeline
3. **Azure Databricks** สำหรับประมวลผลข้อมูล
4. **Azure SQL Database** สำหรับเก็บผลลัพธ์

### 1. สร้าง Resource Group

```bash
az group create --name MyDataProject --location eastus
```

### 2. สร้าง Storage Account

```bash
az storage account create \
    --name mydatastorage \
    --resource-group MyDataProject \
    --location eastus \
    --sku Standard_LRS
```

### 3. สร้าง Container ใน Blob Storage

```bash
az storage container create \
    --name raw-data \
    --account-name mydatastorage \
    --auth-mode login
```

### 4. อัพโหลดข้อมูลไปยัง Blob Storage

```bash
az storage blob upload \
    --account-name mydatastorage \
    --container-name raw-data \
    --name sales.csv \
    --file sales.csv \
    --auth-mode login
```

### 5. สร้าง Azure SQL Database

```bash
az sql server create \
    --name mydbserver \
    --resource-group MyDataProject \
    --location eastus \
    --admin-user dbadmin \
    --admin-password P@ssw0rd123

az sql db create \
    --name salesdb \
    --resource-group MyDataProject \
    --server mydbserver \
    --service-objective S0
```

### 6. สร้าง Azure Databricks Workspace

```bash
az databricks workspace create \
    --name mydatabricks \
    --resource-group MyDataProject \
    --location eastus \
    --sku standard
```

### 7. สร้าง Data Factory

```bash
az datafactory create \
    --name mydatafactory \
    --resource-group MyDataProject \
    --location eastus
```

### 8. สร้าง Pipeline ใน Data Factory

การสร้าง pipeline ใน Data Factory ทำได้ง่ายที่สุดผ่าน Azure Portal:

1. ไปที่ Azure Portal และเปิด Data Factory ที่สร้างไว้
2. คลิกที่ "Author & Monitor" เพื่อเปิด Data Factory Studio
3. สร้าง Linked Service สำหรับเชื่อมต่อกับ Blob Storage, Databricks และ SQL Database
4. สร้าง Dataset สำหรับข้อมูลใน Blob Storage และ SQL Database
5. สร้าง Pipeline ที่ประกอบด้วย activity ต่างๆ เช่น:
   - Copy Activity สำหรับคัดลอกข้อมูลจาก Blob Storage ไปยัง Databricks
   - Databricks Notebook Activity สำหรับประมวลผลข้อมูล
   - Copy Activity สำหรับคัดลอกผลลัพธ์จาก Databricks ไปยัง SQL Database

### 9. สร้าง Notebook ใน Databricks

1. ล็อกอินเข้าสู่ Databricks Workspace
2. สร้าง Cluster สำหรับรัน Notebook
3. สร้าง Notebook ใหม่และเขียนโค้ดสำหรับประมวลผลข้อมูล เช่น:

```python
# อ่านข้อมูลจาก Blob Storage
df = spark.read.format("csv") \
    .option("header", "true") \
    .load("wasbs://raw-data@mydatastorage.blob.core.windows.net/sales.csv")

# ทำ transformation
result = df.groupBy("product_category") \
    .agg({"amount": "sum"}) \
    .withColumnRenamed("sum(amount)", "total_sales")

# บันทึกผลลัพธ์
result.write \
    .format("jdbc") \
    .option("url", "jdbc:sqlserver://mydbserver.database.windows.net:1433;database=salesdb") \
    .option("dbtable", "sales_summary") \
    .option("user", "dbadmin") \
    .option("password", "P@ssw0rd123") \
    .mode("overwrite") \
    .save()
```

### 10. รัน Pipeline

1. กลับไปที่ Data Factory Studio
2. เลือก Pipeline ที่สร้างไว้
3. คลิกที่ "Debug" หรือ "Trigger Now" เพื่อรัน Pipeline
4. ตรวจสอบสถานะการทำงานใน "Monitor" tab

## เทคนิคและการตั้งค่า

### 1. การประหยัดค่าใช้จ่าย

- **Azure Reservations**: จองการใช้งานล่วงหน้าเพื่อรับส่วนลด
- **Auto-shutdown**: ตั้งค่าให้ VM หรือ Databricks cluster ปิดอัตโนมัติเมื่อไม่ได้ใช้งาน
- **Azure Advisor**: ใช้คำแนะนำจาก Azure Advisor เพื่อลดค่าใช้จ่าย
- **Azure Cost Management**: ติดตามและวิเคราะห์ค่าใช้จ่าย

### 2. การทำ Automation

```powershell
# PowerShell script สำหรับ automate การสร้าง resource
$resourceGroup = "MyDataProject"
$location = "eastus"
$storageAccount = "mydatastorage"
$container = "raw-data"
$sqlServer = "mydbserver"
$sqlDB = "salesdb"
$databricks = "mydatabricks"
$dataFactory = "mydatafactory"

# สร้าง Resource Group
New-AzResourceGroup -Name $resourceGroup -Location $location

# สร้าง Storage Account
New-AzStorageAccount -ResourceGroupName $resourceGroup `
    -Name $storageAccount `
    -Location $location `
    -SkuName Standard_LRS `
    -Kind StorageV2

# สร้าง Container
$ctx = (Get-AzStorageAccount -ResourceGroupName $resourceGroup -Name $storageAccount).Context
New-AzStorageContainer -Name $container -Context $ctx

# สร้าง SQL Server และ Database
New-AzSqlServer -ResourceGroupName $resourceGroup `
    -ServerName $sqlServer `
    -Location $location `
    -SqlAdministratorCredentials (Get-Credential)

New-AzSqlDatabase -ResourceGroupName $resourceGroup `
    -ServerName $sqlServer `
    -DatabaseName $sqlDB `
    -RequestedServiceObjectiveName "S0"

# สร้าง Databricks Workspace
New-AzDatabricksWorkspace -ResourceGroupName $resourceGroup `
    -Name $databricks `
    -Location $location `
    -Sku standard

# สร้าง Data Factory
New-AzDataFactory -ResourceGroupName $resourceGroup `
    -Name $dataFactory `
    -Location $location
```

### 3. การทำ Monitoring

- **Azure Monitor**: ใช้สำหรับ monitor การทำงานของบริการต่างๆ และตั้งค่าการแจ้งเตือน
- **Application Insights**: ใช้สำหรับ monitor application performance
- **Log Analytics**: ใช้สำหรับวิเคราะห์ log และ troubleshoot ปัญหา

### 4. การทำ Security

- **Azure Key Vault**: ใช้สำหรับเก็บ secret และ credential
- **Azure Active Directory**: ใช้สำหรับจัดการ identity และ access
- **Azure Security Center**: ใช้สำหรับ monitor และ improve security posture

## สรุป

Azure เป็นแพลตฟอร์มคลาวด์ที่มีบริการมากมายที่เหมาะสำหรับ Data Engineer โดยเฉพาะองค์กรที่ใช้ผลิตภัณฑ์ของ Microsoft อยู่แล้ว การใช้ Azure จะช่วยให้การทำงานร่วมกับระบบอื่นๆ เป็นไปอย่างราบรื่น

ข้อดีของการใช้ Azure สำหรับ Data Engineering คือ:
- **Integration**: บูรณาการได้ดีกับผลิตภัณฑ์อื่นๆ ของ Microsoft
- **Scalability**: สามารถขยายขนาดได้ตามความต้องการ
- **Managed Services**: ไม่ต้องกังวลเรื่องการดูแลรักษาเซิร์ฟเวอร์
- **Security**: มีระบบรักษาความปลอดภัยที่แข็งแกร่ง
- **Hybrid Cloud**: รองรับการทำงานแบบ hybrid ระหว่าง on-premise และ cloud

สำหรับ Data Engineer มือใหม่ การเริ่มต้นใช้งาน Azure อาจจะดูซับซ้อนในตอนแรก แต่เมื่อเข้าใจพื้นฐานแล้ว คุณจะเห็นว่ามันช่วยให้การทำงานกับข้อมูลง่ายขึ้นและมีประสิทธิภาพมากขึ้น

ลองนำความรู้ที่ได้จากบทความนี้ไปประยุกต์ใช้กับงานของคุณดูนะครับ รับรองว่าจะช่วยให้การทำงานของคุณเป็นระบบและมีประสิทธิภาพมากขึ้นแน่นอน!

หวังว่าบทความนี้จะเป็นประโยชน์สำหรับทุกคนที่กำลังมองหาวิธีเริ่มต้นใช้งาน Azure สำหรับ Data Engineering นะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
