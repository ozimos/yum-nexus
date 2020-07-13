# yum-nexus

An ecommerce catering application to enable caterers to list meals and customers to order them.

[Production app](https://yum-nexus.vercel.app)

## Technologies
Catering App built with [Nexus](https://nexusjs.org/), [MaterialUI](https://material-ui.com/), [NextJS](https://nextjs.org/) and hosted on [Vercel](https://vercel.com)



## Setup
Further instructions on how to setup a Nexus and NextJS project can be found [here](https://github.com/graphql-nexus/examples/blob/master/with-nextjs-and-vercel-and-plugins-prisma/README.md) and [here](https://nxs.li/integration/nextjs)

Setup a Postgres Database and note the connection url.
Setup [direnv](https://direnv.net/) on your shell
Add a `.env` file to the prisma folder.
The file should contain an entry for your database connection url in the format below

    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nexus-test

The DATABASE_URL along with any other secret environment variables as found in the `.env.examples` file should also be added to a `.env.local` file that you will create in the project root directory.

You can find the non-secret environment variables in the .env file

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
