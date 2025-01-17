import { prisma } from '../lib/prisma';

type createUserProps = {
    email: string;
    password: string;
}

export const createUser = async ({email, password}: createUserProps) => {
    if(!email || !password){
        throw new Error('Please provide email and password');
    } else {
        const newUser = await prisma.user.create({
            data: {
                email,
                password
            }
        });
        return newUser;
    }
}