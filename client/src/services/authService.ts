import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

class AuthService {
	private auth = auth;
	private apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	async loginWithGoogle() {
		const result = await signInWithPopup(this.auth, googleProvider);
		const idToken = await result.user.getIdToken();

		// Send token to your Hono backend
		const response = await fetch(`${this.apiBaseUrl}/auth/google`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				idToken,
				email: result.user.email,
				name: result.user.displayName,
				photoUrl: result.user.photoURL,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to authenticate with backend");
		}

		const data = await response.json();
		localStorage.setItem("token", data.token);
		return data;
	}
	catch(error: any) {
		console.error("Google login failed:", error);
		throw error;
	}

	async logout() {
		try {
			await signOut(this.auth);
			localStorage.removeItem("token");
		} catch (error) {
			console.error("Logout failed:", error); //this
			throw error;
		}
	}

	isAuthenticated() {
		return !!localStorage.getItem("token");
	}

	getToken() {
		return localStorage.getItem("token");
	}
}

export const authService = new AuthService();