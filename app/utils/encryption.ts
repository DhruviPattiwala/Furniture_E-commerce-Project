import bcrypt from "bcrypt";


export async function encryptPassword(password : string) {
    const ciphertext =  await bcrypt.hash(password, 10);
    return ciphertext;
}

export async function comparePassword(password: string, hashPassword: string) {
     const isMatch = await bcrypt.compare(password,hashPassword);
     return isMatch;
}
