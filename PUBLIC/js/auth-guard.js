
import { auth } from "./firebase.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let checked = false;

export function protectPage() {
  onAuthStateChanged(auth, (user) => {
    if (!checked) {
      checked = true;

      if (!user) {
        window.location.replace("login.html");
      }
    }
  });
}

export function redirectIfLoggedIn() {
  onAuthStateChanged(auth, (user) => {
    if (!checked) {
      checked = true;

      if (user) {
        window.location.replace("dashboard.html");
      }
    }
  });
}