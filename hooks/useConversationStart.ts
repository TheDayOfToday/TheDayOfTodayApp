import { postStartConversation } from "@/api/record";
import { useMutation } from "@tanstack/react-query";
import useShowToast from "./useShowToast";

const useConversationStart = () => {
  const showToast = useShowToast();

  const { mutateAsync, data, isSuccess } = useMutation({
    mutationFn: async (token: string) => postStartConversation(token),
    onError: () => showToast("error", "일기 시도 실패", "대화 모드를 시작하지 못하였습니다."),
  });

  return {
    mutateAsync,
    data,
    isSuccess,
  }
}

export default useConversationStart;
