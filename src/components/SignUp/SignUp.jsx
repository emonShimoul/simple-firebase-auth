import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const terms = e.target.terms.checked;

    // reset error status
    setError("");
    setSuccess(false);

    if (!terms) {
      setError("Please accept our terms and condition!");
      return;
    }

    if (password.length < 6) {
      setError("Password should be 6 characters or longer!");
      return;
    }

    // create user with email and pass
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("ERROR", error);
        setError(error.message);
        setSuccess(false);
      });
  };
  return (
    <div className="hero bg-base-200 mx-auto min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h2 className="text-3xl font bold mt-4 mt-8 ms-8">Sign Up Now!!</h2>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 bottom-7"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye></FaEye>}
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" name="terms" className="checkbox" />
                <span className="label-text">
                  Accept Our Terms and Conditions!
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">SignUp</button>
            </div>
          </form>
          {error && <p className="text-red-600 font-bold ms-8 mb-8">{error}</p>}
          {success && (
            <p className="text-green-600 font-bold ms-8 mb-8">
              Sign Up is Successful!!
            </p>
          )}

          <p className="m-2">
            Already have an account? Please <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
