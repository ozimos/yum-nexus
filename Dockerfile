# syntax = docker/dockerfile:1.0-experimental

FROM node:13.14.0-buster-slim

# alpine does not work at the moment
# https://github.com/prisma/specs/blob/master/binaries/Readme.md#linux-distributions-and-versions
# https://github.com/prisma/prisma/issues/702
# https://buildkite.com/prisma/binary-testing/builds/52

# comment out the RUN command if trying either of the alpine images below

# build tag yum-nexus-node14
# node 14 has issues
# https://github.com/nodejs/node/issues/33263
# https://github.com/prisma/prisma/issues/2361
# FROM node:14.3.0-alpine3.11

# build tag yum-nexus-node13
# FROM node:13.14.0-alpine3.11

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /usr/src/app
COPY package.json .
COPY .npmrc .
RUN npm install

EXPOSE 4000

CMD [ "npm", "start" ]

COPY . .

RUN chmod 755 /usr/src/app/build.sh
RUN --mount=type=secret,id=envvars /usr/src/app/build.sh
