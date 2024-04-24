const financeDashboardService = require('../../services/finance/financeDashboardService');


/**
 * Controller for getting dashboard stats for transactions.
 * @param {*} req 
 * @param {*} res 
 */
const getDashboardStat = async (req, res) => {

  try{
    res.json(await financeDashboardService());
  }catch(e){
    console.log('Error occurred in getDashboardStat: ', e);
    res.status(500).send('Error occurred');
  }

}

module.exports = getDashboardStat;