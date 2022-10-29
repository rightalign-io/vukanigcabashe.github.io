import React from "react";
import { Link } from "react-router-dom";


const Header = () => (
  <header className="mb-6">
    <nav className="mx-auto w-1/2">
      <span>
      <svg className="h-12 w-full" viewBox="0 0 353 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.0938 26.84H9.61926V21.032H39.889C39.0948 18.568 36.5355 16.28 32.0348 16.28H10.0605C5.03026 16.28 2.11801 18.128 2.11801 22.176V26.488C2.11801 30.008 5.11851 32.032 9.53101 32.032H33.2703V38.192H1.32376C2.11801 41.536 4.67726 43.296 9.26626 43.296H33.182C38.2123 43.296 40.6833 41.36 40.6833 37.224V32.912C40.6833 29.128 37.771 27.104 33.0938 26.84Z" fill="black"/>
        <path d="M81.0135 16.368H52.0675V43.384H60.2748V33H81.6313C87.544 33 90.8093 30.976 90.8093 26.224V23.232C90.721 18.832 87.0145 16.368 81.0135 16.368ZM83.661 24.992C83.661 26.928 83.308 27.984 80.131 27.984H60.2748L60.363 20.944H79.778C83.308 20.944 83.7493 22 83.7493 23.848V24.992H83.661Z" fill="black"/>
        <path d="M114.637 15.224L109.695 21.296L118.079 32.824H100.605L96.2808 37.4H121.52L125.845 43.384H135.552L114.637 15.224Z" fill="black"/>
        <path d="M151.26 21.032H181.971C181.177 17.864 178.088 16.28 173.676 16.28H150.731C146.76 16.28 142.965 17.864 142.965 22.176V37.312C142.965 41.624 146.76 43.208 150.731 43.208H173.941C179.236 43.208 181.089 41.712 181.971 38.104H151.26V21.032Z" fill="black"/>
        <path d="M201.475 38.28V30.008H217.978V25.432H193.179V43.384H229.803V38.28H201.475Z" fill="black"/>
        <path d="M231.039 16.368H194.062V21.12H231.039V16.368Z" fill="black"/>
        <path d="M253.807 16.368H240.922L256.101 27.456C258.308 25.96 260.867 24.376 263.161 23.056L253.807 16.368Z" fill="black"/>
        <path d="M272.516 30.184C270.31 31.68 268.103 33.352 265.985 34.936L277.458 43.296H290.431L272.516 30.184Z" fill="black"/>
        <path d="M352.117 0.616001C281.517 4.664 248.865 34.76 241.54 41.888L240.04 43.296H253.101C288.401 8.008 339.145 1.76 352.117 0.616001Z" fill="black"/>
      </svg>

      </span>
      <span>
        <ul className="grid grid-cols-2 gap-6 mt-14 mx-16">
          <li className="mx-5 text-black text-lg font-bold">
            <Link to="vehicles" >Vehicles</Link>
          </li> 
          <li className="mx-5 text-black text-lg font-bold">
            <Link to="about" >About</Link>
          </li>
        </ul>
      </span>
      
    </nav>
  </header>
);

export default Header;