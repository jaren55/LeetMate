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
                <p><strong>Timezone:</strong> ${user.timezone}</p>
                <p><strong>Level:</strong> ${user.level}</p>
                <p><strong>Topics:</strong> ${topicsArray.join(", ")}</p>
                <button class="connect-btn">Request to study with ${user.name}</button>

                <div class="popup" style="display:none;">
    <div class="popup-content">
        <span class="close-btn">&times;</span>
        <h2>Study with ${user.name}</h2>
        <label for="date">Preferred Date:</label>
        <select id="date" name="date">
            <option value="2025-02-16">February 16, 2025</option>
            <option value="2025-02-17">February 17, 2025</option>
            <option value="2025-02-18">February 18, 2025</option>
            <!-- Add more dates as needed -->
        </select>
        <br><br>
        
        <label for="time">Preferred Time:</label>
        <select id="time" name="time">
            <option value="9am">9:00 AM</option>
            <option value="12pm">12:00 PM</option>
            <option value="3pm">3:00 PM</option>
            <option value="6pm">6:00 PM</option>
            <!-- Add more time slots as needed -->
        </select>
        <br><br>
        
        <button id="send-request">Send Request</button>
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