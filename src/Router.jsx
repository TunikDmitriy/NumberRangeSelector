import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Public from './scenes/Public/Public';
import NotFound from './scenes/NotFound/NotFound';

function Router() {
    return <BrowserRouter>
         <Switch>
             <Route exact path="/" component={Public} />
             <Route component={NotFound} />
         </Switch>
    </BrowserRouter>;
}

export default Router;