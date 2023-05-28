FROM registry-vpc.cn-beijing.aliyuncs.com/gocnsaas/node-build:16.15-alpine3.15 AS base

ARG CDN_NAME
ARG APP_NAME
ARG NAMESPACE
ARG ENV_NAME
ARG BUCKET_NAME
ARG CI_COMMIT_SHORT_SHA

ENV WORKDIR=/data
ENV PUBLIC_PATH=${CDN_NAME}/${NAMESPACE}/${APP_NAME}${ENV_NAME}/
ENV CDN_NAME=${CDN_NAME}
ENV BUCKET_NAME=${BUCKET_NAME}
ENV APP_NAME=${APP_NAME}
ENV NAMESPACE=${NAMESPACE}
ENV ENV_NAME=${ENV_NAME}
ENV CI_COMMIT_SHORT_SHA=${CI_COMMIT_SHORT_SHA}

WORKDIR ${WORKDIR}

COPY dist dist
RUN echo PUBLIC_PATH:${PUBLIC_PATH} && echo OSS_PATH${OSS_PATH}:oss://${BUCKET_NAME}/${NAMESPACE}/${APP_NAME}${ENV_NAME} && echo CI_COMMIT_SHORT_SHA: ${CI_COMMIT_SHORT_SHA} && \
    ls -rtlh && \
    echo PUBLIC_PATH: ${PUBLIC_PATH} && \
    echo CI_COMMIT_SHORT_SHA: ${CI_COMMIT_SHORT_SHA} && \
    echo OSS_PATH: oss://${BUCKET_NAME}/${NAMESPACE}/${APP_NAME}${ENV_NAME} && \
    ossutil cp -r -u -f ./dist/ oss://${BUCKET_NAME}/${NAMESPACE}/${APP_NAME}${ENV_NAME}