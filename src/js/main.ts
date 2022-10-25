
const init = () => {
  console.log('hello from init')
}

init()
postMessage({ payload: 'removeLoading' }, '*')

