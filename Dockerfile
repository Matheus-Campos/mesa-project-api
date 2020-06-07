FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm i -g @adonisjs/cli

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "adonis", "serve", "--dev" ]
