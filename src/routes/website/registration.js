import express from "express";
import {Clients} from "../../models/clients.js";
import nodemailer from "nodemailer";
import {TempRegisterPasswords} from "../../models/tempRegisterPasswords.js";
import moment from "moment";
import {getUnixTime} from "date-fns";
import bcrypt from "bcrypt";


const router = express.Router();

router.post('/register', async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const {email, password,name,surname,phone,birthday} = req.body.client;
    console.log('EMAIL', email);
    console.log('PASS', password);

    if (!email || !password || !name || !surname || !phone || !birthday) {
        return res.status(200).json({
            success: false,
            message: 'All data are required.'});
    }

    const client = await Clients.getByEmail(email);
    if (client) {
        return res.status(200).json({message: 'Пользователь с таким именем или email уже существует.'});
    }

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(email)) {
        return res.status(200).json({message: 'Неверный формат email'});
    }

    const confirmationCode = Math.floor(Math.random() * 1000000).toString();

    const existingValidationEmail = await TempRegisterPasswords.findOne({
        where: {
            client_email: email,
        }
    })

    if (existingValidationEmail) {
        await TempRegisterPasswords.update({
            generated_password: confirmationCode,
            created_at: moment().unix(),
        }, {
            where: {
                client_email: email,
            }
        })
    } else {
        await TempRegisterPasswords.create({
            client_email: email,
            generated_password: confirmationCode,
            created_at: moment().unix(),
        })
    }


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
            subject: "Подтверждение регистрации",
            text: `Ваш код подтверждения: ${confirmationCode}`,
        })

        res.status(201).json({
            success: true,
            message: 'Учетная запись успешно создана! Проверьте свой email для подтверждения.'
        });
    } catch (error) {
        console.log('Ошибка при отправке письма:', error);
        res.status(500).json({message: 'Произошла ошибка при отправке письма. Попробуйте позже.'});
    }

})

router.post("/auth-password/check", async (req, res) => {
    const data = req.body;
    console.log('DATA', data);
    const MAX_TTL_SECONDS = 300;

    const {email, password, name, surname, phone, birthday, generatedPassword} = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);


    if (!email || !generatedPassword) {
        return res.status(200).json({message: 'Email and generated Password are required.'});
    }

    try {
        const currentTime = moment().unix();

        const tempClientPass = await TempRegisterPasswords.findOne({
            where: {
                client_email: email,
                generated_password: generatedPassword
            }
        })
        if (!tempClientPass) {
            return res.status(200).json({message: 'Invalid credentials'});
        }

        const passwordTTL = tempClientPass.created_at;
        const timeDiff = currentTime - passwordTTL;
        console.log('TIME DIFF TIME DIFF', timeDiff);

        if (timeDiff > MAX_TTL_SECONDS) {
            return res.status(200).json(
                {
                    message: 'The verification code has expired.',
                    success: false,
                    status: 403
                })
        }


        const client = await Clients.getByEmail(email);
            if (!client) {
                await Clients.create({
                    client_name: name,
                    client_surname: surname,
                    client_phone: phone,
                    client_email: email,
                    client_birthday: moment(birthday).unix(),
                    client_password: hashedPassword,
                    created_at: getUnixTime(new Date()),
                });

                await TempRegisterPasswords.destroy({
                    where: {
                        client_email: email,
                        generated_password: generatedPassword
                    }
                })

                res.json({
                    success: true,
                    message: 'Credentials verified successfully',
                });
            } else {
                res.status(409).json({message: 'User with this email already exists.'});
            }

    } catch (error) {
        console.error('Error in auth-password/check:', error);
        res.status(500).json({message: 'Internal server error'});
    }

})
export default router;