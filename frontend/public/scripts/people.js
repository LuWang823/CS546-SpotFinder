import { refreshToken } from "./signUp.js";

function populatePeople(peoples) {
  let list = document.getElementById("people-list");
  let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user._id);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  peoples.forEach((people) => {
    if (user._id !== people._id) {
      let li = document.createElement("li");
      li.innerHTML = `<div>Name: ${people.name}</div>
    <div>Address: ${people.address}</div>
    <a id="${people._id}" href="">send friend request</a>
    `;
      list.appendChild(li);
    }
  });

  for (let item of list.getElementsByTagName("a")) {
    item.addEventListener("click", async (e) => {
      e.preventDefault();

      let response = await fetch(
        `http://localhost:3000/api/v1/users/sendFriendRequest/${item.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        item.style.display = "none";
      }
      let div = document.createElement("div");
      div.textContent = "Request sent";
      item.parentNode.append(div);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await refreshToken();
  const errorMessage = document.getElementById('error-message');
  if (window.location.href === "http://localhost:3000/people") {
    let form = document.getElementById("search-people-form");
    form.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();

        
        let formData = new FormData(form);
        let searchname = formData.get('name');
        if(!searchname || typeof searchname !== 'string'){
          errorMessage.textContent = "must provide a search name";
          errorMessage.style.display = 'block';
          return
        }
        if(searchname.trim() === ''){
          errorMessage.textContent = "must provide a non-empty string";
          errorMessage.style.display = 'block';
          return
        }
        searchname = searchname.trim();
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/users/?name=${searchname}`,
        );
        populatePeople(data.data);
      } catch (e) {
        console.log(e);
        errorMessage.textContent = e.message;
        errorMessage.style.display = 'block';
      }
    });
  }
});
