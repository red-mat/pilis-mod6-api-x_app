import { JWT_SECRET_KEY } from "@/shared/environment";
import { UserEntity } from "@/users/core";
import { UserData } from "@/users/core/types";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

export default new Strategy(options, async (payload: UserData, done) => {
  try {
    const { id } = payload;
    const userEntity = await UserEntity.countBy({ id, isDeleted: false });

    if (!userEntity) return done(null, false);

    const user = payload;
    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
});
