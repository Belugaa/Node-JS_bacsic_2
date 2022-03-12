const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


const initWebRoute = (app) => {
    router.get('/',homeController.getHomePage);
    
    router.get('/detail/user/:id',homeController.getDetail)
    
    router.post('/create-new-user',homeController.createNewUser);
    
    router.post('/delete-user/:id',homeController.deleteUser);

    router.get('/edit-user/:id',homeController.editUser);

    router.post('/update-user/:id', homeController.updateUser);
    return app.use('/', router);
}

module.exports = initWebRoute;