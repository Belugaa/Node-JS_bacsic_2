import { conn, sql } from "../configs/connectDB.js";

const getAllWorkday = async (req, res) => {
  var pool = await conn;
  var sqlString =
    "SELECT NhanVien.MaNhanVien, NhanVien.HoTen, BangCong.SoNgayCong, BangCong.SoNgayVang, BangCong.Thang, BangCong.TrangThai FROM NhanVien INNER JOIN BangCong ON BangCong.MaNhanVien=NhanVien.MaNhanVien;";
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset);
  });
};


const getWDbyMonth = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  SELECT NhanVien.MaNhanVien, NhanVien.HoTen, BangCong.SoNgayCong, BangCong.SoNgayVang, BangCong.Thang, BangCong.TrangThai FROM NhanVien INNER JOIN BangCong ON BangCong.MaNhanVien=NhanVien.MaNhanVien WHERE MONTH(BangCong.Thang)=@Thang AND YEAR(BangCong.Thang)=@Nam ${req.query.status == 3 ? '' : 'AND BangCong.TrangThai=@TrangThai'} ;
  `;
  return await pool
  .request()
  .input("Thang", sql.Int, req.query.month)
  .input("Nam", sql.Int, req.query.year)
  .input("TrangThai", sql.Int, req.query.status)
  .query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset);
  });
};

const getWorkday = async (req, res) => {
  var pool = await conn;
  var sqlString =
    "select * from BangCong WHERE MaNhanVien=@MaNhanVien order by Thang DESC";
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

const createWorkDay = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  insert into BangCong(MaNhanVien, SoNgayVang, SoNgayCong, Thang, TrangThai) 
  values (@MaNhanVien, @SoNgayVang, @SoNgayCong, @Thang, @TrangThai)
  `;
  return await pool
    .request()
    .input("MaNhanVien", sql.VarChar, req.params.id)
    .input("SoNgayVang", sql.Int, req.body.SoNgayVang)
    .input("SoNgayCong", sql.Int, req.body.SoNgayCong)
    .input("TrangThai", sql.Int, req.body.TrangThai)
    .input("Thang", sql.Date, req.body.Thang)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("Thêm bảng chấm công thành công");
    });
};

const getWorkDayWithMonth = async (req, res) => {
  var pool = await conn;
  var sqlString = `
    SELECT * FROM BangCong
    WHERE Thang BETWEEN @startDate AND @endDate;
    `;
  return await pool
    .request()
    .input("startDate", sql.Date, req.body.startDate)
    .input("startDate", sql.Date, req.body.endDate)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json(data.recordset);
    });
};

const updateWorkDay = async (req, res) => {
  var pool = await conn;
  var sqlString = `
    UPDATE BangCong
    SET SoNgayCong=@SoNgayCong, SoNgayVang=@SoNgayVang, TrangThai=2 
    WHERE MaSoCong=@MaSoCong;
    `;//sau khi update thi status chuyen tu reject sang pending
  return await pool
    .request()
    .input("MaSoCong", sql.Int, req.params.id)
    .input("SoNgayCong", sql.Int, req.body.SoNgayCong)
    .input("SoNgayVang", sql.Int, req.body.SoNgayVang)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

module.exports = {
  getAllWorkday,
  getWorkDayWithMonth,
  createWorkDay,
  getWorkday,
  updateWorkDay,
  getWDbyMonth,
};
