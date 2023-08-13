import { BadRequest, UnAuthenticated, UnAutherized } from "../errors/customErrors.js"
import { decodedJwtToken } from "../utils/tokenUtils.js"

export const authMiddleware = (req, res, next) => {
    const { token } = req.cookies
    if (!token) throw new UnAuthenticated('Invalid User')
    try {
        const { userId, role } = decodedJwtToken(token)
        const testUser=userId=='64d8b4015cb75b366de10ed5'
        req.user = { userId, role,testUser }
        next()
    } catch (error) {
        console.log(error)
        throw new UnAuthenticated('Invalid User')
    }
}
export const authorizePermission = (...roles) => {
    return (req, res, next) => {
        console.log('roles',req.user.role!==roles[0])
        // if(!roles.includes(req.user.role)){
        //     throw new UnAutherized('you are not authorized')
        // }
        if(req.user.role!==roles[0]) throw new UnAutherized('you are not authorized')
        next()
    }
}
export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
      throw new BadRequest('Demo User. Read Only!');
    }
    next();
  };