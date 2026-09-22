import { prisma } from "./prisma"

async function getAllUsers(currentUserId: number) {
    return await prisma.user.findMany({
        where: {
            id: { not: currentUserId }
        },
        select: {
            username: true,
            id: true,
            avatar: true,
            description: true
        }
    })
}

async function updateUserProfile(userId: number, data: { description?: string; avatar?: string }) {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            description: data.description,
            avatar: data.avatar
        }
    })
}

async function getUserById(userId: number) {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
            description: true,
            createdAt: true
        }
    });
}
export { getAllUsers, updateUserProfile, getUserById }