#!/usr/bin/env node

/**
 * Atolye15 Web Starter Kit Command Line Tools
 *
 * Usage:
 *  yarn create-component component-name
 *
 * Description:
 *  Creates a component includes template, styleguide-template and scss file.
 *  CSS Class: c-component-name
 *  SCSS Name: _c-component-name.scss
 *  Template Name: c-component-name.twig
 *  Styleguide Template Name: c-component-name-styleguide.twig
 *  Styleguide Section Name: ComponentName
 */

/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const shell = require('shelljs');

const componentNameCapital = (name, glue = '') => {
  if (typeof name !== 'string') {
    return null;
  }
  return name
    .split('-')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(glue);
};

(() => {
  const componentName = process.argv[2];
  const componentsFolder = `${__dirname}/../src/scss/components`;

  const componentFolder = `${componentsFolder}/c-${componentName}`;
  const scssFile = `_c-${componentName}.scss`;
  const twigFile = `c-${componentName}.twig`;
  const styleguideFile = `c-${componentName}-styleguide.twig`;

  console.log(`
    Creating component
    --------------------------------------------------------
    Component Name: c-${componentName}
    Styleguide Section: ${componentNameCapital(componentName)}
  `);

  if (fs.existsSync(componentFolder)) {
    console.error('Component already exists');
  } else {
    shell.mkdir('-p', componentFolder);
    if (!fs.existsSync(componentFolder)) {
      console.error('Component folder could not created.');
      return;
    }

    shell.touch(`${componentFolder}/${scssFile}`);

    if (!fs.existsSync(`${componentFolder}/${scssFile}`)) {
      console.error('Component scss file could not created.');
      return;
    }

    // Scss Template
    const scssTemplate = `//\n// ${componentNameCapital(
      componentName,
      ' ',
    )}\n//\n// Markup: ${styleguideFile}\n//\n// Styleguide Components.${componentNameCapital(
      componentName,
    )}\n//\n\n.c-${componentName} {\n  // Do your stuff\n}\n`;

    fs.writeFileSync(`${componentFolder}/${scssFile}`, scssTemplate);

    // Twig File
    shell.touch(`${componentFolder}/${twigFile}`);

    // StyleguideTemplate
    shell.touch(`${componentFolder}/${styleguideFile}`);

    if (!fs.existsSync(`${componentFolder}/${styleguideFile}`)) {
      console.error('Component styleguide template file could not created.');
      return;
    }

    const styleguideTemplate = `{% include "${twigFile}" with {} only %}`;
    fs.writeFileSync(`${componentFolder}/${styleguideFile}`, styleguideTemplate);
  }
})();
