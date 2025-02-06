import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";

const SignUp = () => {
  const [error, setError] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // reset error status
    setError("");

    if (password.length < 6) {
      setError("Password should be 6 characters or longer!");
      return;
    }

    // create user with email and pass
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log("ERROR", error);
        setError(error.message);
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">SignUp</button>
            </div>
          </form>
          {error && <p className="text-red-600 font-bold ms-8 mb-8">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
