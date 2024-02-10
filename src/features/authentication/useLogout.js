import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import supabase from '../../services/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogout = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isLoading: isLoggingOut } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries();
			toast.success('Logged out!');
			navigate('/login', { replace: true });
		},
		onError: err => {
			console.log(err);
		},
	});

	return { logout, isLoggingOut };
};
