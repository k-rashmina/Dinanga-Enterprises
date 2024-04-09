const inventoryDetails = require("../../models/inventoryDetails");
const puppeteer = require("puppeteer");

const inventoryReport = async (req, res) => {
  let report;
  try {
    report = await inventoryDetails.find();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to get inventory report", error: err });
  }

  let html = "<h1>Inventory Report</h1>";
  report.forEach((item) => {
    html += `<h2>${item.itemName}</h2>
        <p>Quantity:${item.quantity}</p>
        <p>Reorder Level:${item.reorderLevel}</p>
        <p>Reorder State:${item.reorderState}</p>
        <p>Item Price:${item.itemPrice}</p>
        <p>Availability:${item.availability}</p>
        <br>`;
  });
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ path: "inventoryReport.pdf", format: "A4" });

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
