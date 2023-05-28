import {GetURLSpaceFuncType} from "./GetUrlParams";


test('space func 列表路由', () => {
  expect(GetURLSpaceFuncType("/s/123")).toEqual('list');
})
test('space func 详情路由', () => {
  expect(GetURLSpaceFuncType("/s/123/d/123")).toEqual('detail');
})
test('space func 创建路由', () => {
  expect(GetURLSpaceFuncType("/s/123/d/-/create")).toEqual('create');
})
test('space func 编辑路由', () => {
  expect(GetURLSpaceFuncType("/s/123/d/123/update")).toEqual('update');
})
test('space func 创建子页面路由', () => {
  expect(GetURLSpaceFuncType("/s/123/d/123/d/-/create")).toEqual('subCreate');
})
test('space func 子页面详情路由', () => {
  expect(GetURLSpaceFuncType("/s/123/d/123/d/123")).toEqual('subDetail');
})

