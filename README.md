# Blog

## Resume
Path:_data/resume.yml
Path:_data/skills.yml
Path:_data/experience.yml
Path:_data/recognitions.yml
Path:_data/education.yml
Path:_data/projects.yml
Path:_data/interests.yml
Path:_data/links.yml

## jekyll install
https://jekyllrb.com/docs/
~~~bash
jekyll build
jekyll serve
~~~

- Database/Mysql/PostgreSQL
- Docker
- Kafka
- Airflow
- Kestra
- Dagster
- DBT
- CIDI/Jenkins
- AWS
- GCP
- Azure
- Teraform
- Git
- jekyll


# การย้ายไฟล์ข้าม ฺBranch
ใช้ git restore หรือ git checkout เฉพาะไฟล์จาก branch draft
ถ้าคุณต้องการเอาเฉพาะ “ไฟล์” ที่พร้อมจาก draft branch มาลง main:

ขั้นตอน:
ไปที่ main:
```bash
git checkout main
```

ดึงไฟล์ที่ต้องการจาก branch draft (เช่น draft/blog):
```bash
git checkout draft/blog -- path/to/file.md
```

Commit การเปลี่ยนแปลง:
```bash
git add path/to/file.md
git commit -m "Add blog draft for AI vs Human writers"
```