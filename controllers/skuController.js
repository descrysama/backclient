
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
        attributes: ['url']
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

async function getSingle(req, res) {
  try {

    const { skuId } = req.params;
    const singleSku = await sku.findByPk(skuId);
    if(!singleSku) {
      return res.status(404).json({ error: 'SKU not found' });
    }

    const skuLinks = await links.findAll({
      where: { reference_id: skuId },
      attributes: ['url']
    });

    urls = [];
    const { id, name } = singleSku
    skuLinks.forEach(link => urls.push(link.url));
    return res.status(200).json({id, name, urls});

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

const searchSku = async (req, res) => {
  try {

    const { query } = req.body
    const skus = await sku.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
        }
      }
    });

    if(!sku) {
      return res.status(404).json({ error: 'no SKUs found' });
    }

    return res.status(200).json(skus);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to search SKUs' });
  }
};

const updateSku = async (req, res) => {
  try {
    const skuId = req.params.id;
    const updatedData = req.body;

    const skuToUpdate = await sku.findByPk(skuId);
    if (!skuToUpdate) {
      return res.status(404).json({ error: 'SKU not found' });
    }

    await skuToUpdate.update(updatedData);

    return res.status(200).json(skuToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update SKU' });
  }
};

async function deleteSkuAndUrls(req, res) {
  try {
    const { id } = req.params;

    const skuRecord = await sku.findByPk(id);

    if (!skuRecord) {
      return res.status(404).json({ error: 'SKU not found' });
    }

    await links.destroy({
      where: { reference_id: id }
    });

    await skuRecord.destroy();

    return res.status(200).json({ message: 'SKU and associated URLs deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}




module.exports = {
  getAllSkus,
  createSku,
  searchSku,
  updateSku,
  deleteSkuAndUrls,
  getSingle
};
