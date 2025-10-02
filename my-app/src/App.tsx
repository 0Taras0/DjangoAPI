import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import type {IUserItem} from "./types/users/IUserItem.ts";

function App() {
    const [users, setUsers] = useState<IUserItem[]>([]);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        try {
            const result = await axios<IUserItem[]>('http://127.0.0.1:4099/api/users/');
            setUsers(result.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const contentUsers = users.map((user: IUserItem) => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.last_name} {user.first_name}</td>
                <td>{user.email}</td>
            </tr>
        );
    });

    return (
        <>
            <h1>Привіт козаки!</h1>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Full name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {contentUsers}
                </tbody>
            </table>
        </>
    )
}

export default App
