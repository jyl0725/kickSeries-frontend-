import React from 'react';
import {SketchField, Tools} from 'react-sketch';
import {connect} from 'react-redux';
import '../App.css';
import {FIND_PROJECT} from '../reducers/types'


class SingleArtistProject extends React.Component{
  state ={
    tool: Tools.pencil
  }

  handleSelect = (event) =>{
    this.setState({
      tool: event.target.value,
    })
  }

  undo = () =>{
    this._sketch.undo()
  }

  handleSave =(event) =>{
    const drawing = this._sketch.toDataURL()
    // const project = this.props.project.image_url = drawing
    // this.props.findProject(project)
    fetch(`http://localhost:4000/projects/${this.props.project.id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({image_url: drawing })
    })


  }



  render(){

    return (
      <div>
        <div>{this.props.project.title}</div>
        <div>{this.props.project.story}</div>
        <SketchField id='canvas'
                     ref={(c) => this._sketch = c}
                     width='700px'
                     height='500px'
                     tool={this.state.tool}
                     onChange={this.handleSave}
                     lineColor ='black'
                     lineWidth={3} />
                   <select value={this.state.tool} onChange={this.handleSelect}>
         <option value={Tools.Select}> Select</option>
         <option value={Tools.Pencil}> Pencil</option>
         <option value={Tools.Line}> Line</option>
         <option value={Tools.Pan}> Pan</option>
         <option value={Tools.Circle}> Circle</option>
       </select>

       <button onClick={this.handleSave}>save Canvas </button>
       <button onClick={this.undo}> Undo</button>
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

// const mapDispatchtoProps = dispatch =>{
//   return{
//     findProject: (proj) => dispatch({type: FIND_PROJECT, payload: proj})
//   }
// }

export default connect(mapStatetoProps)(SingleArtistProject)
