import React, { Component } from "react";
import TestInputGroup from "./TestInputGroup";
import { Consumer } from "../context";
import axios from "axios";

export default class EditContact extends Component {
	// State where what we want to add ..invalid-feedback
	state = {
		name: "",
		email: "",
		phone: "",
		errors: {}
	};

	async componentDidMount() {
		const { id } = this.props.match.params;
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${id}`
		);
		this.setState({
			name: res.data.name,
			email: res.data.email,
			phone: res.data.phone
		});
	}

	onChange = e =>
		this.setState({
			[e.target.name]: e.target.value.trimLeft()
		});

	onSubmit = async (dispatch, e) => {
		e.preventDefault();

		const { name, email, phone } = this.state;

		// * Check for errors
		const errors = {};
		if (!name) errors.name = "Name is Required";
		if (!email) errors.email = "Email is Required";
		if (!phone) errors.phone = "Phone number is Required";
		this.setState({ errors });

		if (!Object.keys(errors).length) {
			const UpdateContact = {
				name: name.trim(),
				email: email.trim(),
				phone: phone.trim()
			};

			const { id } = this.props.match.params;
			const res = await axios.put(
				`https://jsonplaceholder.typicode.com/users/${id}`,
				UpdateContact
			);

			dispatch({ type: "UPDATE_CONTACT", payload: res.data });

			this.setState({
				name: "",
				email: "",
				phone: "",
				errors: {}
			});
			// Redirect the page to contacts home page..
			this.props.history.push("/");
		}
	};

	render() {
		const { name, email, phone, errors } = this.state;
		return (
			<Consumer>
				{({ dispatch }) => {
					return (
						<div className="card mb-3">
							<div className="card-header">Add Contact</div>
							<div className="card-body">
								<form onSubmit={e => this.onSubmit(dispatch, e)}>
									<TestInputGroup
										autofocus={true}
										label="Name"
										name="name"
										type="text"
										placeholder="Enter Name..."
										value={name}
										onChange={this.onChange}
										error={errors.name}
									></TestInputGroup>
									<TestInputGroup
										autofocus={true}
										label="Email"
										name="email"
										type="email"
										placeholder="Enter email..."
										value={email}
										onChange={this.onChange}
										error={errors.email}
									></TestInputGroup>
									<TestInputGroup
										autofocus={true}
										label="Phone"
										name="phone"
										type="text"
										placeholder="Enter Phone Number..."
										value={phone}
										onChange={this.onChange}
										error={errors.phone}
									></TestInputGroup>
									<input
										type="submit"
										value="Edit Contact"
										className="btn btn-light btn-block"
									></input>
								</form>
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}
