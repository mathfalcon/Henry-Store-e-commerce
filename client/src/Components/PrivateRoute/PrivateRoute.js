import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedUser } from '../../Redux/actions/userActions';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {

//     const { userLogged } = useSelector(state => state.getLoggedUser);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getLoggedUser());
//     }, []);

// console.log('userLogged',userLogged);

const userLogged = 'user';

    return (
        <Route {...rest} render={props => {
            // const user = accountService.userValue;
            if (!userLogged) {
                // no hay un usuario loggeado, se redirige a la pagina de login
                return <Redirect to={{ pathname: '/user', state: { from: props.location } }} />
            }

            // verifica si la ruta esta restringida por el rol
            // (roles && roles.indexOf(user.role) === -1)
            if (roles !== 'admin') {
                // role no autorizado, se redirige al componente landing
                return <Redirect to={{ pathname: '/'}} />
            }

            // esta autorizado, retorna el componente junto con las props
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };