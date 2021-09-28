import React, { ButtonHTMLAttributes } from "react";

import { Button } from "./styles";

type CustomButtonProps = ButtonHTMLAttributes<any>;

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  color,
  ...props
}) => {
  return (
    <Button type="button" color={color} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
