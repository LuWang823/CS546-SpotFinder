document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="color-scheme"]');

    // Initialize theme based on saved preference
    const savedTheme = localStorage.getItem("theme") || "auto";
    document.body.classList.add(savedTheme);
    document.querySelector(`#color-scheme-${savedTheme}`).checked = true;

    // Update theme when a radio button is clicked
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", () => {
            const theme = radio.value;

            // Remove existing theme classes
            document.body.classList.remove("light", "dark", "auto");

            // Add selected theme class
            document.body.classList.add(theme);

            // Save the preference
            localStorage.setItem("theme", theme);
        });
    });
});