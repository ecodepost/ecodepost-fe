declare namespace QuestionAPI {
  type CreateQuestionParams = {
    name: string;
    spaceGuid: string;
    content: string;
    imageUrls: string[];
  };

  type CreateAnswersParams = {
    spaceGuid: string;
    name: string;
    content: string;
    imageUrls: string[];
  };

  type CreateCommentParams = {
    commentGuid: string;
    content: string;
  };

  type UpdateQuestionsParams = {
    headImage: string;
    name: string;
    content: string;
    imageUrls: string[];
  };

  type UpdateAnswerParams = {
    headImage: string;
    name: string;
    content: string;
    imageUrls: string[];
  };
}
