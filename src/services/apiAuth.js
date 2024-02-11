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

/**
 * Handles signing up
 * @param {*} param0
 * @returns
 */
export const signup = async ({ fullName, email, password }) => {
	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					fullName,
					avatar: '',
				},
			},
		});

		if (error) {
			throw new Error('Something went wrong creating user');
		}

		return data;
	} catch (error) {
		console.log(`Something went wrong signing up`);
	}
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
	try {
		let updateData;
		if (password) updateData = { password };
		if (fullName) updateData = { data: { fullName } };

		const { data, error } = await supabase.auth.updateUser(updateData);

		if (error) {
			throw new Error(error);
		}

		if (!avatar) return data;

		const fileName = `avatar-${data.user.id}-${Math.random()}`;

		const { error: avatarError } = await supabase.storage.from('avatars').upload(fileName, avatar);

		if (avatarError) {
			throw new Error(avatarError.message);
		}

		const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({ data: { avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}` } });

		if (error2) {
			throw new Error(error2.message);
		}

		return updatedUser;
	} catch (error) {
		console.log(error);
		console.log(`Something went wrong updating your profile.`);
	}
};
