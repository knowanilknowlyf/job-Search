import React from "react";
import { Form, redirect, useLoaderData, useNavigation, useParams } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormSelectRow } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";

export const jobInfoLoader = async ({ params }) => {
  try {
    // const { data } = await customFetch.get("./jobs");

    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const jobInfoAction = async (value) => {
    const formData = await value.request.formData();
    const data = Object.fromEntries(formData);
    console.log(value)
    try {
      const dataNew = await customFetch.patch(`/jobs/${value.params.id}`, data);
      console.log(dataNew);
      toast.success("updated successful");
      return redirect("../all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
  
      console.log(error);
      return error;
    }
};
const EditJob = () => {
  const { job } = useLoaderData();
  console.log(job);
  const isSubmitting = useNavigation().state == "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} labelText="Position"></FormRow>
          <FormRow type="text" name="company" defaultValue={job.company} labelText="Comapny"></FormRow>
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Location"
            defaultValue={job.jobLocation}
          ></FormRow>
          <FormSelectRow
            name="jobStatus"
            labelText="Job Status"
            options={JOB_STATUS}
            defaultValue={job.jobStatus}
          ></FormSelectRow>
          <FormSelectRow
            name="jobType"
            labelText="Job Type"
            options={JOB_TYPE}
            defaultValue={job.jobType}
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

export default EditJob;
