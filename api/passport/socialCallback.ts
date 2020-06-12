import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const socialCallback = (socialId: string) => (accessToken, refreshToken, profile, cb) => {
  return prisma.user
    .findOne({
      where: {
        [socialId]: profile.id,
      },
    })
    .then((result) => {
      if (result) {
        const { password: savedPassword, ...matchingUser } = result
        return cb(null, matchingUser)
      }

      const newUser = {
        [socialId]: profile.id,
        firstName: profile.name.givenName || profile.displayName.split(' ')[0] || profile.username,
        lastName: profile.name.familyName || profile.displayName.split(' ')[1],
        email: profile.emails && profile.emails[0] && profile.emails[0].value.toLowerCase(),
      }
      return prisma.user
        .create({ data: newUser })
        .then(({ password, ...user }) => {
          return cb(null, user)
        })
        .catch(function (err) {
          if (!err.message.includes('Unique constraint failed on the fields: (`email`)')) {
            cb(err)
          }
          return prisma.user
            .findOne({
              where: {
                email: newUser.email,
              },
              select: { id: true },
            })
            .then(({ id }) => {
              return prisma.user.create({ data: { id, ...newUser } }).then(({ password, ...user }) => {
                return cb(null, user)
              })
            })
        })
    })
    .catch(function (err) {
      cb(err)
    })
}
