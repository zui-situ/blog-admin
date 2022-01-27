import request from "@/utils/request";



const userApi = {
  userLogin: '/user/login',
  userInfo: '/user/userInfo',
}

class Service {
  /**
   * @description POST 用户登录接口
  */
  static postLogin(data: any) {
    return request({
      url: userApi.userLogin,
      method: 'POST',
      json: true,
      data
    })
  }

  /**
   * @description GET 获取用户信息接口
  */
  static getUserInfo() {
    return request({
      url: userApi.userInfo,
      method: 'GET',
      json: true,
    })
  }
}

export default Service
