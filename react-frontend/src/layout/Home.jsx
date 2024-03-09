import React from 'react';
import Image from 'react-bootstrap/Image';
function Home() {
  return (
    <div className="homepage" style={{ textAlign: 'center' }}>
      <h1>
      Welcome to Actor Casting
      </h1>
      <h6>
      Here you can find a job or a worker
      </h6>
      <div>In order to use this service you need to be logged in</div>
      <Image style={{textAlign:'center'}}width={500} src='https://www.auditionsfree.com/content/user/2023/01/clapboard3.jpg' roundedCircle />
    </div>
  );
}

export default Home;