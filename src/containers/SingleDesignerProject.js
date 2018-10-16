import React from 'react';
import {connect} from 'react-redux';
import {Tools, SketchField} from 'react-sketch';
import {CirclePicker} from 'react-color'


class SingleDesignerProject extends React.Component{
  state ={
    tool: Tools.pencil,
    color: 'white',
    lineWidth: 3,
  }

  handleColorChange = (color) =>{
    this.setState({color: color.hex}, this._sketch.setBackgroundFromDataUrl(this.props.project.image_url))
  }

  handleLineChange = (event) =>{
    this.setState({lineWidth: event.target.value})
  }


  undo = () =>{
    this._sketch.undo()
  }

  handleSave = () =>{
    const drawing = this._sketch.toDataURL()
    fetch(`http://localhost:4000/projects/${this.props.project.id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({image_url: drawing })
    })

    fetch(`http://localhost:4000/project_users`,{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ project_id: this.props.project.id, user_id: this.props.currentUser.id })
    })
  }



  render(){
    return(
      <div>
        <div>{this.props.project.title}</div>
        <div> Pick a Color</div>
        <CirclePicker color={this.state.color} onChangeComplete={this.handleColorChange} />
        <SketchField id='canvas'
                     ref={(c) => this._sketch = c}
                     width='700px'
                     height='500px'
                     tool={this.state.tool}
                     lineColor ={this.state.color}
                     lineWidth={this.state.lineWidth}/>
                   <label> Edit LineWidth </label>
        <input type='number' value={this.state.lineWidth} onChange={this.handleLineChange}/>
        <button onClick={this.handleSave}>save Canvas </button>
        <button onClick={this.undo}> Undo</button>

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
