#!/bin/sh

ganache-cli -p 7545 -h 0.0.0.0 &
# netstat -lnt | awk '$6 == "LISTEN" && $4 ~ /\.7545$/'
sleep 5
cd truffle
echo "Deploying your contract..."
truffle migrate
cd ..
echo "Starting frontend server..."
npm start