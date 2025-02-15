document.addEventListener("DOMContentLoaded", async () => {
    const usersContainer = document.getElementById("users-container");

    try {
        const response = await fetch("http://localhost:5000/users");
        const users = await response.json();

        users.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");

            const topicsArray = user.topics ? user.topics.split(", ") : [];

            userCard.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Level:</strong> ${user.level}</p>
                <p><strong>Topics:</strong> ${topicsArray.join(", ")}</p>
                <button class="connect-btn">Request to study with ${user.name}</button>

                <div class="popup" style="display:none;">
                    <div class="popup-content">
                        <span class="close-btn">&times;</span>
                        <h2>Popup Title</h2>
                        <p>This is a simple popup!</p>
                    </div>
                </div>
            `;

            usersContainer.appendChild(userCard);

            // Event listener for "connect" button
            userCard.querySelector('.connect-btn').addEventListener('click', () => connectWithUser(user.name));

            // Event listener for "open popup" button
            const popupBtn = userCard.querySelector('.connect-btn');
            const popup = userCard.querySelector('.popup');
            const closeBtn = userCard.querySelector('.close-btn');

            popupBtn.addEventListener('click', () => {
                popup.style.display = 'block';
            });

            closeBtn.addEventListener('click', () => {
                popup.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target == popup) {
                    popup.style.display = 'none';
                }
            });
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});

function connectWithUser(name) {
    alert(`You selected ${name} as your study buddy!`);
}