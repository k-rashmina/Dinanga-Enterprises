import React from "react";

const EmployeeHeader = () => {
  return (
    <nav>
      <div className="logo">
        <img src="images/hlogo1.png" alt="Company Logo" />
      </div>
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </nav>
  );
};

export default EmployeeHeader;
