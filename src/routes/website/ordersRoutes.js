import express from "express";
import {Orders} from "../../models/orders.js";
import {getUnixTime} from "date-fns";
import {authWebsite} from "../../server/middleware/authWebsite.js";
import {Cities, ProductOrders, Products, Regions} from "../../models/associations.js";

const router = express.Router();


router.post("/order/create",authWebsite, async (req, res) => {
    try {
        const data = req.body;
        console.log('DATA order', data);

        const cart = data.cart;
        const frontsum = data.orderSum;


        let sum = 0;
        const productsIds = [];
        for (let i = 0; i < cart.length; i++) {
            productsIds.push(cart[i].product_id);
        }

        const products = await Products.getByIds(productsIds);

        cart.forEach((cartItem) => {
            const product = products.find(product => product.product_id === cartItem.product_id);
            if (product) {
                sum += product.price * cartItem.product_count;
            }
        })

        let orderResult,productOrderResult;
        if (frontsum == sum) {
             orderResult = await Orders.create({
                client_id: data.order.client,
                region_id: data.order.region,
                city_id: data.order.city,
                address: data.order.address,
                phone: data.order.phone,
                order_sum: sum,
                created_at: getUnixTime(new Date()),
            })


            cart.forEach((cartItem) => {
                const product = products.find(product => product.product_id === cartItem.product_id);
                if (product) {
                    productOrderResult = ProductOrders.create({
                        order_id: orderResult.order_id,
                        product_id: cartItem.product_id,
                        product_count: cartItem.product_count,
                        product_price: product.price,
                    })
                }
            })

        } else if (orderResult === null || productOrderResult === null) {
            res.json({
                success: false,
            })
        }

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
    }
})


router.post("/orders/get",authWebsite, async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Orders.findAndCountAll({
        limit: data.limit,
        offset: data.offset,
        distinct: true,
        where: {
            client_id: data.clientId,
        },
        include: [
            {
                model: ProductOrders,
                attributes: ['product_id', 'product_count', 'product_price'],
            },
            {
                model: Cities,
                attributes: ['region_id','city_id', 'city_name'],
            },

        ]
    })

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


router.post("/order/get",authWebsite, async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Orders.findOne({
        where: {
            order_id: data.orderId,
        },
        include: [
            {
                model: ProductOrders,
                attributes: ['product_id', 'product_count', 'product_price'],
            },
            {
                model: Cities,
                attributes: ['region_id','city_id', 'city_name'],
                include: [{
                    model: Regions,
                    attributes: ['region_id','region_name'],
                }]
            },

        ]
    })

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

export default router;