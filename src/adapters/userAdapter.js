userAdapter = {
  api: 'http://localhost:4000/users/',
  allUsers: fetch(this.api).then(res => res.json()),
  postUser: ({form}) =>{
    fetch(this.api, {
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: form.name, userName: form.userName, password: form.password, role: form.user })
    });
  },
  deleteUser: (id) => {
      fetch(this.api`${id}`, { method: "DELETE" })
  },
}
