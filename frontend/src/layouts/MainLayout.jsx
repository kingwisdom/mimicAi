import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";
import Footer from './Footer'
import ChatList from '../components/ChatList';

const MainLayout = () => {
    const { userId, isLoaded } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in");
        }
    }, [isLoaded, userId, navigate]);

    if (!isLoaded) return "Loading...";

    return (
        <>
            <header className="header bg-white header-fixed border-0 style-2">
                <div className="container">
                    <div className="header-content">
                        <div className="left-content style-2">
                            <a href="javascript:void(0);" className="filter-icon icon-fill" data-bs-toggle="offcanvas" data-bs-target="#settingCanvas" aria-controls="offcanvasBottom">
                                <i className="flaticon flaticon-settings-sliders" />
                            </a>
                        </div>
                        <div className="mid-content">
                            <h5 className="title">MimicAI</h5>
                        </div>
                        <div className="right-content d-flex gap-2">
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
            <Footer />


            {/* popup */}
            <div className="offcanvas offcanvas-bottom container p-0" tabIndex={-1} id="settingCanvas">
                <button type="button" className="btn-close drage-close" data-bs-dismiss="offcanvas" aria-label="Close" />

                <div className="offcanvas-header share-style m-0">
                    <h4 className="title mb-0">History</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className="fa-solid fa-xmark" /></button>
                </div>
                <div className="offcanvas-body">

                    <ChatList />

                    <a href="#" className="btn btn-primary w-50 mx-auto">Logout</a>
                </div>
            </div>
        </>
    )
}

export default MainLayout