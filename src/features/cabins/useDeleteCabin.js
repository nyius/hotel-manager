import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

/**
 * A Hook to handle deleting a cabin
 * @returns  {isDeleting, deleteCabin}
 */
export const useDeleteCabin = () => {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: id => deleteCabinApi(id),
		// Tell the queryClient 'hey, refresh all of our queries'
		onSuccess: () => {
			toast.success(`Cabin Successfully Deleted`);

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
};
