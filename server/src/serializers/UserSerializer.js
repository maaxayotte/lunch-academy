class UserSerializer {
  static getUserDetails(user) {
    const allowedAttributes = [
      "email",
      "firstName"
    ]

    let serializedUser = {}
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }

    return serializedUser
  }
}

export default UserSerializer