import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Form, Field, withFormik } from 'formik';
import { Form as SemanticForm, Button, Grid, Message } from 'semantic-ui-react';
import * as yup from 'yup';
import _ from 'lodash';

const Registration = ({ errors, touched, values, status, history }) => {
	const authContext = useContext(AuthContext);

	const { register, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/users/dashboard');
		}
		// eslint-disable-next-line
	}, [isAuthenticated, history]);

	// const [user, setUser] = useState({
	// 	fname: '',
	// 	lname: '',
	// 	useremail: '',
	// 	username: '',
	// 	password: '',
	// 	password2: ''
	// });

	// const { fname, lname, useremail, username, password, password2 } = user;

	// const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	// const onSubmit = e => {
	// 	e.preventDefault();
	// 	if (
	// 		fname === 0 ||
	// 		lname === 0 ||
	// 		username === 0 ||
	// 		useremail === 0 ||
	// 		password === ''
	// 	) {
	// 		console.log('Please enter all fields');
	// 	} else if (password !== password2) {
	// 		console.log('Passwords do not match');
	// 	} else {
	// 		register({ fname, lname, useremail, username, password });
	// 	}
	// };

	return (
		<Grid container centered>
			<Grid.Column width={8}>
				<Form className="ui form">
					{
						!_.isEmpty(_.intersection(Object.keys(touched), Object.keys(errors))) && (
							<Message
								icon="warning circle" header="There's some problems with the information below."
								negative list={_.intersection(Object.keys(touched), Object.keys(errors)).map(key => errors[key])}
							/>
						)
					}

					<SemanticForm.Field>
						<label>
							First Name
          		<Field type="text" name="fname" />
						</label>
					</SemanticForm.Field>
					<SemanticForm.Field>
						<label>
							Last Name
          		<Field type="text" name="lname" />
						</label>
					</SemanticForm.Field>
					<SemanticForm.Field>
						<label>
							Email
          		<Field type="email" name="useremail" />
						</label>
					</SemanticForm.Field>
					<SemanticForm.Field>
						<label>
							Username
          		<Field type="text" name="username" />
						</label>
					</SemanticForm.Field>
					<SemanticForm.Field>
						<label>
							Password
          		<Field type="password" name="password" />
						</label>
					</SemanticForm.Field>
					<SemanticForm.Field>
						<label>
							Confirm Password
          		<Field type="password" name="password2" />
						</label>
					</SemanticForm.Field>
					<Button primary type="submit">Register</Button>
				</Form>
			</Grid.Column>
		</Grid>
		// <div className='form-container'>
		// 	<h1>
		// 		Account <span>Register</span>
		// 		<form onSubmit={onSubmit}>
		// 			<div>
		// 				<label htmlFor='fname'>First Name</label>
		// 				<input
		// 					type='text'
		// 					name='fname'
		// 					value={fname}
		// 					onChange={onChange}
		// 					required
		// 				/>
		// 			</div>
		// 			<div>
		// 				<label htmlFor='lname'>Last Name</label>
		// 				<input
		// 					type='text'
		// 					name='lname'
		// 					value={lname}
		// 					onChange={onChange}
		// 					required
		// 				/>
		// 			</div>
		// 			<div>
		// 				<label htmlFor='useremail'>Email Address</label>
		// 				<input
		// 					type='email'
		// 					name='useremail'
		// 					value={useremail}
		// 					onChange={onChange}
		// 					required
		// 					placeholder='Valid Email'
		// 				/>
		// 			</div>
		// 			<div>
		// 				<label htmlFor='username'>User Name</label>
		// 				<input
		// 					type='text'
		// 					name='username'
		// 					value={username}
		// 					onChange={onChange}
		// 					required
		// 					minLength='5'
		// 				/>
		// 			</div>
		// 			<div>
		// 				<label htmlFor='password'>Password</label>
		// 				<input
		// 					type='password'
		// 					name='password'
		// 					value={password}
		// 					onChange={onChange}
		// 					required
		// 					minLength='6'
		// 				/>
		// 			</div>
		// 			<div>
		// 				<label htmlFor='password2'>Confirm Password</label>
		// 				<input
		// 					type='password'
		// 					name='password2'
		// 					value={password2}
		// 					onChange={onChange}
		// 					required
		// 					minLength='6'
		// 				/>
		// 			</div>
		// 			<input type='submit' value='Register' />
		// 		</form>
		// 	</h1>
		// </div>
	);
};

const FormikRegistration = withFormik({
	mapPropsToValues: ({ fname, lname, useremail, username, password, password2 }) => {
		return {
			fname: fname || '',
			lname: lname || '',
			useremail: useremail || '',
			username: username || '',
			password: password || '',
			password2: password2 || '',
		};
	},

	validationSchema: yup.object().shape({
		fname: yup.string().required("You must provide your first name."),
		lname: yup.string().required("You must provide your last name."),
		useremail: yup.string().required("You must provide an email.").email("The email provided is not valid."),
		username: yup.string().required("You must provide a username.").min(5, "Your username must be at least 5 characters long."),
		password: yup.string().required("You must provide a password.").min(6, "Your password must be at least 6 characters long."),
		password2: yup.string().required("You must confirm your password.").oneOf([yup.ref('password')], "The passwords do not match.")
	}),

	handleSubmit: function ({ fname, lname, useremail, username, password }, { resetForm }) {
		console.log({ fname, lname, useremail, username, password });
		resetForm();
	}
})(Registration);

export default FormikRegistration;
