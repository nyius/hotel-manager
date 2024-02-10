import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export const useBookings = () => {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	const filterValue = searchParams.get('status');
	const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// QUERY
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		// give a key to this query.
		queryKey: [`bookings`, filter, sortBy, page],
		// The function to execute. This function MUST return a promise (so an async function)
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	const pageCount = Math.ceil(count / import.meta.env.VITE_PAGE_SIZE);

	// PREFETCH
	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: [`bookings`, filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: [`bookings`, filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});
	}

	return { isLoading, error, bookings, count };
};
