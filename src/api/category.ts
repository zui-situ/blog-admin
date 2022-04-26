import request from "@/utils/request";

const baseApi = 'category';

const categoryApi = {
  create: `/${baseApi}/create`,
  update: `/${baseApi}/update/`,
  find: `/${baseApi}/find/`,
  remove: `/${baseApi}/remove/`,
  list: `/${baseApi}/list`,
  editStatus: `/${baseApi}/editStatus/`,
}

class Service {
  /**
   * @description POST 分类新建
  */
  static categoryCreate(data: any) {
    return request({
      url: categoryApi.create,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description POST 分类修改
  */
   static categoryUpdate(data: any, id: string) {
    return request({
      url: categoryApi.update + id,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description GET 分类查询
  */
   static categoryFind(id: any) {
    return request({
      url: categoryApi.find + id,
      method: 'GET',
      json: true,
    })
  }

  /**
   * @description POST 分类删除
  */
   static categoryRemove(id: any) {
    return request({
      url: categoryApi.remove + id,
      method: 'POST',
      json: true,
    })
  }

  /**
   * @description GET 分类列表
  */
   static categoryList(params: any) {
    return request({
      url: categoryApi.list,
      method: 'GET',
      json: true,
      params
    })
  }

  /**
   * @description POST 分类状态修改
  */
   static categoryEditStatus(id: string,data:any) {
    return request({
      url: categoryApi.editStatus + id,
      method: 'POST',
      json: true,
      data
    })
  }
}

export default Service
