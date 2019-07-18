import * as types from '@/store/types';

const state = {
  navNum: {
    selfNum: 0,
    linkNum: 0,
  }
}

const getters = {
  navNum: state => {
    let result = {...state.navNum};
    if(result.selfNum > 999) result.selfNum='999+';
    if(result.linkNum > 999) result.linkNum='999+';
    return result;
  },
}

const actions = {
  outCallAction({commit}, params) {
    localStorage.setItem('outcallparams', JSON.stringify(params));
    console.log(order_num_zg,order_num_dl,params.order_num)
    window.open(`${window.origin}#/outcall`)
  }
}

const mutations = {
  [types.NAV_NUM](state, res) {
    state.navNum = res;
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}
