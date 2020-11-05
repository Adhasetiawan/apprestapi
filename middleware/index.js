var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');

//registrasi sudah terdaftar
router.post('/api/v1/register', auth.registrasi);

// url login
router.post('/api/v1/login', auth.login);

// alamat dengan otoritas khusus
router.get('/api/v1/rahasia', verifikasi(2), auth.halamanrahasia);

module.exports = router;