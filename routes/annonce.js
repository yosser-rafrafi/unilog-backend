const router = require('express').Router();
const annoceController = require('../controllers/annonceController');
const upload = require("../middlewares/upload");
const { authorize } = require("../middlewares/auth");

router.get('/', annoceController.getAllAnnoce)
router.get('/:id', annoceController.getAnnoce)
router.post('/', authorize("Proprietere"), upload.array('photos', 5), annoceController.createAnnoce)

module.exports = router