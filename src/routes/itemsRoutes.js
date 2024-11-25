const express = require('express')
const { getItems, createItem } = require('../controllers/ItemController')
const { validateRequest } = require('../middleware/validateRequest')
const verifyToken = require('../middleware/verifyToken ')

const router = express.Router()

router.get('/items', getItems)
router.post('/items/create', validateRequest, createItem)

module.exports = router
