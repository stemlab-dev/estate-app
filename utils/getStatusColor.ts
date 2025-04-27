export const status = [
	{
		status: 'pending',
		label: 'Pending',
		bgColor: '#FFB041',
		textColor: '#FFB041',
	},
	{
		status: 'in progress',
		label: 'In progress',
		bgColor: '#00A6ED',
		textColor: '#00A6ED',
	},
	{
		status: 'processing',
		label: 'Processing',
		bgColor: '#00A6ED',
		textColor: '#00A6ED',
	},
	{
		status: 'success',
		label: 'Success',
		bgColor: '#00A6ED',
		textColor: '#00A6ED',
	},
	{
		status: 'paid',
		label: 'Success',
		bgColor: '#00A6ED',
		textColor: '#00A6ED',
	},
	{
		status: 'failed',
		label: 'Failed',
		bgColor: '#FF3B30',
		textColor: '#FF3B30',
	},
];

// give me a blur or lower bg color for the status so the text can appear above
export const getStatusColor = (
	status: string
): { bgColor: string; textColor: string } => {
	switch (status) {
		case 'pending':
			return { bgColor: '#FFECD0', textColor: '#FF9000' };
		case 'in progress':
			return { bgColor: '#EFF4FF', textColor: '#1E3DD7' };
		case 'inprogress':
			return { bgColor: '#EFF4FF', textColor: '#1E3DD7' };
		case 'processing':
			return { bgColor: '#EFF4FF', textColor: '#1E3DD7' };
		case 'resolved':
			return { bgColor: '#EDFDF8', textColor: '#08875D' };
		case 'success':
			return { bgColor: '#EFF4FF', textColor: '#00A6ED' };
		case 'paid':
			return { bgColor: '#EFF4FF', textColor: '#00A6ED' };
		case 'failed':
			return { bgColor: '#FF3B30', textColor: '#FF3B30' };
		default:
			return { bgColor: '#FFB041', textColor: '#FFB041' };
	}
};
