import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef();

  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // reset status
    setSuccess(false);
    setLoginError("");

    // login user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // console.log(result.user);
        if (!result.user.emailVerified) {
          setLoginError("PLease verify your email address !");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        setLoginError(error.message);
        console.log("loginError");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setUser(null);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setUser(null);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleForgetPassword = () => {
    console.log("handle password!!", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide a valid email address!");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Reset email sent! Please check your email!!");
      });
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  ref={emailRef}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label onClick={handleForgetPassword} className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>

            <div>
              {success && (
                <p className="font-bold text-green-600 pb-8 ps-8">
                  User login successfully!!
                </p>
              )}

              {loginError && (
                <p className="font-bold text-red-500  pb-8 ps-8">
                  {loginError}
                </p>
              )}

              <p className="font-bold pb-8 ps-8">
                New to this website?{" "}
                <Link to="/signup" className="text-blue-600 underline">
                  Sign Up
                </Link>{" "}
                !!
              </p>
            </div>
          </div>
        </div>
      </div>
      {user ? (
        <button className="btn btn-secondary" onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        <div className="my-4 flex gap-4 justify-center">
          <button className="btn btn-success" onClick={handleGoogleSignIn}>
            Login with Google
          </button>
          <button className="btn btn-info" onClick={handleGithubSignIn}>
            Login with Github
          </button>
        </div>
      )}
      {user && (
        <div>
          <h4>{user.displayName}</h4>
          <p>{user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
