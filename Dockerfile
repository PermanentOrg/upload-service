FROM node:18-alpine

LABEL name="upload-service" version="1.0" maintainer="Permanent Legacy Foundation <https://permanent.org>"

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
