const init = () => {
  console.log('Hello from main.ts')
}

init()
postMessage({ payload: 'removeLoading' }, '*')

console.log('hallo jenne');