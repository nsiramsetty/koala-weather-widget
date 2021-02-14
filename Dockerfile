FROM node:10-alpine

# install git
RUN apk update && apk upgrade && apk add --no-cache bash git openssh

# install simple http server for serving static content
RUN npm install -g http-server

# set product environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG BUILD_NO="123"
ENV BUILD_NO=${BUILD_NO}
ARG DOCKER_ENV="dev"
ENV DOCKER_ENV=${DOCKER_ENV}

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

RUN npm rebuild node-sass

# build app for production with minification
RUN npm run build --buildno=${BUILD_NO} --env=${DOCKER_ENV}

RUN adduser -u 999 -S adt
USER adt

EXPOSE 8080
CMD [ "node", "app.js.js"]
