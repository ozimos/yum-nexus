# syntax = docker/dockerfile:1.0-experimental

#  graphql-request@2.1.0-next.1: The engine "node" is incompatible with this module. Expected version "10.x || 12.x || 14.x". Got "13.14.0"
# build tag yum-nexus-slim
# FROM node:13.14.0-buster-slim

# alpine does not work at the moment
# https://github.com/prisma/specs/blob/master/binaries/Readme.md#linux-distributions-and-versions
# https://github.com/prisma/prisma/issues/702
# https://buildkite.com/prisma/binary-testing/builds/52

# comment out the RUN command if trying either of the alpine images below

# build tag yum-nexus-node14
# node 14 has issues
# https://github.com/nodejs/node/issues/33263
# https://github.com/prisma/prisma/issues/2361
# FROM node:14.4.0-alpine3.12

# build tag yum-nexus-node13
# FROM node:13.14.0-alpine3.12

# build tag yum-nexus-node12
FROM node:12.18.0-alpine3.12

# RUN apt-get -qy update && apt-get -qy install openssl
RUN apk update && apk add openssl-dev libssl1.1
WORKDIR /usr/src/app
COPY package.json .
COPY .npmrc .
ADD https://binaries.prisma.sh/master/latest/linux-musl/query-engine.gz ./query-engine.gz
ADD https://binaries.prisma.sh/master/latest/linux-musl/migration-engine.gz ./migration-engine.gz
RUN gunzip query-engine.gz
RUN gunzip migration-engine.gz
RUN chmod +x query-engine
RUN chmod +x migration-engine
ENV PRISMA_QUERY_ENGINE_BINARY=./query-engine
ENV PRISMA_MIGRATION_ENGINE_BINARY=./migration-engine
RUN npm install

EXPOSE 4000

CMD [ "npm", "start" ]

COPY . .

RUN chmod 755 /usr/src/app/build.sh
RUN --mount=type=secret,id=envvars /usr/src/app/build.sh
