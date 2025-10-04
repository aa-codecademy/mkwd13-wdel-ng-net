# Connect to the server

### To successfully connect to the server

- check the Postgres credentials in the appsettings.json and adjust username, password and the entire connection string to your current setup
- in the launchSettings.json navigate to the profile property and look for the applicationUrl value. Remove the https url from there since our app is not https secured yet (we are running it locally) and we will need the other url. That url is the api url towards which we will direct our api requests
