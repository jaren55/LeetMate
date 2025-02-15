document.addEventListener("DOMContentLoaded", async () => {
    const usersContainer = document.getElementById("users-container");

    // Fetch users from backend
    try {
        const response = await fetch("http://localhost:5000/users");
        const users = await response.json();

        users.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");

            // Split the topics string into an array, if topics exist
            const topicsArray = user.topics ? user.topics.split(", ") : [];

            userCard.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Level:</strong> ${user.level}</p>
                <p><strong>Topics:</strong> ${topicsArray.join(", ")}</p>
                <button onclick="connectWithUser('${user.name}')">Study with ${user.name}</button>
            `;

            usersContainer.appendChild(userCard);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});

// Dummy function for clicking on a user
function connectWithUser(name) {
    alert(`You selected ${name} as your study buddy!`);
}
