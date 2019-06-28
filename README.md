GeoLite2
=====================

This is a simple web API that echoes out latitude and longitude information for a given IP. The API takes a single IPv4 Address parameter and utilizes the  maxmind GeoLite2 database to output a JSON blob of the geolocation information.


Install
-------

docker-compose -f docker-compose.yml  -f docker-compose.prod.yml up --build -d

Deploy
-------

docker build -t mrhyndress/geoip2-client:latest ./client
docker push mrhyndress/geoip2-client:latest

docker build -t mrhyndress/geoip2-server:latest ./server
docker push mrhyndress/geoip2-server:latest

Usage
-------

GET request to http://localhost:8081?ip={{ IPv4 Address }}
Front end client at http://localhost:80