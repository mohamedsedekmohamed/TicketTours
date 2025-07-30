    import { useState, useRef, useEffect } from "react";
    import { useLocation } from "react-router-dom";
    import axios from "axios";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import content from "../../assets/content.png";
    import { useNavigate } from "react-router-dom";
    import { BsArrowRightCircleFill } from "react-icons/bs";

    const Code = () => {
    const CODE_LENGTH = 6;
    const [code, setCode] = useState(new Array(CODE_LENGTH).fill(""));
    const inputsRef = useRef([]);
    const [timer, setTimer] = useState(60);
    const location = useLocation();
    const { em } = location.state || {}; 
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1].focus();
        }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
        inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = async () => {
        const enteredCode = code.join("");
        if (enteredCode.length < CODE_LENGTH) {
        toast.error("Please enter the full code");
        return;
        }

        try {
        const response = await axios.post(
            "https://bcknd.tickethub-tours.com/api/user/auth/local/verify-code",
            {
            email: em,
            code: enteredCode,
            }
        );
        console.log(response.data);
        toast.success("Code verified successfully!");
        // Navigate to next page or dashboard
        } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error(
            error.response?.data?.error?.message || "Verification failed"
        );
        }
    };

    const handleResendCode = async () => {
    try {
        await axios.post("https://bcknd.tickethub-tours.com/api/user/auth/local/forget-password", {
        email: em,
        });
        toast.success("Verification code resent!");
        setTimer(60);
        setCode(new Array(CODE_LENGTH).fill(""));
    } catch (error) {
        const err = error?.response?.data?.error;

        if (err && err.details && Array.isArray(err.details)) {
        err.details.forEach((detail) => {
            toast.error(`${detail.field}: ${detail.message}`);
        });
        } else if (err && err.message) {
        toast.error(err.message);
        } else {
        toast.error("Something went wrong.");
        }
    }
    };


    return (
    <div className="w-screen h-screen flex gap-1  bg-white">
        {/* Left Side: Form */}{" "}
        <ToastContainer/>
        <div className="hidden md:flex w-full max-w-1/2 h-full ">
            <img src={content} alt="Logo" className="w-full h-full " />
        </div> 
        <div className="flex flex-col justify-center gap-2 items-center px-6 md:px-10 w-full">
            <BsArrowRightCircleFill
                    className="absolute top-2 right-2 text-3xl text-one cursor-pointer"
                    onClick={() => navigate(-1)}
                    />
            <h1 className="text-3xl font-bold">Enter Verification Code</h1>
            <p className="text-sm text-one">
            We've sent a 6-digit verification code to{" "}
            <span className="text-blue-400 font-medium">{em}</span>.
            Please enter it below to proceed.
            </p>

            <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
                <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 text-center text-xl border border-gray-600 rounded-lg bg-transparent text-one focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ))}
            </div>

            <p className="text-sm text-gray-400">
            Retry After {String(Math.floor(timer / 60)).padStart(2, "0")}:
            {String(timer % 60).padStart(2, "0")}
            </p>

            <button
            onClick={handleSubmit}
            className="w-full py-3 bg-one text-white rounded-full font-medium hover:bg-blue-800 transition"
            >
            Verify
            </button>

        <p className="text-sm text-gray-400">
    Didn't receive the code?{" "}
    <button
        className="text-one underline"
        onClick={handleResendCode}
        disabled={timer > 0}
    >
        Resend
    </button>
    </p>

        </div>
        </div>
    );
    };

    export default Code;
