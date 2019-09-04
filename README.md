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
* Basic authentication using JWT
* Standardized error handling for api calls
* Jest basic configuration
* Domain unit tests

## Coming up soon

* Integration tests
* Logger
* Mail system through message queuing
* Nginx or Traefik configuration for the server
* Basic authorization with roles

### Discarded

* Config per environment (I think that dotenv might be a cleaner and better solution)
