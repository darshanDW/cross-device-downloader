const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const cors = require('cors');

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/download', (req, res) => {
    const url = req.body;
    const targetDirectory = 'C:/Users/asus/Desktop/';
    const defaultFileName = 'downloaded_file';
    try {






        if (!url || !targetDirectory) {
            console.log("URL or targetDirectory is not found");
            res.status(400).json({ message: "url not get" })

        } else {


            http.get(url, (response) => {
                console.log(response);
                if (response.statusCode !== 200) {
                    console.log(1);
                    console.log("Error downloading: Status Code ", response.statusCode);
                    res.status(response.statusCode).json({ message: 'Error downloading file' });
                    return;
                }

                let contentDisposition = response.headers['content-disposition'];
                let fileName = defaultFileName;
                let fileExtension = '.unknown';

                if (contentDisposition) {
                    let matches = contentDisposition.match(/filename="(.+)"/);
                    console.log(matches[1]);
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
                    console.log("Downloaded file saved to:", targetPath);
                    res.json({ message: 'File downloaded successfully' });

                });

                writer.on('error', (error) => {
                    console.error('Error writing file:', error);
                    res.status(500).json({ message: 'Error writing file' });

                });
            }).on('error', (error) => {
                console.log(1);
                console.error('Error downloading file:', error);
                res.status(500).json({ message: 'Error downloading file' });

            });
        }








    } catch (err) {
        res.status(500).json({ message: 'Error processing file' });
        console.log(err)
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
//local host server remaina active
//need download option in chrome where should  i add