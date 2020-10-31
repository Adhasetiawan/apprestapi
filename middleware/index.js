var express = require('express');
var auth = require('./auth');
var router = express.Router();

//registrasi sudah terdaftar
router.post('/api/v1/register', auth.registrasi);

// url login
router.post('/api/v1/login', auth.login);

module.exports = router;