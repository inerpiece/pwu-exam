import React, { Fragment } from "react";
import Banner from '../components/Banner';

const Home = () => (
  <Fragment>
    <Banner orientation="right" title="WELCOME TO CRENTAL" description="The only place where you will find the cars to be chosen to perfection. The exhilaration from them alone will make you come back and rent some more. The outstanding class and top brands in the industry speak for themselves." imgSrc="https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2018-Porsche-911-Agate-Grey-Metallic.jpg"/>
    <Banner orientation="left" title="WHY CHOOSE US" description="We offer hundreds of high-class vehicles that will suit all of your needs and desires. You will never run out of cars to rent and checkout for yourself! You can hear from our past customers down below." imgSrc="https://i.pinimg.com/736x/64/2a/dd/642add34d47c22768557f9e42a3e615e.jpg" />
  </Fragment>
);

export default Home;