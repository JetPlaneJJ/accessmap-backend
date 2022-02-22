# Summary
- accessmap-backend is the backend server for the AccessMap application.
- It is written in TypeScript.
- Stores and manipulates data in a PostgresSQL Database.

# Usage
- npm start to start the server locally

# Notes
- keycloak.json containing Keycloak client credentials must be put in src folder. This file
can be installed in the Keycloak Admin Console.

# Sources consulted
- Keycloak with Node JS: https://medium.com/devops-dudes/securing-node-js-express-rest-apis-with-keycloak-a4946083be51
- Keycloak connecting Frontend and Backend: https://medium.com/devops-dudes/secure-front-end-react-js-and-back-end-node-js-express-rest-api-with-keycloak-daf159f0a94e
- Private URI Schemes for Redirect (OAuth2.0): https://www.rfc-editor.org/rfc/rfc8252#section-7 