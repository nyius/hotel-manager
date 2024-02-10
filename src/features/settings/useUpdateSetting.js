import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingAPI } from '../../services/apiSettings';

export const useUpdateSetting = () => {
	const queryClient = useQueryClient(); // This is for invalidating our query to force reactQuery to re-fetch
	/**
	 * React-query form mutation for editing a cabin
	 */
	const { mutate: updateSetting, isLoading: isUpdatingSettings } = useMutation({
		mutationFn: updateSettingAPI,
		onSuccess: () => {
			toast.success(`Setting Updated`);
			queryClient.invalidateQueries({ queryKey: [`settings`] });
		},
		onError: () => {
			toast.error(`Something went wrong updating this setting`);
		},
	});

	return { updateSetting, isUpdatingSettings };
};
