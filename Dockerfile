FROM node:6
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/client
RUN npm cache clean
RUN npm install
WORKDIR /usr/src/app/server
RUN npm cache clean
RUN npm install
EXPOSE 3000
CMD ["npm","start"]