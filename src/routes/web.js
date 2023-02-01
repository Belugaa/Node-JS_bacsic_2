import accountRoute from './api/accountAPI';
import hosoRoute from './api/hoSo.controller'

const initWebRoute = (app) => {
    app.use('/account', accountRoute);
    app.use('/hoso', hosoRoute);
}

module.exports = initWebRoute;