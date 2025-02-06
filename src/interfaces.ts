
export default interface Message {
    systemMessage: string, 
    userMessage: (projectName: string, projectDescription: string, errorMessage?: string) => string,
} 