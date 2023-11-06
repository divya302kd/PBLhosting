import React, { Component } from 'react'
import Modal from "react-responsive-modal";
import './css/style.css'
import Signup from '../project-ui/Signup';
import Login from '../project-ui/Login';
import logo from '../project-images/nwmsu-logo2.png'


class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sign: false,
            login: false,

        }
    }

    onOpenModal = () => {
        this.setState({ sign: true });
    };

    onOpenModalLogin = () => {
        this.setState({ login: true });
    };

    onCloseModal = () => {
        this.setState({ sign: false });
    };

    onCloseModalclose = () => {
        this.setState({ login: false });
    };




    render() {
        const { login, sign } = this.state;
        return (
            <>
                <header className="header header-animated opaque" style={{ "display": 'block', "paddingTop": "5px", "paddingBottom": "5px" }}>
                    <div className="container" style={{ "marginLeft": "41px", "width": "1377px" }}>
                        <nav className="navbar navbar-default" role="navigation">
                            <div className="navbar-header">
                                <div className = "row">
                                <div className = "col-sm-5 col-md-5">
                                <a className="" href="#">
                                    <img className=""  src={logo} alt="" data-logo-alt={logo} />
                                </a>    
                                </div>
                                <div style={{paddingTop: '20px'}} className = "col-sm-7 col-md-7 navbar-brand">
                                <span style={{color: '#007257', fontWeight : 'bold'}} >Northwest Project Explorer</span>
                                </div>  
                                
                                </div>                       
                            </div>
                            
                            <div>
                           
                            </div>

                            {/* <div className="nav-toggle collapsed" data-toggle="collapse" data-target="#navbarMain" aria-expanded="false" style={{ "top": "15px" }}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div> */}
                            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                            <div className="navbar-collapse collapse in" id="navbarMain" aria-expanded="true" style={{ top: "65px" }}>

                                <ul className="nav navbar-nav navbar-right">
                                   {/* <li>
                                        <a href="/Home">Home</a>
                                    </li>

                                    <li>
                                        <a href="/About">About</a>
                                    </li>*/}
                                    <li>
                                        <button className="btn btn-primary-outline" id="signup" onClick={this.onOpenModal}>SignUp</button>
                                    </li>
                                    <li>
                                        <button className="btn btn-primary-outline" id="login" onClick={this.onOpenModalLogin}>Login</button>
                                    </li>
                                </ul>

                            </div>

                            {/* <!-- .navbar-collapse --> */}
                        </nav>
                    </div>

                </header>
                {/* Sign up model */}

                <Modal open={sign} onClose={this.onCloseModal}>                    
                    <Signup></Signup>
                </Modal>

                {/* <!-- signUp End -->
                  <!-- login --> */}

                <Modal open={login} onClose={this.onCloseModalclose}>                    
                    <Login></Login>
                </Modal>
            </>

        );
    }
}




export default Header
