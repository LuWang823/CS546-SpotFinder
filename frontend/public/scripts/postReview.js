const postReview = async (spotID,rating,description) => {
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
            throw new Error('Invalid name, email, or password');
        }
    } catch (e) {
        throw e
    }
}