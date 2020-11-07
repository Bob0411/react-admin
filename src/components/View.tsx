import React, {Component} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {authRoutes, unAuthRouters} from '../router'
import AdminLayout from './AdminLayout'

class View extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path={'/'} exact>
                            <Redirect to={'/admin/dashboard'}/>
                        </Route>
                        <Route path={'/admin'}>
                            <Switch>
                                <AdminLayout>
                                    {
                                        authRoutes.map((route) => {
                                            if (route.routes) {
                                                return (
                                                    <div key={route.id}>
                                                        {
                                                            route.routes.map((r) => (
                                                                <Route path={r.path} exact={r.exact} key={r.id}>
                                                                    {r.component}
                                                                </Route>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                            return (
                                                <Route path={route.path} exact={route.exact} key={route.id}>
                                                    {
                                                        route.redirect ?
                                                            <Redirect to={route.redirect} from={route.path}/>
                                                            :
                                                            route.component
                                                    }
                                                </Route>
                                            )
                                        })
                                    }
                                </AdminLayout>
                            </Switch>
                        </Route>
                        {
                            unAuthRouters.map((route) => (
                                <Route path={route.path} key={route.id}>
                                    {
                                        route.component
                                    }
                                </Route>
                            ))
                        }
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default View