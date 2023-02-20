import { conn, sql } from "../configs/connectDB.js";

const getNhanVien = async (req, res) => {
  var pool = await conn;
  var sqlString = "select * from NhanVien where MaNhanVien = @mnv";
  return await pool
    .request()
    .input("mnv", sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
      if (err) console.log(err);
      res.json(data.recordset[0]);
    });
};

const allNhanVien = async (req, res) => {
  var pool = await conn;
  var sqlString = `select * from NhanVien`;
  return await pool.request().query(sqlString, (err, data) => {
    if (err) console.log(err);
    return res.render("NhanVien.ejs", { dataUser: data.recordset });
  });
};

const deleteHoSo = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  delete from BangCong where MaNhanVien = @MaNhanVien;
  delete from PhuCapNhanVien where MaNhanVien = @MaNhanVien;
  delete from KhauTruNhanVien where MaNhanVien = @MaNhanVien;
  delete from TaiKhoan where MaNhanVien = @MaNhanVien;
  delete from PhieuLuong where MaNhanVien = @MaNhanVien;
  delete from NhanVien where MaNhanVien = @MaNhanVien;
  `;
  return await pool
    .request()
    .input("MaNhanVien", sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
      if (err) console.log(err);
      res.json("Xóa thành công");
    });
};

const searchHoSo = async (req, res) => {
  var pool = await conn;
  var sqlString = `select * from NhanVien where HoTen like '%${
    req.query.name ? req.query.name : ""
  }%'`;
  return await pool
    .request()
    // .input('name', sql.VarChar, req.params.name)
    .query(sqlString, (err, data) => {
      if (err) console.log(err);
      res.json(data.recordset);
    });
};

const updateHoSo = async (req, res) => {
  var pool = await conn;
  var sqlString = `UPDATE NhanVien 
    SET HoTen=@HoTen, NgaySinh=@NgaySinh, DiaChi=@DiaChi, DienThoai=@DienThoai, GioiTinh=@GioiTinh, ChucVu=@ChucVu, CCCD=@CCCD, Email=@Email, NgayBatDauLam=@NgayBatDauLam 
    WHERE MaNhanVien=@MaNhanVien`;
  return await pool
    .request()
    .input("MaNhanVien", sql.VarChar, req.body.MaNhanVien)
    .input("HoTen", sql.VarChar, req.body.HoTen)
    .input("NgaySinh", sql.Date, req.body.NgaySinh)
    .input("DiaChi", sql.VarChar, req.body.DiaChi)
    .input("DienThoai", sql.VarChar, req.body.DienThoai)
    .input("GioiTinh", sql.VarChar, req.body.GioiTinh)
    .input("ChucVu", sql.VarChar, req.body.ChucVu)
    .input("CCCD", sql.VarChar, req.body.CCCD)
    .input("Email", sql.VarChar, req.body.Email)
    .input("NgayBatDauLam", sql.Date, req.body.NgayBatDauLam)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
    });
};

const createHoSo = async (req, res) => {
  var pool = await conn;
  var sqlString = `
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

module.exports = {
  getNhanVien,
  deleteHoSo,
  searchHoSo,
  allNhanVien,
  updateHoSo,
  createHoSo,
};
