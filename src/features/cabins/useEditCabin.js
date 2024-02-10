import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export const useEditCabin = () => {
	const queryClient = useQueryClient(); // This is for invalidating our query to force reactQuery to re-fetch
	/**
	 * React-query form mutation for editing a cabin
	 */
	const { mutate: editCabin, isLoading: isEditingCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success(`Cabin Edited`);
			queryClient.invalidateQueries({ queryKey: [`cabins`] });
		},
		onError: () => {
			toast.error(`Something went wrong editing cabin`);
		},
	});

	return { editCabin, isEditingCabin };
};
