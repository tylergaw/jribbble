var JRB = {};

JRB.prettyThisBitchUp = function ()
{
	SyntaxHighlighter.defaults['class-name'] = 'jribbble-example';
	SyntaxHighlighter.defaults['gutter'] = false;
	SyntaxHighlighter.all();
};

// I just use this while testing
JRB.logResponse = function (data)
{
	console.log(JSON.stringify(data));
};