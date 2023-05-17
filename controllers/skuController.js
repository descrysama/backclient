
const db = require("../models");
const sku = db.skus;
const links = db.links;
const Op = db.Sequelize.Op;

async function getAllSkus(req, res) {
  try {

    const allSkus = await sku.findAll();
    const allSkusPopulated = [];
    for (const skuRecord of allSkus) {
      const skuId = skuRecord.id;

      const skuLinks = await links.findAll({
        where: { reference_id: skuId },
        attributes: ['url'] // Retrieve only the 'url' attribute from the links table
      });

      urlsArray = []
      skuLinks.map((link) => urlsArray.push(link.url));

      allSkusPopulated.push({id: skuId, name: skuRecord.name, urls: urlsArray})
    }

    return res.status(200).json(allSkusPopulated);

  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: 'Server error' });
    
  }
}

async function createSku(req, res) {
  try {

    const { name } = req.body;
    const createdSku = await sku.create({ name });

    return res.status(201).json(createdSku);
  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: 'Server error' });

  }
}

module.exports = {
  getAllSkus,
  createSku,
};
