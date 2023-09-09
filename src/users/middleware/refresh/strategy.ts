import { JWT_SECRET_KEY } from "@/shared/environment";
import { User } from "@/users/core";
import { ExtractJwt, Strategy } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

interface Payload {
  id: string;
}

export default new Strategy(options, (payload: Payload, done) => {
  try {
    const { id } = payload;
    if (!id) return done(null, false);

    return done(null, id);
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
});
