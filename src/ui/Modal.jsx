import styled from 'styled-components';
import PropTypes from 'prop-types';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const StyledButton = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

/**
 * Our root modal element with context and basic function
 * @param {*} children
 * @returns
 */
const Modal = ({ children }) => {
	const [openName, setOpenName] = useState('');

	/**
	 * Handles closing a modal
	 *
	 */
	const close = () => {
		setOpenName('');
	};

	const open = setOpenName;

	return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
};

/**
 * Displays the main modal window
 * @param {*} children
 * @param {*} name - the name of the modal window (make sure its unique)
 * @returns
 */
function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);

	const { ref } = useOutsideClick(close);

	if (name !== openName) return;

	//---------------------------------------------------------------------------------------------------//
	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				{/* Close Modal Button */}
				<StyledButton onClick={close}>
					<HiXMark />
				</StyledButton>

				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

/**
 * The 'open' button to open the modal
 * @param {*} children
 * @param {*} opensWIndowName - the name of the window to open
 * @returns
 */
const Open = ({ children, opensWindowName }) => {
	const { open } = useContext(ModalContext);

	// cloneElement -> her we are cloning the children (which will likely be a button to open the modal)
	// and on those children we are appending an onClick prop (the second argument into cloneElement is props).
	return cloneElement(children, { onClick: () => open(opensWindowName) });
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

Modal.propTypes = {
	children: PropTypes.oneOfType[(PropTypes.element, PropTypes.array, PropTypes.object)],
};
