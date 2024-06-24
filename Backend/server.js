const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/download', (req, res) => {
    const { url } = req.body;
    const targetDirectory = 'C:/Users/asus/Desktop/';
    const defaultFileName = 'downloaded_file';

    if (!url || !targetDirectory) {
        return res.status(400).json({ message: "url not get" });
    }

    const httpClient = url.startsWith('https') ? https : http;

    httpClient.get(url, (response) => {
        if (response.statusCode !== 200) {
            return res.status(response.statusCode).json({ message: 'Error downloading file' });
        }

        let contentDisposition = response.headers['content-disposition'];
        let fileName = defaultFileName;
        let fileExtension = '.unknown';

        if (contentDisposition) {
            let matches = contentDisposition.match(/filename="(.+)"/);
            if (matches && matches[1]) {
                fileName = matches[1];
            } else {
                fileName = defaultFileName + fileExtension;
            }
        } else {
            fileName = defaultFileName + fileExtension;
        }

        const targetPath = path.join(targetDirectory, fileName);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });

        const writer = fs.createWriteStream(targetPath);
        response.pipe(writer);

        writer.on('finish', () => {
            res.status(200).json({ message: 'File downloaded successfully' });
        });

        writer.on('error', (error) => {
            res.status(500).json({ message: 'Error writing file' });
        });
    }).on('error', (error) => {
        res.status(500).json({ message: 'Error downloading file' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
