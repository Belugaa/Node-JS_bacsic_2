import { conn, sql } from "../configs/connectDB.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const username = req.body.UserName;
  const password = req.body.PassWord;
  var pool = await conn;
  var sqlString = `select * from TaiKhoan where UserName=@UserName and PassWord=@PassWord`;
  return await pool
    .request()
    .input("UserName", sql.VarChar, username)
    .input("PassWord", sql.VarChar, password)
    .query(sqlString, (err, data) => {
      if (err) console.log(err);
      else {
        if (!data.recordset[0]) res.json("Đăng nhập thất bại");
        else {
          const user = data.recordset[0];
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          res.json({
            message: "Đăng nhập thành công",
            accessToken: accessToken,
          });
        }
      }
    });
};

const isMe = async (req, res) => {
  try {
    var jwttoken = req.headers.authorization;
    var TokenArray = jwttoken.split(" ");
    const result = jwt.verify(TokenArray[1], process.env.ACCESS_TOKEN_SECRET);
    res.json({
      ID: result.MaNhanVien,
      UserName: result.UserName,
      Role: result.Role,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const changePW = async (req, res) => {
  var pool = await conn;
  var sqlString = `
  select * from TaiKhoan where PassWord=@PassWord AND MaNhanVien=@MaNhanVien;
  `;
  return await pool
    .request()
    .input("PassWord", sql.VarChar, req.body.PassWord)
    .input("MaNhanVien", sql.VarChar, req.body.id)
    .query(sqlString, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        if (!data.recordset[0]) res.status(400).json("Mật khẩu không đúng");
        else {
          var sqlString = `UPDATE TaiKhoan 
          SET PassWord=@PassWord 
          WHERE MaNhanVien=@MaNhanVien`;
          pool
            .request()
            .input("PassWord", sql.VarChar, req.body.newPassWord)
            .input("MaNhanVien", sql.VarChar, req.body.id)
            .query(sqlString, (err, data) => {
              if (err) {
                console.log(err);
                res.status(400).json(err);
              } else {
                res.status(200).json('Thay đổi thành công');
              }
            });
        }
      }
    });
};

module.exports = {
  login,
  isMe,
  changePW,
};
