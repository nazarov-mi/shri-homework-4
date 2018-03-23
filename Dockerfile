FROM node:slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm config set loglevel warn
RUN npm install
RUN npm run build

CMD npm run start