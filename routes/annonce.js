const router = require('express').Router();
const annoceController = require('../controllers/annonceController');

router.get('/', annoceController.getAllAnnoce)
router.get('/:id', annoceController.getAnnoce)
router.get('/search/:key', annoceController.searchAnnoce)
router.post('/', annoceController.createAnnoce)

module.exports = router