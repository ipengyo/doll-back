import { UserInfo } from '../types/model'

class User {
  userInfo = new UserInfo()
  userLists: UserInfo[] = []
  currentIndex = 1
  total = 0
  pageSize = 150
 }

let user = new User()

export default user