FROM node:14

WORKDIR /payments

# COPY package.json and package-lock.json files
COPY package.json package-lock.json ./
COPY package*.json ./

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

RUN npm install

COPY . .

CMD npm run dev