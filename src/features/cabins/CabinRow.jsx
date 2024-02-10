import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiMiniTrash, HiPencil, HiSquare2Stack } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

//---------------------------------------------------------------------------------------------------//
const CabinRow = ({ cabin }) => {
	const { isDeleting, deleteCabin } = useDeleteCabin();

	const { isCreatingCabin, createCabin } = useCreateCabin();

	const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

	const handleDuplicate = () => {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<Table.Row>
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>

			{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={cabinId} />

					{/* Popup menu list */}
					<Menus.List id={cabinId}>
						<Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
							Duplicate
						</Menus.Button>

						{/* Edit Btn */}
						<Modal.Open opensWindowName="edit">
							<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
						</Modal.Open>

						{/* Delete Btn */}
						<Modal.Open opensWindowName="delete">
							<Menus.Button icon={<HiMiniTrash />}>Delete</Menus.Button>
						</Modal.Open>
					</Menus.List>

					{/* Edit Modal */}
					<Modal.Window name="edit">
						<CreateCabinForm cabinToEdit={cabin} />
					</Modal.Window>

					{/* Delete Modal */}
					<Modal.Window name="delete">
						<ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)} />
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
};

export default CabinRow;

CabinRow.propTypes = {
	cabin: PropTypes.object,
};
