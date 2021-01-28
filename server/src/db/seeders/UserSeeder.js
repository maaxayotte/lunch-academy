import { User } from '../../models/index.js'

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "josh@josh.com",
        cryptedPassword: "toshiba",
        userName: "joshy",
        firstName: "Josh",
        lastName: "Butts"
      },
      {
        email: "dru@drucifer.com",
        cryptedPassword: "jeep",
        userName: "drucifer",
        firstName: "Dru",
        lastName: "Daniels"
      },
      {
        email: "will@will.com",
        cryptedPassword: "billiam",
        userName: "Billbo",
        firstName: "Will",
        lastName: "Howell"
      },
      {
        email: "max@max.com",
        cryptedPassword: "whereami",
        userName: "maximus",
        firstName: "Max",
        lastName: "Ayotte"
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