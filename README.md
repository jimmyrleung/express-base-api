# Express base api

Starting point for any express api.

## Already implemented

* App server listening on port 3000
* Environment config using dotenv
* ESLint basic configuration (based on airbnb)
* Redis connection (no auth) as singleton
* Import/exports barrel pattern with CommonJS :)
* Docker setup
* Domain-driven design

## Coming up soon

* Standardized error handling for api calls
* Basic authentication using JWT
* Basic authorization with roles
* Jest basic configuration for unit and integration tests
* Nginx configuration for the server
* Logger
* Mail system through message queuing

### Discarded

* Config per environment (I think that dotenv might be a cleaner and better solution)
