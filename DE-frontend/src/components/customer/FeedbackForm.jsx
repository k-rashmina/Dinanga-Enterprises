import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"




const FeedbackForm = () => {

  const [feedbackData, setfeedbackData] = useState({
    feedbackSub: '',
    feedbackMsg:'',

  });

  const navigate = useNavigate();


  const handleChange =(event)=>{
    const {id, value} = event.target;
    setfeedbackData(prevState =>({
       ...prevState,
       [id]: value,
    }));
  };


 
 const handleClick = ()=>{
  navigate('/cusfeedback');
};

const handleSubmit =(event)=>{
  event.preventDefault();

  axios.post("http://localhost:5000/cusfeedback/addcustomerfeedbacks", feedbackData)
  .then(()=>{
    alert("feedback added");

  })
  .catch((err)=>{
    alert(err);
  });
};


  return (
    <div>
      <h2>Leave Your Valueble Feedback Here</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" id="feedbackSub" className="form-control" placeholder='Enter subject here' value={feedbackData.feedbackSub} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="feedbackMsg"  rows="4" name ="feedbackMsg"placeholder='Enter message here'  value={feedbackData.feedbackMsg} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <button type="button" onClick={handleClick} className="btn btn-secondary">Previous Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
