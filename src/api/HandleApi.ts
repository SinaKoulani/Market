import axios from "axios";
import type { Order } from "../types/order";
import type { LoginPayload, LoginResponse, SignupPayload } from "../types/user";
import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL as string

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;

export async function getOrders(): Promise<Order[]> {
  const response = await api.get<Order[]>("/orders");
  return response.data;
}

export async function getOrderById(id : string): Promise<Order>{
    const response = await api.get<Order>(`/orders/${id}`)

    return response.data;
}

export async function makePayment(orderId : string): Promise <void> {
    await api.post("/payments",{
        orderId,
    });
}

export async function signup(payload: SignupPayload): Promise<void> {
  await api.post("/auth/signup", payload);
}

export async function login(payload:LoginPayload): Promise<void> {
    const response =await api.post<LoginResponse>("/auth/login",payload)

    localStorage.setItem("token",response.data.token);
}

export async function getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");
    return response.data;
}

export async function getProductById(id: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
}