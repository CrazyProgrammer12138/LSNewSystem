import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setRoleid, loginData, setPhone } from '@/utils/auth'
import { resetRouter } from '@/router'
import Layout from '@/layout'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    reoleId: '',
    userId: '',
    roles: ['25', '26'],
    menus: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLEID: (state, reoleId) => {
    state.reoleId = reoleId
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_USERID: (state, userId) =>{
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.inuser.token)
        // commit('SET_NAME', data.inuser.name)
        // commit('SET_AVATAR', data.QRcode)
        setToken(data.inuser.token)
        setPhone(data.inuser.phone);
        loginData(data.inuser);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({token: state.token}).then(response => {        
        const { data } = response;
        const { name, qrcode, roleid } = data;
        const menus = [];
        if (!data) {
          reject('验证失败，请重新登录。')
        } 
        if (roleid=='26' || roleid=='25') {
          commit('SET_NAME', name)
          commit('SET_AVATAR', qrcode)
          commit("SET_ROLEID", roleid);
          commit('SET_MENUS', menus)
          setRoleid(roleid)
          resolve(data)
        } else {
          reject('验证失败，请重新登录。')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()

      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })

    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  setUserId({ commit }, userInfo) {
    commit('SET_USERID', userInfo)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

