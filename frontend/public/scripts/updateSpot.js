const updateSpot = async (formData) => {
    try {
       // try to refresh access token
       const currentUrl = window.location.pathname;
       const id = currentUrl.split('/')[2]; // spot id from current url
       console.log(formData);
        axios.defaults.headers.common["Authorization"] =
        `Bearer ${localStorage.getItem("accessToken")}`;
      const { data } = await axios.patch(`http://localhost:3000/api/v1/spots/${id}`,
        formData,
        {
          "Content-Type": "application/x-www-form-urlencode",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          Refresh: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
    );
    return data;
            
} catch (e) {
    console.error("Axios error: ", e.response ? e.response.data : e.message);;
    throw e;
  }
};
        