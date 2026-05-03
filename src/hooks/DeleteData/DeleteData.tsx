import { notification } from "antd";
import { useCallback } from "react";

type deleteFn = (id: number) => Promise<void>;
type onSuccess = () => void | Promise<void>;

export const useDeleteData = (deleteFn: deleteFn, onSuccess: onSuccess) => {
  const performDelete = useCallback(
    async (id: number) => {
      if (!id) return;
      try {
        await deleteFn(id);

        if (onSuccess) {
          await onSuccess();
        }
      } catch (error) {
        notification.error({
          title: "Ошибка удаления",
        });
      }
    },
    [deleteFn, onSuccess],
  );

  return { performDelete };
};
