const express = require('express');
const { getFoods, addFood } = require('../controllers/foodController');
const router = express.Router();

router.get('/', getFoods); // Saare items dekhne ke liye
router.post('/add', addFood); // Naya item add karne ke liye (Admin)

module.exports = router;