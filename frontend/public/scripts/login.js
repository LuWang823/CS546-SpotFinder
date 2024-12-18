  const login = async (email,password) => {
    try {
        // Send credentials to the backend
        const response = await fetch('http://localhost:3000/api/v1/sessions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password })
        });
    
        if (response.ok) {
            const data = await response.json();
            const accessToken = data.data.accessToken;
            const refreshToken = data.data.refreshToken;

            localStorage.setItem("accessToken",accessToken);
            localStorage.setItem("refreshToken",refreshToken);
            
        } else {
            // Show error message if login failed
            throw new Error('Invalid name, email, or password');
        }
    } catch (e) {
        throw e
    }
}
