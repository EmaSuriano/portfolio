import markdownLinkCheck from 'markdown-link-check';

markdownLinkCheck('[example](http://example.com)', function(err, results) {
  if (err) {
    console.error('Error', err);
    return;
  }
  results.forEach(function(result) {
    console.log('%s is %s', result.link, result.status);
  });
});
