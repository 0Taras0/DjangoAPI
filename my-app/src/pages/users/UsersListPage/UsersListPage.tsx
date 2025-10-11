import type {IUserItem} from "../../../types/users/IUserItem.ts";
import {useGetUsersQuery} from "../../../services/userService.ts";
import UserListItem from "./UserListItem.tsx";
import LoadingScreen from "../../../components/loadings/LoadingScreen.tsx";

const UsersListPage = () => {
    const {data: users, isLoading} = useGetUsersQuery();

    const contentUsers = users?.map((user: IUserItem) => {
        return (
            <UserListItem key={user.id} user={user}/>
        );
    });

    return (
        <>
            {isLoading && < LoadingScreen />}
            <h1 className={"text-3xl font-bold text-center"}>Користувачі</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Full name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {contentUsers}

                    </tbody>
                </table>
            </div>
        </>
    )
}
export default UsersListPage;