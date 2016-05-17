'use strict';

const raml2html = require('raml2html');
const ramlParser = require('raml-parser');
const fs = require('fs');
const customTemplate = raml2html.getDefaultConfig('templates/main.nunjucks', __dirname);

// need validate set to false to ommit raml 1.0 validation
ramlParser.loadFile(process.argv[2], {validate: false})
.then((result) => {
    raml2html.render(result, customTemplate)
    .then((html) => {
        fs.writeFileSync('dist/index.html', html, 'utf8');
    }, function(error) {
      console.warn("Couldn't render html", error);
      process.exit(1);
    });

});
