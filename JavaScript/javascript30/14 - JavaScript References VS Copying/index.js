 //数组和对象复制
 // start with strings, numbers and booleans

    // Let's say we have an array
    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

    // and we want to make a copy of it.
    const team = players;
    console.log(team);

    // You might think we can just do something like this:
    // team[3] = 'Lux'; //这里改变team，原数组players也会随之改变

    // however what happens when we update that array?
    

    // now here is the problem!

    // oh no - we have edited the original array too!

    // Why? It's because that is an array reference, not an array copy. They both point to the same array!

    // So, how do we fix this? We take a copy instead!
    // slice() 方法将数组的一部分的浅拷贝, 返回到从开始到结束（结束不包括）选择的新数组对象。原始数组不是被改变
    const team2 = players.slice();

    // one day

    // or create a new array and concat the old one in
    const team3 = [].concat(players);

    // or use the new ES6 Spread
    const team4 = [...players];
    // 不会影响原数组
    team4[3] = 'heeeee';
    console.log(team4);
    
    const team5 = Array.from(players);

    // now when we update it, the original one isn't changed

    // The same thing goes for objects, let's say we have a person object

    // with Objects
    const person = {
        name: 'Wes Bos',
        age: 80
    }

    // and think we make a copy:
    // 会影响原对象
    const captain = person;
    captain.number = 90;

    // how do we take a copy instead?
    // 不会影响源对象
    const cap2 = Object.assign({}, person, { number:99 });
    console.log(cap2);

    // We will hopefully soon see the object ...spread
    
    // const cap3 = {...person};
    
    // Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
    
    const wes = {
        name: 'wes',
        age: 100,
        social: {
            twiller: '@wesbos',
            facebook: 'wesbos'
        }
    }

    console.clear();
    console.log(wes);

    const dev = Object.assign({}, wes);
    dev.age = 99;//这里的修改不会影响源对象
    dev.social.twiller = '@cool';//这里会对原对象影响
    
    // 解决的方法
    const dev2 = JSON.parse(JSON.stringify(wes));
    dev.social.twiller = '@hhh';//不会影响

