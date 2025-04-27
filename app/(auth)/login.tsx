import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../constants/color";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { getErrorMessage } from "@/utils/getAxiosError";
import Loader from "@/components/LoaderModal";
import { useAuth } from "@/context/authContext";
import Toast from "react-native-toast-message";
import LoaderModal from "@/components/LoaderModal";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { token, setToken, setRole, setProfile } = useAuth();

	// useEffect(() => {
	// 	console.log(token);
	// 	if (token) {
	// 		router.push('/(app)/');
	// 	}
	// }, [token]);

	// useEffect(() => {
	// 	const isFirstTime = SecureStore.getItem('isFirstTime');
	// 	if (isFirstTime) {
	// 		SecureStore.deleteItemAsync('isFirstTime');
	// 		router.push('/onboarding');
	// 	}
	// }, []);

  // Validate email format using regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle Continue button press
  const handleContinue = async () => {
    // await SecureStore.deleteItemAsync('isFirstTime');
    // router.navigate('/onboarding');
    // return;
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email Validation
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Password Validation
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    // If valid, navigate to EmailVerification
    if (valid) {
      const data = {
        email,
        password,
      };
      try {
        setLoading(true);
        const url = `${process.env.EXPO_PUBLIC_API_URI}/auth/login`;
        const res = await axios.post(url, data);
        setRole(res?.data?.user?.role.toUpperCase());
        await SecureStore.setItemAsync("accessToken", res.data.accessToken);
        await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
        await SecureStore.setItemAsync(
          "userInfo",
          JSON.stringify(res.data.user)
        );
        setToken(res.data.accessToken);
        setProfile(res.data.user);
        setLoading(false);
        console.log("res?.data?.user", res?.data?.user);
        if (res?.data?.user?.profileVerified === true) {
          router.navigate("/(app)");
        } else {
          return router.navigate("/(auth)/address");
        }
      } catch (error) {
        setLoading(false);
        console.log("Error logging in", error);
        const message = getErrorMessage(error);
        Toast.show({
          type: "error",
          text1: "Error logging in!",
          text2: message,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar backgroundColor={colors.greyBackground} />
      <View style={styles.container}>
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={styles.contentContainer}
        >
          {/* <Animated.View
					entering={FadeInDown.delay(1000).duration(1000).springify()}
					style={styles.imageContainer}
				>
					<Image
						source={require('@/assets/images/icon.png')}
						// resizeMode="cover"
						style={styles.logo}
					/>
				</Animated.View>
				<Text style={styles.headText}>Welcome</Text> */}
          <Text style={styles.title}>Login to your account</Text>

          {/* Email Input */}
          <Text
            style={{
              ...styles.label,
              marginTop: 20,
            }}
          >
            Enter Email Address.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <Animated.View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.eyes}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FontAwesome name="eye-slash" size={16} color="black" />
              ) : (
                <FontAwesome name="eye" size={16} color="black" />
              )}
            </TouchableOpacity>
          </Animated.View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => router.navigate("/reset-password")}
            >
              <Text style={styles.signInText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(500).springify()}
          style={styles.continueContainer}
        >
          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? "Loading ..." : "Login"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerText}
            onPress={() => router.navigate("/register")}
            disabled={loading}
          >
            <Text>Don't have an account?</Text>
            <Text style={styles.signInText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {/* Title */}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  container: {
    justifyContent: "space-between",
    flexGrow: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.greyBackground,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    // marginBottom: 20,
  },
  headText: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
    lineHeight: 20,
    marginBottom: 20,
  },
  header: {
    marginTop: 50,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
  },
  input: {
    padding: 15,
    flex: 1,
    fontSize: 16,
  },
  eyes: {
    padding: 10,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  contentContainer: {
    padding: 10,
    marginTop: 60,
    borderRadius: 10,
  },
  continueContainer: {
    paddingVertical: 10,
  },
  inssuredPolicy: {
    marginTop: "auto",
    alignItems: "center",
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  forgotPasswordButton: {
    padding: 2,
  },
  inssuredText: {
    color: "#666",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center", // Center text horizontally
  },
  footerText: {
    color: "#707070",
    fontSize: 14,
    marginBottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  signInText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;

// admin admin@12334
// user user@1234
// hoa john@1234
