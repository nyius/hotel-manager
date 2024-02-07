import supabase from './supabase';

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
 * @param {*} newCabin
 * @returns
 */
export const createCabin = async newCabin => {
	try {
		const { data, error } = await supabase.from('cabins').insert([newCabin]);
		if (error) throw new Error(error);

		return data;
	} catch (error) {
		console.log(error);
		throw new Error(`Error from createCabin`);
	}
};
