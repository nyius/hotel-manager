import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export const useCabins = () => {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		// give a key to this query.
		queryKey: [`cabins`],
		// The function to execute. This function MUST return a promise (so an async function)
		queryFn: getCabins,
	});
	return { isLoading, error, cabins };
};
