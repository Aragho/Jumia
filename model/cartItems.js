// models/CartItem.js

import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Carts",
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
  },
  {
    tableName: "CartItems",
    timestamps: true,
  }
);

// Associations
CartItem.associate = (models) => {
  CartItem.belongsTo(models.Cart, {
    foreignKey: "cartId",
    as: "cart",
  });

  // Optional: Link to a Product model
  CartItem.belongsTo(models.Product, {
    foreignKey: "productId",
    as: "product",
  });
};

export default CartItem;
