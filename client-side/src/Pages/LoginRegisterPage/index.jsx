import React, { Component } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate for redirection
import './index.css';
import GoogleLogo from '../../assets/google_icon.png';
import Cookies from 'js-cookie';
import { auth, db } from "./firebase"; 
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

class LoginRegisterPage extends Component {
    state = {
        isLogin: false,
        loginEmail: '',
        loginPassword: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null
    };

    // Check if the user is already logged in
    isLoggedIn = () => {
        const uid = Cookies.get('uid');
        return !!uid; // Returns true if uid exists, false otherwise
    };

    toggleLoginRegister = () => {
        this.setState({
            isLogin: !this.state.isLogin,
            error: null
        });
    };

    handleLoginEmailChange = (e) => {
        this.setState({ loginEmail: e.target.value });
    };

    handleLoginPasswordChange = (e) => {
        this.setState({ loginPassword: e.target.value });
    };

    handleFullNameChange = (e) => {
        this.setState({ fullName: e.target.value });
    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleConfirmPasswordChange = (e) => {
        this.setState({ confirmPassword: e.target.value });
    };

    handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, this.state.loginEmail, this.state.loginPassword);
            const user = userCredential.user;
            Cookies.set('uid', user.uid, { expires: 7 });
            console.log('Logged in:', user.uid);
            this.setState({ error: null });
        } catch (error) {
            console.error('Error logging in:', error);
            this.setState({ error: error.message });
        }
    };

    handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ error: "Passwords do not match" });
            return;
        }

        // Trim email to remove leading/trailing spaces
        const email = this.state.email.trim();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, this.state.password);
            const user = userCredential.user;
            Cookies.set('uid', user.uid, { expires: 7 });
            console.log('Signed up:', user.uid);
            await setDoc(doc(db, "users", user.uid), {
                fullName: this.state.fullName,
                email: user.email,
                uid: user.uid
            });
            this.setState({ error: null });
        } catch (error) {
            console.error('Error signing up:', error);
            if (error.code === 'auth/invalid-email') {
                this.setState({ error: "Invalid email format" });
            } else {
                this.setState({ error: error.message });
            }
        }
    };

    handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            Cookies.set('uid', user.uid, { expires: 7 });
            console.log('Signed in with Google:', user.uid);
            await setDoc(doc(db, "users", user.uid), {
                fullName: user.displayName,
                email: user.email,
                uid: user.uid
            }, { merge: true });
            this.setState({ error: null });
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        // Redirect to home page if the user is already logged in
        if (this.isLoggedIn()) {
            return <Navigate to="/" replace />;
        }

        const { isLogin, loginEmail, loginPassword, fullName, email, password, confirmPassword, error } = this.state;
        return (
            <div className="login-register-page">
                <div className="login-register-moving-block" style={{
                    left: isLogin ? '50vw' : '20px',
                }}></div>
                <div className="login-block">
                    <h1 className="lr-h1-edit"> Log in </h1>
                    <p className="lr-p-edit"> Welcome back! Please enter your details </p>
                    <form className="login-form-block" onSubmit={this.handleLoginSubmit}>
                        <label> Email </label>
                        <input type='email' value={loginEmail} onChange={this.handleLoginEmailChange} placeholder="Enter your username" />
                        <label> Password </label>
                        <input type="password" value={loginPassword} onChange={this.handleLoginPasswordChange} placeholder="Enter your password" />
                        <p className="l-fp-edit"> forgot password? </p>
                        <button className="login-btn" type="submit"> Log in </button>
                        <div className="or-c-line-text-edit">
                            <hr />
                            <p> Or </p>
                            <hr />
                        </div>
                        <button className="l-w-google-btn" onClick={this.handleGoogleSignIn}>
                            <img src={GoogleLogo} />
                            <p> Continue with Google </p>
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                    <p className="d-h-acc-edit"> Don't have an account?<span onClick={this.toggleLoginRegister}>Sign up</span></p>
                </div>
                <div className="signup-block">
                    <h1 className="lr-h1-edit"> Sign up </h1>
                    <p className="lr-p-edit"> Create your account </p>
                    <form className="signup-form-block" onSubmit={this.handleSignupSubmit}>
                        <label> Full Name </label>
                        <input type='text' value={fullName} onChange={this.handleFullNameChange} placeholder="Enter your full name" />
                        <label> Email </label>
                        <input type='email' value={email} onChange={this.handleEmailChange} placeholder="Enter your email" />
                        <label> Password </label>
                        <input type="password" value={password} onChange={this.handlePasswordChange} placeholder="Enter your password" />
                        <label> Confirm Password </label>
                        <input type="password" value={confirmPassword} onChange={this.handleConfirmPasswordChange} placeholder="Confirm your password" />
                        <button className="signup-btn" type="submit"> Sign up </button>
                        <div className="or-c-line-text-edit">
                            <hr />
                            <p> Or </p>
                            <hr />
                        </div>
                        <button className="l-w-google-btn" onClick={this.handleGoogleSignIn}>
                            <img src={GoogleLogo} />
                            <p> Sign up with Google </p>
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                    <p className="d-h-acc-edit"> Already have an account?<span onClick={this.toggleLoginRegister}>Log in</span></p>
                </div>
            </div>
        );
    }
}

export default LoginRegisterPage;