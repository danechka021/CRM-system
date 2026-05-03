import { useState, useRef, useEffect, memo, useCallback, JSX } from "react";
import {
  DeleteTwoTone,
  EditTwoTone,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Button,
  Input,
  InputRef,
  Form,
  notification,
  Tooltip,
} from "antd";

import styles from "../todoItem/TodoItem.module.css";
import { updateTasks, deleteTask } from "../../../api/tasks";
import { Todo } from "../../../types";
import { useDeleteData } from "../../../hooks/DeleteData/DeleteData";

interface TodoItemProps {
  task: Todo;
  fetchTodos: () => void;
  setEditingTaskId: (id: number | null) => void;
}
const TodoItem = memo(
  ({ task, fetchTodos, setEditingTaskId }: TodoItemProps): JSX.Element => {
    //Для редактирования задач
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
      }
    }, [isEditing]);

    //Выбор статуса задачи

    const changeTaskStatus = useCallback(
      async (task: Todo): Promise<void> => {
        try {
          await updateTasks(task.id, { isDone: !task.isDone });
          fetchTodos();
        } catch (error: unknown) {
          if (error instanceof Error) {
            notification.error({
              title: "Ошибка при добавлении задачи",
              description:
                error instanceof Error ? error.message : "Попробуйте позже",
            });
          }
        }
      },
      [fetchTodos, task.isDone, task.id],
    );

    //редактирование задачи

    const handleStartEditingTask = useCallback(
      (task: Todo) => {
        setIsEditing(true);
        setEditingTaskId(task.id);
        form.setFieldsValue({ title: task.title });
      },
      [setEditingTaskId, form, task.id, task.title],
    );

    const handleCancelEditingTask = useCallback(() => {
      setIsEditing(false);
      setEditingTaskId(null);
      form.resetFields();
    }, [form, setEditingTaskId]);

    const handleSaveEditingTask = useCallback(
      async (values: { title: string }): Promise<void> => {
        setLoading(true);

        try {
          await updateTasks(task.id, { title: values.title.trim() });
          fetchTodos();
          handleCancelEditingTask();
          notification.success({ message: "Задача обновлена" });
        } catch (error: unknown) {
          notification.error({
            title: "Ошибка",
            description:
              error instanceof Error ? error.message : "Ошибка сервера",
          });
        } finally {
          setLoading(false);
        }
      },
      [updateTasks, fetchTodos, handleCancelEditingTask, task.title, task.id],
    );

    //Удаление задачи

    const { performDelete: handleDeleteTask } = useDeleteData(
      deleteTask,
      fetchTodos,
    );

    return (
      <div>
        <li className={styles.li} key={task.id}>
          {isEditing ? (
            <Form
              form={form}
              onFinish={handleSaveEditingTask}
              initialValues={{ title: task.title }}
            >
              <div className={styles.container}>
                <Form.Item
                  name="title"
                  className={styles.titleItem}
                  rules={[
                    { required: true, message: "Пустое поле" },
                    {
                      whitespace: true,
                      message: "Это поле не может быть пустым",
                    },
                    { min: 2, message: "Минимум 2 символа" },
                    { max: 64, message: "Максимум 64 символа" },
                  ]}
                >
                  <Input
                    size="large"
                    ref={inputRef}
                    placeholder="Task to be done..."
                    variant="underlined"
                    className={styles.input}
                    disabled={loading}
                  />
                </Form.Item>

                <div className={styles.button}>
                  <Tooltip title="Отмена">
                    <Button
                      icon={<CloseOutlined />}
                      size="large"
                      onClick={handleCancelEditingTask}
                    />
                  </Tooltip>

                  <Tooltip title="Сохрнаить">
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<CheckOutlined />}
                    />
                  </Tooltip>
                </div>
              </div>
            </Form>
          ) : (
            <>
              <label className={styles.mainCheckbox}>
                <Checkbox
                  onChange={() => changeTaskStatus(task)}
                  checked={task.isDone}
                />
              </label>

              <span
                className={`${styles.taskText} ${
                  task.isDone ? styles.taskTextDone : ""
                }`}
              >
                {task.title}
              </span>

              <div className={styles.buttonGroup}>
                <Tooltip>
                  <Button
                    icon={<EditTwoTone />}
                    size="large"
                    onClick={() => handleStartEditingTask(task)}
                  />
                </Tooltip>

                <Tooltip>
                  <Button
                    icon={<DeleteTwoTone twoToneColor="red" />}
                    size="large"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </Tooltip>
              </div>
            </>
          )}
        </li>
      </div>
    );
  },
);

export default TodoItem;
