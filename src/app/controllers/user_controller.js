const pool = require("../../config/db/database");
const md5 = require('md5');
const session = require("express-session");

class user_controller {

    //[GET] /list-user/
    list(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            if(req.session.quyen == 'nv'){
                const idnguoidung = req.session.idnguoidung;
                pool
                    .query(`SELECT * FROM nguoidung, donvi 
                    where nguoidung.iddonvi = donvi.iddonvi and idnguoidung = $1`, [idnguoidung])
                    .then(result => {
                        const nguoidung = result.rows[0];
                        res.render('infoUser', {nguoidung});
                    })
            }else{
                pool
                .query(`SELECT
                nguoidung.idnguoidung,
                nguoidung.tennguoidung,
                nguoidung.iddonvi,
                nguoidung.taikhoan,
                nguoidung.quyen,
                donvi.tendonvi
            FROM 
                nguoidung
            INNER JOIN 
                donvi  ON nguoidung.iddonvi = donvi.iddonvi;`)
                .then(result => {
                    const nguoidung = result.rows
                    
                    res.render('listUser', { nguoidung })
                }).catch(next)
            }

                    // 
        }
    }
   
    //[GET] /list-user/add
    add(req, res, next){
        if(req.session.idnguoidung === undefined){
            res.redirect('/');
        }
        else{
            if(req.session.quyen == 'nv'){
               res.redirect('/list-user');
            }else{
                pool
                .query(`SELECT * FROM donvi`)
                .then(result => {
                    const donvi = result.rows;
                    //res.json({nguoidung} );
                    res.render('addUser', { donvi });
                    //console.log({nguoidung});
                })
                .catch(next);
            }

        }
    }
    
        // [POST] /list-user/insert
    insert(req, res, next){
        // res.json(req.body)
        const nguoidung = Object.values(req.body);
        pool
        .query('INSERT INTO nguoidung (tennguoidung, taikhoan, matkhau, iddonvi, quyen) '
            + 'VALUES ($1, $2, $3, $4, $5)', nguoidung)
            //console.log(ok)
        .then(() =>{
            res.render('addUser',{message: "\"thêm thành công\""})
        })
        .catch(next);
    }
    
        // [DELETE] /list-user/delete/:id
    delete(req, res, next){
        try{
            pool
            .query('delete from nguoidung where idnguoidung = $1', [req.params.id])
            .then(() => {
                
                res.redirect('back');
            })
            .catch(next);
        }
        catch(err){
            res.render('listUser', {message: '"không thể xóa"'})
        }
    }

    
}

module.exports = new user_controller;