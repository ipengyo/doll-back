import { UserInfo,getUser,coinInfo } from '../types/model'

class User {
  userInfo = new UserInfo()
  userLists: UserInfo[] = []
  currentIndex = 1
  total = 0
  pageSize = 150
  getUsers:getUser[] = []
  getUser = new getUser()
  coinInfo = new coinInfo()
 }

let user = new User()

export default user