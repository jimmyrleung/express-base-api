# Express base api

Starting point for any express api.

## Already implemented

* App server listening on port 3000
* Environment config using dotenv
* ESLint basic configuration (based on airbnb)
* Redis connection (no auth) as singleton
* Import/exports barrel pattern with CommonJS :)

## Coming up soon

* Basic authentication using JWT
* Basic authorization with roles
* Standardized error handling for api calls
* Domain-driven design
* Jest basic configuration for unit and integration tests
* Nginx configuration for the server
* Logger
* Docker setup
* Mail system through message queuing

### Discarded

* Config per environment (I think that dotenv might be a cleaner and better solution)
