"use strict";

module.exports = (sequelize, Sequelize) => {
  const PracticeUser = sequelize.define(
    "PracticeUser",
    {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      // 🔹 Basic Credentials
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // 🔹 Status Flags
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "practiceusers",
      timestamps: true, // Sequelize will manage createdAt & updatedAt

      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["username"],
        },
        {
          fields: ["isDeleted"],
        },
      ],
    }
  );

  return PracticeUser;
};
