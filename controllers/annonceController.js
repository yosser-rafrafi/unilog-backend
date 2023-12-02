const Annoce = require('../models/Annoce');

module.exports ={
    createAnnoce: async(req, res) => {
        const newAnnoce= new Annoce(req.body);
        try {
            await newAnnoce.save();
            res.status(200).json("annoce created successfully")
        } catch(error){
            res.status(500).json("failed to create the annoce ")
            console.error('Error creating annoce:', error.message);
        }
    },

    getAllAnnoce: async(req, res) =>{
        try {
            const annoces = await Annoce.find().sort({createdAt: -1})
            res.status(200).json(annoces)
        }catch(error){
            res.status(500).json("failed to get the annoces ")
        }
    },

    getAnnoce: async(req, res) =>{
        try {
            const annoce = await Annoce.findById(req.params.id)
            res.status(200).json(annoce)
        }catch(error){
            res.status(500).json("failed to get the annoce")
        }
    },
    searchAnnoce : async(req, res) =>{
        try{
            const result = await Annoce.aggregate(
                [
                    {
                      $search: {
                        index: "annonce",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        }catch(error){
            res.status(500).json("failed to get the annoces")
        }
    },
}