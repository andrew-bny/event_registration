const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const filePath = "C:/Windows_/Documents/PYTHON_VSC/HTML/event_registrations.csv";

// Ensure CSV file exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "Name,Email,Event\n");
}

// Function to check for duplicates
function isDuplicate(name, email) {
    const data = fs.readFileSync(filePath, "utf8").split("\n");
    
    for (let i = 1; i < data.length; i++) {  // Skip the first row (headers)
        let row = data[i].split(",");
        if (row.length >= 2 && row[0] === name && row[1] === email) {
            return true; // Duplicate found
        }
    }
    return false; // No duplicate
}

// Handle registration request
app.post("/save", (req, res) => {
    const { name, email, event } = req.body;

    if (!name || !email || !event) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (isDuplicate(name, email)) {
        return res.status(409).json({ message: "This user is already registered!" });
    }

    const csvLine = `${name},${email},${event}\n`;

    try {
        fs.appendFileSync(filePath, csvLine);
        res.json({ message: "Registration saved successfully!" });
    } catch (error) {
        console.error("Error writing to file:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
