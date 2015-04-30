console.log('Arbitrary console logging');
// Let's test this function
function isEven(val) {
    return val % 2 === 0;
}
test('isEven()', function() {
    ok(!isEven(0), 'Zero is an even number');
    ok(isEven(2), 'So is two');
    ok(isEven(-4), 'So is negative four');
    ok(!isEven(1), 'One is not an even number');
    ok(!isEven(-7), 'Neither is negative seven');
});
// Let's test this function
function multiply(a, b) {
    return a * b;
}
test('multiply()', function() {
    ok(multiply(0, 1) === 0, 'Zero times one is zero');
    ok(multiply(2, 2) === 4, 'Two times two is four');
    ok(multiply(1, 3) === 3, 'One times three is three');
    ok(multiply(10, 5) === 50, 'Five times ten is fifty');
    ok(multiply(10, 10) === 100, 'Ten times ten is one hundred');
});
