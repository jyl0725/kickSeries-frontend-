import React from 'react';
import {connect} from 'react-redux';
import {Tools, SketchField} from 'react-sketch';
import {CirclePicker} from 'react-color'
import ProjectAdapter from '../adapters/projectAdapter'
import directTo from '../hocs/directTo'


class EditProject extends React.Component{

  state ={
    tool: Tools.pencil,
    color: 'white',
    lineWidth: 3,
    canUndo: false,
  }

  handleColorChange = (color) =>{
    this.setState({color: color.hex}, this._sketch.addImg(this.props.project.image_url))
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

  handleStartEdit = () =>{
    this._sketch.addImg(this.props.project.image_url)
  }

  renderArtistOrDesignerCanvas = () => {
    if(this.props.currentUser.role === 'story teller'){
      return <h1>Stories are forever </h1>
    }else if(this.props.currentUser.role === 'artist'){
      return <div>
        <h1>{this.props.project.title}</h1>
        <h3>{this.props.project.story}</h3>
        <button onClick={this.handleStartEdit}> Edit Project</button>
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
    }else{
      return <div>
        <h1>{this.props.project.title}</h1>
        <h3>{this.props.project.story}</h3>
        <button onClick={this.handleStartEdit}> Edit Project</button>
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
    }
  }
  render(){
    return(
      this.renderArtistOrDesignerCanvas()
    )
  }
}

const mapStateToProps = state =>{
  return{
    project: state.project.project,
    currentUser: state.user.currentUser,
  }
}

// const mapDispatchToProps = dispatch =>{
//   return{
//
//   }
// }
export default directTo(connect(mapStateToProps)(EditProject))
