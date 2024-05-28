import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import {Keys} from '../models/index.js';
import { db } from "../db/index.js";

const SECRET = Keys.SECRET;
const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) token = req.cookies['value']
  return token;
}

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const id=jwt_payload.sub
    try {
      const { rows } = await db.query(
        'SELECT id, email FROM users WHERE id = $1',
        [id]
      )

      if (!rows.length) {
        throw new Error('401 not authorized')
      }

      let user = { id: rows[0].id, email: rows[0].email }

      return done(null, user)
    } catch (error) {
      console.log(error.message)
      done(null, false)
    }
  })
)