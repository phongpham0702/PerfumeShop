const CartModel = require('../models/cart.model');
const ProductModel = require('../models/product');
const { BadRequestError, NotFoundError } = require('../helpers/error.response');
const {
  getProductInfomation,
  checkProductCapacity,
} = require('../models/reposities/product.repo');
const converterHelper = require('../helpers/converter.helper');

/*
    Key features:
    - add product to user cart
    - reduce product quantity by one
    - increase product quantity by one
    - get user cart
    - delete all item in cart
    - delete each item in cart
*/

class CartService {
  static createUserCart = async (userId, product = {}) => {
    let query = { userID: userId };
    let { productId, modelId } = product.productData;
    let quantity = product.quantity;
    let updateOrInsert = {
      $addToSet: {
        cartProduct: {
          productId: converterHelper.toObjectIdMongo(productId),
          modelId: converterHelper.toObjectIdMongo(modelId),
          quantity,
        },
      },
      $inc: {
        cartCountProduct: quantity,
      },
    };
    let options = {
      upsert: true,
      new: true,
      select:
        'userID cartCountProduct cartProduct.productId cartProduct.modelId cartProduct.quantity',
    };
    return CartModel.findOneAndUpdate(query, updateOrInsert, options);
  };

  static getCart = async (userId) => {
    let userCart = await CartModel.findOne(
      { userID: userId },
      {
        userID: 1,
        cartProduct: 1,
        cartCountProduct: 1,
      }
    )
      .populate({
        path: 'cartProduct.productId',
        select: [
          'productName',
          'productBrand',
          'productThumbnail',
          'priceScale',
        ],
      })
      .exec();

    if (!userCart) {
      return { cartData: [] };
    }

    let cartData = userCart.cartProduct.map((i) => {
      let itemModel = i.productId.priceScale.find((m) => {
        return m._id.toString() == i.modelId.toString();
      });
      return {
        productId: i.productId._id.toString(),
        modelId: i.modelId.toString(),
        productName: i.productId.productName,
        productBrand: i.productId.productBrand,
        productThumbnail: i.productId.productThumbnail,
        productCapacity: itemModel.capacity,
        unitPrice: itemModel.price,
        quantity: i.quantity,
      };
    });

    return {
      cartId: userCart._id,
      cartCountProduct: userCart.cartCountProduct,
      cartData,
    };
  };

  static addToCart = async (userId, product = {}) => {
    let userCart = await CartModel.findOne(
      { userID: userId },
      {
        _id: 1,
        cartCountProduct: 1,
        'cartProduct.productId': 1,
        'cartProduct.modelId': 1,
        'cartProduct.quantity': 1,
      }
    );

    // user cart not exist
    if (!userCart) {
      //create user cart
      return await CartService.createUserCart(userId, product);
    }

    let { productId, modelId } = product.productData;
    let quantity = product.quantity;

    let isContainsProduct = userCart.cartProduct.some((p) => {
      if (
        p.productId.toString() === productId &&
        p.modelId.toString() === modelId
      ) {
        return true;
      }
      return false;
    });

    if (isContainsProduct) {
      return await CartService.updateUserCartQuantity(
        userId,
        productId,
        modelId,
        quantity
      );
    } else {
      userCart.cartProduct.push({
        productId: converterHelper.toObjectIdMongo(productId),
        modelId: converterHelper.toObjectIdMongo(modelId),
        quantity,
      });
      userCart.cartCountProduct += quantity;

      return await userCart.save();
    }
  };

  static updateUserCartQuantity = async (
    userId,
    productId,
    modelId,
    quantity
  ) => {
    let query = {
      userID: userId,
      'cartProduct.productId': converterHelper.toObjectIdMongo(productId),
      'cartProduct.modelId': converterHelper.toObjectIdMongo(modelId),
    };
    let updateSet = {
      $inc: {
        'cartProduct.$.quantity': quantity,
        cartCountProduct: quantity,
      },
    };
    let options = {
      upsert: true,
      new: true,
      select:
        'cartCountProduct cartProduct.productId cartProduct.modelId cartProduct.quantity',
    };
    return CartModel.findOneAndUpdate(query, updateSet, options);
  };

  static deleteItem = async (userId, productId, modelId) => {
    let userCart = await CartModel.findOne({ userID: userId }).select([
      'userID',
      'cartCountProduct',
      'cartProduct',
    ]);
    let deletedItem;
    for (let i in userCart.cartProduct) {
      if (
        userCart.cartProduct[i].productId.toString() === productId &&
        userCart.cartProduct[i].modelId.toString() === modelId
      ) {
        deletedItem = userCart.cartProduct[i];
        userCart.cartProduct.pull(userCart.cartProduct[i]);
        userCart.cartCountProduct -= deletedItem.quantity;
        break;
      }
    }

    if (!deletedItem) {
      return null;
    }

    await userCart.save();
    return {
      cartId: userCart._id,
      cartCountProduct: userCart.cartCountProduct,
      deletedItem: {
        productId: deletedItem.productId,
        modelId: deletedItem.modelId,
        quantity: deletedItem.quantity,
      },
    };
  };

  static deleteAllItems = async (userId) => {
    let userCart = await CartModel.findOne({ userID: userId }).select([
      'userID',
      'cartCountProduct',
      'cartProduct',
    ]);

    if (!userCart || userCart.cartCountProduct === 0) {
      return {
        deleteResult: 'Your cart is empty',
      };
    }

    userCart.cartProduct = [];
    userCart.cartCountProduct = 0;
    await userCart.save();

    return {
      deleteResult: 'Your cart is clear now',
    };
  };
}

module.exports = CartService;
