import { refreshToken } from "./signUp.js";

const profile = document.getElementById("profile");

profile.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    // try to refresh access token
    await refreshToken();

    // request for user data
    let response = await fetch("/api/v1/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // store user in local storage
      let { data } = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.replace("/profile");
    }
  } catch (e) {
    console.log(e);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.href === "http://localhost:3000/profile") {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      document.getElementById("user-name").textContent = user.name;
      document.getElementById("user-email").textContent = user.email;
      
      document.getElementById('verified').textContent = ('Verified: '+user.verified);
    }
  }
});
