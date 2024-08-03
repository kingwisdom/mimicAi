import { Link, useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/clerk-react'
import { useEffect } from 'react';

const HomePage = () => {
    const navigate = useNavigate();

    const { userId, isLoaded } = useAuth();

    // useEffect(() => {
    //     if (isLoaded && userId) {
    //         navigate("/dashboard");
    //     }
    // }, [isLoaded, userId, navigate]);

    if (!isLoaded) return "Loading...";

    return (
        <div className="content-body">
            <div className="welcome-area" style={{ backgroundImage: 'url("../assets/images/background/bg1.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="welcome-inner flex-column">
                    <div className="logo-area">
                        {/* <img className="logo" src="../assets/images/logo.png" alt="" /> */}
                        <h3 className="title text-white">welcome to Mimic AI</h3>
                    </div>
                    <div className="social-area">
                        <SignedIn>
                            <UserButton className="w-100 mx-auto" />
                            {navigate('/dashboard')}
                        </SignedIn>
                        <SignedOut>
                            <Link className="btn btn-icon icon-start btn-tp w-100" to="/sign-in">Sign In</Link>
                            <a href="/sign-up" className="btn btn-icon-outline btn-white icon-start w-100">
                                <img src="../assets/images/social-icon/telephone.svg" alt="" />
                                <span>Register.</span>
                            </a>
                        </SignedOut>
                        {/* <a href="/login" className="btn btn-icon icon-start btn-tp w-100">
                            <span>Sign in</span>
                        </a> */}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage