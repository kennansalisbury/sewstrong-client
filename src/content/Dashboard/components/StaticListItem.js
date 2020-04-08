import React from 'react'

export const StaticListItem = props => {
    console.log('STATIC LIST ITEM PROPS', props.key, props )

    return (
        <div className="production__list-items">
            <p>{props.units}</p>
            <p>{props.type}</p>
            <p>{props.pledgeMade}</p>
            <p>{props.pledgeGoal}</p>
            <p>{props.complete}</p>
        </div>
    )
}