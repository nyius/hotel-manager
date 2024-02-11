import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
		mutationFn: data => {
			updateCurrentUser(data);
		},
		onSuccess: ({ user }) => {
			toast.success(`User updated`);
			queryClient.setQueryData(['user'], user);
		},
		onError: () => {
			toast.error(`Something went wrong updating user`);
		},
	});

	return { updateUser, isUpdatingUser };
};
