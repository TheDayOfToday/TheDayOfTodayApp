import { postEndConversation } from "@/api/record";
import { useMutation } from "@tanstack/react-query";

interface ConversationEndProps {
  token: string;
  diaryId: number;
}

const useConversationEnd = () => {
  const { mutate, data, isSuccess } = useMutation({
    mutationFn: ({
      token, diaryId
    }: ConversationEndProps) => postEndConversation(token, diaryId),
    onError: (error) => {
      console.log('대화모드 일기 업로드 실패', error);
    }
  });

  return {
    mutate,
    data,
    isSuccess,
  }
}

export default useConversationEnd;
