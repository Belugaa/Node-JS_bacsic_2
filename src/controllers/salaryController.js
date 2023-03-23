import { conn, sql } from "../configs/connectDB.js";

const payRoll = async (req, res) => {
  var pool = await conn;
  var sqlStringPhuCap = `
  select sum(SoTien) as Data from PhuCapNhanVien as a join PhuCap as b on a.MaSoPhuCap = b.MaSoPhuCap 
  Where a.MaNhanVien=@MaNhanVien;
  `;

  var sqlStringKhauTru = `
  select sum(SoTien) as Data from KhauTruNhanVien as a join KhauTru as b on a.MaSoKhauTru = b.MaSoKhauTru
  Where a.MaNhanVien=@MaNhanVien;
  `;

  var sqlStringHeSoLuong = `
  SELECT SUM(b.HeSo) AS Data from NhanVien as a join Luong as b on a.MaLuong = b.MaLuong
  Where a.MaNhanVien=@MaNhanVien;
  `;

  var sqlStringLuongCoBan = `
  SELECT SUM(b.LuongCoBan) AS Data from NhanVien as a join Luong as b on a.MaLuong = b.MaLuong
  Where a.MaNhanVien=@MaNhanVien;
  `;

  function fetchTheData(id, pool, sqlString) {
    return new Promise((resolve, reject) => {
      pool
        .request()
        .input("MaNhanVien", sql.VarChar, id)
        .query(sqlString, (err, data) => {
          if (err) reject(err);
          else resolve(data.recordset[0].Data);
        });
    });
  }

  function TinhLuong(LuongCoBan, HeSoLuong, PhuCap, KhauTru) {
    var LuongThucNhan = LuongCoBan * HeSoLuong + PhuCap - KhauTru;
    // const VND = new Intl.NumberFormat("vi-VN", {
    //   style: "currency",
    //   currency: "VND",
    // });
    return res.status(200).json(LuongThucNhan);
  }

  const TongPhuCap = await fetchTheData(req.params.id, pool, sqlStringPhuCap);
  const TongKhauTru = await fetchTheData(req.params.id, pool, sqlStringKhauTru);
  const HeSoLuong = await fetchTheData(req.params.id, pool, sqlStringHeSoLuong);
  const LuongCoBan = await fetchTheData(
    req.params.id,
    pool,
    sqlStringLuongCoBan
  );

  const LuongThucNhan = await TinhLuong(
    LuongCoBan,
    HeSoLuong,
    TongPhuCap,
    TongKhauTru
  );
  return LuongThucNhan;
  // console.log(LuongCoBan*HeSoLuong + TongPhuCap - TongKhauTru);
};

const hesoluong = async (req, res) => {
  var pool = await conn;
  var sqlString = "SELECT * FROM Luong;";
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset);
  });
};

const luongNv = async (req, res) => {
  var pool = await conn;
  var sqlString = `select a.MaNhanVien, a.HoTen, b.HeSo, b.LuongCoBan from NhanVien as a join Luong as b on a.MaLuong = b.MaLuong;`;
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset);
  });
};

const dtluongNv = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  select a.MaNhanVien, a.HoTen, b.HeSo, b.LuongCoBan 
  from NhanVien as a join Luong as b on a.MaLuong = b.MaLuong
  where MaNhanVien=@MaNhanVien
    `;
  return await pool
    .request()
    .input("MaNhanVien", sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json(data.recordset[0]);
    });
};

const crPhieuLuong = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  select * from BangCong 
  where MaNhanVien=@MaNhanVien and MONTH(Thang)=MONTH(GETDATE()) and YEAR(Thang)=YEAR(GETDATE());
  `;
  return await pool
    .request()
    .input("MaNhanVien", sql.VarChar, req.body.MaNhanVien)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      var pc = req.body.ChiTietPhuCap;
      var kt = req.body.ChiTietKhauTru;
      // console.log(`"[${pc}]"`);
      // res.status(200).json("ok");

      var sqlString1 = `
      insert into PhieuLuong(MaNhanVien, SoNgayCong, SoNgayVang, LuongThucLinh, ChiTietKhauTru, TongKhauTru, ChiTietPhuCap, TongPhuCap, NgayTao) 
      values (@MaNhanVien, @SoNgayCong, @SoNgayVang, @LuongThucLinh, @ChiTietKhauTru, @TongKhauTru, @ChiTietPhuCap, @TongPhuCap, GETDATE());
      `;
      return pool
        .request()
        .input("MaNhanVien", sql.VarChar, req.body.MaNhanVien)
        .input("SoNgayCong", sql.Int, data.recordset[0].SoNgayCong)
        .input("SoNgayVang", sql.Int, data.recordset[0].SoNgayVang)
        .input("LuongThucLinh", sql.Int, req.body.LuongThucLinh)
        .input("ChiTietKhauTru", sql.VarChar, `${kt}`)
        .input("TongKhauTru", sql.Int, req.body.TongKhauTru)
        .input("ChiTietPhuCap", sql.VarChar, `${pc}`)
        .input("TongPhuCap", sql.Int, req.body.TongPhuCap)
        .query(sqlString1, (err, data) => {
          if (err) {
            res.status(400).json(err);
            console.log(err);
          }
          res.status(200).json("ok");
        });
    });
};

const PhieuLuong = async (req, res) => {
  var pool = await conn;
  var sqlString = "select * from PhieuLuong;";

  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    }
    res.status(200).json(data.recordset);
  });
};

const getPLWithMonth = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  select a.MaNhanVien, a.HoTen, b.SoNgayCong, b.SoNgayVang, b.LuongThucLinh, b.ChiTietKhauTru, b.TongKhauTru, b.ChiTietPhuCap, b.TongPhuCap, b.NgayTao 
  from NhanVien as a join PhieuLuong as b on a.MaNhanVien=b.MaNhanVien
  WHERE MONTH(b.NgayTao)=@Thang AND YEAR(b.NgayTao)=@Nam;
  `;
  return await pool
    .request()
    .input("Thang", sql.Int, req.query.month)
    .input("Nam", sql.Int, req.query.year)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json(data.recordset);
    });
};

const updateBL = async (req, res) => {
  var pool = await conn;
  var sqlString = `UPDATE Luong 
    SET HeSo=@HeSo, LuongCoBan=@LuongCoBan 
    WHERE MaLuong=@MaLuong`;
  return await pool
    .request()
    .input("MaLuong", sql.Int, req.params.id)
    .input("HeSo", sql.Float, req.body.HeSo)
    .input("LuongCoBan", sql.Int, req.body.LuongCoBan)
    .query(sqlString, (err, data) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      res.status(200).json("ok");
    });
};

const getPhieuLuong = async (req, res) => {
  var pool = await conn;
  var sqlString = "select * from PhieuLuong where MaNhanVien = @mnv";
  return await pool
    .request()
    .input("mnv", sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
      if (err) console.log(err);
      res.status(200).json(data.recordset);
    });
};

module.exports = {
  payRoll,
  hesoluong,
  luongNv,
  dtluongNv,
  crPhieuLuong,
  PhieuLuong,
  getPLWithMonth,
  updateBL,
  getPhieuLuong
};
