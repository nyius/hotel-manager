import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export const useCreateCabin = () => {
	const queryClient = useQueryClient(); // This is for invalidating our query to force reactQuery to re-fetch

	/**
	 * React-query form mutation for creating a new cabin
	 */
	const { mutate: createCabin, isLoading: isCreatingCabin } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success(`New cabin created!`);
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: () => {
			toast.error(`Something went wrong adding new cabin`);
		},
	});

	return { createCabin, isCreatingCabin };
};
