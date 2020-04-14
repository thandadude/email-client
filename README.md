# sample email client with utilizing React, axios, flask, python and tinyDB in the backend.

To Run:
1) npm install

2) python flask-server.py

3) npm start

Pre-requisites:
python, flask, cors, json, tinyDB.

This will create the mails.json, a DB using tinyDB to load and store emails.

Few implementation details:
FrontEnd:
This App uses React with typescript for strong type checking.
I've used React Hooks, useState, useEffect and useContext to set, get and send mails across components.
It uses interfaces for async action event handling. data is handled in json.
Get Mail, Send Mail and Read Receipts are handled by sending the http request via axios to the backend.
Send mail validations include basic email, subject and attachement size validation based on alert & warning messeges.
Found enzyme to be useful for testing.
More unit tests to be added.

Backend:
Backend is written in python, installed on flask-server.
components like flask cors, jsonify, json and tinyDB is used.
Not much validation is handled such as json validation, accounts and email addresses...etc.
Attachements are kept as json base64 encoded blob in TinyDB.
Exception handling is done but not unit tests written yet.
Client 4xx and server 5xx errors are sent back on exceptions.

Limitations & Issues:
1) Send mail works well but windows refresh is needed to see that mail go into sent items folder. mails are fetched back again for display.
2) Attachements are not displayed in 'Sent' Folder.
3) Read Receipts don't work, I have added the implementation in the backend but it doesn't work ...yet.
4) Error fetching mails are not handled to display the user.


Hope it helps.
Anand.