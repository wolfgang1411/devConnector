import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../reducers/actions/profileAction";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        {" "}
        <Moment formet="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "now"
        ) : (
          <Moment formet="YYYY/MM/DD">{exp.to}</Moment>
        )}{" "}
      </td>
      <td>
        {" "}
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experience Crediantials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Year</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default connect(null, { deleteExperience })(Experience);
