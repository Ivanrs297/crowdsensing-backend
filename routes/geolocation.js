const express = require('express')
const router = express.Router()

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')

router.get('/', async (req, res) => {
    const geolocations = await pool.query('SELECT * FROM Geolocation WHERE user_id= ?',  [req.user.id]);
    console.log(geolocations);
    res.status('200').send({geolocations}) 
})

router.post('/add', isLoggedIn,  async (req, res) => {
    const { latitude, longitude } = req.body;
    const new_geolocation = {
        latitude,
        longitude,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO Geolocation set ?', [new_geolocation]);

    console.log(new_geolocation)
    res.send(req.body)
})

router.delete('/', async(req, res) => {
    const { id } = req.body;
    await pool.query('DELETE FROM Geolocation WHERE ID = ?', [id])

    res.status('200').send("DELETED") 
})

router.patch('/', async(req, res) => {
    const { id, latitude, longitude } = req.body;
    const new_geolocation = {
        latitude,
        longitude,
    };
    await pool.query('UPDATE Geolocation SET ? WHERE ID = ?', [new_geolocation, id])

    res.status('200').send("UPDATED") 
})


module.exports = router;