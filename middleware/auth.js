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
                //ini 36000 dalam second
                var token = jwt.sign({rows}, config.secret, {expiresIn: 36000});
                id_user = rows[0].id;
                username = rows[0].username;
                email = rows[0].email;
                tanggal_daftar = rows[0].tanggal_daftar;
                role = rows[0].role;
                
                const user = {
                    id_user : id_user,
                    username : username,
                    email : email,
                    role : role,
                    tanggal_daftar : tanggal_daftar,
                }
                
                res.json({
                     success : true,
                     message : "Token JWT generate",
                     token : token,
                     data_user : user
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