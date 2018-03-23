FROM node:slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN git clone https://github.com/vuejs/vue.git local-repository
RUN cd ./local-repository
RUN for b in `git branch -r | grep -v 'HEAD\|master'`; do git branch --track ${b##*/} $b; done
RUN cd ../

RUN npm config set loglevel warn
RUN npm install
RUN npm run build

CMD npm run start