FROM node:10

#RUN npm install webpack -g

WORKDIR /tmp/admin
COPY package.json /tmp/admin/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/admin
COPY . /usr/src/admin/
RUN cp -a /tmp/admin/node_modules /usr/src/admin/

#RUN webpack

ENV NODE_ENV=development
ENV PORT=3000

#CMD [ "npm", "start" ]

EXPOSE 3000