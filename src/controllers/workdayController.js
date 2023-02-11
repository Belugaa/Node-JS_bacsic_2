import {conn, sql} from "../configs/connectDB.js"

const getAllWorkday = async (req, res) => {
    var pool = await conn;
    var sqlString = "SELECT NhanVien.MaNhanVien, NhanVien.HoTen, BangCong.SoNgayCong, BangCong.SoNgayVang, BangCong.Thang FROM NhanVien INNER JOIN BangCong ON BangCong.MaNhanVien=NhanVien.MaNhanVien;";
    return await pool.request().query(sqlString, (err, data) => {
        if(err) console.log(err);
        res.json(data.recordset);
    });
}

module.exports = {
    getAllWorkday
};