import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const dataNew = await customFetch.post("/auth/login", data);
    console.log(dataNew);
    toast.success("logged successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    console.log(error);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret@123",
    };
    try {
      const dataNew = await customFetch.post("/auth/login", data);
      console.log(dataNew);
      toast.success("Take a drive");
      return navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
      return error;
    }
  };
  const isSubmitting = useNavigation().state == "submitting";

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login Form</h4>

        <FormRow
          name="email"
          labelText="Email"
          type="email"
        />
        <FormRow
          name="password"
          labelText="Password"
          type="password"
        />
        <button type="submit" disabled={isSubmitting} className="btn btn-block">
          {isSubmitting ? "Submiting ..." : "Submit"}
        </button>
        <button type="button" onClick={loginDemoUser}className="btn btn-block">
          Explore the Application
        </button>
        <p>
          Not a member?
          <Link className="member-btn" to="/register">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
