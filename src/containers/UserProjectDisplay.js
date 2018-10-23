import React from 'react'
import {connect} from 'react-redux'
import {FIND_USER_PROJECTS} from '../reducers/types'
import {ActionCable} from 'react-actioncable-provider'
import UserAdapter from '../adapters/userAdapter'
import {Card} from 'semantic-ui-react'

class UserProjectDisplay extends React.Component{
  componentDidMount(){
    UserAdapter.fetchCurrentUser(this.props.currentUser.id)
    .then(user => this.props.findUserProjects(user))
  }

  render(){
    return(
      <>
      <ActionCable channel={{channel: 'ProjectChannel'}} onReceived={(data) => this.props.findImageUrl(data)}/>
      <Card.Group>
        {this.props.currentUser.projects && this.props.currentUser.projects.map(proj =>(
          <Card
            key={proj.id}
            image={proj.image_url}
            header={proj.title}
            description={proj.story} />
        ))}
      </Card.Group>
      </>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps =(dispatch) =>{
  return {
    findUserProjects: (data) => dispatch({type:FIND_USER_PROJECTS , payload: data }),
    findImageUrl: (data) => dispatch({type:"UPDATE_IMAGE_URL", payload:data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectDisplay)
