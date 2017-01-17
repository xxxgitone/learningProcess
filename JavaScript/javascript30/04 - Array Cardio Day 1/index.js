 // Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1

    // Some data we can work with

    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarstr枚m', year: 1829, passed: 1909 }
    ];

    const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

    // Array.prototype.filter()
    // filter() 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。
    // 语法 var new_arrary = arr.filter(callback[, thisArg])
    // callback
    // 用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
    // 返回true表示保留该元素（通过测试），false则不保留。
    // thisArg
    // 可选。执行 callback 时的用于 this 的值。
    // callback 被调用时传入三个参数：

    // 元素的值
    // 元素的索引
    // 被遍历的数组
    // 1. Filter the list of inventors for those who were born in the 1500's
    // const fiftenn = inventors.filter(function (inventor) {
    //   if (inventor.year >= 1500 && inventor.year <1600) {
    //     return true; //keep it
    //   }
    // })
    
    const fiftenn = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year <1600));
    console.table(fiftenn); //按表格形式输出 

    // Array.prototype.map()
    // map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
    // 语法array.map(callback[, thisArg])
    // callback
    // 原数组中的元素经过该方法后返回一个新的元素。
    // currentValue
    // callback 的第一个参数，数组中当前被传递的元素。
    // index
    // callback 的第二个参数，数组中当前被传递的元素的索引。
    // array
    // callback 的第三个参数，调用 map 方法的数组。
    // thisArg
    // 执行 callback 函数时 this 指向的对象。
    // 返回值：由回调函数的返回值组成的新数组。
    // 2. Give us an array of the inventors' first and last names
    const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
    console.log(fullNames);

    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
    // const ordered = inventors.sort(function (a, b) {
    //     if (a.year > b.year) {
    //         return 1;
    //     }else{
    //         return -1;
    //     }
    // });
    
    const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
    console.table(ordered);

    // Array.prototype.reduce()
    // reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。
    // 语法arr.reduce(callback,[initialValue])
    // callback
    // 执行数组中每个值的函数，包含四个参数
    // accumulator
    // 上一次调用回调返回的值，或者是提供的初始值（initialValue）
    // currentValue
    // 数组中正在处理的元素
    // currentIndex
    // 数据中正在处理的元素索引，如果没有提供initialValues，默认从0开始
    // array
    // 调用 reduce 的数组
    // initialValue
    // 作为第一次调用 callback 的第一个参数。
    // 返回值

    // 函数累计处理的结果
    // 4. How many years did all the inventors live?
    const totalYears = inventors.reduce((total, inventor) => {
        return total + (inventor.passed - inventor.year);
    }, 0);

    console.log(totalYears);

    // 5. Sort the inventors by years lived
    const oldest = inventors.sort(function (a, b) {
        const lastGuy = a.passed - a.year;
        const nextGuy = b.possed - b.year;
        return lastGuy > nextGuy ? -1 : 1;
    })

    console.table(oldest);


    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    // const category = document.querySelector('.mw-category');
    // const links = Array.from(category.querySelectorAll('a'));//转换为真正的数组，本身为NodeList
    // // const links = [...category.querySelectorAll('a')]//另外一种转换方式
    // const de = links
    //             .map(link => link.textContent)
    //             .filter(streetName => streetName.includes('de'))


    // 7. sort Exercise
    // Sort the people alphabetically by last name
    const alpha = people.sort(function (lastOne, nextOne) {
        const [ aLast, aFirst ] = lastOne.split(', ');
        const [ bLast, bFirst ] = nextOne.split(', ');
        return aLast > bLast ? 1 : -1;
    })

    console.log(alpha);

    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

    const transportation = data.reduce(function (obj, item) {
        if (!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;
        return obj; //obj为初始值为一个对象
    }, {
        // car:0
        // walk:0
        // truck:0
    })

    console.log(transportation);