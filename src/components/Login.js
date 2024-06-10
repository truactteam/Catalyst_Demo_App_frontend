import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login()
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [rowID,setROWID]=useState(0);
   

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log(email);
        console.log(password);
        e.preventDefault();

        axios.get('/server/catalyst_demo_app_function/login',{
            headers: {
                'Content-Type': 'application/json'
              },
              params: {
                Email:email,
                Password:password 
              }
        })
        .then(async (response)=>{
            console.log("user exists");
            console.log(response.data.data.userData2);
            console.log(response.data.data.userData2[0].ROWID);
             let  ROWID = response.data.data.userData2[0].ROWID;
            setROWID(response.data.data.userData2[0].ROWID);
            console.log(response.data.data.userData2[0].ROWID,"ROWIDDD");
            await axios.post('/server/catalyst_demo_app_function/otp',{
               email
               })
               .then(async (response)=>{

                    console.log(response);
                    console.log("mail sent");
                    console.log(response.data.data.otp)
                    console.log(ROWID,"rowid");
                    await axios.put(`/server/catalyst_demo_app_function/${ROWID}`,
                        {
                          OTP: response.data.data.otp
                        }
                    )
                    .then((response)=>{
                         console.log("otp stored success");
                         console.log(response.data.data);
                    }
                    )
                    .catch((err)=>{
                        console.log(err);
                    })
               })
               .catch((err)=>{
                      console.log(err)
               })

            if(response.data.data.userData.length < 1)
                {
                    navigate('/signup');
                }
            else
            {
                if(response.data.data.userData2.length > 0)
                    {
                        navigate(`/otp/${ROWID}`);
                    }
                    else{
                        alert("Please enter correct password!!");
                        setPassword("");
                    }
            }
            
            
        })
        .catch((err)=>{
            console.log(err);
        })
       
    }

  return(
      
    <div className='App'>
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
    <form className='mt-3' onSubmit={handleSubmit}>
        <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPassword3" value={email} class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
            <input type="password" value={password} class="form-control" id="inputPassword3" onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            </div>
        </div>
  
  
  <button type="submit" class="btn btn-primary" onClick={ ()=>{
                             
                            
                            
                          }    
                          }>Log in</button>
</form>
</div>
    </div>
    
  )
}
export default Login;
