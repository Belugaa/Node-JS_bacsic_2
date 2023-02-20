import { conn, sql } from "../configs/connectDB.js";

const payRoll = async (req, res) => {
  var pool = await conn;
  var sqlStringPhuCap =
    "SELECT SUM(SoTien) AS Data FROM PhuCap WHERE mstk = @mstk;";
  var sqlStringKhauTru =
    "SELECT SUM(SoTien) AS Data FROM KhauTru WHERE mstk = @mstk;";
  var sqlStringHeSoLuong =
    "SELECT SUM(HeSo) AS Data FROM HeSoLuong WHERE mstk = @mstk;";
  var sqlStringLuongCoBan =
    "SELECT SUM(LuongCoBan) AS Data FROM HeSoLuong WHERE mstk = @mstk;";

  function fetchTheData(id, pool, sqlString) {
    return new Promise((resolve, reject) => {
      pool
        .request()
        .input("mstk", sql.Int, id)
        .query(sqlString, (err, data) => {
          if (err) reject(err);
          else resolve(data.recordset[0].Data);
        });
    });
  }

  function TinhLuong(LuongCoBan, HeSoLuong, PhuCap, KhauTru) {
    var LuongThucNhan = LuongCoBan * HeSoLuong + PhuCap - KhauTru;
    console.log(LuongThucNhan);
    return res.json(LuongThucNhan);
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
  var sqlString =
    "SELECT * FROM Luong;";
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset);
  });
}

const luongNv = async (req, res) => {
  var pool = await conn;
  var sqlString =
    `select a.MaNhanVien, a.HoTen, b.HeSo, b.LuongCoBan from NhanVien as a join Luong as b on a.MaLuong = b.MaLuong;`;
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset);
  });
}

const dtluongNv = async (req, res) => {
  var pool = await conn;
  var sqlString =
    `select a.MaNhanVien, a.HoTen, b.HeSo, b.LuongCoBan from NhanVien as a 
    join Luong as b on a.MaLuong = b.MaLuong
    where MaNhanVien=@MaNhanVien`;
  return await pool.request()
  .input("MaNhanVien", sql.VarChar, req.params.id)
  .query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    res.status(200).json(data.recordset[0]);
  });
}

module.exports = {
  payRoll,
  hesoluong,
  luongNv,
  dtluongNv
};
