import React from 'react';
import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'no-discount', label: 'No Discount' },
					{ value: 'with-discount', label: 'With Discount' },
				]}
			/>
			<SortBy
				options={[
					{ value: 'name-asc', label: 'Sort by name (A-Z)' },
					{ value: 'name-desc', label: 'Sort by name (Z-A)' },
					{ value: 'regularPrice-asc', label: 'Sort by price (Lowest)' },
					{ value: 'regularPrice-desc', label: 'Sort by price (Highest)' },
					{ value: 'maxCapacity', label: 'Sort by capacity (Lowest)' },
					{ value: 'maxCapacity', label: 'Sort by capacity (Highest)' },
				]}
			/>
		</TableOperations>
	);
}

export default CabinTableOperations;
