// models/Order.js

import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Buyers",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
      validate: {
        isIn: [["Pending", "Shipped", "Delivered", "Cancelled"]],
      },
    },
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);

export default Order;
