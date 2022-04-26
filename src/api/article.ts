import request from "@/utils/request";

const baseApi = 'article';

const articleApi = {
  articleCreate: `/${baseApi}/create`,
  articleUpdate: `/${baseApi}/update/`,
  articleFind: `/${baseApi}/find/`,
  articleRemove: `/${baseApi}/remove/`,
  articleList: `/${baseApi}/list`,
  articleEditStatus: `/${baseApi}/editStatus/`,
}

class Service {
  /**
   * @description POST 文章新建
  */
  static articleCreate(data: any) {
    return request({
      url: articleApi.articleCreate,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description POST 分类修改
  */
  static articleUpdate(data: any, id: any) {
    return request({
      url: articleApi.articleUpdate + id,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description GET 文章列表
  */
  static articleList(params: any) {
    return request({
      url: articleApi.articleList,
      method: 'GET',
      json: true,
      params
    })
  }

  /**
   * @description POST 文章删除
  */
  static articleRemove(id: any) {
    return request({
      url: articleApi.articleRemove + id,
      method: 'POST',
      json: true,
    })
  }

  /**
   * @description POST 标签状态修改
  */
  static articleEditStatus(id: string,data:any) {
    return request({
      url: articleApi.articleEditStatus + id,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description GET 文章查询
  */
  static articleFind(id: any) {
    return request({
      url: articleApi.articleFind + id,
      method: 'GET',
      json: true,
    })
  }
}

export default Service
