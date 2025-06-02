import express from 'express';
import jwt from 'jsonwebtoken';
import {Clients} from "../../models/clients.js";
import {v4} from 'uuid';
import bcrypt from "bcrypt";
import moment from "moment/moment.js";
import {TempCartItems} from "../../models/tempCartItems.js";
import {CartItems} from "../../models/cartItems.js";
import {authWebsite} from "../../server/middleware/authWebsite.js";



const router = express.Router();


router.post("/auth",authWebsite,async (req, res) => {
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


            const tempProducts = await TempCartItems.findAll(
                {
                    where:
                        {
                            client_id: req.userId
                        }
                });

            console.log('tempProducts', tempProducts);

            for (const tempItem of tempProducts) {
                const existingProduct = await CartItems.findOne({
                    where: {
                        client_id: client.client_id,
                        product_id: tempItem.product_id,
                        product_size: tempItem.product_size,
                    },
                });

                if (existingProduct) {
                    console.log('uze est')
                    // Если товар уже существует в главной корзине — увеличиваем количество
                    await CartItems.update(
                        {product_count: existingProduct.product_count + tempItem.product_count},
                        {
                            where:
                                {
                                    product_id: existingProduct.product_id
                                }
                        }
                    );
                } else {
                    console.log('im here no',existingProduct);
                    console.log('reqqq',req.userId);

                    // Добавляем новый продукт в главную корзину
                    await CartItems.create({
                        client_id: client.client_id,
                        product_id: tempItem.product_id,
                        product_size: tempItem.product_size,
                        product_count: tempItem.product_count,
                        created_at: moment().unix()
                    });
                }
            }

            // Удаляем временную корзину после объединения
            await TempCartItems.destroy({where: {client_id: req.userId}});



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