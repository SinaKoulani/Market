import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/HandleApi";

const Signup = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    async function handleSignup(e: FormEvent) {
        e.preventDefault();

        try {
            await signup({
                name,
                email,
                password,
            });

            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("signup failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSignup}
                className="w-full max-w-sm p-6 shadow-md rounded flex flex-col gap-4"
            >
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;