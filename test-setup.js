const fs = require('fs');
const path = require('path');

const projectName = 'test';
const projectStructure = {
    'index.ts': '// Entry point of the application\nconsole.log("Hello, World!");',
    'openapi.yaml': 'openapi: 3.0.0\ninfo:\n  title: Test API\n  version: 1.0.0\npaths:\n  /:\n    get:\n      summary: Retrieve root\n      responses:\n        "200":\n          description: Successful response\n'
};

const createProjectStructure = (basePath, structure) => {
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
    }
    
    Object.keys(structure).forEach(file => {
        const filePath = path.join(basePath, file);
        fs.writeFileSync(filePath, structure[file]);
    });
};

createProjectStructure(projectName, projectStructure);