import express from 'express';
import jwt from 'jsonwebtoken';
import {Users} from "../../models/users.js";
const router = express.Router();

router.post("/crm/signin", async (req, res) => {
    try {
        const data = req.body;
        console.log('DATA', data);

        const username = data.username || '';
        const password = data.password || '';

        const user = await Users.getByUsername(username);

        if (!user) {
            return res.send({message: 'No user found.'})
            // return res.status(401).send({message: 'No user found.'});
        }
        if (user.user_password == password) {
            console.log('password is ok')
        } else {
            return res.send({message: 'Password is invalid.'})
            // return res.status(401).send({message: 'Password is invalid.'});
        }
        let token = jwt.sign({id: user.user_id, color: 'red'}, 'secret', {algorithm: 'HS256', expiresIn: '24h'});

        res.json({
            success: true,
            data: {
                id: user.user_id,
                username: user.username,
                accessToken: token,
            },
        });

    } catch (error) {
        console.log(error)
    }
})
export default router;
