const express = require('express')
const app = express()
const port = 3000

const csv = require('csv-parser')
const fs = require('fs')
const { exit } = require('process')

const dedupe = require('./dedupe');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

  let file;
  let method;
  process.argv.slice(2).forEach(arg => {
    if (arg.substr(0, 5) === 'file=') {
      file = arg.substr(5);
    }
    if (arg.substr(0, 7) === 'method=') {
      method = arg.substr(7);
    }
  });

  const rows = [];
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', row => {
      rows.push(row);
    })
    .on('end', () => {
      const uniqueRows = dedupe(rows, method);
      const fileOut = file + '.out';

      console.log(`Total rows=${rows.length}`);
      console.log(`Unique rows by ${method}=${uniqueRows.length}`);

      let csv = 'FirstName,LastName,Email,PhoneNumber' + String.fromCharCode(10);
      uniqueRows.forEach(row => {
        csv += `${row.FirstName},${row.LastName},${row.Email},${row.PhoneNumber}` + String.fromCharCode(10);
      });

      fs.writeFile(fileOut, csv, function (err) {
        if (err) throw err;
        console.log('File written to ' + fileOut);
        exit();
      });
    });
})
