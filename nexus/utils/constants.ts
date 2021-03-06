export const { TOKEN_PASSWORD, TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env

export const tokens = {
  access: {
    name: 'ACCESS_TOKEN',
    expiry: TOKEN_EXPIRY || '1d',
  },
  refresh: {
    name: 'REFRESH_TOKEN',
    expiry: REFRESH_TOKEN_EXPIRY || '7d',
  },
}

export enum Role {
  ADMIN = 'ADMIN',
  CATERER = 'CATERER',
}

export const whitelist = [/localhost:3000$/, /yum-nexus[\w-]?\.vercel\.app/]
