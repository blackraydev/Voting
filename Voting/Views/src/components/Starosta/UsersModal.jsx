import React, { useEffect, useState } from 'react';
import { editUserRequest, getUsersRequest } from '../../services/usersServices';
import "../../styles/UsersModal.css";

const UsersModal = ({ setOpenEditModal, user, setUsers, setSelectedUser }) => {
    const [role, setRole] = useState(user.role);
    const [fullName, setFullName] = useState(user.fullName);
    const [birthDate, setBirthDate] = useState(user.birthDate);
    const [login, setLogin] = useState(user.login);
    const [password, setPassword] = useState(user.password);
    const [sex, setSex] = useState(user.sex);
    const [selectedRoleId, setSelectedRoleId] = useState(0);
    const [selectedSexId, setSelectedSexId] = useState(0);
    const [selectedStatusId, setSelectedStatusId] = useState(user.married);
    const [editEnabled, setEditEnabled] = useState(false);

    useEffect(() => isEmpty(), [role, fullName, birthDate, login, password]);

    const isEmpty = () => {
        if (!role.trim() || !fullName.trim() || !birthDate.trim() || !login.trim() || !password.trim()) {
            return setEditEnabled(true);
        }

        return setEditEnabled(false);
    }

    useEffect(() => {
        if (role == "Староста") setSelectedRoleId(0);
        if (role == "Студент") setSelectedRoleId(1);

        if (sex == "м") setSelectedSexId(0);
        if (sex == "ж") setSelectedSexId(1);
    }, []);

    useEffect(() => {
        const roles = ["Староста", "Студент"];
        setRole(roles[selectedRoleId]);
    }, [selectedRoleId]);

    const editUserHandler = () => {
        const tempSex = selectedSexId == 0 ? "м" : "ж";
        const editedUser = { ...user, role, fullName, birthDate, login, password, sex: tempSex, married: selectedStatusId };

        console.log(editedUser);

        return editUserRequest(editedUser)
            .then(() => {
                getUsersRequest()
                    .then(usrs => {
                        setUsers(usrs);
                        setOpenEditModal(false);
                        setSelectedUser(null);
                    });
            })
            .catch(e => console.log(e))
    }

    return(
        <div className="modal_users">
            <div className="window">
                <div className="inputs">
                    <div className="input_holder">
                        <label>Роль</label>
                        <select className="selector" onChange={e => setSelectedRoleId(e.target.value)}>
                            <option value={0} selected={selectedRoleId == 0}> Староста </option>
                            <option value={1} selected={selectedRoleId == 1}> Студент </option>
                        </select>
                    </div>
                    <div className="input_holder">
                        <label>ФИО</label>
                        <input value={fullName} 
                            onChange={e => setFullName(e.target.value)} 
                            placeholder="ФИО" 
                        />
                    </div>
                    <div className="input_holder">
                        <label>Дата рождения</label>
                        <input value={birthDate} 
                            onChange={e => setBirthDate(e.target.value)} 
                            placeholder="Дата рождения" 
                        />
                    </div>
                    <div className="input_holder">
                        <label>Логин</label>
                        <input value={login} 
                            onChange={e => setLogin(e.target.value)} 
                            placeholder="Логин" 
                        />
                    </div>
                    <div className="input_holder">
                        <label>Пароль</label>
                        <input value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            placeholder="Пароль" 
                        />
                    </div>
                    <div className="input_holder">
                        <label>Пол</label>
                        <select className="selector" onChange={e => setSelectedSexId(e.target.value)}>
                            <option value={0} selected={selectedSexId == 0}> Мужской </option>
                            <option value={1} selected={selectedSexId == 1}> Женский </option>
                        </select>
                    </div>
                    <div className="input_holder">
                        <label>Статус</label>
                        <select className="selector" onChange={e => setSelectedStatusId(e.target.value)}>
                            <option value={0} selected={selectedStatusId == 0}> Не женат / Не замужем </option>
                            <option value={1} selected={selectedStatusId == 1}> Женат / замужем </option>
                        </select>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={editUserHandler} 
                            className="edit_user" 
                            disabled={editEnabled}
                    >
                        Редактировать пользователя
                    </button>
                    <button onClick={() => setOpenEditModal(false)} 
                            className="cancel"
                    >
                        Отменить
                    </button>
                </div>
            </div>
            <div className="overlay"/>
        </div>
    )
}

export default UsersModal;