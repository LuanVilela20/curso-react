import "./styles.css"
import { Component } from "react";

export class Button extends Component {
  render(){
    const {functionClick, disabled} = this.props;
    return (
      <button 
        disabled = {disabled}
        className="button" 
        onClick = {functionClick}
      >
        teste
      </button>
    )
  }
}