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

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${localStorage.getItem("accessToken")}`;
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/collections/sharedCollections",

        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      );

      let collectionList = document.getElementById("collection-list");
      data?.data?.collections?.forEach((c) => {
        let li = document.createElement("li");
        let h4 = document.createElement("h4");
        h4.innerText = `Shared by ${c.creater_name}`;
        li.appendChild(h4);
        c?.spots?.forEach((s) => {
          console.log(s);

          let a = document.createElement("a");
          a.href = `/spots/${s.spot}`;
          a.style.display = "block";
          a.innerText = s.name;
          li.appendChild(a);
        });
        collectionList.appendChild(li);
      });

      let friendRequest = document.getElementById("friend-request-list");
      user?.requestReceived.forEach((req) => {
        if (req.status === "pending") {
          let li = document.createElement("li");
          li.innerHTML = `<div>Name: ${req.sender_name}</div>
    <a class="accept" href="">accept friend request</a>
    <a class="reject" href="">reject friend request</a>
    `;
          friendRequest.appendChild(li);

          for (let item of li.getElementsByTagName("a")) {
            if (item.classList.contains("accept")) {
              item.addEventListener("click", async (e) => {
                e.preventDefault();
                const { data } = await axios.patch(
                  "http://localhost:3000/api/v1/users/acceptFriendRequest",
                  {
                    key: req.key,
                    sender: req.sender_id,
                  },
                  {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                );

                item.style.display = "none";
                item.nextElementSibling.style.display = "none";
                let div = document.createElement("div");
                div.textContent = "Request Accepted";
                item.parentNode.append(div);
              });
            } else {
              item.addEventListener("click", async (e) => {
                e.preventDefault();
                const { data } = await axios.patch(
                  "http://localhost:3000/api/v1/users/rejectFriendRequest",
                  {
                    key: req.key,
                    sender: req.sender_id,
                  },
                  {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                );

                item.style.display = "none";
                item.previousElementSibling.style.display = "none";
                let div = document.createElement("div");
                div.textContent = "Request Rejected";
                item.parentNode.append(div);
              });
            }
          }
        }
      });

      let likedList = document.getElementById("liked-list");
      user?.liked?.forEach((l) => {
        let label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" id=${l._id} name=${l.name} value=${l._id} />${l.name}`;
        likedList.appendChild(label);
      });

      let friendList = document.getElementById("friend-list");
      user?.friend?.forEach(async (f) => {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/users/getUserById/${f}`,
        );
        f = data.data.user;
        console.log(f);
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
          likedList.push({ spot: item.value, name: item.name });
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
