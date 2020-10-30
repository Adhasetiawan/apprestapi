'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplikasi Rest dapat berjalan", res)
};

//menampilkan semua data mahasiswa
exports.tampilsemuadatamahasiswa = function (req,res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

//menampilkan data mahasiswa berdasarakan id (bisa buat search)
exports.tampilkanberdasarkanid = function(req, res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

//menambahkan data mahasiswa
exports.tambahdatamahasiswa = function(req, res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var prodi = req.body.prodi;

    connection.query('INSERT INTO mahasiswa (nim, nama, prodi) VALUES (?, ?, ?)',
    [nim, nama, prodi],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("data berhasil ditambahkan", res);
        }
    });
};

//mengubah data berdasarkan id
exports.ubahmahasiswa = function(req, res){
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var prodi = req.body.prodi;

    connection.query('UPDATE mahasiswa SET nim = ?, nama = ?, prodi = ? WHERE id_mahasiswa = ?', [nim, nama, prodi, id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("data berhasil berubah", res);
        }
    });
};