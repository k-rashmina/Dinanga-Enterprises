const puppeteer = require("puppeteer");
const financeReportService = require('../../services/finance/financeReportService');

const transactionReport = async (req, res) => {

    try {
        const reportData = await financeReportService();

        let thisMonth = new Date().toLocaleString('default', { month: 'long' });

        //Heading of the PDF
        let html =
            '<h1 style="text-align: center; font-family: Calibri; margin-bottom: 10px;">' +
            "Dinanga Enterprises" +
            "</h1>" +
            '<div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">' +
            "Address: 123 Main St, City, Country" +
            "</div>" +
            '<div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">' +
            "Telephone: (123) 456-7890" +
            "</div>" +
            "<hr/>";

        //Monthly Transction Report
        html +=
            '<h2 style="text-align: center; font-family:Calibri; color: #606060">Monthly Transaction Report - ' + thisMonth + '</h2>' +
            '<h2 style="font-size:18px; font-family:Calibri">Job Transaction Report</h2>' +
            "<style>" +
            "table { width: 100%; border-collapse: collapse;  font-family:Calibri}" +
            "table, th, td { border: 1px solid black; padding:8px; text-align:left;font-size:12px }" +
            "th { background-color: #f2f2f2; }" +
            "</style>" +
            "<table>" +
            "<tr>" +
            "<th>Transaction No</th>" +
            "<th>Transaction Type</th>" +
            "<th>Payment Type</th>" +
            "<th>Payment Date</th>" +
            "<th>Job Amount(LKR)</th>" +
            "<th>Tax Amount(18%)</th>" +
            "<th>Total Amount(LKR)</th>";
        ("</tr>");
        reportData.JTStat?.jtList.forEach((item) => {
            html += `<tr>
                <td>${item.transact_no}</td>
                <td>${item.transact_type}</td>
                <td>${item.pay_type}</td>
                <td>${item.pay_date.toISOString().substring(0, 10)}</td>
                <td style="text-align: right">${item.amount?.job_amt.toFixed(2)}</td>
                <td style="text-align: right">${item.amount?.tax_amt.toFixed(2)}</td>
                <td style="text-align: right">${item.amount?.tot_amount.toFixed(2)}</td>
                </tr>`;
        });

        html += `<tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td style="text-align: right"><b>${reportData.JTStat?.txAmount.toFixed(2)}</b></td>
          </tr>`;

        html += "</table>";

        //Purchase Transction Report
        html +=
            '<h2 style="font-size:18px; font-family:Calibri">Purchase Transaction Report</h2>' +
            "<style>" +
            "table { width: 100%; border-collapse: collapse;  font-family:Calibri}" +
            "table, th, td { border: 1px solid black; padding:8px; text-align:left;font-size:12px }" +
            "th { background-color: #f2f2f2; }" +
            "</style>" +
            "<table>" +
            "<tr>" +
            "<th>Transaction No</th>" +
            "<th>Payment Date</th>" +
            "<th>Total Amount(LKR)</th>";
        ("</tr>");
        reportData.PTStat?.ptList.forEach((item) => {
            html += `<tr>
                <td>${item.transact_no}</td>
                <td>${item.create_date.toISOString().substring(0, 10)}</td>
                <td style="text-align: right">${item.amount.toFixed(2)}</td>
                </tr>`;
        });
        html += `<tr>
          <td></td>
          <td></td>
          <td style="text-align: right"><b>${reportData.PTStat?.txAmount.toFixed(2)}</b></td>
          </tr>`;

        html += "</table>";

        html +=
            '<center><h2 style="margin-top: 20px; text-align: center; font-family:Calibri; color: #00ADB5"><u>Summary Report</u></h2><center>' +
            "<style>" +
            "table { width: 100%; border-collapse: collapse;  font-family:Calibri}" +
            "table, th, td { border: 1px solid black; padding:8px; text-align:left;font-size:12px }" +
            "th { background-color: #f2f2f2; }" +
            "</style>" +
            '<table style="border: none;">' +
            "<tr>" +
            '<th style="font-size: 16px">Total Job Transaction Amount</th>' +
            '<th style="text-align: right; font-size: 16px"> LKR ' + reportData.JTStat?.txAmount.toFixed(2) + "</th>";
        ("</tr>");
        html += `<tr>
    <th style="font-size: 16px">Total Purchase Transaction Amount</th>
    <td style="text-align: right; font-size: 16px"><b>LKR ${reportData.PTStat?.txAmount.toFixed(2)}</b></td>
    </tr>`;
        html += `<tr>
    <th style="font-size: 20px; font-weight: bold">Total Profit or Loss</th>
    <td style="text-align: right; font-size: 20px; font-weight: bold"><b>LKR ${(reportData.JTStat?.txAmount.toFixed(2)) - (reportData.PTStat?.txAmount.toFixed(2))}</b></td>
    </tr>`;

        // html += `<center><h2 style="margin-top: '20px'; text-align: center; font-family:Calibri; color: #606060">Summary Report</h2><center> 
        // <div style='display: flex; justify-content: space-even'>
        //   <h3 style='width: 400px'>Total Job Transaction Amount</h3>
        //   <h3 style='width: 400px'>LKR ${reportData.JTStat?.txAmount.toFixed(2)}</h3>

        // </div>
        // <div style='display: flex; justify-content: space-even'>
        //     <h3 style='width: 400px'>Total Purchase Transaction Amount</h3>
        //     <h3 style='width: 400px'>LKR ${reportData.PTStat?.txAmount.toFixed(2)}</h3>
        // </div>

        // <div style='display: flex; justify-content: space-even'>
        //     <h2 style='width: 400px'>Total Profit or Loss</h2>
        //     <h2 style='width: 400px'>LKR ${(reportData.JTStat?.txAmount.toFixed(2)) - (reportData.PTStat?.txAmount.toFixed(2))}</h2>
        // </div>

        // `;

        html += "</div>";

        console.log('Start generating transaction report')
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf({
            path: "TransactionReport.pdf",
            format: "A4",
            margin: {
                // Set the margins
                top: "1cm",
                right: "1cm",
                bottom: "1cm",
                left: "1cm",
            },
        });

        console.log('End generating transaction report')
        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdf.length,
        });
        res.send(pdf);

        await browser.close();
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Failed to generate the transaction report", error: err });
    }
};

module.exports = transactionReport;
