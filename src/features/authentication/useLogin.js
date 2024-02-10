import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, isLoading: isLoggingIn } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: user => {
			queryClient.setQueryData(['user', user.user]);
			navigate('/dashboard', { replace: true });
		},
		onError: err => {
			toast.error(err);
			console.log(err);
		},
	});

	return { login, isLoggingIn };
};
