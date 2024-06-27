import stringToHash from "../utils/hash.js";
import AuthRepository from "../repositories/authRepository.js";
import { db } from "../firebasekey.json";

async function authMiddleware(req, res, next){
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ message: `Unauthorized`});
    }
}

const authAsHash = await stringToHash(authorization);

const isValid = await AuthRepository.validateToken(db, authHash);

if (!isValid && req.path !== '/auth/create-token') {
    return res.status(401).send({ message: `Unauthorized`});
}

next();

export default authMiddleware;