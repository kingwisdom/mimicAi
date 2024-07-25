import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Login = () => {
    return (
        <>
            <SignIn forceRedirectUrl={'/dashboard'} path="/sign-in" />;
        </>
    )
}

export default Login