#!/bin/sh
geoipupdate -v
cron start
node index.js