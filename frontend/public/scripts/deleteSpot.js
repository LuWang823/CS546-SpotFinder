const deleteSpot = async (id) => {
    console.log(`deleted spot of ID ${id}`)
    //TODO: IMPLEMENT THIS FUNCTION
    //need to make sure that user is the one that posted the spot
    /* most likely implementaion vv
    try {
        // Send credentials to the backend
        //http://localhost:3000/spots/:id
        const response = await fetch(('http://localhost:3000/spots/:id'), {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                Refresh: `Bearer ${localStorage.getItem('refreshToken')}`
            },
        });
    
        if (response.ok) {

        } else {
            throw new Error('Internal Server Error');
        }
    } catch (e) {
        throw e
    }*/
}