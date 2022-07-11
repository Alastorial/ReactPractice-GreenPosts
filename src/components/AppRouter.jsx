import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    // эта проверка нужна для того, чтобы нас не перекидывало на страницу
    // с постами, если мы уже на странице какого-либо поста
    // в App.js isLoading по умолчанию true, когда мы получаем данные о том,
    // авторизирован ли пользователь - isLoading = false и начинают строиться машруты.

    // это нужно из-за того, что в начале isAuth = false и сначала нас редиректит
    // на страницу авторизации. потом мы получаем, что isAuth = true (если авторизованы) и нас редиректит на
    // страницу с постами, то есть мы уже не на странице определенного поста
    if (isLoading)
        return <Loader/>
    return (
        isAuth
        ?
            <Switch>

                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                {/*<Route path="/about">*/}
                {/*    <About/>*/}
                {/*</Route>*/}
                {/*<Route exact path="/posts">*/}
                {/*    <Posts/>*/}
                {/*</Route>*/}
                {/*/!* двоеточие означает, что после идет параметр. еще нужно добавить пропс exact, чтобы роутер думал, что это разные пути*!/*/}
                {/*<Route exact path="/posts/:id">*/}
                {/*    <PostIdPage/>*/}
                {/*</Route>*/}
                <Redirect to="/posts"/>
            </Switch>
        :
            <Switch>
                {publicRoutes.map(route =>
                        <Route
                            component={route.component}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                    )}
                <Redirect to="/login"/>
            </Switch>
    );
};

export default AppRouter;