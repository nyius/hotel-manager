import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { createCabin, isCreatingCabin } = useCreateCabin();
	const { editCabin, isEditingCabin } = useEditCabin();
	const isUploading = isCreatingCabin || isEditingCabin;

	// Destructure the cabin we are editing (if we are editing one)
	const { id: editId, ...editValues } = cabinToEdit;
	// Check if it is an edit session by checking if we found an id from above
	const isEditSession = Boolean(editId);

	// React-query form setup. If we are editing a cabin, prefil the values to the editing values, else just make everything empty
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	const onSubmit = data => {
		const image = typeof data.image === 'object' && data.image.length > 0 ? data.image[0] : cabinToEdit.image;
		if (isEditSession) {
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: data => {
						reset(data);
						onCloseModal?.();
					},
				}
			);
		} else {
			createCabin(
				{ ...data, image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		}
	};

	const onError = errors => {
		console.log(errors);
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isUploading}
					{...register(`name`, {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					defaultValue={1}
					disabled={isUploading}
					{...register(`maxCapacity`, {
						// message if this field is empty
						required: 'This field is required',
						min: {
							value: 1,
							// message if this field is less than 1
							message: 'Capacity should be atleast 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					defaultValue={0}
					disabled={isUploading}
					{...register(`regularPrice`, {
						required: 'This field is required',
						min: {
							value: 1,
							message: `Cabin can't be free!`,
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isUploading}
					{...register(`discount`, {
						required: 'This field is required',
						validate: value => Number(value) <= Number(getValues().regularPrice) || `Discount should be less than the regular price!`,
					})}
				/>
			</FormRow>

			<FormRow label="Description for website" error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register(`description`, {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					disabled={isUploading}
					{...register(`image`, {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isUploading}>{isEditSession ? `Save Changes` : `Create cabin`}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;

CreateCabinForm.propTypes = {
	cabinToEdit: PropTypes.object,
	onCloseModal: PropTypes.func,
};
