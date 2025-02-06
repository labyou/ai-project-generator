import Message from './interfaces'

export const messages: { [key: string]: Message } = {
    createStructureToConfirm: {
        systemMessage: 'You are helping to generate a directory structure for a project based on user input.',
        userMessage: (projectName: string, projectDescription: string) => `Generate a list of directories and files for a project named "${projectName}".
            The project description is: ${projectDescription}.
            Only provide the directory and file paths, no extra explanation or visual formatting.`,
    }, 
    createNodeJSScript: {
        systemMessage: 'You are helping to generate a Node.js script to create a project structure based on structure input',
        userMessage: (projectName: string, directoryDescription: string) => `Generate a Node.js script to create the following project structure for a project named "${projectName}":
            Use this directory structure: ${directoryDescription}.
            The script should create directories and files in the given structure, fill the files with appropriate content, content should match file type and return the script. Only the code, no explanation or visual symbols, no markup.`,
    }, 
    fixNodeJSScript: {
        systemMessage: 'You are helping to fix a Node.js script to create a project structure based on structure input',
        userMessage: (projectName: string, script: string, errorMessage?: string) => `Fix a Node.js script to create the following project structure for a project named "${projectName}":
            Currently using this script: ${script}.
            Error message after run: ${errorMessage}
            The script should create directories and files in the given structure, fill the files with appropriate content, content should match file type and return the script. Only the code, no explanation or visual symbols, no markup.`,
    }
}

