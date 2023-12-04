const AnnoceModel = require("../models/Annoce");
const UserModel = require("../models/User");

module.exports = {
  createAnnoce: async (req, res) => {
    console.log(req.files)
    const files = req.files?.map(({ filename }) => filename);
    const annonce = { ...req.body, photos: files };
    try {
      const createdAnnonce = await AnnoceModel.create(annonce);
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: { annoncesPublies: createdAnnonce._id },
      });
      res.status(200).json("annoce created successfully");
    } catch (error) {
      res.status(500).json("failed to create the annoce ");
      console.error("Error creating annoce:", error.message);
    }
  },

  getAllAnnoce: async (req, res) => {
    const {search} = req.query
    try {
      let query = {};
      if (search) {
        query = {
          $or: [
            { location: { $regex: search, $options: 'i' } },
            { numberOfRooms: parseInt(search) || 0 }, 
            { rent: parseInt(search) || 0 },
          ],
        };
      }
      const annoces = await AnnoceModel.find(query).sort({ createdAt: -1 });
      res.status(200).json(annoces);
    } catch (error) {
      res.status(500).json("failed to get the annoces ");
    }
  },

  getAnnoce: async (req, res) => {
    try {
      const annoce = await AnnoceModel.findById(req.params.id);
      res.status(200).json(annoce);
    } catch (error) {
      res.status(500).json("failed to get the annoce");
    }
  },
};
