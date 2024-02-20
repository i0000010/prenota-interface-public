# Prenota Interface

A JSON REST API built using Node and Express. The API exposes endpoints that perform various operations on the website of the Italian Consulate [prenotami.esteri.it](https://prenotami.esteri.it/). I will refer to this website as the remote server throughout this doc.

Requests to the remote server are made using axios or puppeteer. Puppeteer is generally used when a request must bypass captcha challenges on the remote server. Some forms on the consulate's website are protected using recaptcha v3, which is easily bypassed using a headless browser.

API Swagger Docs:
- [0.prenota-agent.com/docs](https://0.prenota-agent.com/docs/)
- [1.prenota-agent.com/docs](https://1.prenota-agent.com/docs/)
- [2.prenota-agent.com/docs](https://2.prenota-agent.com/docs/)
- [3.prenota-agent.com/docs](https://3.prenota-agent.com/docs/)
- [4.prenota-agent.com/docs](https://4.prenota-agent.com/docs/)


## Modules
This project contains modules that are concerned with the remote server and modules for utililities that are used by those modules.

### Prenota Modules
Modules concerned with endpoints that perform operations on the remote server are under `/src/prenota`. For example the module concerned with accounts on the remote are under `/src/prenota/accounts`, and the module concerned with reservations on the remote are under `/src/prenota/reservations`.

In general, each module contains a router.ts file with the routes that use controllers from controllers.ts.

Each module also contains a swagger.ts file that registers routes and components for the swagger doc that adheres to OpenAPI 3.0.0. The root swagger doc is built in `/src/docs/swagger.ts`

### Util Modules
Util modules mostly follow the same structure as prenota modules. There are seperate modules for axios, puppeteer (browser), redise (cache), and email (mail).

The middleware defined in the util modules is used in utils routes, as well as throughout the project. For example, middleware defined in `/src/utils/browser/middleware.ts`, are heavily used throughout the project on routes that send requests to the remote server using puppeteer. Generally, these routes bypass recaptcha v3.

## Setup
Email account.proton.me.upgrade279@passmail.net for setup instructions.