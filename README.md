Richard, remember to remove "--openssl-legacy-provider" from your client's package.json file so it reads:
    "start": "react-scripts start"

Changes done:
    - refactored controllers (authController & tripController) to use promise format
    - corrected HTTP methods
    - renamed all 'auth' items to use "user" instead;