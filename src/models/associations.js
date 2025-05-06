import {Products} from "./products.js";
import {Tags} from "./tags.js";
import {ProductTags} from "./productTags.js";
import {Categories} from "./categories.js";
import {ProductCategories} from "./productCategories.js";
import {Colors} from "./colors.js";
import {ProductColors} from "./productColors.js";
import {Units} from "./units.js";
import {Seasons} from "./seasons.js";
import {Sizes} from "./sizes.js";
import {Countries} from "./countries.js";
import {Brands} from "./brands.js";
import {Orders} from "./orders.js";
import {ProductOrders} from "./productOrders.js";
import {Cities} from "./cities.js";
import {Regions} from "./regions.js";
import {ProductImages} from "./productImages.js";
import {Images} from "./images.js";
import {ProductSizes} from "./productSizes.js";
import {Addresses} from "./addresses.js";
import {Clients} from "./clients.js";
import {Gender} from "./gender.js";

Units.hasMany(Products, {foreignKey: 'unit_id'});
Products.belongsTo(Units, {foreignKey: 'unit_id'});

Seasons.hasMany(Products, {foreignKey: 'season_id'});
Products.belongsTo(Seasons, {foreignKey: 'season_id'});



Brands.hasMany(Products, {foreignKey: 'brand_id'});
Products.belongsTo(Brands, {foreignKey: 'brand_id'});

Countries.hasMany(Products, {foreignKey: 'country_id'});
Products.belongsTo(Countries, {foreignKey: 'country_id'});

Products.belongsToMany(Tags, {through: ProductTags, foreignKey: 'product_id'});
Tags.belongsToMany(Products, {through: ProductTags, foreignKey: 'tag_id'});

Products.belongsToMany(Categories, {through: ProductCategories, foreignKey: 'product_id'});
Categories.belongsToMany(Products, {through: ProductCategories, foreignKey: 'category_id'});

Products.belongsToMany(Sizes, {through: ProductSizes, foreignKey: 'product_id'});
Sizes.belongsToMany(Products, {through: ProductSizes, foreignKey: 'size_id'});

Products.belongsToMany(Colors, {through: ProductColors, foreignKey: 'product_id'});
Colors.belongsToMany(Products, {through: ProductColors, foreignKey: 'color_id'});

Orders.hasMany(ProductOrders, {foreignKey: 'order_id'});
ProductOrders.belongsTo(Orders, {foreignKey: 'order_id'});

Cities.hasMany(Orders, {foreignKey: 'city_id'});
Orders.belongsTo(Cities, {foreignKey: 'city_id'});

Regions.hasMany(Cities, {foreignKey: 'region_id'});
Cities.belongsTo(Regions, {foreignKey: 'region_id'});

// ProductImages.hasMany(Images,{foreignKey: 'image_id'});
// Images.belongsTo(ProductImages,{foreignKey: 'image_id'});

Products.belongsToMany(Images, {through: ProductImages, foreignKey: 'product_id'});
Images.belongsToMany(Products, {through: ProductImages, foreignKey: 'image_id'});


// Regions.hasMany(Addresses, {foreignKey: 'region_id'});
// Addresses.belongsTo(Regions, {foreignKey: 'region_id'});

Cities.hasMany(Addresses, {foreignKey: 'city_id'});
Addresses.belongsTo(Cities, {foreignKey: 'city_id'});

Clients.hasMany(Addresses, {foreignKey: 'client_id'});
Addresses.belongsTo(Clients, {foreignKey: 'client_id'});

Gender.hasMany(Products, {foreignKey: 'product_id'});
Products.belongsTo(Gender, {foreignKey: 'product_id'});

export {
    Products, ProductTags, Tags, Categories, ProductCategories,
    Colors, ProductColors, Units, Sizes, ProductSizes, Seasons, Countries, Brands,
    Orders, ProductOrders, Cities, Regions, Images, ProductImages,Addresses, Gender
};