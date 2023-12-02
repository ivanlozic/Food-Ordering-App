import React from 'react'
import classes from './MenuItem.module.css'
import { v4 as uuidv4 } from 'uuid'

const MenuItem = ({ items, itemType, modal }) => {
  const isValidItemType = typeof itemType === 'string' && itemType !== 'NaN'
  return (
    <div id={isValidItemType ? itemType : 'default'}>
      {' '}
      <h2 style={{ marginLeft: '2rem' }}>{itemType.toUpperCase()}</h2>
      <div className={classes.box}>
        {items.map((item) => {
          return (
            <div
              key={uuidv4()}
              className={classes.container}
              onClick={() => modal(item)}
            >
              <div className={classes.info}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className={classes.price}>${item.price}</p>
              </div>

              <img
                className={classes.img}
                src={`/menu/${itemType.toLowerCase()}/${item.id}.jpeg`}
                alt={item.title}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MenuItem
