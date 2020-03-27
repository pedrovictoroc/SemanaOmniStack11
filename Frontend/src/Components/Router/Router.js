import React from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Logon from '../Logon/Logon'
import Register from '../Register/Register'

export default function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Logon}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </BrowserRouter>
    )
}