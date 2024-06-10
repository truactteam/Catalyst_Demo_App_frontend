import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./OTP.css"

function OTP({setIsAuthenticated}) {
    const { id } = useParams();
    const [code, setCode] = useState('');
    const [fetchState, setFetchState] = useState('init');
    const [errorMessage, setErrorMessage] = useState('');
  

    const navigate = useNavigate();

    useEffect(() => {
        if (fetchState !== 'fetched' && id != null) {
            axios.get(`/server/catalyst_demo_app_function/otp`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    ROWID: id
                }
            })
                .then((response) => {
                    console.log("otp fetched")
                    console.log(response.data.data.otp[0].otp)
                    setFetchState('fetched');
                    setCode(response.data.data.otp[0].otp);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [fetchState, id]);

    const verifyOTP = async () => {
        if (code === '') {
            setErrorMessage('Please wait for OTP to be fetched.');
            return;
        }
        const enteredOTP = document.getElementById('otp1').value +
            document.getElementById('otp2').value +
            document.getElementById('otp3').value +
            document.getElementById('otp4').value +
            document.getElementById('otp5').value +
            document.getElementById('otp6').value;

        if (enteredOTP === code) {

            setErrorMessage('');
           
            console.log("Navigating to Forms...");
            await setIsAuthenticated(true);
            navigate("/forms");
            console.log("Navigation done.");

        } else {
            setErrorMessage('Invalid OTP. Please try again.');
        }
    };

    return (
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
                                navigate('/items')
                            }}>Item Master</a> 
                            <a className="nav-link" onClick={() => navigate('/customers')}>Customers</a>
                            <a className="nav-link" onClick={() => navigate('/signup')}>SignUp</a>
                            <a className="nav-link" onClick={() => navigate('/login')}>Log in</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="main">
                <div className="container-fluid otp-box">
                    <h1>OTP</h1>
                    <h2>Enter OTP</h2>
                    <div className="input-container">
                        <div className="box">
                            <input className="otp-input" type="number" id="otp1" maxLength="1" placeholder="_" />
                        </div>
                        <div className="box">
                            <input className="otp-input" type="number" id="otp2" maxLength="1" placeholder="_" />
                        </div>
                        <div className="box">
                            <input className="otp-input" type="number" id="otp3" maxLength="1" placeholder="_" />
                        </div>
                        <div className="box">
                            <input className="otp-input" type="number" id="otp4" maxLength="1" placeholder="_" />
                        </div>
                        <div className="box">
                            <input className="otp-input" type="number" id="otp5" maxLength="1" placeholder="_" />
                        </div>
                        <div className="box">
                            <input className="otp-input" type="number" id="otp6" maxLength="1" placeholder="_" />
                        </div>
                    </div>
                    <button
                        className="verify-btn"
                        onClick={verifyOTP}>Verify</button>
                    <div className="error-message">{errorMessage}</div>
                </div>
            </div>
        </div>
    )
}
export default OTP;
