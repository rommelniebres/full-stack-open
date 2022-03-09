// In new applications you should absolutely use the hook-api, but knowing how to use connect is useful when maintaining older projects using redux.
// using connect
import { connect } from 'react-redux'

const Notifications = (props) => {  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hide = {
    display: 'none'
  }

  return (
    <div style={ props.notification ? style : hide }>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification : state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notifications)
export default ConnectedNotification

// using hook-apo
// import { useSelector } from 'react-redux'

// const Notification = () => {
//   const notification = useSelector(state => state.notifications)
//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1
//   }
//   const hide = {
//     display: 'none'
//   }
  
//   return (
//     <div style={ notification ? style : hide }>
//       {notification}
//     </div>
//   )
// }

// export default Notification