import { createProjectStructure, createStructureScript, fixStructureScript } from './ai';
import readlineSync from 'readline-sync';
import { exec } from 'child_process';
import * as fs from 'fs';

function getProjectDescription() {
  const description = readlineSync.question('Enter the project structure description (e.g., "index.ts and openapi.yaml file in root folder"): ');
  return description || 'index.ts and openapi.yaml file in root folder';
}

async function confirmStructure(projectName: string, generatedStructure: string): Promise<string> {
  console.log('Generated structure script:\n');
  console.log(generatedStructure);

  const isConfirmed = readlineSync.keyInYNStrict('Does this structure look good? Press Y for Yes, N for No: ');

  if (isConfirmed) {
    return generatedStructure;
  } else {
    const newDescription = readlineSync.question('Please provide your changes or additional requirements: ');
    const updatedStructure = await createStructureScript(projectName, newDescription);
    return confirmStructure(projectName, updatedStructure);
  }
}

async function runRedocly() {
  return new Promise((resolve, reject) => {
    exec('npx @redocly/realm develop', (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing npx command: ${stderr || error}`);
      }
      resolve(stdout);
    });
  });
}

async function executeScript(scriptContent: string, projectName: string, projectDescription: string): Promise<void> {
  let scriptExecutionSuccessful = false;
  let errorMessage = '';

  while (!scriptExecutionSuccessful) {
    try {
      const scriptFilePath = `./${projectName}-setup.js`;
      fs.writeFileSync(scriptFilePath, scriptContent);

      exec(`node ${scriptFilePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${stderr}`);
          errorMessage = stderr || error.message;
          throw new Error(errorMessage);
        } else {
          console.log(`Project structure created successfully:\n${stdout}`);
          scriptExecutionSuccessful = true;
        }
      });

      const output = await runRedocly();
      console.log('Redocly output:', output);
    } catch (error) {
      console.error('Error during script execution:', error);
  
      const fixedScript = await fixStructureScript(projectName, projectDescription, errorMessage);
      scriptContent = fixedScript
    }
  }
}

async function main() {
  const projectName = readlineSync.question('Please enter the project name: ');
  const projectDescription = getProjectDescription();

  try {
    let generatedStructure = await createProjectStructure(projectName, projectDescription);
    generatedStructure = await confirmStructure(projectName, generatedStructure);

    let generatedScript = await createStructureScript(projectName, generatedStructure)
    console.log('Structure confirmed, proceeding with project creation.');

    await executeScript(generatedScript, projectName, projectDescription);
  } catch (error) {
    console.error('Error during execution:', error);
    console.log('Retrying...');
    await main();
  }
}

main();
