const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { generate_synthetic_data } = require('./gan_model');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('csvFile'), (req, res) => {
    res.send('CSV file uploaded successfully');
});

app.get('/generate', (req, res) => {
    try {
        // Generate synthetic data using the GAN model
        const synthetic_data = generate_synthetic_data();
        // Convert synthetic data to CSV format
        const csv_data = convert_to_csv(synthetic_data);
        // Write CSV data to a file
        fs.writeFileSync('synthetic_data.csv', csv_data, 'utf-8');
        // Send the synthetic data file as a response
        res.download('synthetic_data.csv', 'synthetic_data.csv', (err) => {
            if (err) {
                console.error('Error downloading file:', err);
            } else {
                console.log('File downloaded successfully');
            }
        });
    } catch (err) {
        console.error('Error generating synthetic data:', err);
        res.status(500).send('Internal Server Error');
    }
});

function convert_to_csv(data) {
    // Implement conversion of synthetic data to CSV format
    // Example:
    let csv = 'Column1,Column2,Column3\n';
    data.forEach(row => {
        csv += row.join(',') + '\n';
    });
    return csv;
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
