import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

/**
 * A Hook to handle deleting a cabin
 * @returns  {isDeleting, deleteBooking}
 */
export const useDeleteBooking = () => {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: id => deleteBookingApi(id),
		// Tell the queryClient 'hey, refresh all of our queries'
		onSuccess: () => {
			toast.success(`Booking Successfully Deleted`);

			queryClient.invalidateQueries({
				queryKey: ['bookings'],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deleteBooking };
};
