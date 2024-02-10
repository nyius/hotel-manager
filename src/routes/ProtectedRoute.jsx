import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../features/authentication/useUser';
import styled from 'styled-components';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const { isLoading, user, isAuthenticated } = useUser();
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	} else {
		if (isAuthenticated) {
			return <>{children}</>;
		} else {
			navigate('/login');
		}
	}
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
	children: PropTypes.any,
};
