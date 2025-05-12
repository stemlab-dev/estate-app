import { HeadsetIcon, InfoHexagonIcon, PlusIcon, QuestionCircleIcon, ReceiptIcon, SettingsIcon } from '@/assets/svg';
import {
	AntDesign,
	MaterialIcons,
	MaterialCommunityIcons,
	FontAwesome5,
	EvilIcons,
} from '@expo/vector-icons';

export const roles = [
	{ label: 'Tenant', value: 'tenant' },
	{ label: 'Landlord', value: 'landlord' },
];
export const genders = [
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' },
];

export const payments = [
	{
		title: 'Electricity bill',
		amount: '200,000',
		dueDate: '12/12/2017',
		status: 'yet to pay',
	},
	{
		title: 'House Rent',
		amount: '200,000',
		dueDate: '12/12/2017',
		status: 'paid',
	},
	{
		title: 'Tenant fee',
		amount: '200,000',
		dueDate: '12/12/2017',
		status: 'Over due',
	},
	{
		title: 'Electricity bill',
		amount: '200,000',
		dueDate: '12/12/2017',
		status: 'paid',
	},
	{
		title: 'Electricity bill',
		amount: '200,000',
		dueDate: '12/12/2017',
		status: 'paid',
	},
	{
		title: 'Electricity bill',
		amount: '200,000',
		dueDate: '12/12/2017',
		status: 'paid',
	},
];
// Define your custom icons here
export const menuItems = [
	{
		name: 'Pay',
		href: '/bills',
		iconName: PlusIcon,
	},
	{
		name: 'Report',
		href: '/report',
		iconName: InfoHexagonIcon,
	},
	{
		name: 'Receipt',
		href: '/bills',
		iconName: ReceiptIcon,
	},
];
export const adminMenuItems = [
	{
		name: 'Reminder',
		href: '/',
		iconName: PlusIcon,
	},
	{
		name: 'Issues',
		href: '/issues',
		iconName: InfoHexagonIcon,
	},
	{
		name: 'Receipt',
		href: '/issues',
		iconName: ReceiptIcon,
	},
];
export const Issues = [
	{
		id: 'official complaint',
		title: 'Official complaint',
		discription:
			'Make an official complaint about the issue you are facing in your apartment',
	},
	{
		id: 'billing issue',
		title: 'Billing Issue',
		discription:
			'Report any issue you are facing with your billing system in your apartment',
	},
	{
		id: 'receipt issue',
		title: 'Receipt Issue',
		discription:
			'Report any issue you are facing with your billing system in your apartment',
	},
	{
		id: 'payment issue',
		title: 'Payment Issue',
		discription:
			'Make a complaint about the payment issue you are facing in your apartment',
	},
	{
		id: 'app issue',
		title: 'App Issue',
		discription:
			'Complain about any issue you are facing with this app for improvement',
	},
];

export const Dues = [
	{ name: 'Payment of tax', date: '22nd Dec. 2024', status: 'pending' },
	{ name: 'Plumbing issue', date: '22nd Dec. 2024', status: 'resolved' },
	{ name: 'Payment for event', date: '22nd Dec. 2024', status: 'Success' },
	{ name: 'Security Fee', date: '22nd Dec. 2024', status: 'in progress' },
];

export const Announcement = [
	{
		_id: '1',
		title: 'Payment of tax',
		date: '22nd Dec. 2024',
		content: 'Success lorem100 in progress lkdkldkdklddk in progress',
	},
	{
		_id: '2',
		title: 'Plumbing issue',
		date: '22nd Dec. 2024',
		content: 'Resolved lkjhgfhjbjjdnd in progress lkdkldkdklddk lkdkldkdklddk',
	},
	{
		_id: '3',
		title: 'Payment for event',
		date: '22nd Dec. 2024',
		content: 'Success ldkldkdkdk in progress lkdkldkdklddk',
	},
	{
		_id: '4',
		title: 'Security Fee',
		date: '22nd Dec. 2024',
		content: 'In progress lkdkldkdklddk lkdkldkdklddk',
	},
];

export const settingData = [
	{
		id: 1,
		name: 'Settings',
		icon: SettingsIcon,
		link: '/profile/profile-settings',
	},
	{
		id: 2,
		name: 'FAQs',
		icon: QuestionCircleIcon,
		link: '/profile/faqs',
	},
	{
		id: 3,
		name: 'Support',
		icon: HeadsetIcon,
		link: '/profile/support',
	},
	{
		id: 4,
		name: 'Rate us',
		icon: 'star',
		link: '/profile/rate',
		iconType: true,
	},
	{
		id: 5,
		name: 'Privacy policy',
		icon: 'star',
		link: 'profile',
		iconType: true,
	},
	{
		id: 6,
		name: 'Terms and condition',
		icon: ReceiptIcon,
		link: 'profile',

	},
];

export const bankItems = [
	{
		label: 'Standard Bank',
		value: 'Standard Bank',
	},
	{
		label: 'United Bank of Africa',
		value: 'United Bank of Africa',
	},
	{
		label: 'Fidelity Bank',
		value: 'Fidelity Bank',
	},
];
export const frequencies = [
	{
		label: 'One Time',
		value: 'One Time',
	},
	{
		label: 'Weekly',
		value: 'Weekly',
	},
	{
		label: 'Monthly',
		value: 'Monthly',
	},
	{
		label: 'Quarterly',
		value: 'Quarterly',
	},
];
export const types = [
	{
		label: 'Electrical Bill',
		value: 'Electrical Bill',
	},
	{
		label: 'Sanitation Fee',
		value: 'Sanitation Fee',
	},
	{
		label: 'Plumbing Issue',
		value: 'Plumbing Issue',
	},
];
export const statues = [
	{
		label: 'Pending',
		value: 'Pending',
	},
	{
		label: 'Processing',
		value: 'Processing',
	},
	{
		label: 'Urgent',
		value: 'Urgent',
	},
];

export const userCheckOptions = [
	{
		id: 'AllUsers',
		title: 'All Users',
	},
	{
		id: 'SpecificUsers',
		title: 'Specific Users',
	},
];
export const estates = [
	{
		_id: '1',
		name: 'ARKCESS TEST ESTATE',
		image: require('../assets/images/warning.png'),
	},
	{
		_id: '2',
		name: 'BRUM HEIGHTS APARTMENT',
		image: require('../assets/images/warning.png'),
	},
	{ _id: '3', name: 'BRUM VILLE', image: require('../assets/images/warning.png') },
	{ _id: '4', name: 'CROWN ESTATE PH', image: require('../assets/images/warning.png') },
	{ _id: '5', name: 'CITADEL VIEWS', image: require('../assets/images/warning.png') },
	{
		_id: '6',
		name: 'DOLPHIN ESTATE IKOYI',
		image: require('../assets/images/warning.png'),
	},
	{
		_id: '7',
		name: 'FARAPARK ESTATE',
		image: require('../assets/images/warning.png'),
	},
	{
		_id: '8',
		name: 'FEMI OKUNU ESTATE',
		image: require('../assets/images/warning.png'),
	},
	{
		_id: '9',
		name: 'GREENFIELDS ESTATE',
		image: require('../assets/images/warning.png'),
	},
	{
		_id: '10',
		name: 'GRENADINES ESTATE',
		image: require('../assets/images/warning.png'),
	},
];
