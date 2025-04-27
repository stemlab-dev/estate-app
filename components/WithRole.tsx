import { useAuth, Role } from '@/context/authContext';

const WithRole = ({
	children,
	userRole,
}: {
	children: any;
	userRole: Role;
}) => {
	const { role } = useAuth();

	if (role !== userRole) {
		return <></>;
	}

	return <>{children}</>;
};

export default WithRole;
