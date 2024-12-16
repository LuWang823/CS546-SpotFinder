const postSpot = async (formData) => {
  try {
    // Send spot to the backend
    //http://localhost:3000/api/v1/spots
    // const response = await fetch("http://localhost:3000/api/v1/spots", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencode",
    //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     Refresh: `Bearer ${localStorage.getItem("refreshToken")}`,
    //   },
    //   body: formData,
    // });

    axios.defaults.headers.common["Authorization"] =
      `Bearer ${localStorage.getItem("accessToken")}`;
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/spots",
      formData,
      {
        "Content-Type": "application/x-www-form-urlencode",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Refresh: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    );

    // if (response.ok) {
    // } else {
    //   console.log(response);
    //   throw new Error("Internal Server Error");
    // }


  } catch (e) {
    if(e?.response?.data)
      throw e?.response?.data;
    else
      throw e
  }
};


(function ($) {

let tagarea=$('#collection-hobby-tags');
    let tagsurl={
    method: "GET",
    url: '/api/hobbies',
}

$.ajax(tagsurl).then(function(responseMessage){
    if (responseMessage['hobbies']) {
    const taglist=responseMessage['hobbies'];

    tagarea.empty(); // Clear existing content

    // Append each hobby as an <li> element
    taglist.forEach(function (hobby, index) {
    const tagElement = document.createElement("input");
          tagElement.setAttribute("type", "checkbox");
          tagElement.setAttribute("name", "hobby"); // Group all radio buttons
          tagElement.setAttribute("id", `hobby-${index}`); // Unique ID for each radio
          tagElement.setAttribute("value", hobby);
          // Create a label for the radio button
          const label = document.createElement("label");
          label.setAttribute("for", `hobby-${index}`); // Associate label with radio
          label.textContent = hobby;

          // Append the radio button and label to the tag area
          tagarea.append(tagElement);
          tagarea.append(label);
          tagarea.append("<br>");
    });
    }
  })


})(window.jQuery);