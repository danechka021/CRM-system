import React, { JSX } from "react";
import { Button, ConfigProvider } from "antd";

interface LinkButtonProps {
  name: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const LinkButton = ({ name, onClick }: LinkButtonProps): JSX.Element => {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorLink: "purple",
              colorLinkHover: "#a435f0",
              colorLinkActive: "#520994",
            },
          },
        }}
      >
        <Button onClick={onClick} htmlType="submit" type="link">
          {name}
        </Button>
      </ConfigProvider>
    </div>
  );
};

export default LinkButton;
