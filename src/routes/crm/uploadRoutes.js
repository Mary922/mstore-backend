import express from "express";
import {Images} from "../../models/images.js";
import {ImagesStatic} from "../../models/imagesStatic.js";

const router = express.Router();

router.post("/upload_files", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
 //   console.log('files', req.files);
    let files = req.files.files;


    let extension = '';
    let image;
    let imageIds = [];

    if (!Array.isArray(files)) {
        files = [files];
    }

    for (let i = 0; i < files.length; i++) {
        let splitname = files[i].name.split('.');
        extension = splitname[splitname.length - 1];

        image = await Images.create({
            image_path: ''
        });

        image.image_path = image.image_id + '.' + extension;
        await image.save();

        const newImageFiles = files[i].mv('images/' + image.image_path);

        imageIds.push(image.image_id);
    }

    return res.json({
        success: true,
        imageIds: imageIds,
    })
})


router.post("/upload_files/static", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let files = req.files.files;
    const type = req.body.type;
    const field = req.body.field;
    console.log('RESPONSE FILES STATIC', req.files.files);
    console.log('RESPONSE FILES TYPE', req.body.type);
    console.log('RESPONSE FILES FIELD', req.body.field);

    let extension = '';
    let image;
    let imageIds = [];

    if (!Array.isArray(files)) {
        files = [files];
    }

    for (let i = 0; i < files.length; i++) {
        let splitname = files[i].name.split('.');
        extension = splitname[splitname.length - 1];

        image = await ImagesStatic.create({
            type: type,
            image_destination: field,
            image_path: '',
        });

        image.image_path = image.image_id + '.' + extension;
        await image.save();

        const newImageFiles = files[i].mv('static/' + image.image_path);

        imageIds.push(image.image_id);
    }

    return res.json({
        success: true,
        imageIds: imageIds,
    })
})
export default router;