// News Controller
class NewsController {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarToggle = document.getElementById('sidebarToggle');
    this.logoutBtn = document.getElementById('logoutBtn');
    this.allTab = document.getElementById('allTab');
    this.newsTab = document.getElementById('newsTab');
    this.schemesTab = document.getElementById('schemesTab');
    this.newsCards = document.querySelectorAll('.news-card');
    this.init();
  }

  init() {
    // Initialize sidebar toggle for mobile
    if (this.sidebarToggle) {
      this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
    }

    // Initialize logout functionality
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener('click', (e) => this.handleLogout(e));
    }

    // Initialize tab switching
    if (this.allTab && this.newsTab && this.schemesTab) {
      this.allTab.addEventListener('click', () => this.switchTab('all'));
      this.newsTab.addEventListener('click', () => this.switchTab('news'));
      this.schemesTab.addEventListener('click', () => this.switchTab('schemes'));
    }

    // Initialize news card click handlers
    if (this.newsCards) {
      this.newsCards.forEach(card => {
        card.addEventListener('click', (e) => {
          // Don't trigger if clicking on read more link
          if (!e.target.closest('a')) {
            this.showNewsDetail(card);
          }
        });
      });
    }

    // Check authentication
    this.checkAuth();

    // Load news data
    this.loadNewsData();
  }

  toggleSidebar() {
    this.sidebar.classList.toggle('open');
  }

  checkAuth() {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!authToken) {
      window.location.href = '../auth/login.html';
    }
  }

  async handleLogout(e) {
    e.preventDefault();
    
    try {
      // Show loading state
      this.logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Logging out...';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear auth data
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      
      // Redirect to login
      window.location.href = '../auth/login.html';
      
    } catch (error) {
      console.error('Logout failed:', error);
      this.showAlert('Logout failed. Please try again.', 'error');
    }
  }

  switchTab(tab) {
    // Update active tab styling
    this.allTab.classList.remove('border-green-500', 'text-green-600');
    this.newsTab.classList.remove('border-green-500', 'text-green-600');
    this.schemesTab.classList.remove('border-green-500', 'text-green-600');
    
    this.allTab.classList.add('border-transparent', 'text-gray-500');
    this.newsTab.classList.add('border-transparent', 'text-gray-500');
    this.schemesTab.classList.add('border-transparent', 'text-gray-500');
    
    const activeTab = tab === 'all' ? this.allTab : 
                     tab === 'news' ? this.newsTab : this.schemesTab;
    
    activeTab.classList.remove('border-transparent', 'text-gray-500');
    activeTab.classList.add('border-green-500', 'text-green-600');

    // Filter news cards based on selected tab
    this.newsCards.forEach(card => {
      const isScheme = card.querySelector('.scheme-tag');
      
      if (tab === 'all' || 
          (tab === 'news' && !isScheme) || 
          (tab === 'schemes' && isScheme)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    this.showAlert(`Showing ${tab === 'all' ? 'all updates' : tab === 'news' ? 'news' : 'government schemes'}`, 'success');
  }

  showNewsDetail(card) {
    // In a real app, this would show detailed news/scheme information
    const title = card.querySelector('h3').textContent;
    this.showAlert(`Showing details for: ${title}`, 'success');
  }

  async loadNewsData() {
    try {
      // Simulate loading data from API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would fetch and display actual news data here
      console.log('News data loaded');
      
    } catch (error) {
      console.error('Failed to load news data:', error);
      this.showAlert('Failed to load news data. Please refresh the page.', 'error');
    }
  }

  showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg ${
      type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
    }`;
    alertDiv.innerHTML = `
      <div class="flex items-center">
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'} mr-2"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NewsController();
});