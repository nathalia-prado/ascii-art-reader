import prompt from 'prompt'
import * as fsPromises from 'node:fs/promises'

prompt.message = ''
prompt.delimiter = ': '
prompt.start()

const choice = {
  name: 'choice',
  hidden: false
}

async function main() {
  welcomeMessage()
  displayMessage()
  // const listOfOptions = ['kea.txt', 'kiwi.txt', 'manaia.txt', 'nikau.txt', 'pohutukawa.txt']
  const listOfOptions = await listDir('./data')  
  choice.message = listOfOptions
  const result = await prompt.get(choice)
  const option = listOfOptions[result.choice]
  console.log(await  readText('./data/' + option))
}

function welcomeMessage() {
    console.log('---------- Welcome ----------')  
}

function displayMessage() {
    console.log('Make your choice')  
}

// read the file content
export function readText(pathToFile) {
    try {
        return fsPromises.readFile(pathToFile, 'utf-8')
    } catch(e) {
        console.error(e.message)
    }    
}

// list the directory content
export function listDir(path) {
    try {
        return fsPromises.readdir(path)
    } catch(e) {
        console.error(e.message)
    }
}

// write in a file
export function writeText(pathToFile, contentToWrite) {
    try {
        return fsPromises.writeFile(pathToFile, contentToWrite)
    } catch(e) {
        console.error(e.message)
    }
}

// run the async main function and catch any errors
main().catch(err => {
  // if an error was thrown, show it in the console
  console.error(err)
  // ... then set the exit code to any non-zero integer 
  process.exitCode = 1
})