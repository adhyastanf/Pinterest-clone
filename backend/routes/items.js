const Item = require('../model/Item');
// import { verifyToken, verifyTokenAndAuthorization } from './verifyToken';

const dotenv = require('dotenv');
const router = require('express').Router();
dotenv.config();


// get all items for all users
router.get('/', async (req, res) => {
  const items = await Item.find().populate('user', '_id username content createdAt updatedAt');
  res.status(200).json(items);
});

// get one item by item id
router.get('/:id', async (req, res) => {
  const items = await Item.findOne({_id:req.params.id}).populate('user', '_id username content createdAt updatedAt');
  res.status(200).json(items);
});



module.exports = router;
