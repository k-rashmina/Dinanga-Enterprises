import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function FilterForm(props) {

  //Generating the current date to set the max date in date pickers
  const date = new Date().toJSON();
  const maxDate = date.substring(0, 10)



  //filter field states
  const [filterFields, setFilterFields] = useState({
    from: '2024-03-15',
    to: '2024-03-22',
    status: '',
    email: ''
  });

  //saving filter form values
  const handleFilterFields = (event) => {
    
    const {name, value} = event.target;

    setFilterFields(prevFieldData => {

      return{
        ...prevFieldData,
        [name]: value
      }

    })

  }

  const clearFilterFields = () => {setFilterFields({
    from: '',
    to: '',
    status: '',
    email: ''
  })}

  const [search, setSearch] = useState(false);

  const handleSearchState = () =>{
    setSearch(prevState => !prevState);
  }
  // console.log(search);
  let [transactionList, setTransactionList] = useState({});

  useEffect(() =>{

    if(props.type == 'job'){

      //API call for getting the job transaction list
      axios({
        method: 'get',
        url: `http://localhost:5000/transaction/jobtransactionlist?from=${filterFields.from}&to=${filterFields.to}&status=${filterFields.status}&email=${filterFields.email}`,
      }).then(res => props.handleSubmit(res.data));

    }else{

      //API call for getting the purchase transaction list

    }

  }, [search])

  console.log(transactionList);

  // const getTransactions = async () => {
    
  //   let transactionList;

  //   if(props.type == 'job'){

  //     //API call for getting the job transaction list
  //     await axios({
  //       method: 'get',
  //       url: `http://localhost:5000/transaction/jobtransactionlist?from=${from}&to=${to}&status=${status}&email=${email}`,
  //     }).then(res => transactionList = res.data);

  //   }else{

  //     //API call for getting the purchase transaction list

  //   }

  //   return transactionList;
  // }


  return(

    <form  className="div-shadow rounded-5 align-self-center mt-4 d-flex flex-wrap pt-3 pb-3" style={{width: '1040px', height: '140px'}}>
        
        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="from">From</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="date" name="from" required="true" max={maxDate} onChange={handleFilterFields} value={filterFields.from}/>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="to">To</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="date" name="to" required="true" max={maxDate} onChange={handleFilterFields} value={filterFields.to}/>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="status">Status</label>
          <select className="ms-3 me-0 filter-input rounded-2"  name="status" onChange={handleFilterFields} value={filterFields.status}>
            <option value={null}></option>
            <option value={'pending'}>Pending</option>
            <option value={'success'}>Success</option>
            <option value={'fail'}>Fail</option>
          </select>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="email">{props.emailField}</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="email" name="email" onChange={handleFilterFields} value={filterFields.email}/>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="sort">Sort</label>
          <select className="ms-3 me-0 filter-input rounded-2"  name="sort" onChange={handleFilterFields}>
            <option value={null}></option>
            <option value={'highest'}>Highest Amount</option>
            <option value={'lowest'}>Lowest Amount</option>
          </select>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <button className="form-button rounded-5 fw-semibold" type="reset" name="reset" onClick={clearFilterFields} >Clear</button>
          <button className="form-button rounded-5 ms-4 fw-semibold" type="button" name="submit" onClick={handleSearchState} >Search</button>
        </div>

    </form>

  )

}