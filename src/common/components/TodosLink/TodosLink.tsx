import { isOpenAddTodoModalAC } from '../../../BLL/reducers/AppSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Link } from '../Link/Link'

import s from './TodosLink.module.scss'

export const TodosLink = () => {
  const dispatch = useAppDispatch()
  const openModalHandler = () => {
    dispatch(isOpenAddTodoModalAC(true))
  }
  const todos = useAppSelector(state => state.todoData.todos)
  const todosLink = todos.map((t, i) => {
    return <Link key={t.id} title={t.title} todolistId={t.id} />
  })

  return (
    <div className={s.container}>
      <div className={s.boardCount}>All Todolist ({todos.length})</div>
      {todosLink}
      <div onClick={openModalHandler} className={s.addBoardTitle}>
        + Create New To-do List
      </div>
    </div>
  )
}
