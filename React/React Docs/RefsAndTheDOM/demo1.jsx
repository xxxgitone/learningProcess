
// var MyComponent = React.createClass({
//   handleClick: function() {
//     this.refs.myTextInput.focus();
//   },
//   render: function() {
//     return (
//       <div>
//         <input type="text" ref="myTextInput" />
//         <input type="button" value="Focus the text input" onClick={this.handleClick} />
//       </div>
//     );
//   }
// });

// ReactDOM.render(
//   <MyComponent />,
//   document.getElementById('example')
// );

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in this.textInput.
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <CustomTextInput />,
  document.getElementById('root')
);










