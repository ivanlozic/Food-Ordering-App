import React from 'react'
import classes from './MenuItem.module.css'

const MenuItem = ({ items, itemType, modal }) => {

  return (
    <div>
      {' '}
      <h2 style={{ marginLeft: '2rem' }}>{itemType.toUpperCase()}</h2>
      <div className={classes.box}>
        {items.map((item) => {
          return (
            <div
              key={item.id}
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
