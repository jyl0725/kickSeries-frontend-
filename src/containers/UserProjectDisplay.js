import React from 'react'
import {connect} from 'react-redux'
import {FIND_USER_PROJECTS, FIND_PROJECT} from '../reducers/types'
import {ActionCable} from 'react-actioncable-provider'
import UserAdapter from '../adapters/userAdapter'
import {Card} from 'semantic-ui-react'
import exist from '../hocs/exist'
import {Redirect} from 'react-router-dom'

class UserProjectDisplay extends React.Component{

  state ={
    redirect :false
  }
  componentDidMount(){
    UserAdapter.fetchCurrentUser(this.props.currentUser.id)
    .then(user => this.props.findUserProjects(user))
  }

  handleClick = event =>{
    const project = this.props.currentUser.projects.find(proj => proj.image_url === event.target.src || proj.title.split(' ').join('')  === event.target.innerText.split(' ').join('') || proj.story.split(' ').join('')  === event.target.innerText.split(' ').join(''))
    this.props.findProject(project)
    this.setState({redirect: true})
  }

  renderEditPage = event =>{
    if(this.state.redirect){
      return <Redirect to='/editproject' />
    }
  }


  render(){
    return(
      <>
      <ActionCable channel={{channel: 'ProjectChannel'}} onReceived={(data) => this.props.findImageUrl(data)}/>
      <Card.Group>
        {this.renderEditPage()}
        {this.props.currentUser.projects && this.props.currentUser.projects.map(proj =>(
          <Card
            id={proj.id}
            key={proj.id}
            image={proj.image_url}
            header={proj.title}
            description={proj.story}
            onClick={this.handleClick} />
        ))}
      </Card.Group>
      </>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    currentUser: state.user.currentUser,
    projects: state.project.projects,
  }
}

const mapDispatchToProps =(dispatch) =>{
  return {
    findUserProjects: (data) => dispatch({type:FIND_USER_PROJECTS , payload: data }),
    findImageUrl: (data) => dispatch({type:"UPDATE_IMAGE_URL", payload:data}),
    findProject: (project) => dispatch({type: FIND_PROJECT, payload: project}),
  }
}

export default exist(connect(mapStateToProps, mapDispatchToProps)(UserProjectDisplay))
