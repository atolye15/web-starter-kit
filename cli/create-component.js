const fs = require('fs');
const shell = require('shelljs');

(() => {
  // create-component component-name
  const componentName = process.argv[2];
  const componentsFolder = `${__dirname}/../app/src/scss/components`;

  console.log(`
    Component Name: ${componentName},
    Component Folder: ${componentsFolder}
  `);

  const componentNameCapital = name => {
    if (typeof name !== 'string') {
      return null;
    }
    return name
      .split('-')
      .map(x => x.charAt(0).toUpperCase() + x.slice(1))
      .join('');
  };

  const componentFolder = `${componentsFolder}/c-${componentName}`;
  if (fs.existsSync(componentFolder)) {
    console.log('Component already exists');
  } else {
    shell.mkdir('-p', componentFolder);
    if (!fs.existsSync(componentFolder)) {
      console.log('Component folder could not created.');
      return;
    }

    const scssFile = `_c-${componentName}.scss`;
    const twigFile = `c-${componentName}.twig`;
    const styleguideFile = `c-${componentName}.styleguide.twig`;

    shell.touch(`${componentFolder}/${scssFile}`);

    if (!fs.existsSync(`${componentFolder}/${scssFile}`)) {
      console.log('Component scss file could not created.');
      return;
    }

    // Scss Template
    const scssTemplate = `//\n// ${componentNameCapital(
      componentName,
    )}\n//\n// Markup: ${styleguideFile}\n//\n// Styleguide Component.${componentNameCapital(
      componentName,
    )}\n//\n\n.c-${componentName} {\n  \n}\n`;

    fs.writeFileSync(`${componentFolder}/${scssFile}`, scssTemplate);

    // Twig File
    shell.touch(`${componentFolder}/${twigFile}`);

    // StyleguideTemplate
    shell.touch(`${componentFolder}/${styleguideFile}`);

    if (!fs.existsSync(`${componentFolder}/${styleguideFile}`)) {
      console.log('Component styleguide template file could not created.');
      return;
    }

    const styleguideTemplate = `{% include "${twigFile}" with {} only %}`;
    fs.writeFileSync(`${componentFolder}/${styleguideFile}`, styleguideTemplate);
  }
})();
