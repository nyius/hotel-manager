import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {
	const { isLoading, settings = {} } = useSettings();
	const { updateSetting, isUpdatingSettings } = useUpdateSetting();

	const { minBookingLength, maxBookingLength, maxGuests, breakfastPrice } = settings;

	if (isLoading) return <Spinner />;

	const handleUpdate = (e, field) => {
		if (!e.target.value) return;
		updateSetting({ [field]: e.target.value });
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input type="number" id="min-nights" defaultValue={minBookingLength} onBlur={e => handleUpdate(e, 'minBookingLength')} />
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input type="number" id="max-nights" defaultValue={maxBookingLength} onBlur={e => handleUpdate(e, 'maxBookingLength')} />
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input type="number" id="max-guests" defaultValue={maxGuests} onBlur={e => handleUpdate(e, 'maxGuests')} />
			</FormRow>

			<FormRow label="Breakfast price">
				<Input type="number" id="breakfast-price" defaultValue={breakfastPrice} onBlur={e => handleUpdate(e, 'breakfastPrice')} />
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
