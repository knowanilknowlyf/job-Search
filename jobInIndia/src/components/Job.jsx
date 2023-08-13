import React from "react";
import Wrapper from "../assets/wrappers/Job";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import JobInfo from "./JobInfo";
import { FaBriefcase, FaCalendar, FaLocationArrow } from "react-icons/fa";
import { Form, Link } from "react-router-dom";
day.extend(advancedFormat);
const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do,YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation} />
          <JobInfo icon={<FaCalendar/>} text={date} />
          <JobInfo icon={<FaBriefcase/>} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
          <footer className="actions">
            <Link className="btn edit-btn" to={`../edit-job/${_id.toString()}`}> Edit</Link>
            <Form method="post" action={`../delete-job/${_id}`}>
              <button type="submit" className="btn btn-delete">
                Delete
              </button>
            </Form>
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Job;
