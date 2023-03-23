import { conn, sql } from "../configs/connectDB.js";
import XLSX from "xlsx";

const NVxlsx = async (req, res) => {
  var pool = await conn;
  var sqlString = "select * from NhanVien";
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    const converJStoExcel = () => {
      const workSheet = XLSX.utils.json_to_sheet(data.recordset);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Nhân Viên");
      // Generate buffer
      XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workBook, "employeeData.xlsx");
    };
    res.json("ok");
    converJStoExcel();
  });
};

const Luongxlsx = async (req, res) => {
  var pool = await conn;
  var sqlString = "select * from NhanVien";
  return await pool.request().query(sqlString, (err, data) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    const converJStoExcel = () => {
      const workSheet = XLSX.utils.json_to_sheet(data.recordset);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Nhân Viên");
      // Generate buffer
      XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workBook, "employeeData.xlsx");
    };
    res.json("ok");
    converJStoExcel();
  });
};

module.exports = {
  NVxlsx,
};
