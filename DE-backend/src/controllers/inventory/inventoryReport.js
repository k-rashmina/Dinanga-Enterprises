const inventoryDetails = require("../../models/inventoryDetails");
const puppeteer = require("puppeteer");
const { fetchStockStatus } = require("../inventory/chats/getStockStatus");

const inventoryReport = async (req, res) => {
  let report;
  let stockStatuses;

  // Get the date for one week ago
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    //call the fetchStockStatus function
    stockStatuses = await fetchStockStatus();

    // Find items that were created or updated within the last week
    report = await inventoryDetails.find({
      $or: [
        { createdAt: { $gte: oneWeekAgo } },
        { updatedAt: { $gte: oneWeekAgo } },
      ],
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to get inventory report", error: err });
  }

  let today = new Date();
  let options = { year: "numeric", month: "long", day: "numeric" };

  let todayStr = today.toLocaleDateString("default", options);
  let oneWeekAgoStr = oneWeekAgo.toLocaleDateString("default", options);

  let html =
    '<div style="text-align: center; font-size: 24px; font-family: Calibri; margin-bottom: 10px;">Dinanga Enterprises</div>' +
    '<div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">Address: 123 Main St, City, Country</div>' +
    '<div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">Telephone: (123) 456-7890</div><hr/>';

  html +=
    '<h1 style="font-size: 18px; text-align: center; font-family:Calibri">Inventory Report</h1>' +
    '<h2 style="font-size:18px; font:family:Calibri">From ' +
    oneWeekAgoStr +
    " To " +
    todayStr +
    " Listings and Updations</h2>" +
    "<style>" +
    "table { width: 100%; border-collapse: collapse;  font-family:Calibri}" +
    "table, th, td { border: 1px solid black; padding:8px; text-align:left;font-size:12px }" +
    "th { background-color: #f2f2f2; }" +
    "</style>" +
    "<table>" +
    "<tr>" +
    "<th>Item Name</th>" +
    "<th>Quantity</th>" +
    "<th>Reorder Level</th>" +
    "<th>Reorder State</th>" +
    "<th>Item Price</th>" +
    "<th>Availability</th>";
  // "<th>Created At</th>"+
  // "<th>Updated At</th>"+
  ("</tr>");
  report.forEach((item) => {
    html += `<tr>
        <td>${item.itemName}</td>
        <td>${item.quantity}</td>
        <td>${item.reorderLevel}</td>
        <td>${item.reorderState}</td>
        <td>${item.itemPrice}</td>
        <td>${item.availability}</td>
       
        </tr>`;
  });
  html += "</table>";
  // Add stock statuses to the HTML
  html += '<h2  style="font-size: 18px;font-family:Calibri">Stock Stats</h2>';
  Object.keys(stockStatuses).forEach((status) => {
    html += `<p style =\"font-size:12px;font-family:Calibri
      \" >${status}: ${stockStatuses[status]}</p>`;
  });

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({
      path: "inventoryReport.pdf",
      format: "A4",
      margin: {
        // Set the margins
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm",
      },
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);

    await browser.close();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to generate PDF", error: err });
  }
};

module.exports = { inventoryReport };
