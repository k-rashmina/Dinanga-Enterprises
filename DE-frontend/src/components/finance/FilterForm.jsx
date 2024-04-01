import React from "react";
import axios from "axios";

export default function FilterForm(props) {

  //Generating the current date to set the max date in date pickers
  const date = new Date();
  const maxDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`
  console.log(maxDate);

  let transactionList;

  const getTransactions = () => {

    if(true){

      //API call for getting the job transaction list
      axios({
        url: "http://localhost:5000/transaction/jobtransactionlist",
        method: 'get',
        data: {
          from: '2024-03-15',
          to: '2024-03-22',
          status: null,
          job: null
        }
      }).then(res => console.log(res));

    }else{

      //API call for getting the purchase transaction list

    }


  }

  getTransactions()

  return(

    <form className="div-shadow rounded-5 align-self-center mt-4 d-flex flex-wrap pt-3 pb-3" style={{width: '1040px', height: '140px'}}>
        
        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">From</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="date" id="from" required="true" max={maxDate}/>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">To</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="date" id="to" required="true" max={maxDate}/>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">Status</label>
          <select className="ms-3 me-0 filter-input rounded-2"  id="status">
            <option value={null}></option>
            <option value={'pending'}>Pending</option>
            <option value={'success'}>Success</option>
            <option value={'fail'}>Fail</option>
          </select>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">{props.emailField}</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="email" id="customer"/>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">Sort</label>
          <select className="ms-3 me-0 filter-input rounded-2"  id="sort">
            <option value={null}></option>
            <option value={'highest'}>Highest Amount</option>
            <option value={'lowest'}>Lowest Amount</option>
          </select>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <input className="form-button rounded-5 fw-semibold" type="reset" value={'Clear'} id="reset" />
          <input className="form-button rounded-5 ms-4 fw-semibold" type="submit" value={'Search'} id="submit" />
        </div>

    </form>

  )

}