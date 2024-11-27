import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { UseFormReturn, RegisterOptions } from "react-hook-form";

interface InputProps {
  fieldName: string;
  placeholder: string;
  label: string;
  methods: UseFormReturn<any, any>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  type?: string;
  rules?: RegisterOptions; 
  className?: string;
  isDisabled?: boolean;
}

const CustomInputField: React.FC<InputProps> = ({
  label,
  methods,
  fieldName,
  errorMsg,
  type,
  placeholder,
  rules,
  className,
  isDisabled = false,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="">
      <input
        type={type || "text"}
        value={methods.watch(fieldName)}
        disabled={isDisabled}
        {...methods.register(fieldName, {
          required: errorMsg,
          ...rules,
        })}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 ${className} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500`}
        />
     
      <ErrorMessage
        errors={methods.formState.errors}
        name={fieldName}
        render={({ message }: { message: string }) => (
          <div className="text-red-500">{message}</div>
        )}
      />
    </div>
  );
};

export default CustomInputField;
