// Fertilizers Controller
class FertilizersController {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarToggle = document.getElementById('sidebarToggle');
    this.logoutBtn = document.getElementById('logoutBtn');
    this.cropButtons = document.querySelectorAll('.fertilizer-crop-btn');
    this.soilButtons = document.querySelectorAll('.fertilizer-soil-btn');
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

    // Initialize crop selection buttons
    if (this.cropButtons) {
      this.cropButtons.forEach(btn => {
        btn.addEventListener('click', () => this.selectCrop(btn));
      });
    }

    // Initialize soil selection buttons
    if (this.soilButtons) {
      this.soilButtons.forEach(btn => {
        btn.addEventListener('click', () => this.selectSoil(btn));
      });
    }

    // Check authentication
    this.checkAuth();

    // Load initial fertilizer data
    this.loadFertilizerData();
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

  selectCrop(button) {
    // Remove active class from all crop buttons
    this.cropButtons.forEach(btn => {
      btn.classList.remove('border-green-500', 'bg-green-50');
    });
    
    // Add active class to selected button
    button.classList.add('border-green-500', 'bg-green-50');
    
    // Get selected crop
    const selectedCrop = button.querySelector('span').textContent;
    this.showAlert(`Showing recommendations for ${selectedCrop}`, 'success');
    
    // In a real app, we would fetch recommendations for this crop
    this.updateRecommendations(selectedCrop, this.selectedSoil);
  }

  selectSoil(button) {
    // Remove active class from all soil buttons
    this.soilButtons.forEach(btn => {
      btn.classList.remove('border-green-500', 'bg-green-50');
    });
    
    // Add active class to selected button
    button.classList.add('border-green-500', 'bg-green-50');
    
    // Get selected soil
    this.selectedSoil = button.querySelector('span').textContent;
    this.showAlert(`Showing recommendations for ${this.selectedSoil} soil`, 'success');
    
    // In a real app, we would fetch recommendations for this soil type
    this.updateRecommendations(this.selectedCrop, this.selectedSoil);
  }

  updateRecommendations(crop, soil) {
    // In a real app, this would fetch and display updated recommendations
    console.log(`Updating recommendations for ${crop} in ${soil} soil`);
  }

  async loadFertilizerData() {
    try {
      // Simulate loading data from API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would fetch and display actual fertilizer data here
      console.log('Fertilizer data loaded');
      
    } catch (error) {
      console.error('Failed to load fertilizer data:', error);
      this.showAlert('Failed to load fertilizer data. Please refresh the page.', 'error');
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
  new FertilizersController();
});