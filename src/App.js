import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {getAllPlayers, getOnePlayer} from './api';

import Players from './Players';
import Navigation from './Navigation';
import Player from './Player';
import CreateForm from './CreateForm';
import CreateCategory from './CreateCategory';
import EditForm from './EditForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import MyPlayers from './MyPlayers';

export default function App(){

    const routes = createBrowserRouter(
        [
            {
                path: "/",
                element: <Navigation />,
                children: [
                    {
                        path: "/login",
                        element: <LoginForm />,
                    },
                    {
                        path: "/register",
                        element: <RegisterForm />
                    },
                    {
                        path: "/players",
                        element: <Players />
                    },
                    {
                        path: "/players/my",
                        element: <MyPlayers />
                    },
                    {
                        path: "/players/:playerId/edit",
                        element: <EditForm />,
                    },
                    {
                        path: "/players/create",
                        element: <CreateForm />,
                    },
                    {
                        path: "/players/createcat",
                        element: <CreateCategory />,
                    },
                    {
                        path: "/players/category/:catId?",
                        element: <Players />,
                    },
                    {
                        path: "/players",
                        element: <Players />,
                        loader: getAllPlayers,
                    },
                    {
                        path: "/players/:playerId",
                        element: <Player />,
                        loader: async ( {params} ) => {
                            const boo = parseInt(params.playerId)
                            return getOnePlayer(boo)
                        }
                    }
                ]
            }
        ]
    );

    return (
        <div>
            <RouterProvider router={routes} />
        </div>
    );
}