# dedupe-csv

This repo was created as a solution to the Kevala Interview Homework problem forwarded by Jake Gordon on 1/18/2021.

To run the code, check out the repository, then do npm install.

You can run from the command line:

node app.js file="./MOCK_DATA.csv" method=email

MOCK_DATA.csv is a sample file I generated at mockaroo.com, with a few edits to make some rows duplicates. To test another file, you can provide its path instead. The output will be written to the same directory with the extension ".out", so the directory needs to be writable.

method is one of: "email"|"phone"|"email_or_phone"
