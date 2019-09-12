# Express base api

Starting point for any express api.

# Setup

**With docker**\
To start the API with everything configured just run:

```docker
docker-compose up -d
```

*The API takes 30 seconds to start because it waits MySQL to be ready :)*

\
**Without docker**
To start the API you need to install and run:

* Redis server (cache)
* MongoDB server (database)
* RabbitMQ (queue)

Then, configure the environment variables inside the .env and run:

```npm
npm start
```

## Already implemented

* App server listening on port 3000
* Environment config using dotenv
* ESLint basic configuration (based on airbnb)
* Redis connection (no auth) as singleton
* Import/exports barrel pattern with CommonJS :)
* Docker setup
* Domain-driven design
* Basic authentication using JWT
* Standardized error handling for api calls
* Jest basic configuration
* Domain unit tests
* Logger with many logging levels using Winston (includes logger request middleware)
* Mail system through message queuing (Nodemailer + RabbitMQ)

## Coming up soon

* Nginx or Traefik configuration for the server
* Basic authorization with roles
* Integration tests

### Discarded

* Config per environment (I think that dotenv might be a cleaner and better solution)
