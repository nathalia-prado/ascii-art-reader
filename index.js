import prompt from 'prompt'
import * as fsPromises from 'node:fs/promises'
import { read } from 'node:fs'

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
  choice.message = listOfOptions.map((element, index) => index + ' - ' + element)
  for (;;) {
    const input = await prompt.get(choice) 
    switch (input.choice) {
        case 'c': {
            const inputComment = await displayCommentOption()
            writeText('comment.txt', inputComment)
            break
        }
        case 'q': {
            console.log('See you soon')
            prompt.stop()
            return
        }        
        case 'v': {
            console.log('See your comments')
            const comments = await readText('comment.txt')
            console.log(comments)
            break
        }
        default: {
            const option = listOfOptions[input.choice]
            console.log(await  readText('./data/' + option))
            break
        }
    }
  }
}

async function displayCommentOption() {
    try {
      const comment = {
        name: 'comment',
        hidden: false,
        message: '\nType your comment',
      }
      const input = await prompt.get(comment)
      return input.comment
    } catch (e) {
        console.error(e.message)
    }
}

function welcomeMessage() {
    console.log('---------- Welcome ----------')  
}

function displayMessage() {
    console.log("Choose an artwork to display, or: \n  'c' to comment\n  'q' to quit \n  'v' to see your comments")  
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