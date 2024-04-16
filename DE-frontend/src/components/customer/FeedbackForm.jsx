import React from 'react';

const FeedbackForm = () => {
  return (
    <div>
      <h2>Leave Your Valueble Feedback Here</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" className="form-control" id="subject" placeholder='Enter subject here' />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="4" placeholder='Enter message here'></textarea>
        </div>
        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <button type="button" className="btn btn-secondary">Previous Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
