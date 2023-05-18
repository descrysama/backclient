
const db = require("../models");
const utopyaLinks = db.utopyaLinks;
const Op = db.Sequelize.Op;

async function getAllLinks(req, res) {
  try {

    const allUtopyaLinks = await utopyaLinks.findAll();
    if(!allUtopyaLinks) {
        return res.status(500).json({ error: 'Aucun liens définis sur utopya' });
    }

    return res.status(200).json(allUtopyaLinks);

  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: 'Server error' });
    
  }
}

async function deleteLink(req, res) {
  try {
    const { id } = req.params;

    const link = await utopyaLinks.findByPk(id);

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




async function addLink(req, res) {
    const { url } = req.body
    if (!url) {
      return res.status(500).json({ error: "Aucun url fournis veuillez en ajouter un." })
    }
  
    try {
      const createUtopyaLink = await utopyaLinks.create({ url });
      return res.status(200).json(createUtopyaLink)
    }catch(e) {
      return res.status(500).json({error: e})
    }
  
  }



module.exports = {
  getAllLinks,
  addLink,
  deleteLink
};
