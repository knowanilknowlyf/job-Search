import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const registerAction = async ({ request }) => {
  
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const dataNew = await customFetch.post("/auth/register", data);
    console.log(dataNew);
    toast.success('Registration successful')
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg[0])

    console.log(error);
    return error;
  }
};
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting=navigation.state=='submitting'
  return (
    <Wrapper>
      <Form method="post" className="form" name="registerForm">
        <Logo />
        <h4>Register Form</h4>
        <FormRow name="name" labelText="Name" type="text"  />
        <FormRow
          name="lastName"
          labelText="Last Name"
          type="text"
          
        />
        <FormRow
          name="location"
          labelText="Location"
          type="text"
          
        />
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
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
         {isSubmitting?"submitting...":"Submit"} 
        </button>
        <p>
          Already a member?
          <Link className="member-btn" to="/login">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
