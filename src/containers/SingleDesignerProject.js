import React from 'react';
import {connect} from 'react-redux';
import {Tools, SketchField} from 'react-sketch';
import {CirclePicker} from 'react-color'
import ProjectAdapter from '../adapters/projectAdapter'
import directTo from '../hocs/directTo'
import { Button } from 'semantic-ui-react'


class SingleDesignerProject extends React.Component{
  state ={
    tool: Tools.pencil,
    color: 'white',
    lineWidth: 3,
    canUndo: false,
    stretched: true,
    stretchedX: false,
    stretchedY: false,
    originX: 'left',
    originY: 'top'
  }

  handleColorChange = (color) =>{
    let sketch = this._sketch;
    let {stretched, stretchedX, stretchedY, originX, originY} = this.state;
    this.setState({color: color.hex},
      this._sketch.setBackgroundFromDataUrl(this.props.project.image_url, {
        stretched: stretched,
        stretchedX: stretchedX,
        stretchedY: stretchedY,
        originX: originX,
        originY: originY
      })
    )
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
      <div className='canvas-page'>
        <h1>{this.props.project.title}</h1>
        <h3>{this.props.project.story}</h3>
        <h3> Pick a color to start</h3>
        <CirclePicker color={this.state.color} onChangeComplete={this.handleColorChange} />
        {this.state.canUndo && <Button onClick={this.undo}> Undo</Button>}
        <label> Edit Line Width </label>
        <input type='number' value={this.state.lineWidth} onChange={this.handleLineChange}/>
        <SketchField id='canvas'
                     ref={(c) => this._sketch = c}
                     width='700px'
                     height='450px'
                     tool={this.state.tool}
                     lineColor ={this.state.color}
                     onChange={this.handleSave}
                     lineWidth={this.state.lineWidth}/>
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
