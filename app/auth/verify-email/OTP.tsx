"use client";
import React, { useRef, useState } from "react";

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

// Component Copied from the Internet

const OTP = ({ length = 4, onComplete }: InputProps) => {
  const inputRef = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null)
  );
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      onComplete(newPin.join(""));
    }
  };

  return (
    <div className="flex justify-center gap-8">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          placeholder="0"
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref) => {
            inputRef.current[index] = ref;
          }}
          className="w-20 h-14 border-[#b1aff1] text-center text-2xl font-extrabold border-[2px] outline-none rounded focus:border-blue-600 p-5"
        />
      ))}
    </div>
  );
};

export default OTP;
