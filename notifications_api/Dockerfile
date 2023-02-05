FROM node:14
ENV  NODE_ENV=dev

WORKDIR /notifications

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD [ "node", "server.js"]