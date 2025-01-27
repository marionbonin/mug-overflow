import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import { FiAlignRight, FiXCircle, FiChevronDown } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { saveSlug } from '../../../actions/user';
import { fetchCategories } from '../../../actions/categories';
import { fetchProductsByCategory, cleanListState } from '../../../actions/products';

import './style.scss';

const Navbarmenu = () => {
  const navigate = useNavigate();

  let [isMenu, setisMenu] = useState(false);
  let [isResponsiveclose, setResponsiveclose] = useState(false);
  const toggleClass = () => {
    setisMenu(isMenu = !isMenu);
    setResponsiveclose(isResponsiveclose = !isResponsiveclose);
  };

  const boxClass = ['main-menu menu-right menuq1'];
  if (isMenu) {
    boxClass.push('menuq2');
  }
  else {
    boxClass.push('');
  }

  let [isMenuSubMenu, setMenuSubMenu] = useState(false);

  const toggleSubmenu = () => {
    setMenuSubMenu(isMenuSubMenu = !isMenuSubMenu);
  };

  const boxClassSubMenu = ['sub__menus'];
  if (isMenuSubMenu) {
    boxClassSubMenu.push('sub__menus__Active');
  }
  else {
    boxClassSubMenu.push('');
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useSelector((state) => state.categories.list);

  const handleClick = ((event) => {
    const slug = event.target.getAttribute('value');
    console.log(slug);
    const base = '/categories/';
    const urlToRedirect = base + slug;
    toggleClass();
    dispatch(cleanListState());
    navigate(urlToRedirect);
    dispatch(saveSlug(slug));
    dispatch(fetchProductsByCategory());
  });

  return (
    <div className="header__middle">
      <div id="navbar-container">
        <div className="row">
          <div className="header__middle__menus">
            <nav className="main-nav ">

              {/* Responsive Menu Button */}
              {isResponsiveclose === true
                ? (
                  <>
                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass}> <FiXCircle />   </span>
                  </>
                ) : (
                  <>
                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass}> <FiAlignRight />   </span>
                  </>
                )}

              <ul className={boxClass.join(' ')}>
                <li
                  className="menu-item"
                  id="accueil"
                >
                  <NavLink
                    className={
                      (navData) => (navData.isActive ? 'is-active menu-item-link' : 'menu-item-link')
                    }
                    onClick={toggleClass}
                    to="/"
                  > Accueil
                  </NavLink>
                </li>
                <li
                  className="menu-item"
                  id="contact"
                >
                  <NavLink
                    onClick={toggleClass}
                    className={
                      (navData) => (navData.isActive ? 'is-active menu-item-link' : 'menu-item-link')
                    }
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </li>

                <li
                  className="menu-item"
                  id="concept"
                >
                  <NavLink
                    onClick={toggleClass}
                    className={
                      (navData) => (navData.isActive ? 'is-active menu-item-link' : 'menu-item-link')
                    }
                    to="/concept"
                  >
                    Concept
                  </NavLink>
                </li>

                <li
                  id="categories"
                  onClick={toggleSubmenu}
                  className="menu-item sub__menus__arrows"
                >
                  <Link className="menu-item-link" to="#"> Catégories <FiChevronDown className="chevron" /> </Link>
                  <ul className={boxClassSubMenu.join(' ')}>
                    {categories.map(({ name, slug }) => (
                      <li key={slug}>
                        <NavLink
                          onClick={handleClick}
                          value={slug}
                          className={
                            (navData) => (navData.isActive ? 'is-active submenu-item-link' : '')
                          }
                          to={`/categories/${slug}`}
                        > {name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbarmenu;
