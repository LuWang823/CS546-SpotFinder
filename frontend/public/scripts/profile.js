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

      document.getElementById('verified').textContent = ('Verified: ' + user.verified);
      
      const ulElement = document.getElementById('liked-spots');
      if (user.liked) {
        user.liked.forEach(item => {
          const li = document.createElement("li");
          const anchor = document.createElement("a"); 

          anchor.href = `/spots/${item._id}`;
          anchor.textContent = item.name; 

          li.appendChild(anchor); 
          ulElement.appendChild(li); 
        });
      }

      const posted = document.getElementById('posted-spots');
      if (user.postedSpots) {
        user.postedSpots.forEach(item => {
          const li = document.createElement("li");
          const anchor = document.createElement("a"); 

          anchor.href = `/spots/${item._id}`;
          anchor.textContent = item.name; 

          li.appendChild(anchor); 
          posted.appendChild(li); 
        });
      }

      const postedReviews = document.getElementById('posted-reviews');
      if (user.postedReviews) {
        user.postedReviews.forEach(item => {
          const li = document.createElement("li");
          const anchor = document.createElement("a"); 

          anchor.href = `/spots/${item.spot._id}`;
          anchor.textContent = (`Rating: ${item.ratings} | ${item.spot.name}`); 

          li.appendChild(anchor); 
          postedReviews.appendChild(li); 
        });
      }
    }
  }
});
