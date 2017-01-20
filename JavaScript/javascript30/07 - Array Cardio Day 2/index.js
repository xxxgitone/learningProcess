 // ## Array Cardio Day 2

    const people = [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 }
    ];

    const comments = [
      { text: 'Love this!', id: 523423 },
      { text: 'Super good', id: 823423 },
      { text: 'You are the best', id: 2039842 },
      { text: 'Ramen is my fav food ever', id: 123523 },
      { text: 'Nice Nice Nice!', id: 542328 }
    ];

    // Some and Every Checks
    // some() 方法测试数组中的某些元素是否通过了指定函数的测试。
    // 语法arr.some(callback[, thisArg])
    // callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
    // 对数组中的每个元素都执行一次指定的函数（callback），直到此函数返回 true，如果发现这个元素，some 将返回 true，如果回调函数对每个元素执行后都返回 false ，some 将返回 false。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略。
    // Array.prototype.some() // is at least one person 19 or older?
    // const isAdult = people.some(function (person) {
    //   const currentYear = (new Date()).getFullYear();
    //   if (currentYear - person.year >= 19) {
    //     return true;
    //   }
    // })

    const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);



    console.log(isAdult);//true
    
    // 对数组中的每个元素都执行一次指定的函数（callback），直到此函数返回 false，如果发现这个元素，every 将返回 false，如果回调函数对每个元素执行后都返回 true ，every 将返回 true。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略
    // Array.prototype.every() // is everyone 19 or older?
    const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
    console.log({allAdults});//false,可以已对象的形式输出

    // Array.prototype.find()
    // Find is like filter, but instead returns just the one you are looking for
    // find the comment with the ID of 823423
    // const comment = comments.find(function (comment) {
    //   if(comment.id === 823423){
    //     return true;
    //   }
    // })
  
    // const comment = comments.find(function (comment) {
    //   if(comment.id === 823423){
    //     return true;
    //   }
    // })

    const comment = comments.find(comment => comment.id === 823423)


    console.log(comment);//Object {text: "Super good", id: 823423}


    // Array.prototype.findIndex()
    // Find the comment with this ID
    // delete the comment with the ID of 823423
    const index = comments.findIndex(comment => comment.id === 823423);

    console.log(index);

    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];

    console.table(newComments);