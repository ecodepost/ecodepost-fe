import {AntSpaceAll, AntSpaceGroupInfo, AntSpaceInfo} from "@/models/community";

const arrToTree = <T extends any[]>(arr: T): T => {
  const data = <T>[]
  arr.forEach(item => {
    // 如果没有title属性，那么将name放到title里
    if (!item.hasOwnProperty('title')) {
      Object.assign(item, {
        title: item.name,
      });
    }

    // 如果没有title属性，那么将name放到title里
    if (!item.hasOwnProperty('key')) {
      Object.assign(item, {
        key: item.guid,
      });
    }

    // 通过parent guid，找到这些儿子
    item.children = arr.filter(v => item.guid === v.parentGuid)
    // 如果一个找不到他爸爸的节点，那么他就是根节点。例如他parent guid为空
    if (arr.filter(v => item.parentGuid === v.guid).length == 0) {
      data.push(item)
    }
  })
  return data
}

const ArrToSpaceAll = (spaceList: AntSpaceInfo[], spaceGroupList: AntSpaceGroupInfo[]): AntSpaceAll => {
  const tree: AntSpaceGroupInfo[] = []
  // spaceGroupList 可能为null
  if (spaceGroupList) {
    spaceGroupList.forEach(item => {
      // 通过parent guid，找到这些儿子
      // space list 可能为null
      if (spaceList) {
        item.children = spaceList.filter(v => item.guid === v.spaceGroupGuid)
      }
      tree.push(item)
    })
  }

  return {
    spaceList: spaceList,
    spaceGroupList: spaceGroupList,
    tree: tree,
  }
}

/**
 * todo 后面都要用这个找数据，可以跳出循环，不可用foreach
 * @description: 树节点查到指定id
 * @param {Number} findId 要查找的id
 * @param {Array} array 遍历的数组
 * @param {String} findKey 要对比的key
 * @returns:
 */
const findTreeId = (findId, array, findKey = 'key') => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element[findKey] == findId) {
      return element;
    } else if (element.children.length) {
      const result = findTreeId(findId, element.children, findKey);
      // 这个判断很重要，在没有返回值的情况下才进行递归
      if (result) {
        return result;
      }
    }
  }
  return null;
};

export {arrToTree, ArrToSpaceAll};
