import { deleteDiary } from "@/api/record";
import { DeleteDiaryRequest } from "@/api/record/entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "./useShowToast";

interface DeleteDiaryProps {
  token: string;
  data: DeleteDiaryRequest;
}

const useDeleteDiary = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      token,
      data,
    }: DeleteDiaryProps) => deleteDiary(token, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['calendarColors']});
      queryClient.invalidateQueries({queryKey: ['diary']});
    },
    onError: (error) => {
      showToast('error', '삭제 실패', '일기 삭제에 실패하였습니다.');
    },
  });

  return { mutateAsync };
}

export default useDeleteDiary;
