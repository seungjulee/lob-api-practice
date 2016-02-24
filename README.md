# Lob API Practice

This project sends a letter to your local house representatives using Lob API.
The client sends a POST http request with appropriate data to apiserver.js at
http://localhost:3000/api, which sends a query to Google Civic API to retrieve
the appropriate politician's address. This retrieve address is used on
fetchLetterToLob.js to send a letter via Lob API.


## Installation

1. Install required dependencies.
```sh
$ npm install
```

2. Build the client-side application to static for production
```sh
$ npm run build
```

3. Build the client-side application for production
```sh
$ npm run start
```

4. Go to http://localhost:3000

## Development

Client-side development with react-hot-transform
```sh
$ npm run dev
```

Add your Google Civic Api credential as 'google_key' in './server/config/credential.json',
and your Lob Api credential as 'lob_key' in './server/config/credential.json'.

## Test

Client-side development with react-hot-transform
```sh
$ npm run test
```

## Note

+ Development port: http://localhost:3000

+ API route: POST http://localhost:3000/api

+ ES6 syntax for client app and test, and ES5 syntax for server app.

+ Running on Koa (Backend Server / API) and React (Frontend)

+ Due to deprecation on some library of formsy-material-ui, it shows a warning sign
for some react library. It does not interfere any functionality of the current build.
However, should a problem arise, formsy-material-ui and formsy-react should be
replaced with other compatible form library for extended uses.

## TODO

+ Add css

+ Allow more words on the lob letter
