const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roleid: state => state.user.roleid,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  getUserId: state => state.user.userId,
}
export default getters
