// Diseases Controller
class DiseasesController {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarToggle = document.getElementById('sidebarToggle');
    this.logoutBtn = document.getElementById('logoutBtn');
    this.reportBtn = document.querySelector('button[class*="bg-green-600"]');
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

    // Initialize report disease button
    if (this.reportBtn) {
      this.reportBtn.addEventListener('click', () => this.showReportForm());
    }

    // Initialize disease card click handlers
    this.initDiseaseCards();

    // Check authentication
    this.checkAuth();

    // Load disease data
    this.loadDiseaseData();
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

  initDiseaseCards() {
    const cards = document.querySelectorAll('.disease-card button');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        this.showDiseaseDetails(card.closest('.disease-card'));
      });
    });
  }

  showDiseaseDetails(card) {
    // In a real app, this would show detailed disease information
    const diseaseName = card.querySelector('h3').textContent;
    this.showAlert(`Showing details for ${diseaseName}`, 'success');
  }

  showReportForm() {
    // In a real app, this would show a form to report new diseases
    this.showAlert('Report disease form would open here', 'success');
  }

  async loadDiseaseData() {
    try {
      // Simulate loading data from API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would fetch and display actual disease data here
      console.log('Disease data loaded');
      
    } catch (error) {
      console.error('Failed to load disease data:', error);
      this.showAlert('Failed to load disease data. Please refresh the page.', 'error');
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
  new DiseasesController();
});