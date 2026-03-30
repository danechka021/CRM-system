import styles from "../ValidathionInput/ValidathionInput.module.css";
import { Input, Form } from "antd";

const ValidatedInput = ({
  placeholder,
  label,
  name,
  isRequired,
  dependecies,
  rules = [],
  ...rest
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      dependencies={dependecies}
      layout="vertical"
      rules={[
        { required: isRequired, message: `Введите ${label}` },
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
