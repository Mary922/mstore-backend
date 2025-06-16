import fs from 'fs';
import {Regions} from "./models/regions.js";
import {Cities} from "./models/cities.js";


fs.readFile('/Users/Masha/Downloads/0722a93c35dfba96337b-435b297ac6d90d13a68935e1ec7a69a225969e58/russia', 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const russia = JSON.parse(data);

    for (let i = 0; i < russia.length; i++) {
        let region = await Regions.findOne({
            where: {
                region_name: russia[i].region
            }
        })
        if (!region) {
            region = await Regions.create({
                region_name: russia[i].region,
            })
        }
        let city = await Cities.create({
            region_id: region.region_id,
            city_name: russia[i].city,
        })
    }
})
