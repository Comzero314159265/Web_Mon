FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY client/ /usr/src/app
WORKDIR /usr/src/app/client
RUN npm install
EXPOSE 8888
CMD ["npm","run","serve"]