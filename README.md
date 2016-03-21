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

2. Add your Google Civic Api credential as 'google_key' and your Lob Api credential as 'lob_key' at './server/config/credential.json'

## Development

```sh
$ npm run dev
```
Go to http://localhost:3000
Client-side development with react-hot-transform

## Production

1. Build the client-side application to static for production
```sh
$ npm run build
```

2. Build the client-side application for production
```sh
$ npm run start
```

3. Go to http://localhost:3000

## Test
```sh
$ npm run test
```

## Note

+ Development port: http://localhost:3000

+ API route: POST http://localhost:3000/api

+ ES6 syntax for client app and test, and ES5 syntax for server app.

+ Running on Koa (Backend Server / API) and React (Frontend)


## TODO

+ Add css

+ Allow more words on the lob letter

+ Change form to redux-form

+ Fix deprecation issue from the 'formsy-material-ui' library