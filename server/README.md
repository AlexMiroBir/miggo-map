

## Available Scripts

In the project directory, you can run:
### `npm install`

Runs all required node modules intallations.

### `npm run dev`

Runs the server in the development mode.\
Server will be started by default: http://localhost:3008

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

When Server is starting this command will start unit tests and will write
a report to console.


API ENDPOINT:

GET http://localhost:3008/location \
RETURNS: JSON array of location objects \
EXAMPLE OF RESPONSE: \
[ \
... \
{ \
        "latitude": 44.2973, \
        "longitude": -62.0752, \
        "timestamp": "2024-10-11T17:54:52.000Z", \
        "height": 415, \
        "velocity": 2000, \
        "period": 98.55 \
}, \
... \
] \

