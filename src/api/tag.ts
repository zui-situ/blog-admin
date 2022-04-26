import request from "@/utils/request";

const baseApi = 'tag';

const tagApi = {
  create: `/${baseApi}/create`,
  update: `/${baseApi}/update/`,
  find: `/${baseApi}/find/`,
  remove: `/${baseApi}/remove/`,
  list: `/${baseApi}/list`,
  editStatus: `/${baseApi}/editStatus/`,
}

class Service {
  /**
   * @description POST 标签新建
  */
  static tagCreate(data: any) {
    return request({
      url: tagApi.create,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description POST 标签修改
  */
  static tagUpdate(data: any, id: string) {
    return request({
      url: tagApi.update + id,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description GET 标签查询
  */
  static tagFind(id: any) {
    return request({
      url: tagApi.find + id,
      method: 'GET',
      json: true,
    })
  }

  /**
   * @description POST 标签删除
  */
  static tagRemove(id: any) {
    return request({
      url: tagApi.remove + id,
      method: 'POST',
      json: true,
    })
  }

  /**
   * @description GET 标签列表
  */
  static tagList(params: any) {
    return request({
      url: tagApi.list,
      method: 'GET',
      json: true,
      params
    })
  }

  /**
   * @description POST 标签状态修改
  */
  static tagEditStatus(id: string,data:any) {
    return request({
      url: tagApi.editStatus + id,
      method: 'POST',
      json: true,
      data
    })
  }
}

export default Service
