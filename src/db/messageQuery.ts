import { prisma } from "./prisma"

async function createMessage(content: string, senderId: number, receiverId: number) {
    return await prisma.message.create({
        data: {
            content,
            senderId,
            receiverId
        }
    })
}

async function getConversation(userA: number, userB: number) {
    return await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderId: userA,
                    receiverId: userB
                },
                {
                    senderId: userB,
                    receiverId: userA
                }
            ]
        },
        include: {
            sender: {
                select: { id: true, username: true, avatar: true }
            },
            receiver: {
                select: { id: true, username: true, avatar: true }
            }
        },
        orderBy: { createdAt: "asc" }
    })
}

export { createMessage, getConversation }