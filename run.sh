#!/bin/sh

cd truffle
echo "Deploying your contract..."
truffle migrate
cd ..
echo "Starting frontend server..."
serve -s build