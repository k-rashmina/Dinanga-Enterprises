import React, { useState, useEffect } from 'react'
import axios from 'axios'

function NewListings() {
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventory/weeklyListings')
        setListings(response.data)
      } catch (error) {
        console.error('Failed to fetch listings:', error)
      }
    }

    fetchListings()
  }, [])

  return (
    <div>
      <h4>Weekly New Listings</h4>
      <div className="align-self-center rounded-5 div-shadow mt-5 ps-4 pb-4 example example1" style={{width: '1140px', overflow: 'scroll'}}>
        <table className="table-hover example1 " style={{width: '1080px'}}>
          <thead style={{fontSize: '18px', height: '56px', width: '1080px'}}>
            <tr className="border-bottom border-dark border-3 pt-3" style={{height: '56px', backgroundColor: '#EEEEEE', width: '1080px'}}>
              <th style={{width: '171px'}}>Item Name</th>
              <th style={{width: '180px'}}>Quantity</th>
              <th style={{width: '206px'}}>Reorder Level</th>
              <th style={{width: '140px'}}>Reorder State</th>
              <th style={{width: '94px'}}>Item Price</th>
              <th style={{width: '82px'}}>Availability</th>
            </tr>
          </thead>
          <tbody className="">
            {listings.map((listing, index) => (
              <tr key={index} style={{height: '50px'}}> 
                <td style={{width: '171px'}}>{listing.itemName}</td>
                <td style={{width: '257px'}}>{listing.quantity}</td>
                <td style={{width: '205px'}}>{listing.reorderLevel}</td>
                <td style={{width: '139px'}}>{listing.reorderState}</td>
                <td style={{width: '93px'}}>{listing.itemPrice}</td>
                <td style={{width: '81px'}}>{listing.availability}</td>
                <td style={{width: '40px'}}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NewListings



















// import React from 'react'
// import axios from 'axios'

// function NewListings() {



//   return (
//     <div>
//          <div className="align-self-center rounded-5 div-shadow mt-5 ps-4 pb-4 example example1" style={{width: '1040px', height: '394px', overflow: 'scroll'}}>
//         <table className="table-hover example1 " style={{width: '990px'}}>
//           <thead  style={{fontSize: '18px', height: '56px'}}>
//             <tr className="border-bottom border-dark border-3 pt-3" style={{position: 'fixed', height: '56px', backgroundColor: '#EEEEEE', width: '980px'}}>
//               <th style={{width: '171px'}}>Transaction No.</th>
//               <th style={{width: '258px'}}>Job No.</th>
//               <th style={{width: '206px'}}>{props.name}</th>
//               <th style={{width: '140px'}}>Date</th>
//               <th style={{width: '94px'}}>Status</th>
//               <th style={{width: '82px'}}>Amount(LKR)</th>
//             </tr>
//           </thead>
//           <tbody className="">
//           <tr style={{height: '50px'}}> 
//         <td style={{width: '171px'}}></td>
//         <td style={{width: '257px'}}></td>
//         <td style={{width: '205px'}}></td>
//         <td style={{width: '139px'}}></td>
//         <td style={{width: '93px'}}></td>
//         <td style={{width: '81px'}}></td>
//         <td style={{width: '40px'}}></td>
//       </tr>
//           </tbody>

//         </table>
//       </div>
//     </div>
//   )
// }

// export default NewListings