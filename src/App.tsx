import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import AuthView from './components/AuthView';
import { get } from './utils/storage';
interface IAppState {
  loading: boolean,
  token: string | null
}
class App extends Component<any, IAppState> {
  state: IAppState = {
    loading: true,
    token: null
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        token: get('token')
      })
    }, 500)
  }
  render() {
    if (this.state.loading) {
      return (
        <>
          loading
        </>
      )
    }
    return (
      <div>
        <AuthView />
      </div>
    )
  }
}

export default App;
