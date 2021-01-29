

class UserSerializer {
  static getUserDetails(user) {
    const allowedAttributes = [
      "email",
      "userName",
      "firstName",
      "lastName",
    ]

    let serializedUser = {}
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }

    return serializedUser
  }
}

export default UserSerializer