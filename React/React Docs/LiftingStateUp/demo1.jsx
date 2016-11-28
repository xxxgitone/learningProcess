//在文本框里输入温度，进行判断，显示相应的内容
// function BoilingVerdict(props) {
// 	if(props.celsius>=100){
// 		return <p>The water would boil.</p>;
// 	}else{
// 		return <p>The water would not boil</p>
// 	}
// }

// class Calculator extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={value:''};
// 		this.handleChange=this.handleChange.bind(this);
// 	};

// 	handleChange(e){
// 		this.setState({
// 			value:e.target.value
// 		});
// 	}

// 	render(){
// 		const value=this.state.value;

// 		return(
// 			<fieldset>
// 				<legend>Enter temperatrue in Celsius:</legend>
// 				<input value={value} onChange={this.handleChange}/>
// 				<BoilingVerdict celsius={parseFloat(value)}/>
// 			</fieldset>
// 		);
// 	}
// }

// ReactDOM.render(
// 	<Calculator />,
// 	document.getElementById('root')
// );

// 增加华氏温度计
// const scaleNames = {
//   c: 'Celsius',
//   f: 'Fahrenheit'
// };

// //输入温度组件
// class TemperatureInput extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={value:''};
// 		this.handleChange=this.handleChange.bind(this);
// 	};

// 	handleChange(e){
// 		this.setState({
// 			value:e.target.value
// 		});
// 	}

// 	render(){
// 		const value=this.state.value;
// 		const scale=this.props.scale;

// 		return(
// 			 <fieldset>
// 	        	<legend>Enter temperature in {scaleNames[scale]}:</legend>
// 	        	<input value={value}
// 	               onChange={this.handleChange} />
// 	      	</fieldset>
// 		);
// 	}
// }

// class Calculator extends React.Component {
//   render() {
//     return (
//       <div>
//         <TemperatureInput scale="c" />
//         <TemperatureInput scale="f" />
//       </div>
//     );
//   }
// }



// ReactDOM.render(
// 	<Calculator />,
// 	document.getElementById('root')
// );



//增加转换函数
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
// var celsius=tryConvert('10.22', toCelsius);
// console.log(celsius);

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={value}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {value: '', scale: 'c'};
  }

  handleCelsiusChange(value) {
    this.setState({scale: 'c', value});
  }

  handleFahrenheitChange(value) {
    this.setState({scale: 'f', value});
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;
    const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
    const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

    return (
      <div>
        <TemperatureInput
          scale="c"
          value={celsius}
          onChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          value={fahrenheit}
          onChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
















