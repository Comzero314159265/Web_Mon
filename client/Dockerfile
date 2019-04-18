FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/server
RUN npm install
EXPOSE 8888
CMD ["npm","run","serve"]