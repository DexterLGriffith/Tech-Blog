const router = require('express').Router();

const dashboardRoutes = require('./dashboardRoutes');
const homeRoutes = require('./homeRoutes');


router.use('/', homeRoutes);
router.use('/dashboardRoutes', dashboardRoutes);

module.exports = router;
