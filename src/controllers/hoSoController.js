import {conn, sql} from "../configs/connectDB.js"

const getNhanVien = async (req, res) => {
    var pool = await conn;
    var sqlString = "select * from NhanVien where MaNhanVien = @mnv";
    return await pool.request()
    .input('mnv', sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        res.json(data.recordset[0]);
    });
    // var pool = await conn;
    // var sqlString = "SELECT NhanVien.MaNhanVien, NhanVien.HoTen, BangCong.SoNgayCong, BangCong.SoNgayVang, BangCong.Thang FROM NhanVien INNER JOIN BangCong ON BangCong.MaNhanVien=NhanVien.MaNhanVien;";
    // return await pool.request().query(sqlString, (err, data) => {
    //     if(err) console.log(err);
    //     res.json(data.recordset);
    // });
}

const allNhanVien = async (req, res) => {
    var pool = await conn;
    var sqlString = "select * from NhanVien";
    return await pool.request().query(sqlString, (err, data) => {
        if(err) console.log(err);
        return res.render('NhanVien.ejs', {dataUser: data.recordset});
    });
}

const deleteHoSo = async (req, res) => {
    var pool = await conn;
    var sqlString = "delete from NhanVien where MaNhanVien = @MaNhanVien";
    return await pool.request()
    .input('MaNhanVien', sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        res.send('Xóa thành công');
    });
}

const searchHoSo = async (req, res) => {
    
    var pool = await conn;
    var sqlString = `select * from NhanVien where HoTen like '%${req.query.name ? req.query.name : ''}%'`;
    return await pool.request()
    // .input('name', sql.VarChar, req.params.name)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        res.json(data.recordset)
    });
}

// const editHoSo = async (req, res) => {
//     var pool = await conn;
//     var sqlString = "select * from TaiKhoan where mstk = @mstk";
//     return await pool.request()
//     .input('mstk', sql.VarChar, req.params.id)
//     .query(sqlString, (err, data) => {
//         if(err) console.log(err);
//         // console.log(data.recordset);
//         res.render('editAcc.ejs', {dataUser: data.recordset[0]});
//     });
// }

const updateHoSo = async (req, res) => {
    console.log(req.body);
    var pool = await conn;
    var sqlString = "update TaiKhoan set HoTen=@HoTen, NgaySinh=@NgaySinh, DiaChi=@DiaChi, DienThoai=@DienThoai, GioiTinh=@GioiTinh, ChucVu=@ChucVu, CCCD=@CCCD, Email=@Email, NgayBatDauLam=@NgayBatDauLam where MaNhanVien=@MaNhanVien";
    return await pool.request()
    .input('HoTen', sql.VarChar, req.body.HoTen)
    .input('NgaySinh', sql.Date, req.body.NgaySinh)
    .input('DiaChi', sql.VarChar, req.body.DiaChi)
    .input('DienThoai', sql.VarChar, req.body.DienThoai)
    .input('GioiTinh', sql.VarChar, req.body.GioiTinh)
    .input('ChucVu', sql.VarChar, req.body.ChucVu)
    .input('CCCD', sql.VarChar, req.body.CCCD)
    .input('Email', sql.VarChar, req.body.Email)
    .input('NgayBatDauLam', sql.Date, req.body.NgayBatDauLam)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
    });
}


module.exports = {
    getNhanVien,
    deleteHoSo,
    searchHoSo,
    allNhanVien,
    updateHoSo
}