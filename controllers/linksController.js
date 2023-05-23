
const db = require("../models");
const links = db.links;
const sku = db.skus;
const Op = db.Sequelize.Op;

async function getAllLinks(req, res) {
  try {

    const skus = await links.findAll();
    return res.status(200).json(skus);

  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: 'Server error' });
    
  }
}

async function createLink(req, res) {
  try {
    const { referenceId, url } = req.body;

    const skuRecord = await sku.findByPk(referenceId);

    if (!skuRecord) {
      return res.status(404).json({ error: 'SKU not found' });
    }

    const createdLink = await links.create({ reference_id: referenceId, url });

    return res.status(201).json(createdLink);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function deleteLink(req, res) {
  try {
    const { id } = req.params;

    const link = await links.findByPk(id);

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    await link.destroy();

    return res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}




module.exports = {
  getAllLinks,
  createLink,
  deleteLink
};