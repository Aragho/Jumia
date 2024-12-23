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
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending", // Possible values: Pending, Shipped, Delivered, Cancelled
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

// Associations
Order.associate = (models) => {
  Order.belongsTo(models.Buyer, {
    foreignKey: "buyerId",
    as: "buyer",
  });

  Order.hasMany(models.OrderItem, {
    foreignKey: "orderId",
    as: "items",
  });
};

export default Order;
