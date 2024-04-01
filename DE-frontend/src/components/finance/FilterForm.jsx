import React from "react";
import axios from "axios";
import { useState } from "react";

export default function FilterForm(props) {

  //Generating the current date to set the max date in date pickers
  const date = new Date().toJSON();
  const maxDate = date.substring(0, 10)



  //filter field states
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  //saving filter form values
  const handleFilterEvents = (event) => {
    
    console.log(event.target.value);
    if(event.target.id == 'from'){

      setFrom(event.target.value);

    }else if(event.target.id == 'to'){

      setTo(event.target.value);

    }else if(event.target.id == 'status'){

      setStatus(event.target.value);

    }else if(event.target.id == 'email'){

      setEmail(event.target.value);

    }

  }

  const getTransactions = async () => {
    
    let transactionList;

    if(props.type == 'job'){

      //API call for getting the job transaction list
      await axios({
        method: 'get',
        url: `http://localhost:5000/transaction/jobtransactionlist?from=${from}&to=${to}&status=${status}&email=${email}`,
      }).then(res => transactionList = res.data);

    }else{

      //API call for getting the purchase transaction list

    }

    return transactionList;
  }


  return(

    <form className="div-shadow rounded-5 align-self-center mt-4 d-flex flex-wrap pt-3 pb-3" style={{width: '1040px', height: '140px'}}>
        
        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">From</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="date" id="from" required="true" max={maxDate} onChange={handleFilterEvents}/>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">To</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="date" id="to" required="true" max={maxDate} onChange={handleFilterEvents}/>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">Status</label>
          <select className="ms-3 me-0 filter-input rounded-2"  id="status" onChange={handleFilterEvents}>
            <option value={null}></option>
            <option value={'pending'}>Pending</option>
            <option value={'success'}>Success</option>
            <option value={'fail'}>Fail</option>
          </select>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">{props.emailField}</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="email" id="customer" onChange={handleFilterEvents} />
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} form="from-date">Sort</label>
          <select className="ms-3 me-0 filter-input rounded-2"  id="sort" onChange={handleFilterEvents}>
            <option value={null}></option>
            <option value={'highest'}>Highest Amount</option>
            <option value={'lowest'}>Lowest Amount</option>
          </select>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <input className="form-button rounded-5 fw-semibold" type="reset" value={'Clear'} id="reset" />
          <button className="form-button rounded-5 ms-4 fw-semibold" type="submit" value={'Search'} id="submit" onClick={async() => props.handleSubmit(await getTransactions())} >Search</button>
        </div>

    </form>

  )

}