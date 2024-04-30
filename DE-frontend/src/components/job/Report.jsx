import React, { useState } from 'react';
import '../../styles/content.css';
//import ContentHeader from './ContentHeader';
import axios from 'axios';
//import { PDFDownloadLink } from '@react-pdf/renderer'; // Import PDFDownloadLink
//import { Document, Page, Text, View } from '@react-pdf/renderer'; // Import Document, Page, Text, and View from react-pdf

// Define PDF document component


// Define CSS styles object
const styles = {
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 20,
    marginBottom: 10
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf'
  },
  tableRow: {
    marginVertical: 5, // Adjust the margin as needed
    flexDirection: 'row'
  },
  tableCell: {
    marginVertical: 5, // Adjust the margin as needed
    flexGrow: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 8
  }
};

// // Function to format date in YYYY-MM-DD format
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString();
// };

// const MyDocument = ({ data }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={[styles.header, 'header']}>Monthly Report</Text>
//         <View style={[styles.table, 'table']}>
//           <View style={[styles.tableRow, 'tableRow']}>
//             <Text style={[styles.tableCell, 'tableCell']}>Payment Type</Text>
//             <Text style={[styles.tableCell, 'tableCell']}>Bank Name</Text>
//             <Text style={[styles.tableCell, 'tableCell']}>Paid Amount</Text>
//             <Text style={[styles.tableCell, 'tableCell']}>Paid Date</Text>
//           </View>
//           {data.map((payment) => (
//             <View style={[styles.tableRow, 'tableRow']} key={payment.id}>
//               <Text style={[styles.tableCell, 'tableCell']}>{payment.paymentType}</Text>
//               <Text style={[styles.tableCell, 'tableCell']}>{payment.bankName}</Text>
//               <Text style={[styles.tableCell, 'tableCell']}>{payment.paidAmount}</Text>
//               <Text style={[styles.tableCell, 'tableCell']}>{formatDate(payment.paidDate)}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// const MonthlyOverview = () => {
//   const [monthlyReport, setMonthlyReport] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(1); // Default to January
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  
//   const fetchMonthlyReport = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:8070/payment/monthly', {
//         params: {
//           month: selectedMonth, // Using selectedMonth directly
//           year: selectedYear
//         }
//       });
//       console.log('Monthly report response:', response.data); // Add this line to log the response data
//       setMonthlyReport(response.data);
//     } catch (error) {
//       console.error('Error fetching monthly report:', error);
//       setError('Error fetching monthly report. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const fetchWeeklyReport = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:8070/payment/weekly');
//       setMonthlyReport(response.data);
//     } catch (error) {
//       console.error('Error fetching weekly report:', error);
//       setError('Error fetching weekly report. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMonthChange = (event) => {
//     setSelectedMonth(parseInt(event.target.value)); // Parse month value to integer
//   };

return(
    <div className="content">
      <ContentHeader />
      <div>
        <h2>Monthly Overview</h2>
        <div>
          {/* Month selector dropdown */}
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
          {/* Button to fetch monthly report */}
          <button className="report-button" onClick={fetchMonthlyReport}>
            Generate Monthly Report
          </button>
          <button className="report-button" onClick={fetchWeeklyReport}>
            Weekly Report
          </button>
          {/* PDF download link */}
          <button className="report-button">
          <PDFDownloadLink document={<MyDocument data={monthlyReport} />} fileName="monthly_report.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download PDF'
            }
          </PDFDownloadLink></button>
        </div>
        {error && <p>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Payment Type</th>
                <th>Bank Name</th>
                <th>Paid Amount</th>
                <th>Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.paymentType}</td>
                  <td>{payment.bankName}</td>
                  <td>{payment.paidAmount}</td>
                  <td>{payment.paidDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );



export default MonthlyOverview;
