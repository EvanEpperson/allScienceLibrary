class App extends React.Component {
  state = {
    name: '',
    author: '',
    fiction: '',
    image:'',
    description:'',
    isCheckedOut: false
  }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
