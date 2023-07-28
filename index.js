import prompt from 'prompt'
import * as fsPromises from 'node:fs/promises'

prompt.message = ''
prompt.delimiter = ': '
prompt.start()

const choice = {
  name: 'choice',
  hidden: false,
  message: 'Make your choice'
}

async function main() {
  // const listOfOptions = ['kea.txt', 'kiwi.txt', 'manaia.txt', 'nikau.txt', 'pohutukawa.txt']
  const listOfOptions = await fsPromises.readdir('./data')  
  choice.message = listOfOptions
  const result = await prompt.get(choice)
  const option = listOfOptions[result.choice]
  console.log('Welcome ' + option)
  console.log(await  fsPromises.readFile('./data/' + option, 'utf-8'))
  // do something with `result`
}

// run the async main function and catch any errors
main().catch(err => {
  // if an error was thrown, show it in the console
  console.error(err)
  // ... then set the exit code to any non-zero integer 
  process.exitCode = 1
})