import * as SecureStore from 'expo-secure-store';
import React, {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import axios from 'axios';

export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
}
type AuthData = {
	profile: any;
	token: string | null;
	loading: boolean;
	role: Role | null;
	setToken: (token: string | null) => void;
	setRole: (role: string | null) => void;
	setProfile: (profile: any) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthData>({
	loading: true,
	profile: null,
	token: null,
	role: null,
	setToken: () => {},
	setRole: () => {},
	setProfile: () => {},
	logout: () => {},
});

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [token, setToken] = useState<string | null>(null);
	const [role, setRole] = useState<Role | null>(null);
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	// useEffect(() => { },[])

	useEffect(() => {
		const initializeAuth = async () => {
			setLoading(true);

			try {
				const accessToken = await SecureStore.getItemAsync('accessToken');
				const refreshToken = await SecureStore.getItemAsync('refreshToken');

				if (accessToken) {
					const success = await fetchUser(accessToken);
					if (!success && refreshToken) {
						const newAccessToken = await refreshAccessToken(refreshToken);
						if (newAccessToken) {
							await fetchUser(newAccessToken);
						} else {
							await logout();
						}
					}
				} else {
					await logout();
				}
			} catch (error) {
				console.error('Error initializing auth:', error);
				await logout();
			} finally {
				setLoading(false);
			}
		};

		initializeAuth();
	}, []);

	const fetchUser = async (accessToken: string) => {
		try {
			const { data } = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URI}/auth/profile`,
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			);
			setProfile(data);
			setToken(accessToken);
			setRole(data?.role.toUpperCase());
			await SecureStore.setItemAsync('userInfo', JSON.stringify(data));
			return true;
		} catch (error) {
			console.warn('Failed to fetch user:', error);
			return false;
		}
	};

	const refreshAccessToken = async (refreshToken: string) => {
		try {
			const { data } = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URI}/auth/refresh`,
				{ refreshToken }
			);
			const newAccessToken = data?.accessToken;
			if (newAccessToken) {
				await SecureStore.setItemAsync('accessToken', newAccessToken);
				return newAccessToken;
			}
			return null;
		} catch (error) {
			console.warn('Failed to refresh token:', error);
			return null;
		}
	};

	const logout = async () => {
		setToken(null);
		setProfile(null);
		setRole(null);
		await SecureStore.deleteItemAsync('accessToken');
		await SecureStore.deleteItemAsync('refreshToken');
		await SecureStore.deleteItemAsync('userInfo');
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				loading,
				profile,
				setProfile,
				role,
				setRole,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
