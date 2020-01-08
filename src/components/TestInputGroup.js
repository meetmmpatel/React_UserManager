import React from "react";
import PropTypes from "prop-types";

const TestInputGroup = props => {
	const {
		label,
		name,
		type,
		placeholder,
		value,
		onChange,
		error,
		autofocus
	} = props;

	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				autoFocus={autofocus}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			></input>
			<div className="invalid-feedback">{error}</div>
		</div>
	);
};

TestInputGroup.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	autofocus: PropTypes.bool
};
TestInputGroup.defaultProps = {
	type: "text"
};

export default TestInputGroup;
