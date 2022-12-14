import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';
import { config, demoUser } from './config';



export function generateJWT(user: object): string {
    //Create a new JWT Payload containing
    return jwt.sign(user, config.jwt.secret);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {

    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: 'No authorization headers.' });
    }


    const token_bearer: string[] = req.headers.authorization.split(' ');
    if (token_bearer.length != 2) {
        return res.status(401).send({ message: 'Malformed token.' });
    }

    const token: string = token_bearer[1];

    return jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate. Access Denied' });
        }
        return next();
    });
}
