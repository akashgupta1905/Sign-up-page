import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: true,
    confirmPasswordError: true,
  });
  function handleChange(e) {
    const { name, value: inputValue } = e.target;
    setValue({
      ...value,
      [name]: inputValue,
    });
  }
  function validation(email) {
    return email.includes("@") && email.includes(".") && email.includes("com");
  }
  function handelBlur(e) {
    const { name, value: inputValue } = e.target;
    if (name === "email" && !validation(inputValue)) {
      setError({
        emailError: "invalid email format",
      });
    } else {
      setError({
        emailError: "",
        passwordError: "",
      });
    }
  }
  function handelSubmit(e) {
    e.preventDefault();
    if (
      !error.emailError &&
      !error.confirmPasswordError &&
      !error.passwordError
    ) {
      console.log(value);
      setValue({
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("Form submitted successfully!");
    } else {
      alert("Form cannot be submitted!");
    }
  }
  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <form className="w-25 m-auto" onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={value.email}
            required
            onChange={handleChange}
            onBlur={handelBlur}
            style={{
              border: error.emailError ? "1px solid red" : "1px solid black",
            }}
          />
          {error.emailError ? (
            <div className="text-danger">{error.emailError}</div>
          ) : (
            ""
          )}
        </div>
        <label htmlFor="inputPassword5" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          className="form-control"
          aria-describedby="passwordHelpBlock"
          name="password"
          value={value.password}
          onChange={handleChange}
          minLength="8"
          onBlur={(e) => {
            e.target.value.length >= 8
              ? setError({
                  passwordError: false,
                })
              : setError({
                  passwordError: true,
                });
          }}
          style={{
            border: error.passwordError ? "1px solid red" : "1px solid black",
          }}
        />
        {error.passwordError ? (
          <div id="passwordHelpBlock" className="form-text">
            Password must be at least 8 characters
          </div>
        ) : (
          ""
        )}
        <label htmlFor="inputPassword5" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          aria-describedby="passwordHelpBlock"
          name="confirmPassword"
          value={value.confirmPassword}
          onChange={handleChange}
          required
          minLength="8"
          onBlur={(e) => {
            e.target.value === value.password && e.target.value.length >= 8
              ? setError({
                  confirmPasswordError: false,
                })
              : setError({ confirmPasswordError: true });
          }}
          style={{
            border: error.confirmPasswordError
              ? "1px solid red"
              : "1px solid black",
          }}
        />
        {error.confirmPasswordError ? (
          <div id="passwordHelpBlock" className="form-text">
            Password do not match
          </div>
        ) : (
          ""
        )}
        <div className="w-100 d-flex justify-content-center m-3">
          <button type="submit" className="btn btn-primary ">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
