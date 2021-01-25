const express = require('express');
const router = express.Router();


const publicationsCtrl = require('../controllers/publications');

router.post('/', publicationsCtrl.createPublications);
router.get('/', publicationsCtrl.readAllPublications);
router.put('/:id', publicationsCtrl.updatePublications);
router.delete('/:id', publicationsCtrl.deletePublications);

module.exports = router;