import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hide = {
    display: 'none'
  }
  
  return (
    <div style={ notification ? style : hide }>
      {notification}
    </div>
  )
}

export default Notification