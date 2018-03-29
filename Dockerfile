FROM node:alpine

WORKDIR /usr/src/app
COPY . .

RUN apk add --no-cache git

RUN git clone --mirror https://nazarov-mi@bitbucket.org/nazarov-mi/git-test.git local-repository/.git

RUN npm config set loglevel warn
RUN npm install
RUN npm run build

CMD npm run start