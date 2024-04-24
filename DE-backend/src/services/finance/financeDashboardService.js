const {getJobTransactionList} = require('../../data-access/finance/jobTransactiondb');
const {getPurchTransactionList} = require('../../data-access/finance/purchTransactiondb');

module.exports = async function financeDashboardService() {

    date = new Date();
    fdate = new Date(date.getFullYear(), date.getMonth(), 1);
    ldate = new Date(date.getFullYear(), date.getMonth()+1, 0);

    const filter = {
    from: fdate,
    to: ldate,
    }  

    const dashboardTransactions = [];
    let jobTotal = 0;
    let purchTotal = 0;
    const JTList = await getJobTransactionList(filter);

    JTList.forEach(element => {
        jobTotal += element.amount.tot_amount
    });

    const PTList = await getPurchTransactionList(filter);

    PTList.forEach(element => {
        purchTotal += element.amount
    });

    let JTStat = {txCount: JTList.length, txAmount: jobTotal};
    let PTStat = {txCount: PTList.length, txAmount: purchTotal};

    return {JTStat, PTStat}

}

