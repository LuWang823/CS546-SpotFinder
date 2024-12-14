const postReview = async (spotID,rating,description) => {
    try {
        // Send credentials to the backend
        //localhost:3000/api/v1/reviews/spots/:spotId
        const response = await fetch(('http://localhost:3000/api/v1/reviews/spots/'+spotID), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                Refresh: `Bearer ${localStorage.getItem('refreshToken')}`
            },
            body:JSON.stringify({
                rating,
                description
            })
        });
    
        if (response.ok) {

        } else {
            throw new Error('Internal Server Error');
        }
    } catch (e) {
        throw e
    }
}