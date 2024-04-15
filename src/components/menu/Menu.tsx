import { Link } from 'react-router-dom';
import './Menu.scss';
import { menu } from '../../staticDatas';
import React from 'react';

interface MenuInterface {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuInterface> = ({ setToggle }) => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} onClick={() => setToggle(true)} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
