GeoLite2
=====================

This is a simple web API that echoes out latitude and longitude information for a given IP. The API takes a single IPv4 Address parameter and utilizes the  maxmind GeoLite2 database to output a JSON blob of the geolocation information.

The "server" container fetches the latest GeoLite2 db upon creation and serves a light weight API that queries it. A cron job runs every Wednesday to update the GeoLite2 db.

There is a "client" container that is serving a React app with Nginx which has a simple search bar that sends a request to the API endpoint.

DEV
-------

To run everything:
    (DEV) docker-compose -f docker-compose.yml up --build -d
    (PROD) Config: docker-compose -f docker-compose.prod.yml up --build -d

To run a specific container:
    cd ./client
    docker build -f Dockerfile.dev -t client-dev .
    docker run -p 80:80 client-dev

TESTING
-------

The client utilizes the default React testing framework that runs when running docker-compose. The results can be found in the console upon starting the container.

The backend api can be tested by running docker-compose to start a local server and executing:
        npm install mocha -g
        cd ./server
        mocha


Deploy
-------

    docker build -t mrhyndress/geoip2-client:latest ./client
    docker push mrhyndress/geoip2-client:latest

    docker build -t mrhyndress/geoip2-server:latest ./server
    docker push mrhyndress/geoip2-server:latest

    kubectl apply -f deploy.yaml

Usage
-------

You must have docker, kubectl, docker-compose, node, and npm locally.
GET request to http://localhost:8081?ip={{ IPv4 Address }}
Front end client: http://localhost:80


Troubleshooting
-------

IF:
    Bind for 0.0.0.0:80 failed: port is already allocated.
THEN:
    kubectl delete all --all
    docker stop $(docker ps -aq)
    docker rm $(docker ps -aq)
