require("dotenv").config();

const http = require('http');

const fs = require('fs');

const path = require('path');



const server = http.createServer((req, res) => {
    let filePath = (req.url === '/') 
    ? path.join(__dirname, "public", "index.html")
    : path.join(__dirname, "public", req.url);



    const extname = path.extname(filePath);

    let contentType = 'text/html';

switch(extname) {
       case ".css" : contentType = "text/css";
        case ".js" : contentType = "text/js";
        case ".json" : contentType = "application/json";
        case ".png" : contentType = "image/png";
        case ".jpg" : contentType = "image/jpg";
}

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err === "ENOENT") {
                fs.readFile(
                    path.join(__dirname, "public", "404.html"),
                    (err, notFoundContent) => {
                        res.writeHead(404, {"content-type": "text/html"});
                        res.end(notFoundContent || '<h1> 404 -- Page not Found </h1>')

                    }
                )               
            }
        } else {
            res.writeHead(200, {"content-type": contentType});
            res.end(content)
        }
    })


})


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})


