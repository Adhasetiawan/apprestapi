var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
const conn = require('../koneksi');

//controler buat register (ini controller nya register)
exports.registrasi = function(req,res){
    var post = {
        username : req.body.username,
        email : req.body.email,
        password : md5(req.body.password),
        role : req.body.role,
        tanggal_daftar : new Date()
    }

    var query = "SELECT email FROM ?? WHERE ?? = ?";
    var table = ["user", "email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if (rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error, rows){
                    if (error){
                        console.log(error);
                    }else{
                        response.ok("Resgistrasi berhasil", res);
                    }
                });
            }else{
                response.ok("Email sudah terdaftar, silahkan ganti dengan email lain", res);
            }
        }
    });
};

//controller untuk login
exports.login = function(req, res){
    var post = {
        email : req.body.email,
        password : req.body.password
    }

    var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    var table = ["user", "password", md5(post.password), "email",post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if (rows.length == 1){
                //ini 1440 dalam second
                var token = jwt.sign({rows}, config.secret,{expiresIn: 1440});
                id_user = rows[0].id;

                var data = {
                    id_user : id_user,
                    access_token : token,
                    ip_address : ip.address()
                }

                var query = "INSERT INTO ?? SET ?"
                var table = ["akses_token"]

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                         res.json({
                             success : true,
                             message : "Token JWT generate",
                             token : token,
                             currUser: data.id_user
                         });
                    }
                });
            }else{
                 res.json({"Error": true, "Message":"Email atau password anda salah"});
            }
        }
    });
}

exports.halamanrahasia = function(req, res){
    response.ok("halaman ini hanya untuk yang punya token", res);
}