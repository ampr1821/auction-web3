FROM node:16.17.1-alpine

WORKDIR /app
COPY . /app

RUN chmod +x run.sh
RUN npm install -g truffle@v5.6.1 serve
RUN npm install .
RUN npm run build
ENTRYPOINT ["/app/run.sh"]