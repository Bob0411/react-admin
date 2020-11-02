import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import AuthView from './components/AuthView';
import { Spin, Space } from 'antd';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { syncAdminInfo } from './store/actions/AdminAction';
import { AdminState } from './store/states/AdminState';
import { getPermissionList } from './store/actions/PermissionAction';
interface IAppState {
  loading: boolean,
  token: string | null
}
interface IProps extends AdminState {
  getAdminInfo: () => void
  getPermissionList: () => void

}
class App extends Component<IProps, IAppState> {
  state: IAppState = {
    loading: true,
    token: null
  }
  componentDidMount() {
    this.props.getAdminInfo()
    this.props.getPermissionList()
  }
  render() {
    if (this.props.loading) {
      return (
        <>
          <Space size="large">
            <Spin size="large" />
          </Space>
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

interface IStoreState {
  admin: AdminState
}

const mapStateToProps = (state: IStoreState): AdminState => {
  // console.log(state.admin)
  return { ...state.admin };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAdminInfo: () => {
    syncAdminInfo(dispatch)
  },
  getPermissionList: () => {
    getPermissionList(dispatch)
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
