---
layout: page
title: Blog Archive
---

<style>
.archive-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
  flex-wrap: wrap;
}

.archive-tab {
  padding: 10px 15px;
  cursor: pointer;
  background-color: var(--archive-tab-background, #f8f8f8);
  color: var(--archive-tab-text, #111111);
  border: 1px solid var(--border-color, #e8e8e8);
  border-bottom: none;
  margin-right: 5px;
  border-radius: 4px 4px 0 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.archive-tab:hover {
  background-color: var(--archive-tab-hover, #f0f0f0);
}

.archive-tab.active {
  background-color: var(--archive-tab-active, white);
  color: var(--archive-tab-active-text, #111111);
  border-bottom: 1px solid var(--archive-tab-active, white);
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

.search-container {
  margin-top: 20px;
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.search-results {
  margin-top: 20px;
}

.search-result-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.search-result-title {
  font-size: 18px;
  margin-bottom: 5px;
}

.search-result-snippet {
  color: #555;
  margin-bottom: 5px;
}

.search-highlight {
  background-color: #ffeb3b;
  padding: 0 2px;
}

.no-results {
  color: #666;
  font-style: italic;
}
</style>

<div class="archive-tabs">
  <div class="archive-tab active" data-tab="by-date">By Date</div>
  <div class="archive-tab" data-tab="by-category">By Category</div>
  <div class="archive-tab" data-tab="by-tag">By Tag</div>
  <div class="archive-tab" data-tab="by-search">Search</div>
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

<div id="by-search" class="archive-content">
  <h2>Search Posts</h2>
  <div class="search-container">
    <input type="text" id="search-input" class="search-input" placeholder="Search for posts by title, content, category or tag..." aria-label="Search posts">
    <div id="search-results" class="search-results"></div>
  </div>
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

  // Search functionality
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var posts = [];

  // Load all posts data
  {% assign all_posts = site.posts %}
  {% for post in all_posts %}
    posts.push({
      title: "{{ post.title | escape }}",
      url: "{{ site.baseurl }}{{ post.url }}",
      date: "{{ post.date | date: "%b %d, %Y" }}",
      author: "{{ post.author | escape }}",
      categories: [{% for category in post.categories %}"{{ category }}"{% unless forloop.last %},{% endunless %}{% endfor %}],
      tags: [{% for tag in post.tags %}"{{ tag }}"{% unless forloop.last %},{% endunless %}{% endfor %}],
      content: {{ post.content | strip_html | jsonify }}
    });
  {% endfor %}

  // Search function
  function performSearch() {
    var query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    
    var results = posts.filter(function(post) {
      return (
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query) ||
        post.categories.some(function(category) { return category.toLowerCase().includes(query); }) ||
        post.tags.some(function(tag) { return tag.toLowerCase().includes(query); })
      );
    });
    
    displayResults(results, query);
  }
  
  // Display search results
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p class="no-results">No posts found matching your search.</p>';
      return;
    }
    
    var resultsHtml = '';
    
    results.forEach(function(post) {
      var snippet = getSnippet(post.content, query);
      resultsHtml += '<div class="search-result-item">';
      resultsHtml += '<div class="search-result-title"><a href="' + post.url + '">' + highlightText(post.title, query) + '</a></div>';
      resultsHtml += '<div class="post-date">' + post.date + (post.author ? ' • ' + post.author : '') + '</div>';
      if (snippet) {
        resultsHtml += '<div class="search-result-snippet">' + snippet + '</div>';
      }
      resultsHtml += '</div>';
    });
    
    searchResults.innerHTML = resultsHtml;
  }
  
  // Get content snippet with the search term
  function getSnippet(content, query) {
    var lowerContent = content.toLowerCase();
    var index = lowerContent.indexOf(query);
    
    if (index === -1) return '';
    
    var start = Math.max(0, index - 50);
    var end = Math.min(content.length, index + query.length + 50);
    var snippet = content.substring(start, end);
    
    // Add ellipsis if we're not at the beginning/end
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    
    return highlightText(snippet, query);
  }
  
  // Highlight search term in text
  function highlightText(text, query) {
    if (!query) return text;
    
    var lowerText = text.toLowerCase();
    var lowerQuery = query.toLowerCase();
    var result = '';
    var lastIndex = 0;
    var index = lowerText.indexOf(lowerQuery);
    
    while (index !== -1) {
      result += text.substring(lastIndex, index);
      result += '<span class="search-highlight">' + text.substring(index, index + query.length) + '</span>';
      lastIndex = index + query.length;
      index = lowerText.indexOf(lowerQuery, lastIndex);
    }
    
    result += text.substring(lastIndex);
    return result;
  }
  
  // Add event listener for search input
  searchInput.addEventListener('input', function() {
    performSearch();
  });
});
</script>
