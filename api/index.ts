import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;
export const fetchHome = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/index`, config)
			.then((res) => res.data);
		// console.log('index hoa res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchEstates = async () => {
	try {
		const data = await axios.get(`${apiUrl}/estates`).then((res) => res.data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchUser = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/users/${id}`, config)
			.then((res) => res.data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchUsers = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/users`, config)
			.then((res) => res.data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchNotifications = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/notifications`, config)
			.then((res) => res.data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchNotification = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/notifications/${id}`, config)
			.then((res) => res.data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchReports = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/reports`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};

export const fetchReport = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/reports/${id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchIssues = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/reports`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchIssue = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/reports/${id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchAdminPayments = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/admins/payments`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchPendingayments = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/admins/payments/pending`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchAdminPayment = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/admins/payments/${id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchPayments = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/payments`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchInvoices = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/payments/invoices`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchPayment = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/payments/${id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchUserPayments = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/payments/${id}/history`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchUserDuePayments = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/payments/${id}/dues`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchUserIssues = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/reports/${id}/user`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const getBanks = async () => {
	try {
		const data = await axios
			.get(`https://backend-pil9.onrender.com/api/v1/general/banks`)
			.then((res) => res.data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchBanks = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/index/banks`, config)
			.then((res) => res.data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
