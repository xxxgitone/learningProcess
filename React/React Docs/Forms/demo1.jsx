// class NameForm extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={value:' '};

// 		this.handleSubmit=this.handleSubmit.bind(this);
// 		this.handleChange=this.handleChange.bind(this);
// 	};

// 	//获得真实的
// 	handleChange(event){
// 		this.setState({
// 			value:event.target.value
// 		});

// 		//this.setState({value: event.target.value.toUpperCase()});
// 	};

// 	handleSubmit(event){
// 		alert('A name was submitted: '+this.state.value);
// 		event.preventDefault();
// 	};

// 	render(){
// 		return (
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 					Name:
// 					<input type="text" value={this.state.value} onChange={this.handleChange} />
// 				</label>
// 				<input type="submit" value="Submit" />
// 			</form>
// 		);
// 	}
// }

// ReactDOM.render(
// 	<NameForm />,
// 	document.getElementById('root')
// );


// select标签
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
	<FlavorForm />,
	document.getElementById('root')
);