import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData, checkSignUpData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
        const validatedData = checkValidateData(email.current.value, password.current.value);
        setErrorMessage(validatedData);
        if(!isSignInForm){
            const validatedSignupData = checkSignUpData(fullName.current.value);
            setErrorMessage(validatedSignupData);

            if(errorMessage){
                return;
            } 

            //signup logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
                )
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log("from firebase api after successful sign up",user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "---" +errorMessage);
                });

        }else{
            //sign in logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
                )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("from firebase api after successful sign in",user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "---" + errorMessage);
                });
        }
    };

    return (
        <div>
            <Header />
            <div className="absolute">           
                <img 
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt='background-img'
                >
                </img>
            </div>
            <form 
                onSubmit={(e)=>e.preventDefault()}
                className="w-3/12 p-12 bg-black absolute my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        ref={fullName}
                        type="text"
                        placeholder="Full Name"
                        className="my-4 p-4 w-full bg-gray-700"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="my-4 p-4 w-full bg-gray-700"
                />
                <input
                    ref={password}
                    type="password" 
                    placeholder="Password" 
                    className="my-4 p-4 w-full bg-gray-700"
                />
                <p className="font-bold text-lg text-red-500 py-2">{errorMessage}</p>
                <button 
                    className="p-6 my-4 bg-red-700 w-full rounded-lg"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p 
                    className="py-4 cursor-pointer"
                    onClick={toggleSignInForm}
                >
                    {
                        isSignInForm ? 
                        "Sign New to Netflix? Sign Up Now" : 
                        "Already registered ? Sign In Now"
                    }
                    
                </p>
            </form>
        </div>
    );
}

export default Login;