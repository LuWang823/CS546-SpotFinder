export const signUp = async (name, email, password) => {
  try {
    // Send credentials to the backend
    const response = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const id = data.id;
      const code = data.code;
      localStorage.setItem("id", id);
      localStorage.setItem("verificationCode", code);
    } else {
      // Show error message if login failed
      throw new Error("Invalid name, email, or password");
    }
  } catch (e) {
    throw e;
  }
};

export const refreshToken = async () => {
  if (localStorage.refreshToken) {
    try {
      // Send credentials to the backend
      const response = await fetch("/api/v1/sessions/refresh", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-refresh": localStorage.refreshToken,
        },
      });

      if (response.ok) {
        let { data } = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
      }
    } catch (e) {
      // do nothing
    }
  }
};
