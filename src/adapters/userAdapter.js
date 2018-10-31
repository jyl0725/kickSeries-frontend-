const api = 'https://kickseries-app-api.herokuapp.com/users/'

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
    .then(res => {
      if(res.ok){
        console.log(res);
        return res.json()
      }else{
        throw res
      }
    })
  }

  static fetchCurrentUser(userId){
    return fetch(`${api}/${userId}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      method: 'GET',
    })
    .then(res => res.json())
  }
}

export default UserAdapater
