import {conn, sql} from "../configs/connectDB.js"

const getAllAccounts = async (req, res) => {
    var pool = await conn;
    var sqlString = "select * from TaiKhoan";
    return await pool.request().query(sqlString, (err, data) => {
        if(err) console.log(err);
        return res.render('account.ejs', {dataUser: data.recordset});
    });
}

const createNewAccount = async (req, res) => {
    var pool = await conn;
    var sqlString = "insert into TaiKhoan(mstk, UserName, PassWord, Role) values (@mstk, @UserName, @PassWord, @Role)";
    return await pool.request()
    .input('mstk', sql.VarChar, req.body.mstk)
    .input('UserName', sql.VarChar, req.body.UserName)
    .input('PassWord', sql.VarChar, req.body.PassWord)
    .input('Role', sql.Int, req.body.Role)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        return res.redirect('/account');
    });
}

const deleteAccount = async (req, res) => {
    var pool = await conn;
    var sqlString = "delete from TaiKhoan where mstk = @mstk";
    return await pool.request()
    .input('mstk', sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        return res.redirect('/account');
    });
}

const editAccount = async (req, res) => {
    var pool = await conn;
    var sqlString = "select * from TaiKhoan where mstk = @mstk";
    return await pool.request()
    .input('mstk', sql.VarChar, req.params.id)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        // console.log(data.recordset);
        res.render('editAcc.ejs', {dataUser: data.recordset[0]});
    });
}

const updateAccount = async (req, res) => {
    var pool = await conn;
    var sqlString = "update TaiKhoan set UserName=@UserName, PassWord=@PassWord, Role=@Role where mstk=@mstk";
    return await pool.request()
    .input('mstk', sql.VarChar, req.body.mstk)
    .input('UserName', sql.VarChar, req.body.UserName)
    .input('PassWord', sql.VarChar, req.body.PassWord)
    .input('Role', sql.Int, req.body.Role)
    .query(sqlString, (err, data) => {
        if(err) console.log(err);
        return res.redirect('/account');
    });
}


module.exports = {
    getAllAccounts,
    createNewAccount,
    deleteAccount,
    updateAccount,
    editAccount
};