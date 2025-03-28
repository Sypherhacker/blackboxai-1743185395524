// Authentication Controller
class AuthController {
  constructor() {
    this.loginForm = document.getElementById('loginForm');
    this.signupForm = document.getElementById('signupForm');
    this.init();
  }

  init() {
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
    
    if (this.signupForm) {
      this.signupForm.addEventListener('submit', (e) => this.handleSignup(e));
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    try {
      // Show loading state
      const submitBtn = this.loginForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Signing in...';

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store session if remember me is checked
      if (rememberMe) {
        localStorage.setItem('authToken', 'simulated-token');
      } else {
        sessionStorage.setItem('authToken', 'simulated-token');
      }
      
      // Redirect to dashboard
      window.location.href = '../dashboard/index.html';
      
    } catch (error) {
      console.error('Login failed:', error);
      this.showAlert('Login failed. Please check your credentials.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign in';
      }
    }
  }

  async handleSignup(e) {
    e.preventDefault();
    
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('password').value
    };

    // Validate password match
    if (formData.password !== document.getElementById('confirmPassword').value) {
      this.showAlert('Passwords do not match', 'error');
      return;
    }

    try {
      // Show loading state
      const submitBtn = this.signupForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Creating account...';

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage (simulated)
      localStorage.setItem('userData', JSON.stringify(formData));
      
      // Redirect to login with success message
      window.location.href = 'login.html?signup=success';
      
    } catch (error) {
      console.error('Signup failed:', error);
      this.showAlert('Signup failed. Please try again.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
      }
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
  new AuthController();
  
  // Check for success message in URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('signup') === 'success') {
    const auth = new AuthController();
    auth.showAlert('Account created successfully! Please login.', 'success');
  }
});