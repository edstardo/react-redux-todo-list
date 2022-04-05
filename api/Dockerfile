FROM node:17-alpine3.14

WORKDIR /code

COPY package* .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm" , "start"]