export const validateEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
export const validatePhone = (phone: string): boolean => {
	// Ensure phone contains only numbers and is at least 10 digits long
	const phoneRegex = /^\d{10,}$/;
	return phoneRegex.test(phone);
};
// Function to filter data based on query and category
