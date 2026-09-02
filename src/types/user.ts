export interface User{
    id : number;
    name :string;
    email: string;
    role:string;
    createdAt:string;
}

export interface SignupPayload {
    name : string;
    email : string;
    password : string;
}

export interface LoginPayload{
    email : string ;
    password : string;
}

export interface LoginResponse{
    token:string;
}

export interface VerifyOtpPayload{
    email:string;
    otp: string;
}