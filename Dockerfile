FROM node:12-alpine

LABEL name="upload-service" version="1.0" maintainer="Permanent Legacy Foundation <https://permanent.org>"

RUN apk add gettext

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN mv ./templates/.aws /root/.aws

RUN envsubst < "/root/.aws/credentials" | tee "/root/.aws/credentials"

RUN envsubst < "/root/.aws/config" | tee "/root/.aws/config"

EXPOSE 3000

CMD [ "npm", "start" ]
