import { useFonts } from 'expo-font';
import { Stack, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider, { useAuth } from '@/context/authContext';
import { useColorScheme } from 'react-native';
import colors from '@/constants/color';
import { Urbanist_400Regular } from '@expo-google-fonts/urbanist/400Regular';
import { Urbanist_500Medium } from '@expo-google-fonts/urbanist/500Medium';
import { Urbanist_600SemiBold } from '@expo-google-fonts/urbanist/600SemiBold';
import { Urbanist_700Bold } from '@expo-google-fonts/urbanist/700Bold';
import { DMSans_600SemiBold } from '@expo-google-fonts/dm-sans/600SemiBold';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans/400Regular';
// import { PaystackProvider } from 'react-native-paystack-webview';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const StackLayout = () => {
	const { token } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const inAuthGroup = segments[0] === '(app)';

		if (!token && inAuthGroup) {
			router.replace('/');
		} else if (token) {
			router.replace('/(app)');
		}
	}, [token]);

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="onboarding" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(app)" options={{ headerShown: false }} />
			<Stack.Screen name="estate" options={{ headerShown: false }} />
			<Stack.Screen name="chat" options={{ headerShown: false }} />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		DMSans_600SemiBold,
		DMSans_400Regular,
		Urbanist_400Regular,
		Urbanist_500Medium,
		Urbanist_600SemiBold,
		Urbanist_700Bold,
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		// <PaystackProvider
		// 	publicKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY}
			// paystackSecretKey={process.env.EXPO_PUBLIC_PAYSTACK_SECRET_KEY}
		// >
			<AuthProvider>
				<QueryClientProvider client={new QueryClient()}>
					<StackLayout />
					<StatusBar style="auto" backgroundColor={colors.background} />
				</QueryClientProvider>
			</AuthProvider>
		// </PaystackProvider> 
	);
}
