import { conn, sql } from "../configs/connectDB.js";

const getAllAccounts = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  SELECT NhanVien.MaNhanVien, NhanVien.HoTen, NhanVien.ChucVu, TaiKhoan.UserName, TaiKhoan.PassWord
  FROM NhanVien
  INNER JOIN TaiKhoan ON TaiKhoan.MaNhanVien=NhanVien.MaNhanVien;`;
  return await pool.request().query(sqlString, (err, data) => {
    if (err){
      console.log(err);
      res.status(400).json(err);
    }
    res.json(data.recordset);
  });
};

const createNewAccount = async (req, res) => {
  var pool = await conn;
  var sqlString =`
    INSERT INTO NhanVien(HoTen, NgaySinh, DiaChi, DienThoai, GioiTinh, ChucVu, CCCD, Email, MaLuong, NgayBatDauLam) 
    OUTPUT INSERTED.MaNhanVien VALUES (@HoTen, @NgaySinh, @DiaChi, @DienThoai, @GioiTinh, @ChucVu, @CCCD, @Email, @MaLuong, @NgayBatDauLam);
    `;
  return pool
    .request()
    .input("HoTen", sql.VarChar, req.body.HoTen)
    .input("NgaySinh", sql.Date, req.body.NgaySinh)
    .input("DiaChi", sql.VarChar, req.body.DiaChi)
    .input("DienThoai", sql.VarChar, req.body.DienThoai)
    .input("GioiTinh", sql.VarChar, req.body.GioiTinh)
    .input("ChucVu", sql.VarChar, req.body.ChucVu)
    .input("CCCD", sql.VarChar, req.body.CCCD)
    .input("Email", sql.VarChar, req.body.Email)
    .input("MaLuong", sql.Int, req.body.MaLuong)
    .input("NgayBatDauLam", sql.Date, req.body.NgayBatDauLam)
    .query(sqlString, (err, data) => {
      if (err) console.log(err);
      var msnv = data.recordset[0].MaNhanVien;
      var sqlStringTK =
        "INSERT INTO TaiKhoan(MaNhanVien, UserName, PassWord, Role) VALUES (@MaNhanVien, @UserName, @PassWord, @Role);";
      return pool
        .request()
        .input("MaNhanVien", sql.VarChar, msnv)
        .input("UserName", sql.VarChar, req.body.UserName)
        .input("PassWord", sql.VarChar, req.body.PassWord)
        .input("Role", sql.Int, req.body.Role)
        .query(sqlStringTK, (err, data) => {
          if (err) console.log(err);
          res.send("okk");
        });
    });
};

// const deleteAccount = async (req, res) => {
//     var pool = await conn;
//     var sqlString = "delete from TaiKhoan where mstk = @mstk";
//     return await pool.request()
//     .input('mstk', sql.VarChar, req.params.id)
//     .query(sqlString, (err, data) => {
//         if(err) console.log(err);
//         return res.redirect('/account');
//     });
// }

module.exports = {
  getAllAccounts,
  createNewAccount,
  // deleteAccount
};
