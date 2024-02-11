import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiMiniTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import useCheckout from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isLoading } = useBooking();
	const { checkout, isCheckingOut } = useCheckout();
	const { isDeleting, deleteBooking } = useDeleteBooking();
	const navigate = useNavigate();

	const moveBack = useMoveBack();

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	if (isLoading) return <Spinner />;
	if (!booking) return <Empty resourceName="Booking" />;

	const { status, id } = booking;

	//---------------------------------------------------------------------------------------------------//
	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{id}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Modal>
				<ButtonGroup>
					{status === 'unconfirmed' && (
						<Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${id}`)}>
							Check In
						</Button>
					)}

					{status === 'checked-in' && (
						<Button
							icon={<HiArrowUpOnSquare />}
							onClick={() => {
								checkout(id);
							}}
							disabled={isCheckingOut}
						>
							Check Out
						</Button>
					)}

					<Modal.Open opensWindowName="delete">
						<Button variation="danger">
							<HiMiniTrash /> <span> Delete Booking</span>
						</Button>
					</Modal.Open>
					<Button variation="secondary" onClick={moveBack}>
						Back
					</Button>
				</ButtonGroup>

				{/* Delete Modal */}
				<Modal.Window name="delete">
					<ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={() => deleteBooking(id, { onSettled: navigate(-1) })} />
				</Modal.Window>
			</Modal>
		</>
	);
}

export default BookingDetail;
