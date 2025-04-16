document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var selectedEvent = document.getElementById("event").value;

    if (name === "" || email === "" || selectedEvent === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Send data to Node.js backend
    fetch("http://localhost:3000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, event: selectedEvent }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("registrationForm").reset();
    })
    .catch(error => console.error("Error:", error));
});
