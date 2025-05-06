import {authWebsite} from "../../server/middleware/authWebsite.js";
import {Subscriptions} from "../../models/subscriptions.js";
import express from "express";

const router = express.Router();

router.post("/subscription",authWebsite, async (req, res) => {
    try {
        const data = req.body;
        console.log('DATA', data);
        const clientEmail = data.email;


        if (!clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Пожалуйста, укажите корректный email'
            });
        }

        const emailIsExisting = await Subscriptions.findOne({
            where: {
                subscription_email: clientEmail,
            }
        })
        if (emailIsExisting) {
            return res.json({
                success: true,
                message: 'Вы уже подписаны'
            });
        }

        // console.log('clientEmail', clientEmail);

        const result = await Subscriptions.create({
                subscription_email: clientEmail,
                deleted_at: 0
            })

            return res.json({
                success: true,
                message: 'Вы только что подписались на наши обновления'
            });


    } catch (error) {
        console.error('Error in subscription:', error);
        return res.status(500).json({
            success: false,
            message: 'Произошла ошибка при обработке подписки'
        });
    }
})

export default router;