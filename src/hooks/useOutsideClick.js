import { useEffect, useRef } from 'react';

const useOutsideClick = (handler, listenCapturing = true) => {
	const ref = useRef();

	useEffect(() => {
		const handleClick = e => {
			if (ref.current && !ref.current.contains(e.target)) {
				handler();
			}
		};

		// Setting the 3rd argument to true sets the 'bubbling' phase to when we are traversing down the dom tree (capture phase)
		// otherwise this click would bubble up and close our modal the second we open it
		document.addEventListener('click', handleClick, listenCapturing);

		return () => document.removeEventListener('click', handleClick, listenCapturing);
	}, [ref, handler, listenCapturing]);

	return { ref };
};

export default useOutsideClick;
