import express from "express";
import {Divisions} from "../../models/divisions.js";

const router = express.Router();

router.get("/division/get", async (req, res) => {
    const data = req.query;
    console.log('DATA DEVISION',data);

    const divisionInfo = await Divisions.findAll();

    if (divisionInfo === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: divisionInfo
    });
})
export default router;