import React from 'react';
// import '../css/about.css'
import '../project-css/about.css'
import abtimg from '../project-images/nwmsu-admin-image.jpg'
import d1 from '../project-images/shivani-image.jpg';
import d2 from '../project-images/ashok-murali-image.jpg';
import d3 from '../project-images/murali-krishna-image.jpg';
import d4 from '../project-images/nithin.jpg';
import d5 from '../project-images/nikhil-image.jpg';
import d6 from '../project-images/lakshmi-image.png';

const About = () => {
  return (
    <div className="about-container">
      <img
        src={abtimg}
        alt="Large"
        className="large-image"
      />
      <p className="about-text">
      Northwest professional based learning (PBL) is one of the CIET project, and which is a platform for project to explore projects.
    Northwest’s Faculties, students, any authorized users can post and discuss their potential PBL projects on this platform and 
    unauthorized users can only view the public projects available on the platform. The authorized users receive requests for the 
    projects which he/she has posted and can contact them through email or internal message system. After interviewing them, they 
    can decide on the team to work on their project.
      </p>
      <h2 className="developers-heading">Developers</h2>
<div className="developers">
  <div className="developer">
    <img
      src={d1} 
      alt="Developer 1"
      className="developer-image"
    />
    <p>Shivani</p>
  </div>
  <div className="developer">
    <img
      src={d2} 
      alt="Developer 2"
      className="developer-image"
    />
    <p>Ashok Murali</p>
  </div>
  <div className="developer">
    <img
      src={d3}
      alt="Developer 3"
      className="developer-image"
    />
    <p>Murali Krishna</p>
  </div>
  <div className="developer">
    <img
      src={d4}
      alt="Developer 3"
      className="developer-image"
    />
    <p>Nithin Kunal</p>
  </div>
  <div className="developer">
    <img
      src={d5}
      alt="Developer 3"
      className="developer-image"
    />
    <p>Nikhil</p>
  </div>
  <div className="developer">
    <img
      src={d6}
      alt="Developer 3"
      className="developer-image"
    />
    <p>Lakshmi</p>
  </div>
</div>

    </div>
  );
};

export default About;
