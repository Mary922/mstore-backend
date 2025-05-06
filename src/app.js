import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


// importing routes
import UnitsRoutes from "./routes/crm/unitsRoutes.js";
import TagsRoutes from "./routes/crm/tagsRoutes.js";
import ColorsRoutes from "./routes/crm/colorsRoutes.js";
import CategoriesRoutes from "./routes/crm/categoriesRoutes.js";
import ProductsRoutes from "./routes/crm/productsRoutes.js";
import SeasonsRoutes from "./routes/crm/seasonsRoutes.js";
import SizesRoutes from "./routes/crm/sizesRoutes.js";
import CountriesRoutes from "./routes/crm/countriesRoutes.js";
import BrandsRoutes from "./routes/crm/brandsRoutes.js";
import AuthRoutes from "./routes/website/websiteAuthRoutes.js";
import PricesRoutes from "./routes/crm/pricesRoutes.js";
import GenderRoutes from "./routes/crm/genderRoutes.js";
import ProductCategoriesRoutes from "./routes/crm/productCategoriesRoutes.js";
import CartRoutes from "./routes/website/cartRoutes.js";
import ClientsRoutes from "./routes/website/clientsRoutes.js";
import authRoutes from "./routes/website/websiteAuthRoutes.js";
import bodyParser from "body-parser";
import Registration from "./routes/website/registration.js";
import crmAuth from "./routes/crm/crmAuthRoutes.js";
import categoriesRoutes from "./routes/website/categoriesRoutes.js";
import productCategoriesRoutes from "./routes/website/productCategoriesRoutes.js";
import productsRoutes from "./routes/website/productsRoutes.js";
import regionsRoutes from "./routes/website/regionsRoutes.js";
import citiesRoutes from "./routes/website/citiesRoutes.js";
import ordersRoutes from "./routes/website/ordersRoutes.js";
import wishlistRoutes from "./routes/website/wishlistRoutes.js";

import uploadRoutes from "./routes/crm/uploadRoutes.js";
import imagesRoutes from "./routes/website/imagesRoutes.js";
import filterRoutes from "./routes/website/filterRoutes.js";
import pricesRoutes from "./routes/crm/pricesRoutes.js";
import pricesWebRoutes from "./routes/website/pricesWebRoutes.js";
import addressesRoutes from "./routes/website/addressesRoutes.js";
import subscriptionsRoutes from "./routes/website/subscriptionsRoutes.js";
import forgotPasswordRoutes from "./routes/website/forgotPasswordRoutes.js";
import divisionsRoutes from "./routes/website/divisionsRoutes.js";
// import imagesRoutes from "./routes/crm/imagesRoutes.js";

const app = express();
const port = 3001;
app.disable('etag');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({message: 'ok'});
})
app.use(cors());

dotenv.config();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// console.log(path.join(__dirname, 'images'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(fileUpload());


// Routes crm
app.use(UnitsRoutes)
app.use(TagsRoutes)
app.use(ColorsRoutes)
app.use(CategoriesRoutes)
app.use(ProductsRoutes)
app.use(SeasonsRoutes)
app.use(SizesRoutes)
app.use(CountriesRoutes)
app.use(BrandsRoutes)
app.use(PricesRoutes)
app.use(GenderRoutes)
app.use(ProductCategoriesRoutes)
app.use(AuthRoutes)
app.use(crmAuth)
app.use(uploadRoutes)


// Routes website
app.use(authRoutes)
app.use(CartRoutes)
app.use(ClientsRoutes)
app.use(Registration)
app.use(categoriesRoutes)
app.use(productCategoriesRoutes)
app.use(productsRoutes)
app.use(regionsRoutes)
app.use(citiesRoutes)
app.use(ordersRoutes)
app.use(wishlistRoutes)
app.use(imagesRoutes)
app.use(filterRoutes)
app.use(pricesWebRoutes)
app.use(addressesRoutes)
app.use(subscriptionsRoutes)
app.use(forgotPasswordRoutes)
app.use(divisionsRoutes)


app.listen(port,()=> console.log(`Example app listening at http://localhost:${port}`));