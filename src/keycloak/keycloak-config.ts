// Keycloak configuration file
// Note: keycloak automatically searches for a keycloak.json file,
// retrieved from Keycloak Admin Console for the client.
import session from "express-session";
import Keycloak from "keycloak-connect";

let keycloak;
export default function initKeycloak() {
    if (keycloak) {
        console.log("Existing Keycloak instance.");
    } else {
        console.log("Initializing Keycloak...")
        var memoryStore = new session.MemoryStore();
        keycloak = new Keycloak({store: memoryStore});
    }
    return keycloak;
}