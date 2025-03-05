const { Roles } = require("../Constants/roles");

const checkRole = (requireRole) => {
    return (req, res, next) => {

        const user = req.user;
        console.log("user",req.user)
        console.log("User roles:", req.user.roles);  // Log to inspect the roles



        if (!user || !user.roles || !Array.isArray(user.roles)) {
            return res.status(403).json({ message: 'Access denied: No roles found for the user' });
        }

        const hasRequiredRole = requireRole.some(role => user.roles.includes(role));

        if (!hasRequiredRole) {
            return res.status(403).json({ message: 'Access denied: Insufficient role' });
        }

        next();


    }
}   


module.exports = checkRole;

