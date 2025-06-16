import express from "express";
import {ResetPassword} from "../../models/resetPassword.js";
import nodemailer from "nodemailer";
import {nanoid} from "nanoid";
import validator from "validator";
import bcrypt from "bcrypt";
import {Clients} from "../../models/clients.js";

const router = express.Router();

router.post("/forgotPassword", async (req, res) => {
    const data = req.body;
    console.log('DATA RESET PASSWORD', data);
    const {email} = req.body;

    if (!email) {
        return res.status(400).json({message: 'Email обязателен для восстановления пароля'});
    }

    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
        return res.status(200).json({message: 'Неверный формат email'});
    }
    const existingClientEmail = await Clients.getByEmail(email);
    if (!existingClientEmail) {
        return res.json({
            success: false,
            message: 'This client is not found'
        })
    }

    const resetToken = nanoid(32);
    const resetTokenExpiry = Date.now() + 1200000; // 20 минут

    const existingReset = await ResetPassword.findOne({
        where: {
            client_email: email,
        }
    });

    if (existingReset) {
        await existingReset.update({
            reset_token: resetToken,
            reset_token_expiry: resetTokenExpiry
        });
    } else {
        await ResetPassword.create({
            client_email: email,
            reset_token: resetToken,
            reset_token_expiry: resetTokenExpiry, // 20 min
        })
    }
    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORDMAILER,
        }
    })
    try {
        const resp = await transporter.sendMail({
            from: `"Manyasha Store" <${process.env.EMAIL}>`,
            to: email,
            subject: "Восстановление пароля",
            html: `
            <p>Вы запросили восстановление пароля. Пожалуйста, перейдите по следующей ссылке чтобы установить новый пароль:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>Ссылка действительна в течение 20 минут.</p>
                <p>Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.</p>`
            // text: `Ваша ссылка для восстановления пароля: Ссылка действительна в течение 20 минут.`,
        })

        res.status(201).json({
            success: true,
            message: 'Ссылка для восстановления успешно отправлена.'
        });
    } catch (error) {
        res.status(500).json({message: 'Произошла ошибка при отправке письма. Попробуйте позже.'});
    }
})

router.post("/changeForgottenPassword", async (req, res) => {
    try {
        const data = req.body;
        const {token, password} = req.body;

        const checkClientByToken = await ResetPassword.findOne({
            where: {
                reset_token: token,
            }
        })
        const clientEmail = checkClientByToken.client_email;

        if (checkClientByToken && checkClientByToken.reset_token_expiry > new Date().getTime()) {
            const hashedPassword = await bcrypt.hash(password, 12);

            const updatedClient = await Clients.update({
                client_password: hashedPassword
            }, {
                where: {
                    client_email: clientEmail,
                }
            })
            if (updatedClient) {
                await ResetPassword.destroy({
                    where: {
                        reset_token: token,
                    }
                })

                return res.status(200).json({
                    success: true,
                    message: 'Password changed successfully.'
                })

            }

        } else {
            return res.json({
                success: false,
                message: 'token is expired'
            })
        }

    } catch (error) {
        console.log(error)
    }
})


router.post("/checkTokenNotExpired", async (req, res) => {
    try {
        const data = req.body;
        const {token} = req.body;
        console.log('DATA CHANGE FORGOTTEN PASSWORD', data);

        if (!token) {
            return res.status(400).json({message: 'Токен не предоставлен'});
        }


        const checkClientByToken = await ResetPassword.findOne({
            where: {
                reset_token: token,
            }
        });

        if (!checkClientByToken) {
            return res.json({
                success: false,
                message: 'token is expired or not exist'
            });
        }

        const currentTimestamp = new Date().getTime();
        const expiryTimestamp = parseInt(checkClientByToken.reset_token_expiry);

        if (expiryTimestamp <= currentTimestamp) {

            return res.json({
                success: false,
                message: 'token is expired or not exist'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Token is alive'
        })

    } catch (error) {
        console.log(error)
    }
})


export default router;