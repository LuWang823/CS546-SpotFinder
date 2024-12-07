const verify = async (id, code) => {
    try {
        // Send credentials to the backend
        const response = await fetch(('http://localhost:3000/api/v1/users/verify/'+id+'/'+code), {
            method: 'POST',
        });
    
        if (response.ok) {
            localStorage.removeItem("verificationCode");
            localStorage.removeItem("id");
        } else {
            // Show error message if login failed
            throw new Error('Invalid name, email, or password');
        }
    } catch (e) {
        throw e
    }
}