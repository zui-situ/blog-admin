import { Module } from 'vuex';
import userApi from '@/api/user';
import { setToken, removeToken } from '@/utils/auth';
import { ElMessage } from 'element-plus'
import userStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const userModule: Module<userStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    token:'',
    userInfo:{},
    userId:'',
  },
  mutations: {
    SET_TOKEN: (state: userStateTypes,token:string) => {
      state.token = token;
    },
    DELETE_TOKEN: (state: userStateTypes) => {
      state.token = '';
    },
    SET_USER_INFO: (state: userStateTypes,userInfo:object) => {
      state.userInfo = userInfo;
    },
    DELETE_USER_INFO: (state: userStateTypes) => {
      state.userInfo = {};
    },
    SET_USERID: (state: userStateTypes,userId:string) => {
      state.userId = userId;
    },
  },
  actions: {
    // 登入
    async login({ commit },data) {
      return new Promise<void>((resolve) => {
        userApi.postLogin(data).then(res=>{
          if(res.code === 200) {
            const { token } = res.data;
            console.log(token);
            commit('SET_TOKEN', token);
            setToken(res.data);
          } else {
            ElMessage({
              type: 'error',
              message: '密码错误'
            })
          }
          resolve()
        })
      });
    },
    // 获取用户信息
    async getInfo({ commit }) {
      return new Promise<void>((resolve) =>{
        userApi.getUserInfo().then(res=>{
          if(res.code === 200) {
            commit('SET_USER_INFO',res.data);
            commit('SET_USERID',res.data._id);
            resolve();
          }
        })
      })
    },
    // remove token
    resetToken({
      commit
    }) {
      return new Promise<void>(resolve => {
        commit('SET_TOKEN','')
        commit('SET_ROLES',[])
        removeToken()
        resolve()
      })
    },
  },
  getters: {
    getToken(state:userStateTypes) {
      return state.token;
    },
    getUserInfo(state:userStateTypes) {
      return state.userInfo;
    },
    getUserId(state:userStateTypes) {
      return state.userId;
    }
  },
};
export default userModule;
