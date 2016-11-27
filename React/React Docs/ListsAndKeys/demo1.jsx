//原生javascript中定义数组和遍历
// const numbers = [1, 2, 3, 4, 5];
// const doubled = numbers.map((number) => number * 2);
// console.log(doubled);//[2, 4, 6, 8, 10]

//React中类似
// const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) =>
//   <li>{number}</li>
// );

// ReactDOM.render(
//   <ul>{listItems}</ul>,
//   document.getElementById('root')
// );
// 但这里会报一个警告，缺少key


// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) =>
//     <li key={number.toString()}>
//     	{number}
//     </li>
//   );
//   return (
//     <ul>{listItems}</ul>
//   );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//   <NumberList numbers={numbers} />,
//   document.getElementById('root')
// );


// key在React中用于识别身份

// const todoItems = todos.map((todo) =>
//   <li key={todo.id}>
//     {todo.text}
//   </li>
// );

// 使用索引作为key
// const todoItems = todos.map((todo, index) =>
//   // Only do this if items have no stable IDs
//   <li key={index}>
//     {todo.text}
//   </li>
// );

// 如果想引用的额外组件，应该把key设在组件上，而不是li上
// function ListItem(props) {
//   // Correct! There is no need to specify the key here:
//   // key不要设在这里
//   return <li>{props.value}</li>;
// }

// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) =>
//     // Correct! Key should be specified inside the array.
//     <ListItem key={number.toString()}
//               value={number} />
//   );
//   return (
//     <ul>
//       {listItems}
//     </ul>
//   );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//   <NumberList numbers={numbers} />,
//   document.getElementById('root')
// );

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);

























