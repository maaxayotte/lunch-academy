import { User } from '../../models/index.js'

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "josh@josh.com",
        cryptedPassword: "toshiba"
      },
      {
        email: "dru@drucifer.com",
        cryptedPassword: "jeep"
      },
      {
        email: "will@will.com",
        cryptedPassword: "billiam"
      },
      {
        email: "max@max.com",
        cryptedPassword: "whereami"
      },
    ]

    for (const singleUserData of usersData) {
      const currentUser = await User.query().findOne(singleUserData)
      if (!currentUser) {
        await User.query().insert(singleUserData)
      }
    }
  }
}

export default UserSeeder