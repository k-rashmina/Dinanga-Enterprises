const inventoryDetails = require("../../models/inventoryDetails");
const puppeteer = require("puppeteer");
const { fetchStockStatus } = require("../inventory/chats/getStockStatus");
const { returnStockValue } = require("../inventory/chats/getStockValue");

const inventoryReport = async (req, res) => {
  let report;
  let stockStatuses;
  let increasedItems;
  let decreasedItems;
  let totalStockValue;

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

    // Separate increased and decreased items
    increasedItems = report.filter(
      (item) => item.quantity > item.previousQuantity
    );
    decreasedItems = report.filter(
      (item) => item.quantity < item.previousQuantity
    );

    // Get the stock value
    totalStockValue = await returnStockValue();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to get inventory report", error: err });
  }

  let today = new Date();
  let options = { year: "numeric", month: "long", day: "numeric" };

  let todayStr = today.toLocaleDateString("default", options);
  let oneWeekAgoStr = oneWeekAgo.toLocaleDateString("default", options);

  //Heading of the PDF
  let html =
    '<div style="text-align: center; font-size: 24px; font-family: Calibri; margin-bottom: 10px;">' +
    "Dinanga Enterprises" +
    "</div>" +
    '<div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">' +
    "Address: 123 Main St, City, Country" +
    "</div>" +
    '<div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">' +
    "Telephone: (123) 456-7890" +
    "</div>" +
    "<hr/>";

  //Sub Heading | Inventory Report
  html +=
    '<h1 style="font-size: 18px; text-align: center; font-family:Calibri">Inventory Report</h1>' +
    '<h2 style="font-size:18px; font-family:Calibri">From ' +
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

  // Add New Stocks items to the HTML
  html +=
    '<h2  style="font-size: 18px;font-family:Calibri">Recived Stocks</h2>' +
    '<table style="width: 100%">' +
    "<tr>" +
    '<th style="font-size: 12px;font-family:Calibri">' +
    "Item Name</th>" +
    '<th style="font-size: 12px;font-family:Calibri">Received New Stocks (qty)</th>' +
    '<th style="font-size: 12px;font-family:Calibri">Unit Selling Price</th>' +
    '<th style=="font-size: 12px;font-family:Calibri">Increased Stock Value</th>';
  ("</tr>");
  increasedItems.forEach((item) => {
    html += `<tr>
              <td style="font-size:12px;font-family:Calibri">${
                item.itemName
              }  </td>
              <td style="font-size:12px;font-family:Calibri">${
                item.quantity - item.previousQuantity
              }</td>
              <td style="font-size:12px;font-family:Calibri">${new Intl.NumberFormat(
                "en-LK",
                { style: "currency", currency: "LKR" }
              ).format(item.itemPrice)}</td>
              <td style="font-size:12px;font-family:Calibri">${new Intl.NumberFormat(
                "en-LK",
                { style: "currency", currency: "LKR" }
              ).format(
                (item.quantity - item.previousQuantity) * item.itemPrice
              )}</td>
              </tr>`;
  });
  html += "</table>";

  // Add Sold items to the HTML
  html +=
    '<h2  style="font-size: 18px;font-family:Calibri">Sold(consumed) Items</h2>' +
    '<table style="width: 100%">' +
    "<tr>" +
    '<th style="font-size: 12px;font-family:Calibri">Item Name</th>' +
    '<th style="font-size: 12px;font-family:Calibri">Number of Sold Items</th>' +
    '<th style="font-size: 12px;font-family:Calibri">Unit Sold Price</th>' +
    '<th style=="font-size: 12px;font-family:Calibri">Decreased Stock Value</th>';
  ("</tr>");
  decreasedItems.forEach((item) => {
    html += `<tr>
              <td style="font-size:12px;font-family:Calibri">${
                item.itemName
              }</td>
              <td style="font-size:12px;font-family:Calibri">${
                item.previousQuantity - item.quantity
              }</td>
              <td style="font-size:12px;font-family:Calibri">${new Intl.NumberFormat(
                "en-LK",
                { style: "currency", currency: "LKR" }
              ).format(item.itemPrice)}</td>
              <td style="font-size:12px;font-family:Calibri">${new Intl.NumberFormat(
                "en-LK",
                { style: "currency", currency: "LKR" }
              ).format(
                (item.previousQuantity - item.quantity) * item.itemPrice
              )}</td>
            </tr>`;
  });
  html += "</table>";

  // Add stock statuses to the HTML
  html += "</table><br>";
  html += '<div style="margin-top: 20px;">';
  html += '<h2  style="font-size: 18px;font-family:Calibri">Stock Stats</h2>';
  html += '<table style="width: 100%; font-size:12px;font-family:Calibri">';
  html += "<tr>";
  Object.keys(stockStatuses).forEach((status) => {
    html += `<th>${status}</th>`;
  });
  html += "</tr><tr>";
  Object.keys(stockStatuses).forEach((status) => {
    html += `<td>${stockStatuses[status]}</td>`;
  });
  html += "</tr></table>";

  // Add total inventory value to the HTML
  html += `<h2 style="font-size: 18px;font-family:Calibri">Total Inventory Value: ${new Intl.NumberFormat(
    "en-LK",
    { style: "currency", currency: "LKR" }
  ).format(totalStockValue)}</h2>`;
  html += "</div>";

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
