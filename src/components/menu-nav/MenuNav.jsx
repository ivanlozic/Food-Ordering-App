import React, { useEffect, useState } from 'react'
import classes from './MenuNav.module.css'
import { Link } from 'react-scroll'

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
        <Link to='pasta' smooth={true} duration={500}>
          Pasta
        </Link>
      </li>
      <li className={classes.li}>
        <Link to='popcorn' smooth={true} duration={500}>
          Popcorn
        </Link>
      </li>
      <li className={classes.li}>
        <Link to='fries-meat' smooth={true} duration={500}>
          Fries Meat
        </Link>
      </li>
      <li className={classes.li}>
        <Link to='burgers' smooth={true} duration={500}>
          Burgers
        </Link>
      </li>
      <li className={classes.li}>
        <Link to='dogs' smooth={true} duration={500}>
          Dogs
        </Link>
      </li>
      <li className={classes.li}>
        <Link to='other' smooth={true} duration={500}>
          Other
        </Link>
      </li>
      <li className={classes.li}>
        <Link to='drinks' smooth={true} duration={500}>
          Drinks
        </Link>
      </li>
    </ul>
  )
}

export default MenuNav
