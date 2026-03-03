document.addEventListener('DOMContentLoaded', () => {

    // Check URL params for payment success
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
        const banner = document.getElementById('paymentSuccessBanner');
        if (banner) {
            banner.classList.add('active');
            // Auto hide after 5 seconds
            setTimeout(() => {
                banner.classList.remove('active');
            }, 5000);

            // Note: in a real app we'd update state based on params.get('plan')
        }
    }

    // Sidebar Navigation Logic
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const viewSections = document.querySelectorAll('.view-section');
    const topBarTitle = document.getElementById('topBarTitle');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Remove active class from all items and sections
    function resetActiveStates() {
        navItems.forEach(item => item.classList.remove('active'));
        viewSections.forEach(section => section.classList.remove('active'));
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            resetActiveStates();

            // Set active nav item
            item.classList.add('active');

            // Get target view id
            const targetId = 'view-' + item.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                targetEl.classList.add('active');
            }

            // Update top bar title
            if (topBarTitle) {
                topBarTitle.textContent = item.textContent.trim();
            }

            // Close mobile menu if open
            if (window.innerWidth <= 768 && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            }
        });
    });

    // Mobile Sidebar Toggle
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }

});
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}
import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await signOut(auth);
    window.location.replace("login.html");
  });
}