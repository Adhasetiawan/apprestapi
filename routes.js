'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilsemuadatamahasiswa);

    app.route('/tampil/:id')
        .get(jsonku.tampilkanberdasarkanid);

    app.route('/tambah')
        .post(jsonku.tambahdatamahasiswa);

    app.route('/rubah')
        .put(jsonku.ubahmahasiswa);

    app.route('/hapus')
        .delete(jsonku.hapusdatamahasiswa);

    app.route('/tampilgroupmatkul')
        .get(jsonku.tampilkangroupmatakuliah);
}