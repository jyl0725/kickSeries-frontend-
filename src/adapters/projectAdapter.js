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

  static fetchPatchProject(projectId, drawing){
    return fetch(`${api}/${projectId}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({image_url: drawing })
    })
  }
}

export default ProjectAdapter
