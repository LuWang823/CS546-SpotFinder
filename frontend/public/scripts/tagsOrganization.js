const predefinedTags = ["Technology", "Science", "Art", "Music", "Sports", "Travel"];

        // Function to display hardcoded tags
        function displayTags(tags) {
            const container = document.getElementById("tag-container");
            tags.forEach(tag => {
                const tagElement = document.createElement("button");
                tagElement.textContent = tag;
                tagElement.classList.add("tag");
                container.appendChild(tagElement);
            });
        }

        // Call the function to display tags
        displayTags(predefinedTags);