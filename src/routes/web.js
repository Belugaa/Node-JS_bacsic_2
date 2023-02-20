import accountRoute from './api/accountAPI';
import hosoRoute from './api/hoSoAPI';
import salaryRoute from './api/slaryAPI';
import workDayRoute from './api/workDayAPI';
import loginRoute from './api/loginAPI';
import allowanceRoute from './api/allowanceAPI';
import deductRoute from './api/deductAPI';

const initWebRoute = (app) => {
    app.use('/account', accountRoute);
    app.use('/hoso', hosoRoute);
    app.use('/salary', salaryRoute);
    app.use('/workday', workDayRoute);
    app.use('/auth', loginRoute);
    app.use('/phucap', allowanceRoute);
    app.use('/khautru', deductRoute)
}

module.exports = initWebRoute;