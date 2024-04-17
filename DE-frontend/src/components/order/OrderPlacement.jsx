import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import formImg from "../../assets/Orderplace.jpg";
import axios from "axios";
import { useParams } from 'react-router-dom';


function OrderPlacement() {
  const { itemName, itemNumber } = useParams();
  

    const [formData, setFormData] = useState({
      
      itemName: itemName || '',
      itemNumber: itemNumber || '',
        quantity:'',
        dateofOrder:'',
        companyAddress:'',
        supplierName:'',
        comments:'',
    
    });
    const [formErrors, setFormErrors] = useState({
      // itemName:'',
      // itemNumber:'',
      quantity:'',
      dateofOrder:'',
      companyAddress:'',
      supplierName:'',
      comments:'',
    });

const [submitValue, setSubmitValue] = useState(false)
const hasPageLoaded = useRef(false);

const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formErrors).some(error => error !== '')) {
        alert("Please correct the errors before submitting.");
        return;
    }
    setSubmitValue(prev => !prev);
    }

useEffect(() => {
  if(hasPageLoaded.current){
      axios.post("http://localhost:5000/order/add", formData).then(()=>{
          alert("order added")
      }).catch((err)=>{
          
      })
  }
  hasPageLoaded.current = true
}, [submitValue])

    // const validateItemName = (value) => {
    //   return value.length < 3 ? 'Item Name must be at least 3 characters long!' : '';
    // }
    
    // const validateItemNumber = (value) => {
    //   return isNaN(value) ? 'Item Number must be a number!' : '';
    // }
    
    const validateQuantity = (value) => {
      return isNaN(value) ? 'Quantity must be a number!' : '';
    }
    
    const validateDateofOrder = (value) => {
      return new Date(value) > new Date() ? 'Date of Order cannot be in the future!' : '';
    }
    
    const validateCompanyAddress = (value) => {
      return value.length < 10 ? 'Company Address must be at least 10 characters long!' : '';
    }
    
    const validateSupplierName = (value) => {
      return value.length < 3 ? 'Supplier Name must be at least 3 characters long!' : '';
    }
    
    const validateComments = (value) => {
      return value.length > 200 ? 'Comments must be less than 200 characters long!' : '';
    }


    const handleChange = (event) => {
      const {name, value} = event.target;
      let errors = {...formErrors};
    
      // errors.itemName = name === 'itemName' ? validateItemName(value) : errors.itemName;
      // errors.itemNumber = name === 'itemNumber' ? validateItemNumber(value) : errors.itemNumber;
      errors.quantity = name === 'quantity' ? validateQuantity(value) : errors.quantity;
      errors.dateofOrder = name === 'dateofOrder' ? validateDateofOrder(value) : errors.dateofOrder;
      errors.companyAddress = name === 'companyAddress' ? validateCompanyAddress(value) : errors.companyAddress;
      errors.supplierName = name === 'supplierName' ? validateSupplierName(value) : errors.supplierName;
      errors.comments = name === 'comments' ? validateComments(value) : errors.comments;
    
      setFormErrors(errors);
      setFormData(prevState =>({
          ...prevState,
          [name]: value,
      }));
    };








        



    const today = new Date().toISOString().split('T')[0];



        <p></p>


  return (
    <div>
      <Container
        fluid
        style={{
          minHeight: "100vh",
          backgroundColor: "#191B1A",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Row
          className="justify-content-md-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Col lg={18}>
            <Form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 3px 10px rgba(0,0,0,.2)",
              }}
            >
              <Row>
                <Col md={6} className="d-flex flex-column">
                  <h5 style={{ marginBottom: "20px", fontWeight: "bold" }}>
                   Order Placement
                  </h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control type="text" name="itemName" value={formData.itemName} onChange={handleChange}  
                    readOnly  // This will make the field read-only
                     />
                    
                    <p style={{color: 'red'}}>{formErrors.itemName}</p>
                    </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Item Number</Form.Label>
                    <Form.Control type="text" name="itemNumber" value={formData.itemNumber} onChange={handleChange}  
                    readOnly  // This will make the field read-only
                    />
                    <p style={{color: 'red'}}>{formErrors.itemNumber}</p>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      name="quantity"
                      type="number"
                      value={formData.quantity} 
                      onChange={handleChange}
                      required
                    ></Form.Control>
                    <p style={{color: 'red'}}>{formErrors.quantity}</p>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date of order</Form.Label>
                    <Form.Control name="dateofOrder" type="date" 
                     value={formData.dateofOrder} onChange={handleChange}
                    required min ={today}>
                     </Form.Control>
                     <p style={{color: 'red'}}>{formErrors.dateofOrder}</p>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control type="text" name="companyAddress"
                     value={formData.companyAddress} 
                     onChange={handleChange}
                     required>
                    </Form.Control>
                    <p style={{color: 'red'}}>{formErrors.companyAddress}</p>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Supplier Name</Form.Label>
                    <Form.Control type="text" name="supplierName" 
                    value={formData.supplierName} 
                    onChange={handleChange}
                    required>
                    </Form.Control>
                    <p style={{color: 'red'}}>{formErrors.supplierName}</p>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control type="text" name="comments"
                    value={formData.comments} 
                    onChange={handleChange}
                    required>
                    </Form.Control>
                    <p style={{color: 'red'}}>{formErrors.comments}</p>
                  </Form.Group>


                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#00adb4",
                      borderRadius: "20px",
                      border: "none",
                    }}
                  >
                    Submit
                  </Button>
                </Col>
                <Col md={6} className="d-none d-md-block">
                <Image
                    src={formImg}
                    alt="Car Service"
                    fluid
                    rounded
                    style={{ borderRadius: "100px", minHeight: "800px",minWidth: "400px" }}
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderPlacement;



