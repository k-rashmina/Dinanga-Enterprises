import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function FilterForm(props) {

  //Generating the current date to set the max date in date pickers
  const date = new Date().toJSON();
  const today = date.substring(0, 10)



  //filter field states
  const [filterFields, setFilterFields] = useState({
    from: today,
    to: today,
    status: '',
    ref: '',
    t_type: props.emailField == 'Customer' ? '' : 'purch'
  });

  //saving filter form values
  const handleFilterFields = event => {
    
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
    ref: '',
    t_type: ''
  })}

  const hasPageLoaded = useRef(false);
  const [search, setSearch] = useState(false);
  const [filterFormErrors, setFilterFormErrors] = useState({});

  const handleSearchState = (event) =>{
    event.preventDefault();
    formValidation();
    if(Object.keys(filterFormErrors).length == 0){
      setSearch(prevState => !prevState);
    }
  }
  // console.log(search);

//API call for getting the job / purchase transaction list
  useEffect(() =>{

    if(hasPageLoaded.current == true){
      axios({
        method: 'get',
        url: `http://localhost:5000/transaction/${props.type}?from=${filterFields.from}&to=${filterFields.to}&status=${filterFields.status}&ref=${filterFields.ref}&t_type=${filterFields.t_type}`,
      }).then(res => {
        console.log(res.data);
        props.handleSubmit(res.data)
      });
    }
    hasPageLoaded.current = true;

  }, [search])

  console.log(hasPageLoaded.current);

  const formValidation = () => {

    const errors = {};
    const refregex = props.emailField == 'Customer' ? /[J][B][0-9]+/ : /[O][R][0-9]+/;
    const serviceregex = /[S][E][0-9]+/
    
    if(!filterFields.from){
      errors.from = 'The start date is required';
    }

    if(!filterFields.to){
      errors.to = 'The end date is required'
    }

    if(filterFields.t_type == ''){
      if(!(refregex.test(filterFields.ref) || serviceregex.test(filterFields.ref) || filterFields.ref == '')){
        errors.ref = 'Invalid Format eg(JB/SE 0-9)'
      }
    }else if(filterFields.t_type == 'online'){
      if(!(refregex.test(filterFields.ref) || filterFields.ref == '')){
        errors.ref = 'Invalid Format eg(JB 0-9)'
      }
    }else if(filterFields.t_type == 'offline'){
      if(!(serviceregex.test(filterFields.ref) || filterFields.ref == '')){
        errors.ref = 'Invalid Format eg(SE 0-9)'
      }
    }

    if(filterFields.t_type == 'purch'){
      if(!(refregex.test(filterFields.ref) || filterFields.ref == '')){
        errors.ref = 'Invalid Format eg(OR 0-9)'
      }
    }

    setFilterFormErrors(errors);

  }

  return(

    <form onSubmit={handleSearchState} className="div-shadow rounded-5 align-self-center mt-4 d-flex flex-wrap pt-3 pb-3" style={{width: '1040px', height: '170px'}}>
        
        <div className="d-flex flex-wrap align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="from">From</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="date" name="from" required="true" max={today} onChange={handleFilterFields} onBlur={formValidation} value={filterFields.from}/>
          <span className="fw-semibold" style={{height: '24px', color: 'red'}}>{filterFormErrors.from}</span>
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="to">To</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="date" name="to" required="true" max={today} onChange={handleFilterFields} onBlur={formValidation} value={filterFields.to}/>
          <span className="fw-semibold" style={{height: '24px', color: 'red'}}>{filterFormErrors.to}</span>
        </div>

        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="status">Status</label>
          <select className="ms-3 me-0 filter-input rounded-2"  name="status" onChange={handleFilterFields} value={filterFields.status}>
            <option value={''}>All</option>
            <option value={'pending'}>Pending</option>
            <option value={'success'}>Success</option>
            <option value={'fail'}>Fail</option>
          </select>
        </div>

        {props.emailField == 'Customer' && <div className="d-flex  align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="t_type">Type</label>
          <select className="ms-3 me-0 filter-input rounded-2"  name="t_type" value={filterFields.t_type} onChange={handleFilterFields}>
            <option value={''}>All</option>
            <option value={'online'}>Online</option>
            <option value={'offline'}>Offline</option>
          </select>
        </div>}

        <div className="d-flex flex-wrap align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <label style={{fontSize: '18px'}} htmlFor="email">Ref No</label>
          <input className="ms-3 me-0 filter-input rounded-2" type="text" name="ref" onChange={handleFilterFields} value={filterFields.ref} onBlur={formValidation}/>
          <span className="fw-semibold" style={{height: '24px', color: 'red'}}>{filterFormErrors.ref}</span>
        </div>

        {props.emailField == 'Supplier' && 
          <div  style={{width: '333px'}}>
          </div>
        }
        <div className="d-flex align-items-center justify-content-end pe-4" style={{width: '333px'}}>
          <button className="form-button rounded-5 fw-semibold" type="reset" name="reset" onClick={clearFilterFields} >Clear</button>
          <button className="form-button rounded-5 ms-4 fw-semibold" name="submit" >Search</button>
        </div>

    </form>

  )

}