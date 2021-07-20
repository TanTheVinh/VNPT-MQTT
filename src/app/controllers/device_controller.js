const pool = require("../../config/db/database");

class device_controller {

    //[GET] /list-device/
    list(req, res, next){
        pool
            .query('select * from thietbi')
            .then(result => {
                const thietbi = result.rows;
                // res.json({ thietbi });
                res.render('listDevice', { thietbi });
                console.log({thietbi});
            })
            .catch(next)
    }

    //[GET] /list-device/detail
    detail(req, res, next){
        pool
            .query('select * from thietbi where idthietbi = $1', [req.params.id])
            .then(result => {
                const thietbi = result.rows;
                // res.json({ thietbi });
                res.render('infoDevice', { thietbi });

            })
            .catch(next);
    }

    //[GET] /list-device/edit
    edit(req, res, next){
        res.render('editInfoDevice');
    }

    //[GET] /list-device/add
    add(req, res, next){
        res.render('addDevice');
    }
}

module.exports = new device_controller;