const express = require('express')
const Password = require('../models/passwordModel');

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')


router.use(requireAuth)
//Get all passwords
router.get('/', async (req, res) => {
    const user_id = req.user._id;
    try {
            const passwords = await Password.find({user_id});
        res.json(passwords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new password
router.post('/', async (req, res) => {
    try {
        const user_id = req.user._id; // Assuming req.user is set by your middleware

        // Use the spread operator to merge req.body fields with user_id
        const newPassword = new Password({ ...req.body, user_id });
        
        await newPassword.save();
        res.json({ success: true, data: newPassword });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a password by ID
router.delete('/', async (req, res) => {
    try {
        const id = req.body;
        await Password.deleteOne(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router