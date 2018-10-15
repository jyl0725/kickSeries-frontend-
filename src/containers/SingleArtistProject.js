import React from 'react'
import {SketchField, Tools} from 'react-sketch';
import {connect} from 'react-redux'

class SingleArtistProject extends React.Component{
  state ={
    tool: Tools.pencil
  }


  render(){
    return (
      <div>
        {this.props.project.title}
        {this.props.project.story}
        <SketchField id='canvas'
                         width='500px'
                         height='500px'
                         tool={this.props.tool}
                         lineColor ='black'
                         lineWidth={3} />
      </div>
    )
  }
}

const mapStatetoProps = state =>{
  return{
    project: state.project.project
  }
}

export default connect(mapStatetoProps)(SingleArtistProject)
