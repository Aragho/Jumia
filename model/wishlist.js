// models/Wishlist.js

import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Wishlist = sequelize.define(
  "Wishlist",
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
  },
  {
    tableName: "Wishlist",
    timestamps: true,
  }
);

export default Wishlist;
