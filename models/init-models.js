var DataTypes = require("sequelize").DataTypes;
var _links = require("./links");
var _sku = require("./sku");
var _websites_scripts = require("./websites_scripts");

function initModels(sequelize) {
  var links = _links(sequelize, DataTypes);
  var sku = _sku(sequelize, DataTypes);
  var websites_scripts = _websites_scripts(sequelize, DataTypes);

  links.belongsTo(sku, { as: "reference", foreignKey: "reference_id"});
  sku.hasMany(links, { as: "links", foreignKey: "reference_id"});

  return {
    links,
    sku,
    websites_scripts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
