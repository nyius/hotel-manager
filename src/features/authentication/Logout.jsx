import React from 'react';
import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
	const { logout, isLoggingOut } = useLogout();

	return <ButtonIcon onClick={logout}>{isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}</ButtonIcon>;
}

export default Logout;
