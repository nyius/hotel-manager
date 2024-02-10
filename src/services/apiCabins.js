import supabase, { supabaseUrl } from './supabase';

/**
 * Handles fetching all cabins
 * @returns
 */
export const getCabins = async () => {
	try {
		const { data, error } = await supabase.from('cabins').select('*');
		if (error) throw new Error(error.message);

		return data;
	} catch (error) {
		console.log(error.message);
		throw new Error(`Error from getCabins`);
	}
};

/**
 * handles deleting a cabin
 * @param {*} id
 * @returns
 */
export const deleteCabin = async id => {
	try {
		const { data, error } = await supabase.from('cabins').delete().eq('id', id);
		if (error) throw new Error(error);

		return data;
	} catch (error) {
		console.log(error);
		throw new Error('Error from deleteCabin');
	}
};

/**
 * handles creating a cabin
 * @param {Obj} cabin
 * @param {string} id
 * @returns
 */
export const createEditCabin = async (cabin, id) => {
	try {
		const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
		const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll('/', '');
		const imagePath = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

		let query = supabase.from('cabins');

		//A. create cabin
		if (!id) {
			query = query.insert([{ ...cabin, image: imagePath }]);
		}

		// B. Edit a cabin
		if (id) {
			query = query
				.update({ ...cabin, image: imagePath })
				.eq('id', id)
				.select();
		}

		const { data, error } = await query.select().single();
		if (error) throw new Error(error);

		if (hasImagePath) return data;

		//2. Upload image
		const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, cabin.image);

		// 3. delete the cabin IF something went wrong uploading an image
		if (storageError) {
			await supabase.from('cabins').delete().eq('id', data.id);
			console.log(`Cabin image could not be uploaded so cabin creation was cancelled`);
			throw new Error(error);
		}

		return data;
	} catch (error) {
		console.log(error);
		throw new Error(`Error from createEditCabin`);
	}
};
