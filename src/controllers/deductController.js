import { conn, sql } from "../configs/connectDB.js";

const getAll = async (req, res) => {
  var pool = await conn;
  var sqlString = "SELECT * FROM KhauTru;";
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset);
  });
};

const updateKT = async (req, res) => {
  var pool = await conn;
  var sqlString = `UPDATE KhauTru 
    SET TenKhauTru=@TenKhauTru, SoTien=@SoTien 
    WHERE MaSoKhauTru=@MaSoKhauTru`;
  return await pool
    .request()
    .input("MaSoKhauTru", sql.Int, req.params.id)
    .input("TenKhauTru", sql.VarChar, req.body.TenKhauTru)
    .input("SoTien", sql.Int, req.body.SoTien)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const delKT = async (req, res) => {
  var pool = await conn;
  var sqlString = "delete from KhauTru where MaSoKhauTru=@MaSoKhauTru";
  return await pool
    .request()
    .input("MaSoKhauTru", sql.Int, req.params.id)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const addKT = async (req, res) => {
  var pool = await conn;
  var sqlString = `INSERT INTO KhauTru (TenKhauTru, SoTien)
    VALUES (@TenKhauTru, @SoTien);`;
  return await pool
    .request()
    .input("TenKhauTru", sql.VarChar, req.body.TenKhauTru)
    .input("SoTien", sql.Int, req.body.SoTien)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const AddKTNv = async (req, res) => {
  var pool = await conn;
  var sqlString = `INSERT INTO KhauTruNhanVien (MaSoKhauTru, MaNhanVien, NgayTao)
    VALUES (@MaSoKhauTru, @MaNhanVien, GETDATE());`;
  return await pool
    .request()
    .input("MaSoKhauTru", sql.Int, req.body.MaSoKhauTru)
    .input("MaNhanVien", sql.VarChar, req.body.MaNhanVien)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const detailKT = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  select a.MaNhanVien, b.TenKhauTru, b.SoTien 
  from KhauTruNhanVien as a join KhauTru as b on a.MaSoKhauTru = b.MaSoKhauTru
  Where a.MaNhanVien=@MaNhanVien;`;
  return await pool
    .request()
    .input("MaNhanVien", sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json(data.recordset);
    });
};

const sumDD = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  select sum(SoTien) as data from KhauTruNhanVien as a join KhauTru as b on a.MaSoKhauTru = b.MaSoKhauTru
  Where a.MaNhanVien=@MaNhanVien;
  `;
  return await pool
    .request()
    .input("MaNhanVien", sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      if (data.recordset[0].data == null){
        res.status(200).json(0);
      }
      else res.status(200).json(data.recordset[0].data);
    });
}
module.exports = {
  getAll,
  updateKT,
  delKT,
  addKT,
  AddKTNv,
  detailKT,
  sumDD
};
