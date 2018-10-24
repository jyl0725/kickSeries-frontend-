import React from 'react';
import {connect} from 'react-redux';
import {Tools, SketchField} from 'react-sketch';
import {CirclePicker} from 'react-color'
import ProjectAdapter from '../adapters/projectAdapter'
import directTo from '../hocs/directTo'


class SingleDesignerProject extends React.Component{
  state ={
    tool: Tools.pencil,
    color: 'white',
    lineWidth: 3,
    canUndo: false,
  }

  handleColorChange = (color) =>{
    this.setState({color: color.hex}, this._sketch.setBackgroundFromDataUrl(this.props.project.image_url))
  }

  handleLineChange = (event) =>{
    this.setState({lineWidth: event.target.value})
  }


  undo = () =>{
    this._sketch.undo()
    this.setState({
     canUndo: this._sketch.canUndo(),
   })
  }

  handleSave = (event) =>{
    this.sketchChange();
    const drawing = this._sketch.toDataURL()
    ProjectAdapter.fetchPatchProject(this.props.project.id, drawing)
  }

  sketchChange = () =>{
    let prev = this.state.canUndo;
    let now = this._sketch.canUndo();
    if (prev !== now) {
      this.setState({canUndo: now});
    }
  }



  render(){
    return(
      <div>
        <h1>{this.props.project.title}</h1>
        <h3>{this.props.project.story}</h3>
        <div> Pick a Color</div>
        <CirclePicker color={this.state.color} onChangeComplete={this.handleColorChange} />
        <SketchField id='canvas'
                     ref={(c) => this._sketch = c}
                     width='700px'
                     height='500px'
                     tool={this.state.tool}
                     lineColor ={this.state.color}
                     onChange={this.handleSave}
                     lineWidth={this.state.lineWidth}/>
                   <label> Edit LineWidth </label>
        <input type='number' value={this.state.lineWidth} onChange={this.handleLineChange}/>
        {this.state.canUndo && <button onClick={this.undo}> Undo</button>}
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

export default directTo(connect(mapStatetoProps)(SingleDesignerProject))
