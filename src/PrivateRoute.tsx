import * as React from "react"
import { Navigate, Outlet, Route, RouteProps, useNavigate } from "react-router-dom"
import { useAppSelector } from "./redux/hooks"

export function PrivateRoute(props: RouteProps) {
    //check if user logged in
    const isLoggedIn = Boolean(localStorage.getItem('token'))

    // if (!isLoggedIn) {
    //     return <Navigate to="login" />
    // }
    return isLoggedIn ? <Outlet /> : <Navigate to="/login2" />;
}   