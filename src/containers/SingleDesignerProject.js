import React from 'react';
import {connect} from 'react-redux';
import {SketchField} from 'react-sketch';


class SingleDesignerProject extends React.Component{
  render(){
    return(
      <div>
        <div>{this.props.project.title}</div>
          <SketchField id='canvas'
                       ref={(c) => this._sketch = c}
                       width='700px'
                       height='500px'
                       tool={this.state.tool}
                       lineColor ='black'
                       lineWidth={3} />
      <div>{this.props.project.story}</div>
    </div>
    )
  }
}

const mapStatetoProps = state =>{
  return{
    project: state.project.project,
    currentUser: state.user.currentUser,
  }
}

export default connect(mapStatetoProps)(SingleDesignerProject)
