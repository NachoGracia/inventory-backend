const { getAllItems, insertItem } = require('../models/ItemMode')
const capitalize = require('../utils/capitalizeString')

const getItems = async (req, res) => {
  try {
    const items = await getAllItems()

    res.status(200).json(items)
  } catch (error) {
    res.status(400).json({ error: 'Error loading items' })
  }
}

const createItem = async (req, res) => {
  const { item, description = item, quantity } = req.body

  if (!item || !quantity) {
    return res
      .status(400)
      .json({ error: 'Item, description and quantity are required' })
  }

  const [itemCap, descriptionCap] = [item, description].map(capitalize)

  try {
    const newItem = await insertItem(itemCap, descriptionCap, quantity)
    res.status(201).json(newItem)
  } catch (error) {
    res.status(400).json('Error create new item', error)
  }
}

module.exports = { getItems, createItem }
