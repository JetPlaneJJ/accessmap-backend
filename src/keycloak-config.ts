// Keycloak configuration file
// Note: keycloak automatically searches for a keycloak.json file, retrieved from the 
// Keycloak Admin Console for the client.
import { Express } from "express-serve-static-core";
import Keycloak from "keycloak-connect";

let keycloak;
export default function initKeycloak(app: Express, session: typeof import("express-session")) {
    if (keycloak) {
        console.log("Existing Keycloak instance.");
    } else {
        console.log("Initializing Keycloak...")
        var memoryStore = new session.MemoryStore();
        keycloak = new Keycloak({store: memoryStore});
    }
    return keycloak;
}

export function getKeycloak() {
    if (!keycloak){
        console.error('Keycloak has not been setup. Please initialize Keycloak first.');
    }
    return keycloak;
}