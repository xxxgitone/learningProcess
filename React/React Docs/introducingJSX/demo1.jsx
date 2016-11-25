//在JSX中可以镶嵌任何javascript语法
function formatName(user){
	return user.firstName+' '+user.lastName;
}


function getGreeting(user) {
	if (user) {
		return <h1>Hello, {formatName(user)}!</h1>;
	 }
	return <h1>Hello, Stranger.</h1>;
}

const user={
	firstName:'Harper',
	lastName:'Perez',
}

const element=(
	<h1>
		{getGreeting(user)}
	</h1>
	);

ReactDOM.render(
	element,
	document.getElementById('root')
	)

//可以直接写属性，
//const element = <div tabIndex="0"></div>;
//也可以使用大括号
//const element = <img src={user.avatarUrl}></img>;
//const element = <img src={user.avatarUrl} />;

// 可以包含子类
// const element = (
//   <div>
//     <h1>Hello!</h1>
//     <h2>Good to see you here.</h2>
//   </div>
// );

// 安全注入
//const title = response.potentiallyMaliciousInput;
// This is safe:
//const element = <h1>{title}</h1>;

//class属性应写为className，JSX表现为对象
// const element = (
//   <h1 className="greeting">
//     Hello, world!
//   </h1>
// );

// const element = React.createElement(
//   'h1',
//   {className: 'greeting'},
//   'Hello, world!'
// );

// Note: this structure is simplified
// const element = {
//   type: 'h1',
//   props: {
//     className: 'greeting',
//     children: 'Hello, world'
//   }
// };

