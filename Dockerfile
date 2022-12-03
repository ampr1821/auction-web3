FROM node:16.17.1-alpine

WORKDIR /app
COPY . /app

RUN chmod +x run.sh
RUN npm install -g truffle@v5.6.1 ganache
RUN npm install .
ENTRYPOINT ["/app/run.sh"]