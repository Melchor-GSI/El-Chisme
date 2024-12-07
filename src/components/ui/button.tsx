import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { BaseButton, BaseButtonProps } from "./base-button";

export interface ButtonProps extends BaseButtonProps {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading = false, disabled, className, ...props }, ref) => {
    return (
      <BaseButton
        className={cn(className, "relative")}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </BaseButton>
    );
  }
);
Button.displayName = "LoadingButton";

export { Button };
