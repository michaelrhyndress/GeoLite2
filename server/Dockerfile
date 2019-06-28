#Server and Database
FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
        cron \
        curl \
        software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Get Nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

# Get geoipupdate
VOLUME /usr/share/GeoIP
RUN add-apt-repository ppa:maxmind/ppa
RUN apt-get update && apt-get install -y \
        geoipupdate \
    && rm -rf /var/lib/apt/lists/*

COPY GeoIP.conf /etc/GeoIP.conf
#create cronjob
# COPY scripts/update.sh /etc/cron.daily

# Init api
WORKDIR ./usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x ./entrypoint.sh

EXPOSE 8081
ENTRYPOINT ["./entrypoint.sh"]
CMD ["cron"]