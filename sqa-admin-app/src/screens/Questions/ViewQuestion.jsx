import React from "react";

const ViewQuestion = ({ match }) => {
	return <p>{match.params.id}</p>;
};

export default ViewQuestion;
