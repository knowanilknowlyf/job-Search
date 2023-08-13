import bcrypt from "bcryptjs"

export const hashPassword = async (val) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(val, salt)
}
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

