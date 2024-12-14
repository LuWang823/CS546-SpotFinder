const postSpot = async (spotObj) => {

    try {
        // Send spot to the backend
        //http://localhost:3000/api/v1/spots
        const response = await fetch(('http://localhost:3000/api/v1/spots'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                Refresh: `Bearer ${localStorage.getItem('refreshToken')}`
            },
            body:JSON.stringify(spotObj)
        });
    
        if (response.ok) {

        } else {
            console.log(response);
            throw new Error('Internal Server Error');
        }
    } catch (e) {
        throw e
    }
}