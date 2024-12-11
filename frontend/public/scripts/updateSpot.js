const updateSpot = async (spotObj, id) => {
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
}