FROM node:alpine

WORKDIR /usr/src/app
COPY . .

RUN apk add --no-cache git gcc g++ python make

RUN git clone --mirror https://nazarov-mi@bitbucket.org/nazarov-mi/git-test-repository.git local-repository/.git

RUN npm config set loglevel warn
RUN npm install
RUN npm run webpack:build

CMD npm run start