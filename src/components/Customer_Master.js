import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Customer_Master()
{
    const navigate = useNavigate();
    const[cust_name,setCust_Name]=useState("");
    const[phone,setPhone]=useState(0);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('/server/catalyst_demo_app_function/cust',{
            cust_name,
            phone
        })
        .then((response)=>{
            console.log("success");
            console.log(response);
           
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
                    <a className="nav-link" href="#">Customers</a> 
                    </div>
                </div>
                </div>
           </nav>

      <div className="container-fluid">

      <form onSubmit={handleSubmit}>
        <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Customer_Name</label>
            <div class="col-sm-10">
            <input type="text" value={cust_name} class="form-control" id="inputEmail3" onChange={(e)=>{
                setCust_Name(e.target.value);
            }}/>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Phone Number</label>
            <div class="col-sm-10">
            <input type="tel"  value={phone} class="form-control" id="inputPassword3" onChange={(e)=>{
                setPhone(e.target.value);
            }}
            />
            </div>
        </div>
  
  
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
      </div>
        </div>
    )
}
export default Customer_Master;