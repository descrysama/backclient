const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('links', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reference_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sku',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'links',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_links_reference_id",
        using: "BTREE",
        fields: [
          { name: "reference_id" },
        ]
      },
    ]
  });
};
