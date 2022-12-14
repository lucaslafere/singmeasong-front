## 🏁 Rodando a aplicação

This project was created with [Create React App](https://github.com/facebook/create-react-app), so be sure you are in [Node.js] latest stable version (https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository in your machine:

```
git clone https://github.com/lucaslafere/singmeasong-front
```

## E2E tests

Run the following command to install the dependencies.

```
npm install
```

Then, after setting up your config in .env as in .env.example, go to your backend folder (found at: https://github.com/lucaslafere/singmeasong-api) and after setting all the configs correctly, as stated in the repository README, run:

```
npm run dev
```

Then, come back to your frontend aplication and run:

```
npm run start
```

To run the e2e tests, run the following command to initialize cypress:

```
npx cypress open
```

Then, in the window that was opened, select "E2E Testing", pick the browser you like the most, and select the tests already there.

PS: The tests use http://localhost:5000 as the default API address for testing. If you do not run the server API on this PORT, you MUST change it in cypress -> support -> commands, as the tests aren't currently supporting .env settings.
