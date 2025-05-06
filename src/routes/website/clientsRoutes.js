import express from "express";
import {Clients} from "../../models/clients.js";
import moment from "moment";

const router = express.Router();

router.get("/clients", async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Clients.findAll({})


    if (result === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: result
    });
})

router.post("/client", async (req, res) => {

    const data = req.body;
    console.log('DATA', data);

    // process.exit(1);
    const result = await Clients.getById(data.clientId);

    // console.log(result);
    // process.exit(1);

    if (result === null) {
        return res.json({
            success: false,
        })
    }
    return res.json({
        success: true,
        data: result
    });
})


router.post("/client/update", async (req, res) => {

    const data = req.body;
    console.log('DATA', data);

    const result = await Clients.getById(data.client.clientId);
    result.client_name = data.client.clientName;
    result.client_surname = data.client.clientSurname;
    result.client_birthday = moment(data.client.clientBirthday).unix();
    await result.save();

    if (result === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
    });
})

export default router;