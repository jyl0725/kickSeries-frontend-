const projectUserAdapter = {
  api : 'http://localhost:4000/project_users/',
  allProjectUsers:
    return fetch(this.api)
    .then(res => res.json()),
  postProjectUser: (userId, projectId) =>{
    return fetch(this.api, {
      method: "POST",
      body: Json.stringify({ user_id: userId, project_id: ProjectId })
    });
    .then(res => res.json())
  },
  deleteProjectUser: (id) => {
     return fetch(this.api`${id}`, { method: "DELETE" })
  },
}

export default projectUserAdapter
