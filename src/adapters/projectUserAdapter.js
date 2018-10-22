const api = 'http://localhost:4000/project_users/'

class ProjectUserAdapter {

  static fetchAllProjectUsers(){
    return fetch(api)
      .then(res => res.json())
  }

  static postProjectUser(pid, uid){
    return fetch(api, {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({ project_id: pid, user_id: uid })
    });
  }
}


export default ProjectUserAdapter
