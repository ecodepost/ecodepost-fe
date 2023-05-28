// @ts-ignore
/* eslint-disable */
import {request} from 'umi';


/** 获取回答内容 GET /api/questions/-/answers/:answerGuid */
export async function getAnswerInfo(answerGuid: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/questions/-/answers/${answerGuid}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新回答信息 PUT /api/questions/-/answers/:answerGuid */
export async function updateAnswer(
  answerGuid: string,
  body: QuestionAPI.UpdateAnswerParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/questions/-/answers/${answerGuid}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
