const login = async (email,password) => {
    try {
        // Send login credentials to the backend
        const response = await fetch('http://localhost:3000/api/v1/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    
        if (response.ok) {
            alert('response OK');
            // Parse the response to get the JWT token
            const data = await response.json();
            const token = data.token;
    
            // Store the token in localStorage or a cookie
            //localStorage.setItem('authToken', token);
    
            // Redirect the user or update the UI to indicate successful login
            //window.location.href = '/dashboard.html'; // Change to your protected route
        } else {
            // Show error message if login failed
            throw new Error('Invalid email or password');
        }
    } catch (e) {
        throw e
    }
}
