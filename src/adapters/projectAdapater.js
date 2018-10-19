// const projectAdapter = {
//   api : 'http://localhost:4000/projects/',
//   allProjects:
//     return fetch(this.api)
//     .then(res => res.json()),
//   postProject: (title, story, image_url) =>{
//     return fetch(this.api, {
//       method: "POST",
//       body: Json.stringify({ title: name, story: story, image_url: image_url })
//     });
//     .then(res => res.json())
//   },
//   deleteProject: (id) => {
//      return fetch(this.api`${id}`, { method: "DELETE" })
//   },
// }
//
// export default projectAdapter


const api = 'http://localhost:4000/projects/'

class ProjectAdapter {

  static fetchAllProject(){
    return fetch(api)
      .then(res => res.json())
  }

  static postProject(title, story, image_url=null){
    return fetch(api, {
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title, story: story, image_url: image_url })
    });
  }
}

export default ProjectAdapter
