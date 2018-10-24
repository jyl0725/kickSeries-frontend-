import React from 'react';
import {SketchField, Tools} from 'react-sketch';
import {connect} from 'react-redux';
import '../App.css';
import {FIND_PROJECT, SAVE_DRAWING} from '../reducers/types'
import ProjectAdapter from '../adapters/projectAdapter'
import directTo from '../hocs/directTo'


class SingleArtistProject extends React.Component{
  state ={
    tool: Tools.pencil,
    canUndo: false,
  }

  handleSelect = (event) =>{
    this.setState({
      tool: event.target.value,
    })
  }

  undo = () =>{
    this._sketch.undo()
    this.setState({
      canUndo: this._sketch.canUndo()
   })
  }

  sketchChange = () =>{
    let prev = this.state.canUndo;
    let now = this._sketch.canUndo();
    if (prev !== now) {
      this.setState({canUndo: now});
    }
  }

  handleSave =(event) =>{
    this.sketchChange();
    const drawing = this._sketch.toDataURL();
    ProjectAdapter.fetchPatchProject(this.props.project.id, drawing)
  }

  render(){
    return (
      <div>
        <h1>{this.props.project.title}</h1>
        <h3>{this.props.project.story}</h3>
        <SketchField id='canvas'
                     ref={(c) => this._sketch = c}
                     width='700px'
                     height='500px'
                     tool={this.state.tool}
                     onChange={this.handleSave}
                     lineColor ='black'
                     lineWidth={3} />
       <select value={this.state.tool} onChange={this.handleSelect}>
         <option value={Tools.Pencil}> Pencil</option>
         <option value={Tools.Line}> Line</option>
         <option value={Tools.Pan}> Pan</option>
         <option value={Tools.Circle}> Circle</option>
       </select>

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



export default directTo(connect(mapStatetoProps)(SingleArtistProject))
