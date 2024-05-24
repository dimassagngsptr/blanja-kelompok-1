import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Tshirt from "../../assets/images/categories/t-shirt.png";
import Shorts from "../../assets/images/categories/shorts.png";
import Pants from "../../assets/images/categories/pants.png";
import Jacket from "../../assets/images/categories/jacket.png";
import Accessories from "../../assets/images/categories/accessories.png";
import Bagpack from "../../assets/images/categories/bagpack.png";
import Cap from "../../assets/images/categories/cap.png";
import Dress from "../../assets/images/categories/dress.png";
import FormalSuit from "../../assets/images/categories/formalsuit.png";
import Glasses from "../../assets/images/categories/glasses.png";
import Handbag from "../../assets/images/categories/handbag.png";
import HighHeels from "../../assets/images/categories/highheels.png";
import Shoes from "../../assets/images/categories/shoes.png";
import Socks from "../../assets/images/categories/socks.png";
import Tie from "../../assets/images/categories/tie.png";
import WristWatch from "../../assets/images/categories/wristwatch.png";
import axios from 'axios';

const categoriesImages = {
  "T-Shirt": Tshirt,
  "Shorts": Shorts,
  "Pants": Pants,
  "Jacket": Jacket,
  "Accessories": Accessories,
  "Bagpack": Bagpack,
  "Cap" : Cap,
  "Dress" : Dress,
  "FormalSuits": FormalSuit,
  "Glasses": Glasses,
  "Handbag": Handbag,
  "HighHeels": HighHeels,
  "Shoes": Shoes,
  "Socks": Socks,
  "Tie": Tie,
  "WristWatch": WristWatch
};

const CategoriesCard = () => {
  
  const [categories, setCategories] = useState([]);
  // const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/cat')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        //data dummy 
        setCategories([
          { id: 1, name: 'T-Shirt' },
          { id: 2, name: 'Shorts' },
          { id: 3, name: 'Pants' },
          { id: 4, name: 'Jacket' },
          { id: 5, name: 'Accessories' },
          { id: 6, name: 'Bagpack' },
          { id: 7, name: 'Cap' },
          { id: 8, name: 'Dress' },
          { id: 9, name: 'FormalSuits' },
          { id: 10, name: 'Glasses' },
          { id: 11, name: 'Handbag' },
          { id: 12, name: 'HighHeels' },
          { id: 13, name: 'Shoes' },
          { id: 14, name: 'Socks' },
          { id: 15, name: 'Tie' },
          { id: 16, name: 'WristWatch' }
        ]);
      });
  }, []);

  function ButtonPrev ({onClick, next}) {
    return (<button
    onClick={onClick}
    className= {`${next ? "rotate-180 -left-[161px]" : "rotate-0"} w-[52px] h-[52px] -left-[261px] top-[105px] flex items-center justify-center bg-white text-main-abu rounded-full hover:bg-gray-400 focus:outline-none absolute`}
    // disabled={currentIndex === 0}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>)
  }
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    prevArrow : <ButtonPrev next={false} />,
    nextArrow : <ButtonPrev next={true} />
  };
  
  return (
    <Slider {...settings}>
      {categories.map((category, index) => (
         <div>
          <img
            key={index}
            className='w-[180px] h-[220px]'
            src={categoriesImages[category.name]}
            alt={category.name}
          />
          </div>
        ))}
    </Slider>
  );
}

export default CategoriesCard;