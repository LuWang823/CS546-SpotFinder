import { refreshToken } from "./signUp.js";

const collection = document.getElementById("collection");

collection.addEventListener("click", async (e) => {
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
      window.location.replace("/collection");
    }
  } catch (e) {
    console.log(e);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.href === "http://localhost:3000/collection") {
    try {
      // try to refresh access token
      await refreshToken();
      let user = JSON.parse(localStorage.getItem("user"));

      let collectionList = document.getElementById("collection-list");
      user?.sharedCollection?.forEach((s) => {
        let label = document.createElement("label");
        label.innerHTML = `<input type="radio" id=${s._id} name=${s.name} value=${s._id} />${s.name}`;
        collectionList.appendChild(label);
      });

      let likedList = document.getElementById("liked-list");
      user?.liked?.forEach((l) => {
        let label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" id=${l._id} name=${l.name} value=${l._id} />${l.name}`;
        likedList.appendChild(label);
      });

      let friendList = document.getElementById("friend-list");
      user?.friend?.forEach((f) => {
        let label = document.createElement("label");
        label.innerHTML = `<input type="radio" id=${f._id} name=${f.name} value=${f._id} />${f.name}`;
        friendList.appendChild(label);
      });
    } catch (e) {}

    let form = document.getElementById("collection-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let friend = form.querySelector('input[type="radio"]:checked');
      let nodeList = form.querySelectorAll('input[type="checkbox"]:checked');

      try {
        if (!friend) {
          throw "Please select a friend.";
        }

        if (nodeList.length === 0) {
          throw "Please select at least one spot.";
        }

        let likedList = [];
        for (const item of nodeList) {
          likedList.push(item.value);
        }

        // try to refresh access token
        await refreshToken();
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${localStorage.getItem("accessToken")}`;

        const { data } = await axios.post(
          "http://localhost:3000/api/v1/collections/",
          {
            sharedWith: friend.value,
            spots: likedList,
          },
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Refresh: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        );

        let message = document.getElementById("collection-message");
        message.textContent = `Collection successfully created with your friend ${friend.name}`;
        setTimeout(() => {
          message.textContent = "";
        }, 5000);
      } catch (e) {
        throw e;
      }
    });
  }
});
