---
layout: post
title: "Jekyll สำหรับ Data Engineer: สร้างเว็บไซต์และบล็อกแบบง่ายๆ"
date: 2025-05-12
categories: [Data Engineering, Tools]
tags: [jekyll, static site, documentation, blogging, draft-A]
image: assets/images/jekyll-cover.jpg
---

## Table of Contents
- [เมื่อต้องการเผยแพร่ความรู้และโปรเจค](#เมื่อต้องการเผยแพร่ความรู้และโปรเจค)
- [ทักษะที่จะได้พัฒนา](#ทักษะที่จะได้พัฒนา)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [Jekyll คืออะไร?](#jekyll-คืออะไร)
- [การติดตั้งและเริ่มต้นใช้งาน Jekyll](#การติดตั้งและเริ่มต้นใช้งาน-jekyll)
- [การสร้างเว็บไซต์สำหรับ Data Engineer](#การสร้างเว็บไซต์สำหรับ-data-engineer)
- [การเผยแพร่เว็บไซต์](#การเผยแพร่เว็บไซต์)
- [เทคนิคและแนวทางปฏิบัติที่ดี](#เทคนิคและแนวทางปฏิบัติที่ดี)
- [สรุป](#สรุป)

## เมื่อต้องการเผยแพร่ความรู้และโปรเจค

เคยรู้สึกอยากแชร์ความรู้หรือโปรเจคที่คุณทำเกี่ยวกับ Data Engineering แต่ไม่รู้จะเริ่มต้นยังไง? หรือต้องการสร้างเว็บไซต์ส่วนตัวเพื่อแสดงผลงานแต่ไม่อยากเสียเวลาเรียนรู้เทคโนโลยีเว็บที่ซับซ้อน? หรือแม้แต่ต้องการสร้างเอกสารประกอบโปรเจคแต่ไม่อยากใช้เครื่องมือที่ยุ่งยาก?

ผมเองก็เคยเจอปัญหาเหล่านี้มาก่อน โดยเฉพาะตอนที่ต้องการสร้างบล็อกเพื่อแชร์ความรู้และประสบการณ์ในการทำงานด้าน Data Engineering แต่ไม่อยากเสียเวลาไปกับการเรียนรู้ HTML, CSS, JavaScript หรือระบบจัดการเนื้อหา (CMS) ที่ซับซ้อน

นี่คือจุดที่ Jekyll เข้ามาช่วยแก้ปัญหาเหล่านี้ได้อย่างลงตัว!

## ทักษะที่จะได้พัฒนา

บทความนี้จะช่วยให้คุณพัฒนาทักษะและความรู้ในด้านต่อไปนี้:
- การสร้างเว็บไซต์และบล็อกด้วย Jekyll
- การเขียนเนื้อหาด้วย Markdown
- การจัดการโครงสร้างเว็บไซต์
- การปรับแต่งธีมและการออกแบบ
- การเผยแพร่เว็บไซต์ผ่าน GitHub Pages หรือบริการอื่นๆ

## สิ่งที่ต้องเตรียม

ก่อนที่เราจะเริ่มเรียนรู้เกี่ยวกับ Jekyll คุณควรมีสิ่งเหล่านี้:
- ความรู้พื้นฐานเกี่ยวกับ command line
- ความรู้พื้นฐานเกี่ยวกับ Git (ถ้าต้องการใช้ GitHub Pages)
- Ruby (Jekyll เขียนด้วยภาษา Ruby)
- Text editor หรือ IDE ที่คุณชอบใช้

## Jekyll คืออะไร?

Jekyll คือเครื่องมือสร้างเว็บไซต์แบบ static site generator ที่เขียนด้วยภาษา Ruby โดย Jekyll จะแปลงไฟล์ Markdown, HTML, และรูปแบบอื่นๆ เป็นเว็บไซต์แบบ static HTML ที่สามารถโฮสต์บนเซิร์ฟเวอร์ใดก็ได้

### คุณสมบัติหลักของ Jekyll:

1. **Simple**: ไม่ต้องใช้ฐานข้อมูลหรือภาษาโปรแกรมฝั่งเซิร์ฟเวอร์
2. **Static**: สร้างไฟล์ HTML ที่พร้อมใช้งาน ทำให้โหลดเร็วและปลอดภัย
3. **Blog-aware**: มีฟีเจอร์สำหรับการเขียนบล็อกในตัว
4. **Markdown Support**: เขียนเนื้อหาด้วย Markdown ได้อย่างง่ายดาย
5. **Themes**: มีธีมให้เลือกใช้มากมาย
6. **Plugins**: สามารถเพิ่มความสามารถด้วย plugins ได้
7. **GitHub Pages Integration**: ทำงานร่วมกับ GitHub Pages ได้อย่างลงตัว

## การติดตั้งและเริ่มต้นใช้งาน Jekyll

### 1. ติดตั้ง Ruby

#### สำหรับ Windows:
1. ดาวน์โหลดและติดตั้ง [RubyInstaller](https://rubyinstaller.org/)
2. เลือกตัวเลือกที่มี DevKit ในระหว่างการติดตั้ง

#### สำหรับ macOS:
```bash
# ใช้ Homebrew
brew install ruby
```

#### สำหรับ Linux:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install ruby-full build-essential

# Fedora
sudo dnf install ruby ruby-devel
```

### 2. ติดตั้ง Jekyll

```bash
# ติดตั้ง Jekyll และ Bundler
gem install jekyll bundler

# ตรวจสอบการติดตั้ง
jekyll -v
```

### 3. สร้างเว็บไซต์ใหม่

```bash
# สร้างเว็บไซต์ใหม่
jekyll new my-data-blog
cd my-data-blog

# รันเซิร์ฟเวอร์ทดสอบ
bundle exec jekyll serve
```

เปิดเบราว์เซอร์และไปที่ `http://localhost:4000` เพื่อดูเว็บไซต์ของคุณ

### 4. โครงสร้างของเว็บไซต์ Jekyll

```
my-data-blog/
├── _config.yml          # ไฟล์ configuration
├── _data/               # ข้อมูลที่ใช้ในเว็บไซต์
├── _drafts/             # บทความที่ยังไม่เผยแพร่
├── _includes/           # ส่วนย่อยของเว็บไซต์ที่นำมาใช้ซ้ำได้
├── _layouts/            # เทมเพลตสำหรับหน้าต่างๆ
├── _posts/              # บทความที่เผยแพร่แล้ว
├── _sass/               # ไฟล์ SASS ที่จะถูกแปลงเป็น CSS
├── _site/               # เว็บไซต์ที่ถูกสร้างขึ้น (ไม่ควรแก้ไขโดยตรง)
├── assets/              # ไฟล์ static เช่น รูปภาพ, CSS, JavaScript
├── index.md             # หน้าแรกของเว็บไซต์
└── 404.html             # หน้า error 404
```

### 5. การเขียนบทความ

บทความใน Jekyll จะถูกเก็บในโฟลเดอร์ `_posts` โดยมีรูปแบบชื่อไฟล์เป็น `YYYY-MM-DD-title.md` และมี front matter ที่ด้านบนของไฟล์:

```markdown
---
layout: post
title: "การใช้ Pandas สำหรับการวิเคราะห์ข้อมูล"
date: 2025-05-12
categories: [Data Engineering, Python]
tags: [pandas, data analysis, python]
---

# การใช้ Pandas สำหรับการวิเคราะห์ข้อมูล

Pandas เป็นไลบรารีที่ทรงพลังสำหรับการวิเคราะห์ข้อมูลใน Python...

## การติดตั้ง Pandas

```python
pip install pandas
```

## การอ่านข้อมูล

```python
import pandas as pd

# อ่านข้อมูลจาก CSV
df = pd.read_csv('data.csv')

# แสดงข้อมูล 5 แถวแรก
print(df.head())
```
```

## การสร้างเว็บไซต์สำหรับ Data Engineer

### 1. ปรับแต่ง Configuration

แก้ไขไฟล์ `_config.yml` เพื่อปรับแต่งเว็บไซต์:

```yaml
# ข้อมูลเว็บไซต์
title: Data Engineering Blog
description: >-
  บล็อกเกี่ยวกับ Data Engineering, Big Data, และ Data Science
baseurl: ""
url: "https://yourdomain.com"

# ข้อมูลผู้เขียน
author:
  name: Your Name
  email: your.email@example.com
  twitter: yourtwitterhandle
  github: yourgithubhandle
  linkedin: yourlinkedinhandle

# การตั้งค่า permalink
permalink: /:year/:month/:day/:title/

# การตั้งค่าอื่นๆ
timezone: Asia/Bangkok
markdown: kramdown
highlighter: rouge

# Pagination
paginate: 10
paginate_path: "/page:num/"

# Collections
collections:
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
      comments: true
  - scope:
      path: ""
      type: "projects"
    values:
      layout: "project"
```

### 2. เลือกหรือปรับแต่งธีม

Jekyll มีธีมให้เลือกใช้มากมาย คุณสามารถเลือกธีมที่มีอยู่แล้วหรือสร้างธีมของตัวเองได้:

#### การใช้ธีมที่มีอยู่แล้ว:

แก้ไขไฟล์ `Gemfile`:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.2.0"
gem "minima", "~> 2.5"  # เปลี่ยนเป็นธีมที่ต้องการ

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-paginate"
  gem "jekyll-seo-tag"
end
```

แก้ไขไฟล์ `_config.yml`:

```yaml
theme: minima  # เปลี่ยนเป็นธีมที่ต้องการ
```

รันคำสั่งเพื่ออัพเดทธีม:

```bash
bundle update
bundle exec jekyll serve
```

### 3. สร้างหน้าสำหรับ Portfolio

สร้างไฟล์ `projects.md` ในโฟลเดอร์หลัก:

```markdown
---
layout: page
title: Projects
permalink: /projects/
---

# Data Engineering Projects

ตัวอย่างโปรเจคที่ฉันได้ทำเกี่ยวกับ Data Engineering:

{% for project in site.projects %}
## [{{ project.title }}]({{ project.url | relative_url }})

{{ project.excerpt }}

[อ่านเพิ่มเติม]({{ project.url | relative_url }})

---
{% endfor %}
```

สร้างโฟลเดอร์ `_projects` และเพิ่มไฟล์โปรเจค:

```markdown
---
title: "Real-time Data Pipeline with Kafka and Spark"
excerpt: "สร้าง real-time data pipeline ด้วย Apache Kafka และ Apache Spark Streaming"
technologies: [Kafka, Spark, Python]
github: https://github.com/yourusername/realtime-pipeline
---

# Real-time Data Pipeline with Kafka and Spark

โปรเจคนี้เป็นการสร้าง real-time data pipeline โดยใช้ Apache Kafka เป็นตัวรับข้อมูลและ Apache Spark Streaming เป็นตัวประมวลผล...

## Architecture

![Architecture Diagram](/assets/images/projects/realtime-pipeline-architecture.png)

## Technologies Used

- Apache Kafka
- Apache Spark Streaming
- Python
- Docker
- AWS EC2

## Implementation

...
```

### 4. สร้างหน้าสำหรับ Categories และ Tags

สร้างไฟล์ `categories.md`:

```markdown
---
layout: page
title: Categories
permalink: /categories/
---

# Categories

{% for category in site.categories %}
## {{ category[0] }}

{% for post in category[1] %}
- [{{ post.title }}]({{ post.url | relative_url }}) - {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

{% endfor %}
```

สร้างไฟล์ `tags.md`:

```markdown
---
layout: page
title: Tags
permalink: /tags/
---

# Tags

{% for tag in site.tags %}
## {{ tag[0] }}

{% for post in tag[1] %}
- [{{ post.title }}]({{ post.url | relative_url }}) - {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

{% endfor %}
```

## การเผยแพร่เว็บไซต์

### 1. การเผยแพร่ผ่าน GitHub Pages

GitHub Pages เป็นบริการฟรีที่ให้คุณโฮสต์เว็บไซต์ static จาก GitHub repository:

```bash
# สร้าง repository ใหม่บน GitHub ชื่อ username.github.io

# เพิ่ม remote repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

แก้ไขไฟล์ `_config.yml`:

```yaml
baseurl: ""
url: "https://username.github.io"
```

GitHub Pages จะอัตโนมัติสร้างเว็บไซต์จาก repository ของคุณ

### 2. การเผยแพร่ผ่าน Netlify

Netlify เป็นอีกบริการหนึ่งที่ให้คุณโฮสต์เว็บไซต์ static ได้ฟรี:

1. สร้างบัญชี Netlify
2. เชื่อมต่อกับ GitHub repository ของคุณ
3. ตั้งค่า build command เป็น `jekyll build` และ publish directory เป็น `_site`

## เทคนิคและแนวทางปฏิบัติที่ดี

### 1. การใช้ Plugins

Jekyll มี plugins มากมายที่ช่วยเพิ่มความสามารถให้กับเว็บไซต์:

```ruby
# Gemfile
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-archives"
  gem "jekyll-redirect-from"
end
```

```yaml
# _config.yml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-archives
  - jekyll-redirect-from
```

### 2. การเพิ่ม Syntax Highlighting

Jekyll มี syntax highlighting ในตัวโดยใช้ Rouge:

```yaml
# _config.yml
markdown: kramdown
highlighter: rouge
```

```markdown
# ตัวอย่างการใช้ syntax highlighting

```python
import pandas as pd

def process_data(file_path):
    df = pd.read_csv(file_path)
    return df.describe()
```
```

### 3. การเพิ่ม SEO

การใช้ jekyll-seo-tag เพื่อเพิ่ม metadata สำหรับ SEO:

```yaml
# _config.yml
title: Data Engineering Blog
description: บล็อกเกี่ยวกับ Data Engineering, Big Data, และ Data Science
author: Your Name
twitter:
  username: yourtwitterhandle
  card: summary_large_image
logo: /assets/images/logo.png
social:
  name: Your Name
  links:
    - https://twitter.com/yourtwitterhandle
    - https://www.linkedin.com/in/yourlinkedinhandle
    - https://github.com/yourgithubhandle
```

เพิ่ม tag ใน `_includes/head.html`:

```html
{% raw %}{% seo %}{% endraw %}
```

### 4. การเพิ่ม Analytics

การเพิ่ม Google Analytics:

```html
<!-- _includes/analytics.html -->
{% if site.google_analytics %}
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ site.google_analytics }}');
</script>
{% endif %}
```

```yaml
# _config.yml
google_analytics: UA-XXXXXXXX-X
```

## สรุป

Jekyll เป็นเครื่องมือที่ยอดเยี่ยมสำหรับ Data Engineer ที่ต้องการสร้างเว็บไซต์หรือบล็อกเพื่อเผยแพร่ความรู้และโปรเจค โดยมีข้อดีคือใช้งานง่าย, ไม่ต้องมีความรู้ด้านการพัฒนาเว็บมากนัก, และสามารถโฮสต์ได้ฟรีผ่าน GitHub Pages หรือ Netlify

ในบทความนี้ เราได้เรียนรู้เกี่ยวกับ:
- พื้นฐานของ Jekyll และการติดตั้ง
- การสร้างเว็บไซต์และบล็อกด้วย Jekyll
- การปรับแต่งเว็บไซต์ให้เหมาะกับ Data Engineer
- การเผยแพร่เว็บไซต์ผ่าน GitHub Pages และ Netlify
- เทคนิคและแนวทางปฏิบัติที่ดีในการใช้ Jekyll

การมีเว็บไซต์หรือบล็อกส่วนตัวเป็นวิธีที่ดีในการแชร์ความรู้, สร้าง personal branding, และแสดงผลงานให้กับผู้ที่สนใจหรือนายจ้างในอนาคต

หวังว่าบทความนี้จะช่วยให้คุณสามารถสร้างเว็บไซต์ของตัวเองด้วย Jekyll ได้อย่างง่ายดายนะครับ มีคำถามหรือข้อสงสัยอะไรเพิ่มเติม สามารถคอมเมนต์ไว้ด้านล่างได้เลยครับ!
