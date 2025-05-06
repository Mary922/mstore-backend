import express from 'express';
import jwt from 'jsonwebtoken';
import {Clients} from "../../models/clients.js";
import {v4} from 'uuid';
import bcrypt from "bcrypt";

// import {data} from "express-session/session/cookie.js";

const router = express.Router();


router.post("/auth", async (req, res) => {
    try {
        const data = req.body;
        console.log('DATA', data);

        const email = data.email || '';
        const password = data.password || '';


        const client = await Clients.getByEmail(email);

        if (!client) {
            return res.json({message: 'No client found.'});
            // return res.status(200).json({
            //     data:
            //         {
            //             message: "No client found with this email"
            //         }
            // });
            // return res.send({message: 'No client found.'})
        }

        if (client.client_password && password) {
            console.log('lets check')
            const isPasswordValid = await bcrypt.compare(password, client.client_password);
            if (!isPasswordValid) {
                return res.status(401).json({message: 'Invalid credentials,yes'});
            }

            let token = jwt.sign({id: client.client_id}, 'secret', {algorithm: 'HS256', expiresIn: '24h'});

            console.log('password is ok');

            return res.json({
                success: true,
                data: {
                    id: client.client_id,
                    email: client.client_email,
                    accessToken: token,
                }
            })


        }

        // if (client.client_password === hashedPassword) {
        //
        // } else {
        //     res.json({message: 'Wrong password.'});
        //     // return res.status(200).json({
        //     //     data:
        //     //         {
        //     //             message: 'Password is invalid.'
        //     //         }
        //     // });
        //     return res.send({message: 'Password is invalid.'})
        // }


    } catch (error) {
        console.log('its error')
        return res.status(500).json({error: "Internal server error"});
    }
})


router.post("/auth-temp", async (req, res) => {
    try {

        const newId = v4();

        let token = jwt.sign({id: newId, isTemp: 1}, 'secret', {algorithm: 'HS256', expiresIn: '24h'});

        return res.json({
            success: true,
            data: {
                accessToken: token,
                isTemp: 1,
            }
        })

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({success: false, error: "Токен истек"});
            console.log('token vse')
        }
        console.log(error);
    }
})


export default router;