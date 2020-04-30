export const { TOKEN_PASSWORD, TOKEN_EXPIRY } = process.env
export const tokens = {
  access: {
    name: 'ACCESS_TOKEN',
    expiry: TOKEN_EXPIRY || '1d',
  },
}

export enum roles {
  ADMIN = 'ADMIN',
  CATERER = 'CATERER',
  USER = 'USER',
}
