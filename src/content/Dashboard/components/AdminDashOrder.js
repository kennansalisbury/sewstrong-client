import React, {useState} from 'react';

export const AdminDashOrder = props => {

    const [orderStatus, setOrderStatus] = useState(props.currentStatus)
    const [orderStatusColor, setOrderStatusColor] = useState(props.status)
    const [showUpdateStatus, setShowUpdateStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    let style = {backgroundColor: orderStatusColor}

    const handleStatusSubmit = (e) => {
        e.preventDefault()

        let color = props.status

        if(orderStatus !== props.currentStatus) {

            let data;
            switch(orderStatus) {
                case 'Pending Accept':
                    data = {
                        accepted: false,
                        in_progress: false,
                        ready_for_delivery: false,
                        in_delivery: false,
                        completed: false,
                        cust_cancelled: false,
                        admin_cancelled: false
                    }
                    color = 'red'
                    break
                case 'Accepted':
                    data = {
                        accepted: true,
                        in_progress: false,
                        ready_for_delivery: false,
                        in_delivery: false,
                        completed: false,
                        cust_cancelled: false,
                        admin_cancelled: false
                    }
                    color = 'yellow'
                    break
                case 'In Progress':
                    data = {
                        in_progress: true,
                        ready_for_delivery: false,
                        in_delivery: false,
                        completed: false,
                        cust_cancelled: false,
                        admin_cancelled: false
                    }
                    color = 'yellow'
                    break
                case 'Ready for Delivery':
                    data = {
                        ready_for_delivery: true,
                        in_delivery: false,
                        completed: false,
                        cust_cancelled: false,
                        admin_cancelled: false
                    }
                    break   
                case 'In Delivery':
                    data = {
                        in_delivery: true,
                        completed: false,
                        cust_cancelled: false,
                        admin_cancelled: false
                    }
                    color = 'yellow'
                    break
                case 'Completed':
                    data = {
                        completed: true,
                        cust_cancelled: false,
                        admin_cancelled: false
                    }
                    color = 'green'
                    break
                case 'Cancelled':
                    data = {
                        admin_cancelled: true
                    }
                    color = 'red'
                    break
                default:
                    setErrorMessage('no valid order status selected')
                    return 
            }

            let token = localStorage.getItem('userToken')
            fetch(`${process.env.REACT_APP_SERVER_URL}/orders/${props.orderNo}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            })
            .then(response => {
                response.json()
                .then(result => {
                    if (response.ok) {
                        console.log('order status update', result)
                    } else {
                        setErrorMessage(`${result.message}`);
                    }
                })
            })
            .catch(err => {
                setErrorMessage(`Error connecting to server, please try again later.`)
            })
        }
        setShowUpdateStatus(false)
        setOrderStatusColor(color)
        props.setUpdateMade('orders updated')
    }

    let status = <button className='body-three cursor-pointer' onClick={() => setShowUpdateStatus(true)}>{orderStatus}</button>
    if(showUpdateStatus) {
        status = (
            <form onSubmit={handleStatusSubmit}>
                <select value={orderStatus} onChange={e => setOrderStatus(e.currentTarget.value)}> 
                    <option value='Pending Accept'>Pending Accept</option>
                    <option value='Accepted'>Accepted</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Ready for Delivery'>Ready for Delivery</option>
                    <option value='In Delivery'>In Delivery</option>
                    <option value='Completed'>Completed</option>
                    <option value='Cancelled'>Cancelled</option>
                </select>
                <input type="submit" value="✔"/>
            </form>
        )
    }

    return (
        <>
        <div className='dashboard__admin__item dashboard__admin__order'>
            <div className='body-three'>
                {props.orderNo}<br />
                {props.item}<br />
                {props.total}<br />
            </div>
            <div className='dashboard__admin__order__status__input'>
                <div className='body-three'>Order Status</div>
                {status}
            </div>
            <div className='body-three'>
                <div className={`dashboard__admin__order__status`} style={style}></div>
            </div>
        </div>
        <small>{errorMessage}</small>
        </>
    )
};