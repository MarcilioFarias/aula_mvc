import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';
import { User } from '../types/types.user';


export const loginUser = async (email: string, password: string) => {
    if(email && password) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                password: password
            }
        }); 
        return user;
    } 
    return false;
     
};
export const createUserToken = (user:User) => {
    return '00011010101010';
}

export const findUserByToken = async (token: string)=>{
    //check database
    if(token === '1234'){
        const user: User = {
            id: 3,
            name: 'Ciclano'
        }
        return user;
    }
    return null;
}

export const findUserByEmailAndPassword = async (email: string, password: string)=>{ 
    // check DB for user
    if(email === 'fulano@test.com' && password === '1234'){
        const user: User = {
            id: 1,
            name: 'Fulano'
        }
        return user;
    }
    return null;
}
export const createUser = async (data: Prisma.UserCreateInput ) => {
    if(!data.email && !data.password && data.loginUser) {
                return false;
        } else {
            const newUser = await prisma.user.create({ data });
            return newUser;
        }       
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