import migrate from './base';

const query = `psql ${process.env.DATABASE_URL} -f prisma/init.sql`;
migrate(query)
