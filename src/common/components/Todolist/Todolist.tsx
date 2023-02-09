import s from './Todolist.module.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Navigate } from 'react-router-dom'
import {PATH} from '../../../common/constants/path'
import { useEffect } from 'react'
import { getTasksTC } from '../../../BLL/reducers/TasksSlice'

export const Todolist = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(!id) return
        dispatch(getTasksTC(id))
    }, [])
    const isLoggedIn = useAppSelector(state => state.authData.isLoggedIn)
    const todos = useAppSelector(state => state.todoData.todos)
    if(!isLoggedIn) return <Navigate to={PATH.login}/>
    

    const currentTodo = todos.find(t => t.id === id)
    
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                {currentTodo?.title}
            </div>
        </div>
        )
}