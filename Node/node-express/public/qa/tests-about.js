//测试是否有个纸箱联系我们的链接
suite('"About" page test', function() {
    test('page should contain link contact page', function() {
        assert($('a[href="/contact"]').length);
    })
})