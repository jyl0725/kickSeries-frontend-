const userAdapter = {
  api : 'http://localhost:4000/users/',
  allUsers:
    return fetch(this.api)
    .then(res => res.json()),
  postUser: (name, userName, password, role) =>{
    return fetch(this.api, {
      method: "POST",
      body: Json.stringify({ name: name, userName: userName, password: password, role: role })
    });
    .then(res => res.json())
  },
  deleteUser: (id) => {
     return fetch(this.api`${id}`, { method: "DELETE" })
  },
}

export default userAdapter
