const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');

    fs.readFile('data.json', 'utf8', (err,data) => {
        if (err) {
            console.error(err);
            res.end('Error reading data.json');
        } else {
            try{
                const jsonData = JSON.parse(data);
                if (Array.isArray(jsonData.books)) {
                    const newsData = jsonData.books;

                    const newsHTML = newsData.map((newsItem) => {
                        return`
                        <div>
                        <h2>${newsItem.author}</h2>
                        <p>${newsItem.story}</p>
                    </div>
                    `;    
                    }).join('');
                    const htmlPage = 
                    <html>
                        <head>
                            <title>News Page</title>
                        </head>
                        <body>
                            ${newsHTML}
                        </body>
                    </html>
                    ;

                    res.end(htmlPage);
                } else {
                    res.end('Invalid data format in data.json');
                }
            } catch (jsonError) {
                console.error(jsonError);
                res.end('Error parsing data.json');
            }
        }
    });
});
server.listen(3000, () => {
    console.log('Server Listening on port No: 3000');
});