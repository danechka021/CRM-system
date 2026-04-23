import { JSX } from "react";

import { Rule } from "antd/es/form";
import { Input, Form, InputProps, ConfigProvider } from "antd";

interface ValidatedInputProps extends InputProps {
  placeholder: string;
  name: string;
  label?: string;
  isRequired?: boolean;
  dependencies?: string[];
  rules?: Rule[];
  errorMessage?: string;
}

const ValidatedInput = ({
  placeholder,
  label,
  name,
  isRequired = false,
  dependencies = [],
  rules = [],
  errorMessage,
  ...rest
}: ValidatedInputProps): JSX.Element => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "grey",
            labelFontSize: 16,
            itemMarginBottom: 10,
            verticalLabelPadding: "0 0 0.5rem",
          },
        },
      }}
    >
      <Form.Item
        label={<b>{label}</b>}
        name={name}
        dependencies={dependencies}
        layout="vertical"
        rules={[
          { required: isRequired, message: errorMessage } as Rule,
          ...rules,
        ]}
      >
        <Input {...rest} placeholder={placeholder} size="large" />
      </Form.Item>
    </ConfigProvider>
  );
};

export default ValidatedInput;
