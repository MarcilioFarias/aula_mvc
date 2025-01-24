import { json } from 'stream/consumers';
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';


export const createUser = async (data: Prisma.UserCreateInput ) => {
    try { 
        const newUser = await prisma.user.create({ data });
        return newUser;
    } catch (error) {
        return false;
    }    
}

export const listUsers = async (email: string) => {
    if(email) {
        const trackUser = await prisma.user.findMany({
            where: {
                email: {
                    contains: email,
                    mode: 'insensitive'
                }
            }
        });
        return trackUser;
    } else {
        return false;
    }
 }