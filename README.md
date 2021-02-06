## About

A proof of concept project of how to build an app using various cool technologies and how to bind them together to make one seamless application using React/Context API & Hooks/NodeJS/GraphQL (Apollo)/OKTA

Data explorer is a web application that allows user securely access, share and collaborate on files with colleagues. This project is built with React(Material UI) and GraphQL (Apollo) running on NodeJS (Express), all with secure user authentication using OKTA.

## How To Run
You would need a few tools installed in your system to run this app. I will detail everything, so that the process is smooth for you.

Please make sure you have installed:
- **Docker** - The container management system. You can install docker from https://www.docker.com/. It required to be installed globally.
- **NodeJS** - Along with it npm (download [here](https://nodejs.org/en/)).

## Running Docker-Compose
Either run each part (folders UI and API) of the app separately and then interact with the application or use docker-compose to run all at once and remove complexity. All you need to do is to navigate to the root of the application and run ```docker-compose.yml up --build``` and it will spin up all the services.

After a few minutes if you ```docker ps``` you should see running containers.

Now you have web app running that you can access with the server's url ```localhost:3000```

## Login
Credentials will be provided separately.

## Authentication Work Flow
![okta_auth_flow](https://user-images.githubusercontent.com/13107220/106152537-8bc02900-614b-11eb-8841-99737d0b5ac2.png)

## Performance
The performance score is calculated by Lighhouse:

<img width="728" alt="performance" src="https://user-images.githubusercontent.com/13107220/106156651-ccba3c80-614f-11eb-9737-b3fdedd5c5f9.png">

## Supported Browsers
Tested on Chrome only.

## Tests
Tests can be run locally:
```npm test```

## Directory Structure
Skeleton of the app:

```bash
├── data_explorer
│   ├── api                     # node/graphQl
│   │   └── src
│   │   |   ├── models          # static data
│   │   |   ├── resolvers
│   │   |   ├── schema
│   │   |   ├── index.js        # entry point
│   │   |   ├── Dockerfile
│   │   |   └── package.json
│   ├── ui
│   │   └── src
│   │   |   ├── __tests__
│   │   |   ├── context
│   │   |   ├── data            # static data for tests
│   │   |   ├── pages
│   │   |   |   ├── body        # grid
│   │   |   |   ├── header
│   │   |   |   ├── nav         # left navigation
│   │   |   |   ├── index.js
│   │   |   |   └── messages.js # common user messages used in test and app
│   │   |   ├── store           # context api
│   │   |   ├── utils           # common functionality
│   │   |   ├── App.js
│   │   |   ├── config.js       # app configuration params
│   │   |   ├── index.js        # entry point
│   │   |   ├── setupTests.js   # configure Enzyme for testing
│   │   |   └── theme.js        # set up app theme
│   │   ├── .env
│   │   ├── .dockerignore
│   │   ├── .eslintrc.js
│   │   ├── .Dockerfile
│   │   └── package.json
│   ├── docker-compose.yml
│   └── README.md
```