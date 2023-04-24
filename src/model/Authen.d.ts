interface LoginPayload {
	username: string;
	password: string;
}

interface LoginResponse {
	authToken: string;
	fullName: string;
	username: string;
	firebaseTokenKey: string;
}

interface SignUpPayload {
	email: string;
	password: string;
	confirmPassword: string;
}

interface SignInResponse {}

interface Career {
	id: number;
	name_en: string;
	name_vn: string;
	details: Array<{ id: number; name_en: string; name_vn: string }>;
}

interface VerifyEmailCodePayload {
	email: string;
	code: string;
}
