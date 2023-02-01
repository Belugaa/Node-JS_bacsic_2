import {conn, sql} from "../configs/connectDB.js"

const getAllHoSo = async (req, res) => {
    var pool = await conn;
    var sqlString = "select * from HoSo";
    return await pool.request().query(sqlString, (err, data) => {
        if(err) console.log(err);
        // return res.render('account.ejs', {dataUser: data.recordset});
        res.json(data.recordset);
    });
}

const createNewHoSo = async (req, res) => {
    var pool = await conn;
    var sqlString = "insert into HoSo(mshs, mstk, HoTen, NgaySinh, DiaChi, DienThoai, GioiTinh, ChucVu, CCCD, Mail, Anh) values (@mshs, @mstk, @HoTen, @NgaySinh, @DiaChi, @DienThoai, @GioiTinh, @ChucVu, @CCCD, @Mail, @Anh)";
    return await pool.request()
    .input('mshs', sql.VarChar, req.body.mshs)
    .input('mstk', sql.VarChar, req.body.mstk)
    .input('HoTen', sql.VarChar, req.body.HoTen)
    .input('NgaySinh', sql.Date, req.body.NgaySinh)
    .input('DiaChi', sql.VarChar, req.body.DiaChi)
    .input('DienThoai', sql.VarChar, req.body.DienThoai)
    .input('GioiTinh', sql.VarChar, req.body.GioiTinh)
    .input('ChucVu', sql.VarChar, req.body.ChucVu)
    .input('CCCD', sql.VarChar, req.body.CCCD)
    .input('Mail', sql.VarChar, req.body.Mail)
    .input('Anh', sql.VarChar, req.body.Anh)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        // return res.redirect('/');
        res.send("okk");
    });
}

const deleteHoSo = async (req, res) => {
    var pool = await conn;
    var sqlString = "delete from TaiKhoan where mstk = @mstk";
    return await pool.request()
    .input('mstk', sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        return res.redirect('/');
    });
}

const editHoSo = async (req, res) => {
    var pool = await conn;
    var sqlString = "select * from TaiKhoan where mstk = @mstk";
    return await pool.request()
    .input('mstk', sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        // console.log(data.recordset);
        res.render('editAcc.ejs', {dataUser: data.recordset[0]});
    });
}

const updateHoSo = async (req, res) => {
    var pool = await conn;
    var sqlString = "update TaiKhoan set UserName=@UserName, PassWord=@PassWord, Role=@Role where mstk=@mstk";
    return await pool.request()
    .input('mstk', sql.VarChar, req.body.mstk)
    .input('UserName', sql.VarChar, req.body.UserName)
    .input('PassWord', sql.VarChar, req.body.PassWord)
    .input('Role', sql.Int, req.body.Role)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        return res.redirect('/');
    });
}


module.exports = {
    getAllHoSo,
    createNewHoSo,
};