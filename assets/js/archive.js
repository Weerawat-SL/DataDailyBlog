document.addEventListener('DOMContentLoaded', function() {
  // Add click event listeners to all archive buttons
  document.querySelectorAll('.archive-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Get the section ID from the data-section attribute
      var sectionId = this.getAttribute('data-section');
      
      // Hide all sections
      document.querySelectorAll('.archive-section').forEach(function(section) {
        section.style.display = 'none';
      });
      
      // Show the selected section
      document.getElementById(sectionId).style.display = 'block';
      
      // Update active button
      document.querySelectorAll('.archive-btn').forEach(function(button) {
        button.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
});
