import { prisma } from "./prisma"

async function createUser(userName: string, email: string, hashedPassword: string) {
    return await prisma.user.create({
        data: {
            username: userName,
            email,
            password: hashedPassword
        }
    })
}

async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
}

async function findUserByUserName(userName: string) {
    return await prisma.user.findUnique({ where: { username: userName } })
}

async function findUserByIdentifier(identifier: string) {
    return await prisma.user.findFirst({
        where: {
            OR: [
                { username: identifier },
                { email: identifier }
            ]
        }
    })
}

export { createUser, findUserByEmail, findUserByUserName, findUserByIdentifier }