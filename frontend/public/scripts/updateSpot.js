const updateSpot = async (formData) => {
    try {
    //TODO: IMPLEMENT THIS FUNCTION
    /* most likely implementaion vv
    const currentUrl = window.location.pathname;
    const id = currentUrl.split('/')[2]; // spot id from current url
    try {
        // Send credentials to the backend
        //http://localhost:3000/spots/:id
        const response = await fetch((`http://localhost:3000/spots/${id}`), {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                Refresh: `Bearer ${localStorage.getItem('refreshToken')}`
            },
            body:JSON.stringify(spotObj)
        });
    
        if (response.ok) {

        } else {
            throw new Error('Internal Server Error');
        }
    } catch (e) {
        throw e
    }*/
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
        