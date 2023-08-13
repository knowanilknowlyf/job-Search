import React from "react";
import { Form, redirect, useActionData, useNavigation, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow,FormSelectRow } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const addJobAction = async({request})=> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/jobs',data)
        toast.success("Job Added successful");
        return redirect("./all-jobs");
       
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error)
       return redirect('../dashboard') 
    }

}


const AddJob = () => {
  const { user } = useOutletContext();
  const isSubmitting = useNavigation().state == "submitting";

  return (
    <Wrapper>
      <Form method='post' className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" labelText="Position"></FormRow>
          <FormRow type="text" name="company" labelText="Comapny"></FormRow>
          <FormRow type="text" name="jobLocation" labelText="Location"></FormRow>
          <FormSelectRow
            name="jobStatus"
            labelText="Job Status"
            options={JOB_STATUS}
            defaultValue={JOB_STATUS.PENDING}
          ></FormSelectRow>
          <FormSelectRow
            name="jobType"
            labelText="Job Type"
            options={JOB_TYPE}
            defaultValue={JOB_TYPE.FULLTIME}
          ></FormSelectRow>
         
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submittig..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
