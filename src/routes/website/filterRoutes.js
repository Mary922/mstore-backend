import express from "express";
import {
    Brands,
    Categories,
    Colors,
    Countries, Images,
    Products,
    Seasons,
    Sizes
} from "../../models/associations.js";
import {Op} from "sequelize";


const router = express.Router();

router.get("/filter/get", async (req, res) => {
    try {
        const data = req.query;
        console.log('DATA', data);

        const sizes = await Sizes.findAll({})
        const colors = await Colors.findAll({})
        const seasons = await Seasons.findAll({})
        const brands = await Brands.findAll({})
        const countries = await Countries.findAll({})
        const categories = await Categories.findAll({
            where: {
                gender: 1,
                deleted_at: null,
                parent_id: {
                    [Op.not]: null
                }
            }
        })

        res.json({
            success: true,
            data: {
                sizes: sizes,
                colors: colors,
                seasons: seasons,
                brands: brands,
                countries: countries,
                categories: categories
            }
        });
    } catch (e) {
        console.log(e);
    }
})


router.get("/filter/products", async (req, res) => {
    try {
        const data = req.query;
        console.log('DATA FILTER PRODUCTS', data);

        const {minRangeValue, maxRangeValue, category, gender, sizes, colors} = req.query;
        const filters = {}


        let seasons = [];
        let brands = [];
        let countries = [];
        if (data && data.seasons) {
            seasons = Array.from(data.seasons);
        }
        if (data && data.brands) {
            brands = Array.from(data.brands);
        }
        if (data && data.countries) {
            countries = Array.from(data.countries);
        }
        if (seasons && seasons.length > 0) {
            filters.season_id = {[Op.in]: seasons};
        } else {
            console.log('NO SEASONS');
        }

        if (brands && brands.length > 0) {
            filters.brand_id = {[Op.in]: brands};
        } else {
            console.log('NO BRANDS');
        }

        if (countries && countries.length > 0) {
            filters.country_id = {[Op.in]: countries};
        } else {
            console.log('NO COUNTRIES');
        }

        if (minRangeValue && maxRangeValue) {
            filters.price = {[Op.between]: [minRangeValue, maxRangeValue]};
        }
        if (gender) {
            filters.gender_id = gender;
        }

        const include = [];
        if (category) {
            include.push({
                model: Categories,
                attributes: ['category_id', 'category_name'],
                where: {
                    category_id: category
                },
                required: true,
            })
        }

        include.push({
                model: Images,
                attributes: ['image_id', 'image_path'],
            },
        )

        if (colors && colors.length) {
            include.push({
                model: Colors,
                attributes: ['color_id', 'color_name'],
                where: {
                    color_id: {
                        [Op.in]: Array.isArray(colors) ? colors : [colors]
                    }
                },
            })
        }
        if (sizes && sizes.length) {
            include.push({
                model: Sizes,
                attributes: ['size_id', 'size_name'],
                where: {
                    size_id: {
                        [Op.in]: Array.isArray(sizes) ? sizes : [sizes]
                    }
                },
            })
        }

        let products = await Products.findAll({
            where: filters,
            include: include
        })

        if (products === null) {
            res.json({
                success: false,
            })
        }
        res.json({
            success: true,
            data: products,
        });
    } catch (e) {
        console.log(e);
    }

})
export default router;