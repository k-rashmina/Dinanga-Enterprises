const puppeteer = require("puppeteer");
const customer = require("../../models/customerDetails");

const customerReport = async (req, res) => {
  try {
    // Fetch customer details from MongoDB
    const customerDetails = await customer.find();

    // Heading of the PDF
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

    // Table header
    html +=
      '<table style="width: 100%; border-collapse: collapse;">' +
      "<tr>" +
      "<th>Name</th>" +
      "<th>Email</th>" +
      "<th>Phone Number</th>" +
      "<th>Address</th>" +
      "</tr>";

    // Populate table with customer details
    customerDetails.forEach((customer) => {
      html +=
        "<tr>" +
        `<td>${customer.cusFname} ${customer.cusLname}</td>` +
        `<td>${customer.cusMail}</td>` +
        `<td>${customer.pNum}</td>` +
        `<td>${customer.cusAddr}</td>` +
        "</tr>";
    });

    html += "</table>"; // Close the table

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({
      path: "customerReport.pdf",
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

module.exports = { customerReport };
