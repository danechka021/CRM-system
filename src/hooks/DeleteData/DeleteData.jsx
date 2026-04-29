import { notification } from "antd";
import { useState, useCallback } from "react";

export const useDeleteData = (deleteFn, onSuccess) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const performDelete = useCallback(
    async (id) => {
      if (!id) return;
      setIsDeleting(true);
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
      setIsDeleting(false);
    },
    [deleteFn, onSuccess],
  );

  return { performDelete, isDeleting };
};
