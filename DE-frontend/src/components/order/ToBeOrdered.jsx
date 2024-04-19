import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ToBeOrdered() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/order/getReorderItems')
.then(response => setItems(response.data))
.catch(error => console.error('Error:', error));
}, []);

console.log(items)
  return (
    <div style={{ marginTop: "90px" }}>
      <h3 style={{ marginBottom: "10px", marginLeft: "20px", fontWeight: "bold" }}>To Be Ordered</h3><br />
      <table className="styled-table" style={{ marginLeft: "20px", width: "3500px",marginright:"90px"}}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>itemName</th>
            <th style={{ textAlign: "center" }}>itemNumber</th>
            <th style={{ textAlign: "center" }}>Available Quantity</th>
            <th style={{ textAlign: "center" }}>Reorder Level</th>
            {/* <th style={{ textAlign: "center" }}>Reorder Quantity</th> */}
            <th style={{ textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
        {items.map(item => (
            <tr key={item._id}>
              <td style={{ textAlign: "center" }}>{item.itemName}</td>
              <td style={{ textAlign: "center" }}>{item.itemNumber}</td>
              <td style={{ textAlign: "center" }}>{item.quantity}</td>
              <td style={{ textAlign: "center" }}>{item.reorderLevel}</td>
              <td style={{ textAlign: "center" }}>
              
                <button 
                  style={{ 
                    backgroundColor: "#327f87", 
                    color: "white", 
                    border: "none", 
                    padding: "5px 15px", 
                    borderRadius: "4px", 
                    cursor: "pointer" 
                  }}
                >
                  <Link 
                  //  to={{
                  //   pathname: '/admin/order/addorder',
                  //   state: { itemName: item.itemName, itemNumber: item.itemNumber }
                  // }}
                  to={`/admin/order/addorder/${item.itemName}/${item.itemNumber}/${item.itemPrice}`}
                  
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Reorder
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToBeOrdered;
