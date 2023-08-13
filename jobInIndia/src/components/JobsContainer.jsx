import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobContext } from "../pages/AllJobs";
import Job from "./Job";
const JobsContainer = ({ labelText, name, defaultValue = "", options }) => {
  const { data } = useAllJobContext();
  const { job } = data;
  if (job.length == 0) {
    return <h4>No Jobs Found</h4>;
  }
  return (
    <Wrapper>
      <div className="jobs">
        {job.map((val) => (
          <Job key={val._id} {...val} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
