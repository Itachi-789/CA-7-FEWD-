import { Link,useNavigate } from "react-router-dom";
import { useFormik } from "formik";
const LoginForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordReEnter: "",
  };

  const navigate=useNavigate();

  const validate = (values) => {
    formik.errors.name = '';
    formik.errors.email = '';
    formik.errors.password = '';
    let errors = {};
    if (!values.name) {
      errors.name = "This is a required field.";
    }
    if (!values.email) {
      errors.email = "This is a required field.";
    } else if (
      !/^[a-zA-Z0-9._%#$^&*()]+@{gmail|yahoo|hotmail|kalvium}+.{community|com|net|in}$/i.test(
        values.email
      )
    ) {
      errors.email = "Invalid email format, please enter a valid email id.";
    }
    if (!values.password) {
      errors.password = "This is a required field.";
    } else if (!/(?=.*[@#$%^&-+=()])/.test(values.password)) {
      errors.password = "Your password must contain a special character.";
    } else if (values.password.length < 10) {
      errors.password = "Password must be of atleast 10 characters.";
    }
    if (!values.passwordReEnter) {
      errors.passwordReEnter = "This is a required field.";
    } else if (values.passwordReEnter !== values.password) {
      errors.passwordReEnter = "Passwords do not match.";
    }
    return errors;
  };
  const onSubmit = (values) => {
    sessionStorage.setItem("Name", formik.values.name);
    console.log(formik.values);
    navigate('/');
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const handleClick = (e) => {
    console.log(formik)
    if (
      formik.errors.name === '' &&
      formik.errors.email === '' &&
      formik.errors.password === ''
    ) {
      onSubmit();
    } else {
      alert("Oops! An error occured.");
    }
    console.log(formik);
  };
  return (
    <div className="formcontainer">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-element">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="errorMessage">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="errorMessage">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="errorMessage">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="form-element">
          <label htmlFor="passwordReEnter">Confirm Password</label>
          <input
            type="password"
            id="passwordReEnter"
            name="passwordReEnter"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordReEnter}
          />
          {formik.touched.passwordReEnter && formik.errors.passwordReEnter ? (
            <div className="errorMessage">{formik.errors.passwordReEnter}</div>
          ) : null}
        </div>
        {formik.errors.name === undefined &&
        formik.touched.name &&
        formik.errors.email === undefined &&
        formik.touched.email &&
        formik.errors.password === undefined &&
        formik.touched.password &&
        formik.errors.passwordReEnter === undefined &&
        formik.touched.passwordReEnter ? (
          <>
            <Link to="/">
              <button type="button" id="workingButton" onClick={handleClick}>
                Submit
              </button>
            </Link>
          </>
        ) : (
          <>
            <button type="button" id="disabledButton" onClick={handleClick}>
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
