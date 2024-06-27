import crypto from 'crypto';

export async function stringToHash(str) {
    const hash = crypto.createHash('sha256', process.env.HASH_KEY)

    hash.update(str)
    
    const hashAsString = hash.digest('hex')

    return hashAsString
}