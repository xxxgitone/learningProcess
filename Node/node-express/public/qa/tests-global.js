//确保页面具有有效标题
suite('Global tests', function() {
    test('page has valid title', function() {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO');
    });
})