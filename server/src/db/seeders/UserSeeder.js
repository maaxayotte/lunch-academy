import { User } from '../../models/index.js'

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        firstName: "josh",
        email: "josh@josh.com",
        cryptedPassword: "toshiba"
      },
      {
        firstName: "dru",
        email: "dru@drucifer.com",
        cryptedPassword: "jeep"
      },
      {
        firstName: "will",
        email: "will@will.com",
        cryptedPassword: "billiam"
      },
      {
        firstName: "max",
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