import React, { useEffect, useState } from 'react'
import { createUserRequest, deleteUserRequest, getUsersRequest } from '../../services/usersServices';
import Layout from '../Common/Layout';
import ErrorModal from '../Common/ErrorModal';
import User from './User';
import UsersModal from './UsersModal';
import "../../styles/Users.css";

const Users = () => {
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState(0);
    const [selectedSex, setSelectedSex] = useState("");
    const [selectedSexId, setSelectedSexId] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("0");
    const [selectedStatusId, setSelectedStatusId] = useState(0);
    const [createEnabled, setCreateEnabled] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);

    useEffect(() => {
        getUsersRequest()
            .then(usrs => setUsers(usrs));
    }, []);

    useEffect(() => isEmpty(), [fullName, birthDate, login, password]);

    useEffect(() => {
        const roles = ["Староста", "Студент"];
        setSelectedRole(roles[selectedRoleId]);
    }, [selectedRoleId]);

    useEffect(() => {
        const sexes = ["Мужской", "Женский"];
        setSelectedSex(sexes[selectedSexId]);
    }, [selectedSexId]);

    useEffect(() => {
        if (selectedSex) {
            if (selectedSex == "Мужской") {
                const maleStatuses = ["Не женат", "Женат"];
                setSelectedSex(maleStatuses[selectedStatusId]);
            }
            else {
                const femaleStatuses = ["Не замужем", "замужем"];
                setSelectedSex(femaleStatuses[selectedStatusId]);
            }
        }
    }, [selectedStatusId]);

    const isEmpty = () => {
        if (!fullName.trim() || !birthDate.trim() || !login.trim() || !password.trim()) {
            return setCreateEnabled(true);
        }

        return setCreateEnabled(false);
    }

    const createUserHandler = () => {
        const tempSex = selectedSexId == 0 ? "м" : "ж";

        const user = { role: selectedRole, fullName, birthDate, login, password, sex: tempSex, married: selectedStatusId };

        const error = users.some(usr => usr.login === login);

        if (error) {
            setLogin("");
            setPassword("");
            return setOpenErrorModal(true);
        }

        return createUserRequest(user)
            .then(() => {
                clearInputs();
                getUsersRequest()
                    .then(usrs => setUsers(usrs));
            })
            .catch(e => console.log(e));
    }

    const deleteUserHandler = () => {
        const userId = selectedUser.id;

        return deleteUserRequest(userId)
            .then(() => {
                setSelectedUser(null);
                getUsersRequest()
                    .then(usrs => setUsers(usrs));
            })
            .catch(e => { throw e });
    }

    const clearInputs = () => {
        setFullName("");
        setBirthDate("");
        setLogin("");
        setPassword("");
    }

    return (
        <Layout>
            {
                openEditModal ? <UsersModal setOpenEditModal={setOpenEditModal} 
                                            user={selectedUser}
                                            setUsers={setUsers}
                                            setSelectedUser={setSelectedUser}
                                /> : null 
            }
            { 
                openErrorModal ? <ErrorModal errorText="Пользователь с таким логином уже существует!"
                                             setOpenErrorModal={setOpenErrorModal}
                                /> : null 
            }
            <div className="users_component">
                <div className="left_side">
                    <h1>Пользователи</h1>
                    <div className="users">
                        <div className="fields">
                            <div className="field_role">Роль</div>
                            <div className="field_fio">ФИО</div>
                            <div className="field_birth_date">Дата рождения</div>
                            <div className="field_login">Логин</div>
                            <div className="field_password">Пароль</div>
                            <div className="field_sex">Пол</div>
                            <div className="field_married">Статус</div>
                        </div>
                        <div className="list">
                            { 
                                users.sort((a, b) => a.id - b.id)
                                     .map(user => 
                                    <User user={user}
                                          selectedUser={selectedUser}
                                          setSelectedUser={setSelectedUser}
                                          key={user.id}
                                    />)
                            }
                        </div>
                    </div>
                </div>
                <div className="right_side">
                    <h1>Добавить пользователя</h1>
                    <select className="selector" onChange={e => setSelectedRoleId(e.target.value)}>
                        <option value={0} selected> Староста </option>
                        <option value={1}> Студент </option>
                    </select>
                    <input onChange={e => setFullName(e.target.value)} 
                        value={fullName}
                        className="full_name" 
                        placeholder="ФИО"
                    />
                    <input onChange={e => setBirthDate(e.target.value)} 
                        value={birthDate}
                        className="birth_date" 
                        placeholder="Дата рождения"
                    />
                    <input onChange={e => setLogin(e.target.value)} 
                        value={login}
                        className="login" 
                        placeholder="Логин"
                    />
                    <input onChange={e => setPassword(e.target.value)} 
                        value={password}
                        className="password" 
                        placeholder="Пароль"
                    />
                    <select className="selector" onChange={e => setSelectedSexId(e.target.value)}>
                        <option value={0} selected> Мужской </option>
                        <option value={1}> Женский </option>
                    </select>
                    <select className="selector" onChange={e => setSelectedSexId(e.target.value)}>
                        <option value={0} selected> Не женат / не замужем </option>
                        <option value={1}> Женат / замужем </option>
                    </select>
                    <button onClick={createUserHandler} 
                            disabled={createEnabled} 
                            className="add_user"
                    >
                        Добавить пользователя
                    </button>
                    <button onClick={() => setOpenEditModal(true)} 
                            disabled={selectedUser === null ? true : false} 
                            className="edit_user"
                    >
                        Редактировать пользователя
                    </button>
                    <button onClick={deleteUserHandler} 
                            disabled={selectedUser === null ? true : false} 
                            className="remove_user"
                    >
                        Удалить пользователя
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Users;