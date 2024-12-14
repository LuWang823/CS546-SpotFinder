const like = async () => {
    const currentUrl = window.location.pathname;
    const id = currentUrl.split('/')[2]; // spot id from current url

    const errorMessage = document.getElementById('error-message');

    try {
        // Send spot to the backend
        //http://localhost:3000/api/v1/users/like/:spotId
        const response = await fetch((`http://localhost:3000/api/v1/users/like/${id}`), {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                Refresh: `Bearer ${localStorage.getItem('refreshToken')}`
            },
        });

        if (response.ok) {
            document.getElementById('likeSpot').style.display = 'none';
        } else {
            console.log(response);
            errorMessage.textContent = 'Internal Server error';
            errorMessage.style.display = 'block';
        }
    } catch (e) {
        errorMessage.textContent = e.message;
        errorMessage.style.display = 'block';
    }
}