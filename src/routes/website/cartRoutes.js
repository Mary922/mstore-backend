import express from "express";
import {Products} from "../../models/products.js";
import {authWebsite} from "../../server/middleware/authWebsite.js";
import {CartItems} from "../../models/cartItems.js";
import moment from "moment";
import {TempCartItems} from "../../models/tempCartItems.js";

const router = express.Router();

router.post("/cart",authWebsite,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const cart = data.cart;
    console.log('cart', cart);

    const idsFromCart = [];
    for (let i = 0; i < cart.length; i++) {
        idsFromCart.push(cart[i].id);
    }
    console.log('ids', idsFromCart)


    const products = await Products.getByIds(idsFromCart);
    console.log('productsListByIds', products);

    const list = [];
    for (let i = 0; i < cart.length; i++) {

        for (let j = 0; j < products.length; j++) {

            if (products[j].product_id === cart[i].id) {
                let obj = {
                    id: products[j].product_id,
                    product_name: products[j].product_name,
                    price: products[j].price,
                    count: cart[i].count,
                }
               list.push(obj);
            }
        }
    }

    let totalSum = 0;
    for (let i = 0; i < cart.length; i++) {
        totalSum += cart[i].price * cart[i].count;
    }

    res.json({
        success: true,
        data: {
            totalSum: totalSum,
            list: list
        },

    });

} )

router.post("/preorder",authWebsite,async (req, res) => {
    const data = req.body;
    console.log('DATA preOrder', data);

    const sum = data.sum;

    const preOrder = data.cart;
    console.log('preOrder', preOrder);



    res.json({
        success: true,
        data: {
            status: 200,
            sum: sum,
        },
    });
} )



router.post("/cart/add",authWebsite,async (req, res) => {
    try {
        const data = req.body;
        console.log('CART ADD', data);

        let CartModel = CartItems;
        let tempClientId;

        if (req.isTemp){
            CartModel = TempCartItems;
            tempClientId = req.userId;
        }
        console.log('tempClientId', tempClientId);

        const existingProduct = await CartModel.findOne({
            where: {
                product_id: data.cart.productId,
                product_size: data.cart.productSize,
            }
        })
        if (!existingProduct) {
            console.log('no such prod')
            await CartModel.create({
                client_id: req.userId,
                product_id: data.cart.productId,
                product_size: data.cart.productSize,
                product_count: data.cart.quantity,
                created_at: moment().unix(),
            })
        } else {
            console.log('prod exists');

            await CartModel.update({
                product_count: existingProduct.product_count + 1
            }, {
                where: {
                    product_id: data.cart.productId,
                    product_size: data.cart.productSize,
                }
            })
        }

        const productsICart = await CartModel.findAll({
            where: {
                client_id: req.userId,
            }
        })


        res.json({
            success: true,
            data: {
                status: 200,
                cart: productsICart
            },
        });

    }catch(err) {
        console.log(err);
    }


} )

router.post("/cart/get",authWebsite,async (req, res) => {
    const data = req.body;
    console.log('DATA CART GET', data);

    let CartModel = CartItems;

    if (req.isTemp){
        CartModel = TempCartItems;
    }

    const cart = await CartModel.findAll({
        where: {
            client_id: req.userId,
        }
    })

    if (!cart) {
        return res.json({
            success: false,
        })
    }

    return res.json({
        success: true,
        data: {
            cart: cart,
        },
    });
})


router.post("/cart/delete",authWebsite,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    let CartModel = CartItems;

    if (req.isTemp){
        CartModel = TempCartItems;
    }

    const deleteProduct = await CartModel.destroy({
        where: {
            product_id: data.productId,
            product_size: data.sizeId,
            client_id: req.userId,
        }
    })
    const cart = await CartModel.findAll({
        where: {
            client_id: req.userId,
        }
    })

    return res.json({
        success: true,
        data: {
            cart: cart,
        },
    });
})


router.post("/cart/increase",authWebsite,async (req, res) => {
    const data = req.body.data;
    console.log('DATA INCREASE', data);

    let CartModel = CartItems;
    let clientId = req.userId;
    console.log('clientId INCREASE', clientId);

    if (req.isTemp){
        CartModel = TempCartItems;
    }


    const product = await CartModel.findOne({
        where: {
            product_id: data.productId,
            product_size: data.sizeId,
            client_id: clientId,
        }
    })
    if (!product) {
        return res.json({
            success: false,
        })
    }

    product.product_count = product.product_count + 1;
    await product.save();
    const cart = await CartModel.findAll({
        where: {
            client_id: clientId,
        }
    })

    // console.log('PRODUCT UPDATE TEMP CLIENT', data.clientId);

    // let cart = await CartModel.findAll({
    //         where: {
    //             client_id: req.userId,
    //         }
    //     })


    return res.json({
        success: true,
        data: {
            cart: cart,
        }
    });
})


router.post("/cart/decrease",authWebsite,async (req, res) => {
    const data = req.body.data;
    console.log('DATA', data);

    let CartModel = CartItems;

    if (req.isTemp){
        CartModel = TempCartItems;
    }

    const product = await CartModel.findOne({
        where: {
            product_id: data.productId,
            product_size: data.sizeId,
            client_id: req.userId,
        }
    })
    if (!product) {
        return res.json({
            success: false,
        })
    }

    if (product.product_count > 1) {
        product.product_count = product.product_count - 1;
        await product.save();
    } else {
        await CartModel.destroy({
            where: {
                product_id: data.productId,
                product_size: data.sizeId
            }
        })
    }

    const cart = await CartModel.findAll({
        where: {
            client_id: req.userId,
        }
    })


    return res.json({
        success: true,
        data: {
            cart: cart,
        }
    });
})


router.post("/cart/clear",authWebsite,async (req, res) => {
    const data = req.body;
    console.log('DATA CLEAR', data);

    let CartModel = CartItems;

    if (req.isTemp){
        CartModel = TempCartItems;
    }
        const emptyCart = await CartModel.destroy({
            where: {
                client_id: req.userId,
            }
        })


    const cart = await CartModel.findAll({})


    return res.json({
        success: true,
        data: {
            cart: cart,
        }
    });
})

export default router;