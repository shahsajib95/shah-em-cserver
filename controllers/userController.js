import Users from "../models/userModel.js";
import Products from "../models/productModel.js";
import Orders from "../models/orderModel.js";
import StoreOrders from "../models/storeOrderModel.js";

import ObjectId from "mongoose";
let ID = ObjectId.Types.ObjectId;

const userCtrl = {
  userDetails: async (req, res) => {
    try {
      const { userId } = req.params;
      const userData = await Users.findOne({ _id: new ID(userId) })
        .select("-password -role")
        .sort({ _id: -1 });
      return res.json(userData);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  customerDetails: async (req, res) => {
    try {
      const { id, address } = req.body;

      const userData = await Users.updateOne(
        { _id: new ID(id) },
        { address: address },
        { upsert: true }
      );
      return res.json(userData);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  sellerDetails: async (req, res) => {
    try {
      const { id, store, storeAvatar } = req.body;

      const userData = await Users.updateOne(
        { _id: new ID(id) },
        { store: store, storeAvatar: storeAvatar },
        { upsert: true }
      );
      return res.json(userData);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  store: async (req, res) => {
    try {
      const storeData = await Users.find({ role: "seller" })
        .select("-password -role")
        .sort({ _id: -1 });
      return res.json(storeData);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  uploadProduct: async (req, res) => {
    try {
      const newProduct = new Products(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getStoreProduct: async (req, res) => {
    try {
      const { storeId } = req.params;
      const products = await Products.find({ user: new ID(storeId) })
        .populate("user", "_id name avatar store storeAvatar")
        .sort({
          _id: -1,
        });
      res.status(201).json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await Products.find({})
        .populate("user", "_id name avatar store storeAvatar")
        .sort({
          _id: -1,
        });
      res.status(201).json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  search: async (req, res) => {
    try {
      const { search } = req.params;
      console.log(search);
      let regex = new RegExp(search, "i");
      const products = await Products.find({ title: regex })
        .populate("user", "_id name avatar store storeAvatar")
        .sort({
          _id: -1,
        });
      // console.log(products)
      res.status(201).json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getParticularProducts: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Products.find({ _id: new ID(productId) })
        .populate("user", "_id name avatar store storeAvatar")
        .sort({
          _id: -1,
        });
      res.status(201).json(product);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  order: async (req, res) => {
    try {
      const { cart } = req.body;

      const newOrder = new Orders(req.body);

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.inStock);
      });

      cart.filter((item) => {
        return storeOrder(
          newOrder._id,
          newOrder.user,
          item.user._id,
          item.title,
          item.quantity,
          item.price,
          newOrder.status,
          newOrder.dateOfPayment
        );
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCustomerOrder: async (req, res) => {
    try {
      const { customerId } = req.params;
      const orders = await StoreOrders.find({
        userId: new ID(customerId),
      }).sort({
        _id: -1,
      });
      res.status(201).json(orders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getStoreOrder: async (req, res) => {
    try {
      const { sellerId } = req.params;
      const find = await StoreOrders.find({ storeId: new ID(sellerId) });
      res.status(201).json(find);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  OrderAccept: async (req, res) => {
    try {
      const { orderId, storeOrderId, status } = req.body;
      await Orders.updateOne(
        { _id: new ID(orderId) },
        { status: status },
        { upsert: true }
      );
      const updatedStore = await StoreOrders.updateOne(
        { _id: new ID(storeOrderId) },
        { status: status },
        { upsert: true }
      );
      res.status(201).json(updatedStore);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldInStock) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldInStock - quantity,
    }
  );
};
const storeOrder = async (
  orderId,
  userId,
  storeId,
  title,
  quanity,
  price,
  status,
  dateOfPayment
) => {
  const orders = new StoreOrders({
    orderId,
    userId,
    storeId,
    title,
    quanity,
    price,
    status,
    dateOfPayment,
  });
  orders.save();
};
export default userCtrl;
