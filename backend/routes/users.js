const Item = require('../model/Item');
const User = require('../model/User');
// import { verifyToken, verifyTokenAndAuthorization } from './verifyToken';

const dotenv = require('dotenv');
const router = require('express').Router();
dotenv.config();

// get all items for own content by user id, need verify
router.get('/:id', async (req, res) => {
  const items = await User.findById(req.params.id).select('username email content isAdmin').populate('content');
  res.status(200).json(items);
});

// post data by user id, need verify
router.post('/:id', async (req, res) => {
  const filter = { _id: req.params.id };
  const newItem = new Item({
    user: req.params.id,
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.img,
  });

  try {
    await newItem.save();
    const findUserItems = await Item.find().where({ user: req.params.id });
    const updateContent = await User.findOneAndUpdate(filter, { $set: { content: findUserItems || [] } }, { new: true })
      .populate('content')
      .select('username email content isAdmin createdAt updatedAt');
    return res.status(201).json(updateContent);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete items
router.delete('/:id/item/:itemId', async (req, res) => {
  const filterUser = { user: req.params.id };
  const filterItem = { _id: req.params.itemId };

  try {
    const deleteItem = await Item.findOneAndDelete(filterItem, { new: true }).where(filterUser);
    await User.findByIdAndUpdate(filterUser.user, { $pull: { content: req.params.itemId } }, { new: true });
    return res.status(200).json(deleteItem);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update user
router.patch('/:id/item/:itemId', async (req, res) => {
  const filterUser = { user: req.params.id };
  const filterItem = { _id: req.params.itemId };
  try {
    const newItem = await Item.findByIdAndUpdate(filterItem, req.body, { new: true });
    return res.status(200).json(newItem);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

// user bisa memiliki konten sendiri, user bisa post konten, user bisa delete konten
// user bisa edit konten
