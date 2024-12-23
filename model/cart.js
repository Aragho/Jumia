// models/Cart.js

import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Ensures each buyer has only one cart
      references: {
        model: "Buyers",
        key: "id",
      },
    },
  },
  {
    tableName: "Carts",
    timestamps: true,
  }
);

// Associations
Cart.associate = (models) => {
  Cart.belongsTo(models.Buyer, {
    foreignKey: "buyerId",
    as: "buyer",
  });

  Cart.hasMany(models.CartItem, {
    foreignKey: "cartId",
    as: "items",
  });
};

export default Cart;
