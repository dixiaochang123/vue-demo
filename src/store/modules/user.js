import * as types from '@/store/types';
import { loginApi, logoutApi } from '@/axios/modules/user';
import { ziguanKeyInfo ,contractBaseApi} from '@/axios/modules/index';
import $router from '@/router/index'

const state = {
  isLoginPage: false,    // 登录类型   true： 正常账号密码登录   false: 从其他系统跳转，需要查询参数携带token和身份证号
  token: localStorage.getItem('LOST_CONNECTION_TOKEN') && this.isLoginPage ? localStorage.getItem('LOST_CONNECTION_TOKEN') : '',
  userName: localStorage.getItem('LOST_CONNECTION_userName') && this.isLoginPage ? localStorage.getItem('LOST_CONNECTION_userName') : '',
  cardID: localStorage.getItem('LOST_CONNECTION_cardID') && this.isLoginPage ? localStorage.getItem('LOST_CONNECTION_cardID') : '',
  orderNum: localStorage.getItem('LOST_CONNECTION_ORDER_NUM') && this.isLoginPage ? localStorage.getItem('LOST_CONNECTION_ORDER_NUM') : '',
  //资管订单号
  order_num_zg: '',
  //登录订单号
  order_num_dl:''
}

const getters = {
  token: state => state.token,
  userName: state => state.userName,
  cardID: state => state.cardID,
  cardIdDialog: state => {
    if((state.cardID != '' && state.cardID != null) || !state.isLoginPage) {
      return false;
    }else {
      return true;
    }
  },
  isLoginPage: state => state.isLoginPage,
  orderNum: state => state.orderNum,
  order_num_zg: state => state.order_num_zg,
  order_num_dl: state => state.order_num_dl,
}

const actions = {
  // 用户登录
  login({commit}, res) {
    return new Promise((resolve, reject) => {
      loginApi(res)
      .then(response => {
        if(response.data.code === 1) {
          console.log('vuex登录成功')
          // 修改登录类型
          commit(types.LOGIN_TYPE, true);
          // 保存token
          commit(types.STORE_TOKEN, response.data.data.token);
          // 用户姓名
          commit(types.LOCAL_STORE_USER_INFO, {userName: response.data.data.user_name});
          resolve(response);
        }else {
          resolve(response);
        }
      })
      .catch(error=>{
        reject(error);
      })
    })
  },
  // 用户登出
  loginout({commit}) {
    return new Promise((resolve, reject) => {
      logoutApi()
      .then(response => {
        if(response.data.code == 1) {
          commit('LOGOUT');
          $router.push('/login')
          resolve(response);
        }else {
          resolve(response);
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  //资管and登录 判断
  // 用户登出
  islogin({commit,dispatch},res) {
    return new Promise((resolve, reject) => {
    if(res.key) {
      
      // 从三方平台跳转过来的无需登录的连接
      // 修改登录类型
      commit('LOGIN_TYPE', false);
      // // 保存token
      commit('STORE_TOKEN', res.key);
      // 保存身份证号
      commit('STORE_CARDID', res.idcard_no);
      //保存订单号
      commit('ORDER_NUM_ZG', res.order_no)
      // localStorage.setItem('ORDER_NUM', res.order_num);
      // 用户姓名
      ziguanKeyInfo().then(res=>{
        console.log(res.data.data.user_name)
        // 用户姓名
        commit(types.LOCAL_STORE_USER_INFO, {userName: res.data.data.user_name});
      }).catch(err=>console.log(err))
      resolve('登录and身份证')
    }else {
      // 不是从第三方平台跳转而来的
      commit('LOGIN_TYPE', true);
      if(!localStorage.getItem('LOST_CONNECTION_TOKEN')) {
        this.$router.push('/login');
        reject('/login')
      }else {
        console.log('token',localStorage.getItem('LOST_CONNECTION_TOKEN'))
        commit('STORE_TOKEN', localStorage.getItem('LOST_CONNECTION_TOKEN'));
        commit('STORE_CARDID', localStorage.getItem('LOST_CONNECTION_cardID'));
        commit('STORE_USER_INFO', {userName: localStorage.getItem('LOST_CONNECTION_userName')});
        //保存订单号为空
        // contractBaseApi()
        //   .then(res => {
        //     if(res.data.code == 1) {
        //       //进件编号
        //       console.log("order_num_dl1",res.data.data.order_nums)
        //       dispatch("order_num_dl1",res.data.data.order_nums);
        //       // console.log(this.$store.commit('ORDER_NUM_DL'),res.data.data.order_nums)

        //     }
        //   })
        //   .catch( err => {
        //     console.log(err);
        //   })
        // if(!getters.cardIdDialog){
          resolve('登录and身份证')
        // }
      }
    }
    })
    

  },
  //登录保存单号
  order_num_dl1({commit},res) {
    // return new Promise((resolve, reject)=>{
      commit('ORDER_NUM_DL',res)
    // })
  }

}

const mutations = {
  [types.LOGIN_TYPE](state, res) {
    state.isLoginPage = res;
  },
  [types.STORE_TOKEN](state, res) {
    localStorage.setItem('LOST_CONNECTION_TOKEN', res);
    state.token = res;
  },
  [types.STORE_USER_INFO](state, info) {
    for(let name in info) {
      state[name] = info[name];
    }
  },
  [types.STORE_CARDID](state, cardId) {
    localStorage.setItem('LOST_CONNECTION_cardID', cardId);
    state.cardID = cardId;
  },
  //资管订单号
  [types.ORDER_NUM_ZG](state, order_num_zg) {
    // localStorage.setItem('LOST_CONNECTION_cardID', cardId);
    state.order_num_zg = order_num_zg;
  },
  //登录订单号
  [types.ORDER_NUM_DL](state, order_num_dl) {
    // localStorage.setItem('LOST_CONNECTION_cardID', cardId);
    state.order_num_dl = order_num_dl;
  },
  // 需要本地存储的属性
  [types.LOCAL_STORE_USER_INFO](state, info) {
    for(let name in info) {
      localStorage.setItem(`LOST_CONNECTION_${name}`, info[name]);
      state[name] = info[name];
    }
  },
  // 退出登录
  [types.LOGOUT](state) {
    localStorage.clear();
    state.token = '';
    state.userName = '';
    state.cardID = '';
  },
  // 输入身份证号查询
  [types.REFLASH_CARDID](state, cardId) {
    localStorage.setItem('LOST_CONNECTION_cardID', cardId);
    state.cardID = cardId;
    location.reload();
  },
}

export default {
    state,
    getters,
    actions,
    mutations
}

