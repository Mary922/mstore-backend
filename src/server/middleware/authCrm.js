import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {

    const token = req.headers['x-access-token'];
    console.log('TOKEN HEADERS',token)


    if (!token) {
        return res.status(401).json({
            success: false,
            error: {
                message: 'No Token provided',
            }
        })
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized',
            })
        }
        req.user = decoded.id; // saving object for using in Routes
        next();
    })
}