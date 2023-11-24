import React, { useEffect, useState } from 'react'
import classes from './MenuNav.module.css'

const MenuNav = ({ scrollRef }) => {
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsFixed(scrollPosition > 650)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <ul
      ref={scrollRef}
      className={`${classes.menu} ${isFixed ? classes.fixed : ''}`}
    >
      <li className={classes.li}>
        <a href='#pasta'>Pasta</a>
      </li>
      <li className={classes.li}>
        <a href='#popcorn'>Popcorn</a>
      </li>
      <li className={classes.li}>
        <a href='#fries-meat'>Fries</a>
      </li>
      <li className={classes.li}>
        <a href='#burgers'>Burgers</a>
      </li>
      <li className={classes.li}>
        <a href='#dogs'>Dogs</a>
      </li>
      <li className={classes.li}>
        <a href='#other'>Other</a>
      </li>
      <li className={classes.li}>
        <a href='#drinks'>Drinks</a>
      </li>
    </ul>
  )
}

export default MenuNav
