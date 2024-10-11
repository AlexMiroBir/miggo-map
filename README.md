ISS TRACKER

PURPOSE:
Application for tracking how ISS moved last 24 hours;

Features: 
- Updating data each 20 seconds or by "REFRESH" button click;

Restrictions:
 - The map is implemented in 2D it is impossible to draw an infinite track, the station flies around the earth. Therefore, reaching the "anti meridian" the track continues to be drawn on the left side
 - For Velocity, Period, Heigth was used mock data (not real)

![image](https://github.com/user-attachments/assets/b766c322-fab0-4650-9dba-3ad0cff73d8f)

The Project includes two parts (server+client)

Client:
React js (SPA)
Comamnd to start client: "cd client && npm run start"

Server: 
Node js, Express JS Restful API
Command to start server in dev mode: "cd server && npm run dev"
Command to start unit tests while server runs: "npm run test"

Storage: 
For storaging location history there is a JSON file in the root of server directory: location-history.json
It will be created automaticaly with first start of server
