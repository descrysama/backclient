var DataTypes = require("sequelize").DataTypes;
var _links = require("./links");
var _mobilax_links = require("./mobilax_links");
var _sku = require("./sku");
var _users = require("./users");
var _utopya_links = require("./utopya_links");
var _websites_scripts = require("./websites_scripts");

function initModels(sequelize) {
  var links = _links(sequelize, DataTypes);
  var mobilax_links = _mobilax_links(sequelize, DataTypes);
  var sku = _sku(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var utopya_links = _utopya_links(sequelize, DataTypes);
  var websites_scripts = _websites_scripts(sequelize, DataTypes);

  links.belongsTo(sku, { as: "reference", foreignKey: "reference_id"});
  sku.hasMany(links, { as: "links", foreignKey: "reference_id"});

  return {
    links,
    mobilax_links,
    sku,
    users,
    utopya_links,
    websites_scripts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
