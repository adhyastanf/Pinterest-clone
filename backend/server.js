const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;

dotenv.config();
mongoose.set('strictQuery', false);

// routes
const auth = require('./routes/auth');
const items = require('./routes/items');
const users = require('./routes/users');

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/items', items);
app.use('/api/users', users);

app.listen(port, () => {
  console.log('Server is running');
});
