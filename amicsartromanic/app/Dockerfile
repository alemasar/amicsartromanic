FROM node:10

#RUN npm install webpack -g

WORKDIR /tmp/app
COPY package.json /tmp/app/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/app/node_modules /usr/src/app/

#RUN webpack

ENV NODE_ENV=development
ENV PORT=8080

#CMD [ "npm", "start" ]

EXPOSE 8080