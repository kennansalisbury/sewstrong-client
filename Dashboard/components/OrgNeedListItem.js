import React from 'react'

export const OrgNeedListItem = props => {
    return (
        <div className="orgneed__list_item">
            <p className='body-three'>{props.organization}: {props.demand} {props.product}s</p>
        </div>
    )
}