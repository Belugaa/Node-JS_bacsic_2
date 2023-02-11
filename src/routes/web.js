import accountRoute from './api/accountAPI';
import hosoRoute from './api/hoSoAPI';
import salaryRoute from './api/slaryAPI';
import workDayRoute from './api/workDayAPI';

const initWebRoute = (app) => {
    app.use('/account', accountRoute);
    app.use('/hoso', hosoRoute);
    app.use('/salary', salaryRoute);
    app.use('/workday', workDayRoute);
}

module.exports = initWebRoute;