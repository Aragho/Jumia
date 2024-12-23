// models/Buyer.js

import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Buyer = sequelize.define(
  "Buyer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "Users", // Reference to the Users table
        key: "id",
      },
    },
  },
  {
    tableName: "Buyers",
    timestamps: true,
  }
);

// Associations
Buyer.associate = (models) => {
  Buyer.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });

  Buyer.hasMany(models.Cart, {
    foreignKey: "buyerId",
    as: "cart",
  });

  Buyer.hasMany(models.Wishlist, {
    foreignKey: "buyerId",
    as: "wishlist",
  });

  Buyer.hasMany(models.Order, {
    foreignKey: "buyerId",
    as: "orders",
  });
};

export default Buyer;
