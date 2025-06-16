import jwt from "jsonwebtoken";

export const authWebsite = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log('WEBSITE AUTH TOKEN', token);

    if (!token) {
        return res.status(401).json({
            success: false,
            error: {
                message: 'No Token provided',
            },
            status: 401,
        })
    }

    try {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                console.error("JWT verification failed:", err.message);
                return res.status(401).json({
                    message: 'Unauthorized',
                })
            }

            if (decoded.isTemp) {
                req.isTemp = decoded.isTemp; // временный
                req.userId = decoded.id; // постоянный
                console.log('AUTH WEB USER ID TEMP',req.userId);
            }
            req.userId = decoded.id;

            next();
        })
    } catch (error) {
        return res.status(403).send({ error: 'Invalid or expired token.' });
    }


}