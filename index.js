var types = require('@babel/types');

function toKebab(str) {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/\s+/g, '-')
		.toLowerCase();
}

function error(msg) {
	throw new Error("babel-plugin-qubic: " + msg);
}

module.exports = function() {
    return {
        visitor: {
	        ImportDeclaration: function (path) {
	        	if(path.node.source.value === "qubic-lib" || path.node.source.value === "qubic") {
			        var fullImports = path.node.specifiers.filter(function (specifier) { return specifier.type !== 'ImportSpecifier' });
			        var memberImports = path.node.specifiers.filter(function (specifier) { return specifier.type === 'ImportSpecifier' });
			        if(fullImports.length > 0) {
				        error(
				        	"Import entire module detected. Using this syntax means we cannot tree shake properly."
				        );
			        }
			        var importStatements = memberImports.map(function (memberImport) {
				        var importName = memberImport.imported.name;
				        return types.importDeclaration(
					        [memberImport],
					        types.stringLiteral(`qubic-lib/dist/export/${toKebab(importName)}`)
				        );
			        });
			        if (importStatements.length > 0) {
				        path.replaceWithMultiple(importStatements);
			        }
		        }
	        }
        }
    };
};
