import { cn } from "@/util";
import React from "react";

type InputProps = {
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, onChange, errorMessage, ...rest }, ref) => {
    const [value, setValue] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <div className="relative">
        <input
          type="text"
          id={id}
          className={cn(
            "w-full h-[44px] border-[1px] border-gray-40 rounded-[4px] px-[16px] outline-none",
            "placeholder:text-gray-60 placeholder:text-[14px]",
            errorMessage && "border-red-500"
          )}
          value={value}
          onChange={(e) => {
            onChange!(e);
            handleChange(e);
          }}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
