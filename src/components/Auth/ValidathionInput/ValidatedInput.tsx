import React, { JSX } from "react";

import styles from "../ValidathionInput/ValidathionInput.module.css";
import { Rule } from "antd/es/form";
import { Input, Form, InputProps } from "antd";

interface ValidatedInputProps extends InputProps {
  placeholder: string;
  name: string;
  label?: string;
  isRequired?: boolean;
  dependencies?: string[];
  rules?: Rule[];
}

const ValidatedInput = ({
  placeholder,
  label,
  name,
  isRequired = false,
  dependencies = [],
  rules = [],
  ...rest
}: ValidatedInputProps): JSX.Element => {
  return (
    <Form.Item
      label={label}
      name={name}
      dependencies={dependencies}
      layout="vertical"
      rules={[
        { required: isRequired, message: `Поле обязаьельно для заполнения!` },
        ...(rules || []),
      ]}
      className={styles.inputForm}
    >
      <Input
        {...rest}
        placeholder={placeholder}
        size="large"
        className={styles.customInput}
      />
    </Form.Item>
  );
};

export default ValidatedInput;
