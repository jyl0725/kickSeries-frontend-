const api = 'http://localhost:4000/users/'

class UserAdapater{
  static fetchPostUser(currentName, currentUserName, currentPassword, currentRole){
  return fetch(api, {
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: currentName, username: currentUserName, password: currentPassword, role: currentRole })
    })
    .then(res => res.json())
  }
}

export default UserAdapater
