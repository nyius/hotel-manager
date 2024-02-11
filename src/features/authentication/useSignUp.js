import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useSignUp() {
	const { mutate: signup, isLoading: isCreatingUser } = useMutation({
		mutationFn: signupApi,
		onSuccess: user => {
			toast.success('User created!');
		},
		onError: err => {
			console.log(err);
			toast.error('Something went wrong creating user');
		},
	});

	return { signup, isCreatingUser };
}
