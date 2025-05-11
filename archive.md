---
layout: page
title: Blog Archive
---

<style>
.archive-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.archive-tab {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-bottom: none;
  margin-right: 5px;
  border-radius: 4px 4px 0 0;
}

.archive-tab:hover {
  background-color: #f0f0f0;
}

.archive-tab.active {
  background-color: white;
  border-bottom: 1px solid white;
  margin-bottom: -1px;
  font-weight: bold;
}

.archive-content {
  display: none;
}

.archive-content.active {
  display: block;
}

.post-date {
  color: #666;
  font-size: 0.9em;
  margin-right: 8px;
}
</style>

<div class="archive-tabs">
  <div class="archive-tab active" data-tab="by-date">By Date</div>
  <div class="archive-tab" data-tab="by-category">By Category</div>
  <div class="archive-tab" data-tab="by-tag">By Tag</div>
</div>

<div id="by-date" class="archive-content active">
  <h2>Posts by Date</h2>
  {% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
  {% for year in postsByYear %}
    <h3>{{ year.name }}</h3>
    <ul>
      {% for post in year.items %}
        <li>
          <span class="post-date">{{ post.date | date: "%b %d" }}</span>
          <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
          {% if post.author %} • {{ post.author }}{% endif %}
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>

<div id="by-category" class="archive-content">
  <h2>Posts by Category</h2>
  {% assign categories = site.categories | sort %}
  {% if categories.size > 0 %}
    {% for category in categories %}
      <h3>{{ category[0] }}</h3>
      <ul>
        {% for post in category[1] %}
          <li>
            <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
            <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
            {% if post.author %} • {{ post.author }}{% endif %}
          </li>
        {% endfor %}
      </ul>
    {% endfor %}
  {% else %}
    <p>No categories found. Consider adding categories to your posts using the 'categories' front matter.</p>
    <p>Example:</p>
    <pre>
---
layout: post
title: "Your Post Title"
categories: [Category1, Category2]
---
    </pre>
  {% endif %}
</div>

<div id="by-tag" class="archive-content">
  <h2>Posts by Tag</h2>
  {% assign tags = site.tags | sort %}
  {% for tag in tags %}
    <h3>{{ tag[0] }}</h3>
    <ul>
      {% for post in tag[1] %}
        <li>
          <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
          <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
          {% if post.author %} • {{ post.author }}{% endif %}
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get all tab elements
  var tabs = document.querySelectorAll('.archive-tab');
  
  // Add click event to each tab
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(function(t) {
        t.classList.remove('active');
      });
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all content sections
      document.querySelectorAll('.archive-content').forEach(function(content) {
        content.classList.remove('active');
      });
      
      // Show the corresponding content section
      var tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});
</script>
