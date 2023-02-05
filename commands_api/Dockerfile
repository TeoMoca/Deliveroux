FROM node:14
ENV  NODE_ENV=dev

WORKDIR /commands

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD [ "node", "server.js"] 