import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Form, Field, ErrorMessage, withFormik } from 'formik';
import { Form as SemanticForm, Button, Container } from 'semantic-ui-react';
import * as yup from 'yup';

const Registration = props => {
	const authContext = useContext(AuthContext);

	const { register, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/users/dashboard');
		}
		// eslint-disable-next-line
	}, [isAuthenticated, props.history]);

	const [user, setUser] = useState({
		fname: '',
		lname: '',
		useremail: '',
		username: '',
		password: '',
		password2: ''
	});

	const { fname, lname, useremail, username, password, password2 } = user;

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
		<Container>
			<Form className="ui form">
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
		</Container>
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
	mapPropsToValues: ({ name, email, password, tos }) => {
		return {
			name: name || '',
			email: email || '',
			password: password || '',
			tos: tos || false,
		};
	},

	validationSchema: yup.object().shape({
		name: yup.string().required('You must provide a name.').max(10, 'Your name cannot be longer than 10 characters.'),
		email: yup.string().email('The email provided is not valid.').required('You must provide an email.'),
		password: yup.string().required('You must set a password.').min(6, 'Your password must be at least 6 characters long.'),
		tos: yup.boolean().required().oneOf([true], 'You must agree to the terms of service.'),
	}),

	handleSubmit: function (values, { props, resetForm }) {

	}
})(Registration);

export default FormikRegistration;
