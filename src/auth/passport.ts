
import { env } from '../env';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import {Container} from 'typedi';
import {AuthService} from './AuthService';
import {Connection} from 'typeorm';
import {Application} from 'express';

export function passportLoader(expressApp: Application, connection: Connection): Application {
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
    const authService = Container.get<AuthService>(AuthService);
    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        }, (email, password, cb) => {
            // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
            return authService.validateUser(email, password)
                .then(user => {
                    if (!user) {
                        return cb(null, false, {message: 'Incorrect email or password.'});
                    }
                    return cb(null, user, {message: 'Logged In Successfully'});
                })
                .catch(err => cb(err));
        }
    ));
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.app.secretOrKey,
        }, (jwtPayload, cb) => {

            // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            return authService.locateUser(jwtPayload.id)
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
    return expressApp;
}
