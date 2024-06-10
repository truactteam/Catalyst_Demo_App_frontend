import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Items(){
    const navigate = useNavigate();
    const [itemID,setItemID] = useState(0);
    const [item,setItem] = useState("");
    const [price,setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('/server/catalyst_demo_app_function/items',{
            itemID,
            item,
            price
        })
        .then((response)=>{
            console.log("successfull items");
            console.log(response.data);
            setItemID(0);
            setItem("");
            setPrice(0);
           
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="App">
           <nav className="navbar navbar-expand-lg bg-body-tertiary topclass">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
              <a className="nav-link" href="#">About Us</a>
              <a className="nav-link"  onClick={()=>{
                navigate('/customers')
              }}>Customers</a> 
              <a className="nav-link"  onClick={()=>{
                navigate('/items')
              }}>Item Master</a> 
              <a className="nav-link"  onClick={()=>{
                         navigate('/signup')
                      }}>SignUp</a>
              <a className="nav-link"  onClick={()=>{
                         navigate('/login')
                      }}>Log in</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">

      <form onSubmit={handleSubmit}>
      
      <div className="form-group mb-3">
      <label htmlFor="exampleInputCustomer">Item ID: </label>
          <input value={itemID} type="number" onChange={(e)=>{
           setItemID(e.target.value)
          }}
          className="form-control" id="ItemID" aria-describedby="itemHelp" placeholder="Enter Item ID"/>
      </div>

      <div className="form-group mb-3">
      <label htmlFor="exampleInputCustomer">Item Name: </label>
          <input value={item} type="text" onChange={(e)=>{
           setItem(e.target.value)
          }} className="form-control" id="ItemName" aria-describedby="itemHelp" placeholder="Enter Item Name"/>
      </div>

      <div className="form-group mb-3">
      <label htmlFor="exampleInputCustomer">Price per Unit: </label>
          <input value={price} type="number" onChange={(e)=>{
           setPrice(e.target.value)
          }} className="form-control" id="Price" aria-describedby="itemHelp" placeholder="Enter Price per Unit"/>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
      </div>

        </div>
    )
}

export default Items;