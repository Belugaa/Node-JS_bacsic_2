import { conn, sql } from "../configs/connectDB.js";

const getAll = async (req, res) => {
  var pool = await conn;
  var sqlString = "SELECT * FROM PhuCap;";
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset);
  });
};

const updateAL = async (req, res) => {
  var pool = await conn;
  var sqlString = `UPDATE PhuCap 
    SET TenPhuCap=@TenPhuCap, SoTien=@SoTien 
    WHERE MaSoPhuCap=@MaSoPhuCap`;
  return await pool
    .request()
    .input("MaSoPhuCap", sql.Int, req.params.id)
    .input("TenPhuCap", sql.VarChar, req.body.TenPhuCap)
    .input("SoTien", sql.Int, req.body.SoTien)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const delAL = async (req, res) => {
  var pool = await conn;
  var sqlString = "delete from PhuCap where MaSoPhuCap=@MaSoPhuCap";
  return await pool
    .request()
    .input("MaSoPhuCap", sql.Int, req.params.id)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const addAL = async (req, res) => {
  var pool = await conn;
  var sqlString = `INSERT INTO PhuCap (TenPhuCap, SoTien)
    VALUES (@TenPhuCap, @SoTien);`;
  return await pool
    .request()
    .input("TenPhuCap", sql.VarChar, req.body.TenPhuCap)
    .input("SoTien", sql.Int, req.body.SoTien)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const AddAlNv = async (req, res) => {
  var pool = await conn;
  var sqlString = `INSERT INTO PhuCapNhanVien (MaSoPhuCap, MaNhanVien, NgayTao)
    VALUES (@MaSoPhuCap, @MaNhanVien, GETDATE());`;
  return await pool
    .request()
    .input("MaSoPhuCap", sql.Int, req.body.MaSoPhuCap)
    .input("MaNhanVien", sql.VarChar, req.body.MaNhanVien)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const detailAL = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  select a.MaNhanVien, b.TenPhuCap, b.SoTien 
  from PhuCapNhanVien as a join PhuCap as b on a.MaSoPhuCap = b.MaSoPhuCap 
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


const sumAL = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  select sum(SoTien) as data from PhuCapNhanVien as a join PhuCap as b on a.MaSoPhuCap = b.MaSoPhuCap 
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
  updateAL,
  delAL,
  addAL,
  AddAlNv,
  detailAL,
  sumAL
};
