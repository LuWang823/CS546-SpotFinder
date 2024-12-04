const postReview = async (spotID,rating,description) => {
    console.log('inside func')
    try {
        // Send credentials to the backend
        //localhost:3000/spots/:id/reviews
        const response = await fetch(('http://localhost:3000/spots/'+spotID+'/reviews'), {
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
            // Show error message if login failed
            throw new Error('Internal Server Error');
        }
    } catch (e) {
        throw e
    }
}