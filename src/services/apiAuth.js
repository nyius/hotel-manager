import supabase from './supabase';

/**
 * handles logging in
 * @param {*} param0
 * @returns
 */
export const login = async ({ email, password }) => {
	try {
		let { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) throw new Error(error);

		return data;
	} catch (error) {
		console.log('Something went wrong signing in!');
		throw new Error(error);
	}
};

/**
 * Handles checking for the current logged in user
 * @returns
 */
export const getCurrentUser = async () => {
	try {
		const { data: session } = await supabase.auth.getSession();
		if (!session.session) return null;

		const { data, error } = await supabase.auth.getUser();

		if (error) {
			throw new Error('Couldnt find user on supabase');
		}

		return data?.user;
	} catch (error) {
		console.log(`Something went wrong in getUser`);
		throw new Error(error);
	}
};

/**
 * Handles logging out
 */
export const logout = async () => {
	try {
		let { error } = await supabase.auth.signOut();
		if (error) throw new Error(error);
	} catch (error) {
		console.log('Something went wrong signing out!');
		throw new Error(error);
	}
};
