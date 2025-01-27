import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';


export const createUser = async (data: Prisma.UserCreateInput ) => {
    if(!data.email || !data.password) {
        return false;
    } else {
        try {
            const newUser = await prisma.user.create({ data });
            return newUser;
        } catch (error) {
            return false;
        }
    }
    
    // try { 
    //     const newUser = await prisma.user.create({ data });
    //     return newUser;
    // } catch (error) {
    //     return false;
    // }    
}

export const listAllUsers = async () => {
    return await prisma.user.findMany({});    
}

export const listUsers = async (email: string) => {
    if(email) {
        const trackUser = await prisma.user.findMany({
            where: {
                email: {
                    startsWith: email,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                status: true,
                role: true,
                email: true
            }
        });
        return trackUser;
    } else {
        return false;
    }
 }

 export const updateUser = async (email: string) => {
    const updateRole = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            role: 'ADMIN'
        }
    });
    return updateRole;
 }

 export const deleteUser = async (email: string) => {
    try {
        await prisma.user.delete({
            where: {
                email: email
            }
        });
        return true;
    }  catch (error) {
        return false;
    } 
 }