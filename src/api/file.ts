import request from "@/utils/request";



const userApi = {
  upload: '/upload',
}

class Service {
  /**
   * @description POST 上传文件
  */
  static postUpload(data: any) {
    return request({
      url: userApi.upload,
      method: 'POST',
      json: true,
      data
    })
  }
}

export default Service
