import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import credentials from '../config/credentials';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('Token not present');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, credentials.secret);

        const { sub } = decoded as TokenPayload;

        request.user = { id: sub };

        return next();
    } catch {
        throw new Error('invalid JWT token');
    }
}
