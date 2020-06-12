# yum-nexus

Catering API built with NexusJS

A GraphQL API to enable caterers to list meal and people to order them

## Setup

Setup a Postgres Database and note the connection url.
Add a `.env` file to the prisma folder.
The file should contain an entry for your database connection url in the format below

    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nexus-test

Other required environment variables as found in the `.env.examples` file should be added to a `.env` file in the project root directory.

Run the following commands

    - yarn reset
    - yarn seed
    - yarn dev

Remember to run `yarn migrate:save` followed by `yarn migrate` for any schema.prisma changes that affect the underlying database. Or you can start your database from a clean slate by doing the following:

    - delete the prisma/migrations folder
    - run
         yarn migrate:save
         yarn reset
         yarn seed

### Begin developing!!!

## Build Instructions

Use [Docker Buildkit](https://docs.docker.com/develop/develop-images/build_enhancements/#new-docker-build-secret-information) for the docker image

### To Build

The envvars file should be in your .gitignore to avoid leaking secrets into your build

```bash
DOCKER_BUILDKIT=1 docker build -t image-tag --secret id=mysecret,src=./envvars .
```

### To Run

```bash
docker run -it --env-file=./.env -p 127.0.0.1:4000:4000 image-tag
```

or

```bash
docker run --env-file=./.env -p 127.0.0.1:4000:4000 image-tag
```

Backend hosted on AWS Elastic Beanstalk Managed Node Image at this time

Non secret environment variables added directly to Elastic Beanstalk Environment config
credential environment variables are retrieved from S3 Bucket

The project may transition to Docker Container on Elastic Beanstalk in future
