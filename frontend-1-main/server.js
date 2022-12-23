const express = require("express");
const compression = require('compression');
const path = require("path");
const fs = require("fs");
const app = express();
const httpPort = process.env.PORT || 10026;
app.use(compression());
 // Additional Configuration
// const shouldCompress = (req, res) => {
//   if (req.headers['x-no-compression']) {
//     // Will not compress responses, if this header is present
//     return false;
//   }
//   // Resort to standard compression
//   return compression.filter(req, res);
// };
// // Compress all HTTP responses
// app.use(compression({
//   // filter: Decide if the answer should be compressed or not,
//   // depending on the 'shouldCompress' function above
//   filter: shouldCompress,
//   // threshold: It is the byte threshold for the response 
//   // body size before considering compression, the default is 1 kB
//   threshold: 0
// }));
app.use(express.static(path.join(__dirname, "dist")));
app.use((req, res) => {
  fs.readFile(
    `${path.join(__dirname, "dist")}/index.html`,
    "utf-8",
    (err, content) => {
      if (err) {
        console.log('We cannot open "index.html" file.');
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });

      res.end(content);
    }
  );
});
app.listen(httpPort, () => console.log(`Running on PORT : ${httpPort}`));
