 const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

    function makeGreen() {
      const p = document.querySelector('p');
      p.style.color = '#BADA55';
      p.style.fontSize = '50px';
    }

    // Regular
    console.log('hello');

    // Interpolated
    console.log('hello I am a %s string!', 'man');
    
    // Styled
    // console.log('%c I am some great text','font-size:50px;background-color:blue')

    // warning!
    console.warn('OH NOOO');
    // Error :|
    console.error('Shit!');
    // Info
    console.info('Crocodiles eat 3-4 people per year');
    
    // Testing
    const p = document.querySelector('p');
    console.assert(p.classList.contains('ouch'), 'That is wrong');
    // clearing
    console.clear();
    // Viewing DOM Elements
    console.log(p);
    console.dir(p);
    console.clear();

    // Grouping together
    dogs.forEach(dog => {
        console.group(`${dog.name}`);
        console.log(`This is ${dog.name}`);
        console.log(`${dog.name} is ${dog.age} year old`);
        console.log(`${dog.name} is ${dog.age * 7} year old`);
        console.groupEnd(`${dog.name}`);

    })

    // counting
    console.count('wes');
    console.count('wes');
    console.count('Steve');
    console.count('wes');
    console.count('Steve');

    // timing
    console.time('fetching data');
    fetch('https://api.github.com/users/xxxgitone')
        .then(data => data.json())
        .then(data => {
            console.timeEnd('fetching data');
            console.log(data)
        });

    console.table(dogs);