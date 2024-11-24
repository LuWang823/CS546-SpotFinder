const signUp = async (name,email,password) => {
    try {
        // Send credentials to the backend
        const response = await fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password })
        });
    
        if (response.ok) {
            const data = await response.json();
            const id = data.id;
            const code = data.code;
            localStorage.setItem("id", id);
            localStorage.setItem("verificationCode", code);
        } else {
            // Show error message if login failed
            throw new Error('Invalid name, email, or password');
        }
    } catch (e) {
        throw e
    }
}