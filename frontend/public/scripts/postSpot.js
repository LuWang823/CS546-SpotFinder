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
    throw e;
  }
};
