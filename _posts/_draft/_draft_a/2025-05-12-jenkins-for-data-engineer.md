---
layout: post
title: "Jenkins สำหรับ Data Engineer: อัตโนมัติ Data Pipeline ด้วย CI/CD"
date: 2025-05-12
categories: [Data Engineering, DevOps]
tags: [jenkins, cicd, automation, pipeline, draft-A]
image: assets/images/jenkins-cover.jpg
---

## Table of Contents
- [เมื่อการ Deploy Pipeline ด้วยมือกลายเป็นภาระ](#เมื่อการ-deploy-pipeline-ด้วยมือกลายเป็นภาระ)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Jenkins คืออะไร?](#jenkins-คืออะไร)
- [การติดตั้งและเริ่มต้นใช้งาน Jenkins](#การติดตั้งและเริ่มต้นใช้งาน-jenkins)
- [การสร้าง CI/CD Pipeline สำหรับ Data Engineering](#การสร้าง-cicd-pipeline-สำหรับ-data-engineering)
- [การใช้ Jenkins กับเครื่องมืออื่นๆ](#การใช้-jenkins-กับเครื่องมืออื่นๆ)
- [เทคนิคและแนวทางปฏิบัติที่ดี](#เทคนิคและแนวทางปฏิบัติที่ดี)
- [สรุป](#สรุป)

## เมื่อการ Deploy Pipeline ด้วยมือกลายเป็นภาระ

เคยเจอสถานการณ์แบบนี้มั้ย? ต้องรัน script หลายตัวตามลำดับทุกครั้งที่มีการอัพเดท data pipeline หรือต้องคอยเฝ้าดูว่า pipeline ทำงานเสร็จหรือยังเพื่อจะได้รันขั้นตอนต่อไป หรือแย่กว่านั้น เมื่อมีการแก้ไขโค้ดแล้วลืม test ก่อน deploy ทำให้ระบบพังในช่วงเวลาสำคัญ

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่ทำงานกับ data pipeline ที่มีความซับซ้อนและต้อง deploy บ่อยๆ การทำทุกอย่างด้วยมือไม่เพียงแต่เสียเวลา แต่ยังเพิ่มโอกาสในการเกิดข้อผิดพลาดอีกด้วย

นี่คือจุดที่ Jenkins เข้ามาช่วยแก้ปัญหาเหล่านี้ได้อย่างลงตัว!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การใช้งาน Jenkins พื้นฐานสำหรับ CI/CD
- การสร้างและจัดการ automated pipeline สำหรับ data engineering
- การทำ automated testing สำหรับ data pipeline
- การใช้ Jenkins ร่วมกับเครื่องมืออื่นๆ เช่น Docker, Git, AWS
- การติดตามและแก้ไขปัญหาใน CI/CD pipeline

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มเรียนรู้เกี่ยวกับ Jenkins คุณควรมีความรู้พื้นฐานเกี่ยวกับ:
- ความรู้พื้นฐานเกี่ยวกับ command line
- ความรู้พื้นฐานเกี่ยวกับ Git
- ความเข้าใจพื้นฐานเกี่ยวกับ data pipeline
- เครื่องที่มี RAM อย่างน้อย 4GB และพื้นที่ว่างอย่างน้อย 10GB
- Java (Jenkins ต้องการ Java Runtime Environment)

## Jenkins คืออะไร?

Jenkins คือเครื่องมือ open-source สำหรับการทำ Continuous Integration และ Continuous Delivery (CI/CD) ที่ช่วยให้สามารถอัตโนมัติกระบวนการพัฒนาซอฟต์แวร์ เช่น การ build, test, และ deploy โค้ด

### คุณสมบัติหลักของ Jenkins:

1. **Automation**: อัตโนมัติกระบวนการ build, test, และ deploy
2. **Extensibility**: มี plugins มากกว่า 1,500 ตัวที่ช่วยเพิ่มความสามารถ
3. **Distributed**: สามารถกระจายงานไปยัง agents หลายตัวได้
4. **Pipeline as Code**: สามารถเขียน pipeline เป็นโค้ดได้ด้วย Jenkinsfile
5. **Integration**: สามารถทำงานร่วมกับเครื่องมืออื่นๆ ได้หลากหลาย
6. **Monitoring**: มีระบบติดตามและแจ้งเตือนในตัว

## การติดตั้งและเริ่มต้นใช้งาน Jenkins

### 1. ติดตั้ง Jenkins

#### การติดตั้งด้วย Docker (แนะนำ):

```bash
# สร้างโฟลเดอร์สำหรับเก็บข้อมูล Jenkins
mkdir -p ~/jenkins_home

# รัน Jenkins ด้วย Docker
docker run -d -p 8080:8080 -p 50000:50000 -v ~/jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts
```

#### การติดตั้งบน Ubuntu:

```bash
# เพิ่ม repository key
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -

# เพิ่ม repository
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'

# อัพเดท package index และติดตั้ง Jenkins
sudo apt-get update
sudo apt-get install jenkins
```

### 2. เริ่มต้นใช้งาน Jenkins

1. เปิดเบราว์เซอร์และไปที่ `http://localhost:8080`
2. ดู initial admin password จาก log หรือไฟล์:
   ```bash
   # สำหรับ Docker
   docker logs jenkins
   
   # สำหรับ Ubuntu
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. ทำตามขั้นตอนการตั้งค่าเริ่มต้น:
   - ติดตั้ง plugins ที่แนะนำ
   - สร้าง admin user
   - ตั้งค่า URL

### 3. ติดตั้ง Plugins ที่จำเป็น

1. ไปที่ "Manage Jenkins" > "Manage Plugins" > "Available"
2. ค้นหาและติดตั้ง plugins ต่อไปนี้:
   - Git Integration
   - Pipeline
   - Blue Ocean
   - Docker Pipeline
   - Python
   - AWS Integration
   - Slack Notification (ถ้าใช้ Slack)

## การสร้าง CI/CD Pipeline สำหรับ Data Engineering

### 1. สร้าง Simple Pipeline

1. ไปที่ Jenkins dashboard และคลิก "New Item"
2. เลือก "Pipeline" และตั้งชื่อ เช่น "Simple-Data-Pipeline"
3. ในส่วน Pipeline, เลือก "Pipeline script" และใส่โค้ดต่อไปนี้:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                // ในสถานการณ์จริง คุณจะใช้คำสั่ง git checkout
                // git 'https://github.com/yourusername/your-repo.git'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'python -m pip install -r requirements.txt'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'python -m pytest'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // ในสถานการณ์จริง คุณจะใช้คำสั่ง deploy จริงๆ
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

4. คลิก "Save" และ "Build Now" เพื่อรัน pipeline

### 2. สร้าง Pipeline สำหรับ ETL Job

สร้าง Jenkinsfile ในโปรเจค Git ของคุณ:

```groovy
pipeline {
    agent {
        docker {
            image 'python:3.9'
        }
    }
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        DB_PASSWORD = credentials('db-password')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'flake8 src/'
            }
        }
        
        stage('Unit Tests') {
            steps {
                sh 'pytest tests/unit/'
            }
        }
        
        stage('Integration Tests') {
            steps {
                sh 'pytest tests/integration/'
            }
        }
        
        stage('Build') {
            steps {
                sh 'python setup.py bdist_wheel'
            }
        }
        
        stage('Deploy to Dev') {
            steps {
                sh 'aws s3 cp dist/*.whl s3://my-bucket/dev/'
                sh 'aws lambda update-function-code --function-name my-etl-dev --s3-bucket my-bucket --s3-key dev/my-etl-latest.whl'
            }
        }
        
        stage('Deploy to Prod') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?'
                sh 'aws s3 cp dist/*.whl s3://my-bucket/prod/'
                sh 'aws lambda update-function-code --function-name my-etl-prod --s3-bucket my-bucket --s3-key prod/my-etl-latest.whl'
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'dist/*.whl', fingerprint: true
            junit 'test-results/*.xml'
        }
        success {
            slackSend channel: '#data-engineering', color: 'good', message: "ETL Pipeline Succeeded: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
        }
        failure {
            slackSend channel: '#data-engineering', color: 'danger', message: "ETL Pipeline Failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
        }
    }
}
```

### 3. สร้าง Multibranch Pipeline

Multibranch Pipeline ช่วยให้สามารถสร้าง pipeline สำหรับแต่ละ branch ใน repository ได้:

1. ไปที่ Jenkins dashboard และคลิก "New Item"
2. เลือก "Multibranch Pipeline" และตั้งชื่อ เช่น "Data-ETL-Pipeline"
3. ในส่วน Branch Sources, เลือก Git และใส่ repository URL
4. ตั้งค่า Scan Multibranch Pipeline Triggers เพื่อให้ Jenkins สแกน repository เป็นระยะ
5. คลิก "Save" และ Jenkins จะสแกน repository และสร้าง pipeline สำหรับแต่ละ branch ที่มี Jenkinsfile

## การใช้ Jenkins กับเครื่องมืออื่นๆ

### 1. Jenkins กับ Docker

การใช้ Docker ใน Jenkins ช่วยให้สามารถรัน pipeline ในสภาพแวดล้อมที่แยกออกจากกันและสม่ำเสมอ:

```groovy
pipeline {
    agent {
        docker {
            image 'python:3.9'
            args '-v $HOME/.cache/pip:/root/.cache/pip'
        }
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }
        
        stage('Test') {
            steps {
                sh 'pytest'
            }
        }
    }
}
```

### 2. Jenkins กับ AWS

การใช้ Jenkins กับ AWS ช่วยให้สามารถ deploy data pipeline ไปยัง AWS ได้:

```groovy
pipeline {
    agent any
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    }
    
    stages {
        stage('Deploy to S3') {
            steps {
                sh 'aws s3 cp data/ s3://my-data-bucket/ --recursive'
            }
        }
        
        stage('Run EMR Job') {
            steps {
                sh '''
                aws emr create-cluster \
                    --name "ETL Cluster" \
                    --release-label emr-6.3.0 \
                    --applications Name=Spark \
                    --ec2-attributes KeyName=mykey \
                    --instance-type m5.xlarge \
                    --instance-count 3 \
                    --steps Type=Spark,Name="ETL Job",ActionOnFailure=CONTINUE,Args=[s3://my-bucket/scripts/etl.py,s3://my-bucket/input/,s3://my-bucket/output/]
                '''
            }
        }
    }
}
```

### 3. Jenkins กับ Airflow

การใช้ Jenkins เพื่อ deploy และ trigger Airflow DAGs:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Deploy DAGs') {
            steps {
                sh 'scp -r dags/* airflow-server:/opt/airflow/dags/'
            }
        }
        
        stage('Trigger DAG') {
            steps {
                sh 'curl -X POST http://airflow-server:8080/api/v1/dags/my_etl_dag/dagRuns -H "Content-Type: application/json" -d "{}"'
            }
        }
    }
}
```

## เทคนิคและแนวทางปฏิบัติที่ดี

### 1. การใช้ Parameterized Builds

Parameterized Builds ช่วยให้สามารถกำหนดพารามิเตอร์ในตอนรัน pipeline ได้:

```groovy
pipeline {
    agent any
    
    parameters {
        string(name: 'DATA_DATE', defaultValue: '2025-05-12', description: 'Date of data to process (YYYY-MM-DD)')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Environment to deploy to')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run tests before deploying')
    }
    
    stages {
        stage('Process Data') {
            steps {
                echo "Processing data for date: ${params.DATA_DATE}"
                sh "python process_data.py --date=${params.DATA_DATE}"
            }
        }
        
        stage('Run Tests') {
            when {
                expression { return params.RUN_TESTS }
            }
            steps {
                sh 'pytest'
            }
        }
        
        stage('Deploy') {
            steps {
                echo "Deploying to ${params.ENVIRONMENT}"
                sh "deploy_to_${params.ENVIRONMENT}.sh"
            }
        }
    }
}
```

### 2. การใช้ Shared Libraries

Shared Libraries ช่วยให้สามารถแชร์โค้ด Jenkins Pipeline ระหว่างโปรเจคได้:

```groovy
// In a shared library file: vars/dataPipeline.groovy
def call(Map config) {
    pipeline {
        agent any
        
        stages {
            stage('Extract') {
                steps {
                    echo "Extracting data from ${config.source}"
                    sh "${config.extractScript}"
                }
            }
            
            stage('Transform') {
                steps {
                    echo "Transforming data"
                    sh "${config.transformScript}"
                }
            }
            
            stage('Load') {
                steps {
                    echo "Loading data to ${config.destination}"
                    sh "${config.loadScript}"
                }
            }
        }
    }
}

// In your Jenkinsfile
@Library('my-shared-library') _

dataPipeline(
    source: 'mysql-db',
    destination: 'data-warehouse',
    extractScript: 'python extract.py',
    transformScript: 'python transform.py',
    loadScript: 'python load.py'
)
```

### 3. การใช้ Parallel Stages

Parallel Stages ช่วยให้สามารถรันหลาย stages พร้อมกันเพื่อลดเวลาในการรัน pipeline:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Tests') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'pytest tests/unit/'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'pytest tests/integration/'
                    }
                }
                stage('Performance Tests') {
                    steps {
                        sh 'pytest tests/performance/'
                    }
                }
            }
        }
    }
}
```

### 4. การใช้ Credentials Management

Jenkins มีระบบจัดการ credentials ในตัว ซึ่งช่วยให้สามารถเก็บและใช้ credentials อย่างปลอดภัย:

```groovy
pipeline {
    agent any
    
    environment {
        DB_CREDS = credentials('database-credentials')
        AWS_CREDS = credentials('aws-credentials')
    }
    
    stages {
        stage('Connect to Database') {
            steps {
                sh 'python connect_db.py --username=$DB_CREDS_USR --password=$DB_CREDS_PSW'
            }
        }
        
        stage('Deploy to AWS') {
            steps {
                sh 'aws configure set aws_access_key_id $AWS_CREDS_USR'
                sh 'aws configure set aws_secret_access_key $AWS_CREDS_PSW'
                sh 'aws s3 cp data/ s3://my-bucket/ --recursive'
            }
        }
    }
}
```

## สรุป

Jenkins เป็นเครื่องมือที่ทรงพลังสำหรับการทำ CI/CD ในงาน Data Engineering โดยช่วยให้สามารถอัตโนมัติกระบวนการ build, test, และ deploy data pipeline ได้อย่างมีประสิทธิภาพ

ในบทความนี้ เราได้เรียนรู้เกี่ยวกับ:
- พื้นฐานของ Jenkins และการติดตั้ง
- การสร้าง CI/CD pipeline สำหรับ data engineering
- การใช้ Jenkins ร่วมกับเครื่องมืออื่นๆ เช่น Docker, AWS, Airflow
- เทคนิคและแนวทางปฏิบัติที่ดีในการใช้ Jenkins

การนำ Jenkins มาใช้ในงาน Data Engineering จะช่วยลดเวลาและข้อผิดพลาดในการ deploy data pipeline, เพิ่มความมั่นใจในคุณภาพของโค้ดผ่านการทำ automated testing, และช่วยให้ทีมสามาร��ส่งมอบงานได้เร็วขึ้นและบ่อยขึ้น

หวังว่าบทความนี้จะช่วยให้คุณเข้าใจพื้นฐานของ Jenkins และสามารถนำไปประยุกต์ใช้ในงาน Data Engineering ได้อย่างมีประสิทธิภาพนะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
