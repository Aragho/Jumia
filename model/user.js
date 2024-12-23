// models/User.js

import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [5, 50],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 20],
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'buyer', // Default role is 'buyer'
      validate: {
        // Custom validation to check if each role is valid
        isValidRole(value) {
          const roles = value.split(','); // Split the roles by comma
          roles.forEach(role => {
            if (!['buyer', 'seller', 'admin'].includes(role)) {
              throw new Error(`Role '${role}' is invalid`);
            }
          });
        },
      },
    },
  },
  {
    tableName: "Users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// Method to check if the user has a specific role
User.prototype.hasRole = function(role) {
  const roles = this.role.split(','); // Split roles by comma if multiple roles are stored
  return roles.includes(role);
};

// Method to add a role to the user
User.prototype.addRole = async function(role) {
  const roles = this.role.split(',');
  if (!roles.includes(role)) {
    roles.push(role);
    this.role = roles.join(',');
    await this.save();
  }
};

// Method to remove a role from the user
User.prototype.removeRole = async function(role) {
  let roles = this.role.split(',');
  if (roles.includes(role)) {
    roles = roles.filter(r => r !== role); // Remove the role
    this.role = roles.join(',');
    await this.save();
  }
};

// Method to compare password
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default User;
