import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup()
{
   const [fisrtName,setFirstName] = useState("");
   const [lastName,setLastName] = useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const [address,setAddress]=useState("");
   const [city,setCity]=useState("");
   const [states,setStates]=useState("");
   const [zip,setZip]=useState(0);
   

   const handleSubmit = (e) => {

    e.preventDefault();
    const userData={
      
        First_Name:fisrtName,
        Last_Name:lastName,
        Email:email,
        Password:password,
        Address:address,
        City:city,
        State:states,
        Zip:zip
      }

      axios.post('/server/catalyst_demo_app_function/signup', {
        fisrtName,
        lastName,
        email,
        password,
        address,
        city,
        states,
        zip
      })
      .then((response) => {
        console.log("success signup");
        console.log(response);
        setFirstName("");
        setLastName("");
        setAddress("");
        setCity("");
        setEmail("");
        setPassword("");
        setStates("");
        setZip(0);
        navigate('/login');
      })
      .catch((err)=>{
        console.log(err);
      })
   }

    const navigate = useNavigate();
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
                         navigate('/signup')
                      }}>SignUp</a>
                       <a className="nav-link"  onClick={()=>{
                         navigate('/login')
                      }}>Log in</a>
                    </div>
                </div>
            </div>
        </nav>


        <div className='container-fluid mt-3'>
        <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col">
            <input value={fisrtName} type="text" class="form-control" placeholder="First name" aria-label="First name"onChange={(e)=>{
                setFirstName(e.target.value);
            }}/>
        </div>
        <div class="col">
            <input value={lastName} type="text" class="form-control" placeholder="Last name" aria-label="Last name" onChange={(e)=>{
                setLastName(e.target.value);
            }}/>
        </div>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Email</label>
                <input value={email} type="email" class="form-control" id="inputEmail4" onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input value={password} type="password" class="form-control" id="inputPassword4"
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input value={address} type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
                 onChange={(e)=>{
                    setAddress(e.target.value);
                }}/>
            </div>
          
            <div class="col-md-6">
                <label for="inputCity" class="form-label">City</label>
                <input value={city} type="text" class="form-control" id="inputCity"  onChange={(e)=>{
                    setCity(e.target.value);
                }}/>
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">State</label>
                <select value={states} id="inputState" class="form-select"  onChange={(e)=>{
                    setStates(e.target.value);
                }}>
                <option selected>Choose...</option>
                <option>...</option>
                </select>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Zip</label>
                <input value={zip} type="text" class="form-control" id="inputZip"  onChange={(e)=>{
                    setZip(e.target.value);
                }}/>
            </div>
            
            <div class="col-12">
                <button type="submit" class="btn btn-primary"
                
                >Sign in</button>
            </div>
        </form>
        </div>
        </div>

      
    )
}
export default Signup;