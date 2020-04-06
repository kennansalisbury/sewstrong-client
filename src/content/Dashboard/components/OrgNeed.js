import React, {useState, useEffect} from 'react'
import {OrgNeedListItem} from '.'

export const OrgNeed = props => {
    
    let [orgDemand, setOrgDemand] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('userToken');
        fetch(`${process.env.REACT_APP_SERVER_URL}/orders/demand`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        })
        .then(response => {
            response.json()
            .then(results => {
                if (response.ok) {
                    console.log('orgDemand', results)
                    setOrgDemand(results);
                } else {
                    console.log(results.message);
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    let demandList = orgDemand.map(o => <OrgNeedListItem organization={o.organization} demand={o.demand} product={o.product}/> )
    
    return (
        <div className='dashboard__org-need'>
            <h1>Current Need</h1>
            {demandList}
        </div>
    )
}