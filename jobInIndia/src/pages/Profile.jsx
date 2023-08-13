import { Form, useNavigation, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const profileAction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 5000000) {
    toast.error("file size too much");
    return null;
  }
  try {
    await customFetch.patch(`users/update-user`, formData);
    return toast.success("profile updated successfully");
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.msg);
  }
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  const navigation = useNavigation();
  const isSubbmiting = navigation.state == "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">ProfileForm</h4>
        <div className="form-center">
          <FormRow
            type="file"
            name="avatar"
            labelText="Upload Picture"
            classNames="form-input"
            accept="image/*"
          ></FormRow>

          <FormRow
            type="text"
            name="name"
            defaultValue={name}
            labelText="Name"
          ></FormRow>
          <FormRow
            type="text"
            name="lastName"
            defaultValue={lastName}
            labelText="lastName"
          ></FormRow>
          <FormRow
            type="email"
            name="email"
            defaultValue={email}
            labelText="Email"
          ></FormRow>
          <FormRow
            type="text"
            name="location"
            defaultValue={location}
            labelText="Location"
          ></FormRow>

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubbmiting}
          >
            {isSubbmiting ? "Submittig..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
