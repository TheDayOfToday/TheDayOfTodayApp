import { deleteDiary } from "@/api/record";
import { DeleteDiaryRequest } from "@/api/record/entity";
import { useMutation } from "@tanstack/react-query";
import useShowToast from "./useShowToast";

interface DeleteDiaryProps {
  token: string;
  data: DeleteDiaryRequest;
}

const useDeleteDiary = () => {
  const showToast = useShowToast();

  const { mutate } = useMutation({
    mutationFn: async ({
      token,
      data,
    }: DeleteDiaryProps) => deleteDiary(token, data),
    onError: (error) => {
      showToast('error', '삭제 실패', '일기 삭제에 실패하였습니다.')
    },
  });

  return { mutate };
}

export default useDeleteDiary;
