import request from "@/utils/request";

const baseApi = 'label';

const labelApi = {
  labelCreate: `/${baseApi}/create`,
  labelFind: `/${baseApi}/find/`,
  labelRemove: `/${baseApi}/remove/`,
  labelList: `/${baseApi}/list`,
  labelEditStatus: `/${baseApi}/editStatus/`,
}

class Service {
  /**
   * @description POST 标签新建
  */
  static labelCreate(data: any) {
    return request({
      url: labelApi.labelCreate,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description GET 标签查询
  */
   static labelFind(id: any) {
    return request({
      url: labelApi.labelFind + id,
      method: 'GET',
      json: true,
    })
  }

  /**
   * @description POST 标签删除
  */
   static labelRemove(id: any) {
    return request({
      url: labelApi.labelRemove + id,
      method: 'POST',
      json: true,
    })
  }

  /**
   * @description GET 标签列表
  */
   static labelList(params: any) {
    return request({
      url: labelApi.labelList,
      method: 'GET',
      json: true,
      params
    })
  }

  /**
   * @description POST 标签状态修改
  */
   static labelEditStatus(id: string,data:any) {
    return request({
      url: labelApi.labelEditStatus + id,
      method: 'POST',
      json: true,
      data
    })
  }
}

export default Service
