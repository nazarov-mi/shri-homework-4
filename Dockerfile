FROM node:slim

WORKDIR /usr/src/app

COPY . .

RUN npm install --quient
RUN npm run build

CMD npm start