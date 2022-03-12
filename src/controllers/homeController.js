// import Pool from "mysql2/typings/mysql/lib/Pool";
import connection from "../configs/connectDB";
import pool from "../configs/connectDB";

const getHomePage = (req, res) => {
    
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
            // results contains rows returned by server
            return res.render('test.ejs', {dataUser: results});
        }
    );
    // console.log(data);
    // return res.render('test.ejs', {dataUser: JSON.stringify(data)});
}

const getDetail = (req, res) => {
    var id = req.params.id;
    connection.query(
        'SELECT * FROM `users` WHERE `id` = ?',[id],
        function(err, results) {
            return res.send(JSON.stringify(results));
        }
    );

}

const createNewUser = async (req, res) => {
    // console.log(req.body);
    // INSERT INTO users (firstName, lastName, email, address)
    // VALUES (req.body.firstName, req.body.lastName, req.body.email, req.body.address );
    
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [req.body.firstName, req.body.lastName, req.body.email, req.body.address]);
    return res.redirect('/');
}

const deleteUser = async (req, res) => {
    var id = req.params.id;
    await pool.execute('delete from users where id = ?', [id]);
    return res.redirect('/');
}

const editUser = (req, res) => {
    var id = req.params.id;
    connection.query(
        'SELECT * FROM `users` WHERE `id` = ?',[id],
        function(err, results, fields) {
            res.render('editUser.ejs', {dataUser: results[0]});
        }
    );
}

const updateUser = async (req, res) => {
    var id = req.params.id;
    await pool.execute('update `users` set `firstName` = ?, `lastName` = ?, `email` = ?, `address` = ? where id = ?',
        [req.body.firstName, req.body.lastName, req.body.email, req.body.address, id]);
    return res.redirect('/');

}


module.exports = {
    getHomePage,
    getDetail,
    createNewUser,
    deleteUser,
    editUser,
    updateUser
};