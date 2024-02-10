import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import useCheckIn from './useCheckIn';
import { useSettings } from '../settings/useSettings';
import { HiCheck } from 'react-icons/hi2';

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { booking, isLoading } = useBooking();
	const { settings, isLoading: isLoadingSettings } = useSettings();

	useEffect(() => {
		setConfirmPaid(booking?.isPaid ?? false);
	}, [booking?.isPaid]);

	const moveBack = useMoveBack();
	const { checkin, isCheckingIn } = useCheckIn();

	if (isLoading || isLoadingSettings) return <Spinner />;

	const { id: bookingId, guests, totalPrice, status, numGuests, hasBreakfast, numNights } = booking;

	const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: totalPrice + optionalBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	//---------------------------------------------------------------------------------------------------//
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast(add => !add);
							setConfirmPaid(false);
						}}
						id="breakfast"
					>
						Add Breakfast (optional) {formatCurrency(optionalBreakfastPrice)}
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox checked={confirmPaid} disabled={confirmPaid || isCheckingIn} onChange={() => setConfirmPaid(confirm => !confirm)} id="confirm">
					I confirm that {guests.fullName} has paid the toal amount of{' '}
					{!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice) + ' + ' + formatCurrency(optionalBreakfastPrice)}) `}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckin} variation={!confirmPaid || isCheckingIn || status === 'checked-in' ? 'success' : 'primary'} disabled={!confirmPaid || isCheckingIn || status === 'checked-in'}>
					{status === 'checked-in' ? (
						<>
							<HiCheck /> <span> Checked in </span>
						</>
					) : (
						`	Check in booking #${bookingId}`
					)}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
