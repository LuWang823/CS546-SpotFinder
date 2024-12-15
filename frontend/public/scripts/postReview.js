const postReview = async (spotID,rating,description) => {
    try {
        // Send credentials to the backend
        //localhost:3000/api/v1/reviews/spots/:spotId
        const response = await fetch(('http://localhost:3000/api/v1/reviews/'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                Refresh: `Bearer ${localStorage.getItem('refreshToken')}`
            },
            body:JSON.stringify({
                description: description,
                spot: spotID,
                user: JSON.parse(localStorage.getItem('user'))._id,
                username: JSON.parse(localStorage.getItem('user')).name,
                ratings: rating
            })
        });
    
        if (response.ok) {

        } else {
            let responseJson = await response.json();
            if(await responseJson.message === 'User already made a comment'){
                throw new Error('You have already posted a review');
            }
            if(await responseJson.message === 'spot does not exist'){
                throw new Error('spot does not exist, how did you get here?');
            }
            throw new Error('Internal Server Error');
        }
    } catch (e) {
        throw e
    }
}