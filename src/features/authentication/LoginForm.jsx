import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import toast from 'react-hot-toast';
import { useLogin } from './useLogin';
import Spinner from '../../ui/Spinner';

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, isLoggingIn } = useLogin();

	function handleSubmit(e) {
		e.preventDefault();

		if (!email || email === '') {
			toast.error('Need an email!');
			return;
		}
		if (!password || password === '') {
			toast.error('Need a password!');
			return;
		}
		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail('');
					setPassword('');
				},
			}
		);
	}

	//---------------------------------------------------------------------------------------------------//
	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={e => setEmail(e.target.value)}
					disabled={isLoggingIn}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input type="password" id="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoggingIn} />
			</FormRowVertical>
			<FormRowVertical>
				{isLoggingIn ? (
					<Spinner />
				) : (
					<Button disabled={isLoggingIn} size="large">
						Login
					</Button>
				)}
			</FormRowVertical>
		</Form>
	);
}

export default LoginForm;
