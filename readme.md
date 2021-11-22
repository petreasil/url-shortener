# Url-Shortner

A Url-shortner app that uses Angular in frontend and NodeJS backend.

## Installation

Use the [npm](https://www.npmjs.com/) to install project dependencies both for client/server.

```bash
# cd client and cd server
npm install
```

## Local usage

After downloading/cloning the project, run the following commands:

```bash
# client side
ng serve
# server side
npm run start
```

Also, you need to add your own /config/config.json inside Server Folder for Firebase SDK. More info on [Firebase](https://firebase.google.com/docs/web/setup) Docs.

## Features

The project has the following features:

- Display short url after input longUrl (Angular and Bootstrap)
- Redirect to long url when press short-url button
- Add/remove url to UI
- Server part using NodeJs and Firebase/Firestore SDK

## Future developments

- Add login route to server side

## License

[MIT](https://choosealicense.com/licenses/mit/)
