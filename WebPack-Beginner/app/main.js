// var greeter = require('./Greeter.js');
// document.getElementById('root').appendChild(greeter());

import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter.js';

// 导入css文件
import './main.css'


render(<Greeter />,document.getElementById('root'));







