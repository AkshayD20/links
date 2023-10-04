const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const cors = require('cors');  // Assuming you've already added CORS

const app = express();
const PORT = 3000;

app.use(cors());  // Use the CORS middleware if added

function extractExcelLinks() {
    try {
        const workbook = XLSX.readFile('F:/GitDashbord/links/links.xlsx');
        const sheetNames = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log("Extracted links from Excel:", data);  // Log the extracted data
        return data;
    } catch (err) {
        console.error('Error reading or processing the excel file:', err);
    }
}

// Extract and log the links when the server starts
extractExcelLinks();

// API endpoint to fetch Excel data
app.get('/getExcelData', (req, res) => {
    const data = extractExcelLinks();
    if (data) {
        res.json(data);
    } else {
        res.status(500).send('Error reading the excel file.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
