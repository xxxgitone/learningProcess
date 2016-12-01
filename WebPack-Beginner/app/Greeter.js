//var config=require('../config.json')

import React,{Component} from 'react'
import config from '../config.json';

import styles from './Greeter.css';

// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// };


class Greeter extends Component{
	render(){
		return(
			<div className={styles.root}>
				{config.greetText}
			</div>
		);
	}
}

export default Greeter






