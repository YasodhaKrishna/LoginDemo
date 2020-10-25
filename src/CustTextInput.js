import React from "react";
import { TextField } from "@material-ui/core";

class CustTextInput extends React.Component {
  render() {
    return (
      <TextField
        type={this.props.type}
        placeholder={this.props.placeholder}
        fullWidth
        name={this.props.name}
        variant="outlined"
        onChange={(event) => this.props.onChange(event)}
        required
        autoFocus={this.props.autoFocus}
      />
    );
  }
}

export default CustTextInput;
