const projectAdapter = {
  api : 'http://localhost:4000/projects/',
  allProjects:
    return fetch(this.api)
    .then(res => res.json()),
  postProject: (title, story, image_url) =>{
    return fetch(this.api, {
      method: "POST",
      body: Json.stringify({ title: name, story: story, image_url: image_url })
    });
    .then(res => res.json())
  },
  deleteProject: (id) => {
     return fetch(this.api`${id}`, { method: "DELETE" })
  },
}

export default projectAdapter
