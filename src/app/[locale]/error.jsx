'use client'; // Error components must be Client Components

import { getApiError } from '../../utils/getApiErrors';
import { useEffect, useRef } from 'react';

export default function Error({ error, reset }) {
	const errorsDuplicated = useRef(false);
	useEffect(
		() => {
			getApiError(error, errorsDuplicated);
		},
		[ error]
	);

	return <div />;
}
