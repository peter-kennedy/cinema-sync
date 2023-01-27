import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import query from '../models/model';

type User = {
  id: string;
};

declare module 'passport' {
  interface Authenticator {
    serializeUser<TID>(
      fn: (user: User, done: (err: unknown, id?: TID) => void) => void
    ): void;
  }
}

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await query(`id is ${id}`);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: 'unknown',
      clientSecret: 'unknown',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await query('find a user');
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await query('make a user');
        return done(null, user);
      } catch (err) {
        return console.error(err);
      }
    }
  )
);
