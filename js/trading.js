// Trading Controller
class TradingController {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarToggle = document.getElementById('sidebarToggle');
    this.logoutBtn = document.getElementById('logoutBtn');
    this.sellCropBtn = document.getElementById('sellCropBtn');
    this.productCards = document.querySelectorAll('.product-card');
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

    // Initialize sell crop button
    if (this.sellCropBtn) {
      this.sellCropBtn.addEventListener('click', () => this.showSellForm());
    }

    // Initialize product card click handlers
    if (this.productCards) {
      this.productCards.forEach(card => {
        card.addEventListener('click', (e) => {
          // Don't trigger if clicking on contact button
          if (!e.target.closest('button')) {
            this.showProductDetail(card);
          }
        });
      });
    }

    // Check authentication
    this.checkAuth();

    // Load trading data
    this.loadTradingData();
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

  showSellForm() {
    // In a real app, this would show a form to list crops for sale
    this.showAlert('Sell crop form would open here', 'success');
  }

  showProductDetail(card) {
    // In a real app, this would show detailed product information
    const productName = card.querySelector('h3').textContent;
    this.showAlert(`Showing details for ${productName}`, 'success');
  }

  async loadTradingData() {
    try {
      // Simulate loading data from API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would fetch and display actual trading data here
      console.log('Trading data loaded');
      
    } catch (error) {
      console.error('Failed to load trading data:', error);
      this.showAlert('Failed to load trading data. Please refresh the page.', 'error');
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
  new TradingController();
});