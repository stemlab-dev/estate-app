export const getErrorMessage = (error: any): string => {
	if (error.response) {
		return (
			error?.response?.data?.error?.message ||
			error?.response?.data?.error ||
			error?.response?.data?.message ||
			error?.message ||
			'An unknown error occurred.'
		);
	} else if (error.request) {
		// The request was made but no response was received
		return 'NetWork Error. Please check your network connection.';
	}
	return 'No error message available.';
};
