import React from 'react';
import { observer } from 'mobx-react';
import Being from '../img/Being.png';
import Union from '../img/Union.png';
import Img1 from '../img/pngwing2.png';
import Img2 from "../img/Group27.png";
import Img3 from "../img/Group26.png";
import Img4 from "../img/Conversation.png";

const HomePage = () => {
  return (
    <div className='section'>
      <div className='section_search'>
        <h1 className='search_h'>Работа найдется для каждого</h1>
        <form className='input_form'>
          <div className='search_input'>
            <img className='search_input_img' src={Img1} alt="" width="50" height="50"/>
            <input className='search_input_text' type="text" />
            <button className='search_input_button'>Найти работу</button>
          </div>
          <div search_button>
            <ul className="button_line_1">
                <li >
                    <button className="button_but" value="Ремонт мотоциклов">Ремонт мотоциклов</button>
                </li>
                <li>
                    <button className="button_but" value="Вёрстка">Вёрстка</button>
                </li>
                <li>
                    <button className="button_but" value="Создание сайтов">Создание сайтов</button>
                </li>
            </ul>
            <ul className="button_line_2">
                <li><button className="button_but" value="Подработка">Подработка</button></li>
                <li><button className="button_but" value="Создание дизайна">Создание дизайна</button></li>
            </ul>
          </div>
        </form>
      </div>
      <div>
        <h2 className='section_text'>В данном месте вы найдете людей, <br /> которые могут оказаться необходимыми<br /> вам или же помочь тем, кто в нужде!</h2>
      </div>
      <img className='section_img_1' src={Being} alt="" width="500" height="500" />
      <div>
          <img className='section_img_2' src={Img4} alt="" width="300" height="300" />
      </div>
    </div>
  );
};

export default observer(HomePage);
