const { serveHTTP, addonBuilder } = require("stremio-addon-sdk");
const addonInterface = require("./addon");

serveHTTP(addonInterface, { port: 7000 });

console.log("Stremio add-on running at: http://localhost:7000/manifest.json");
