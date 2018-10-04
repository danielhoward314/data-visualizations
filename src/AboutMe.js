import React from 'react'

const AboutMe = () => (
  <div className="main">
    <h1 className="about-content">About Me</h1>
    <div className="wrapper">
      <div id="profile-pic">
        <img src='daniel-howard-profile-pic.JPG'  alt="Full Stack Engineeer, Daniel Howard"/>
      </div>
      <div className="about-text">
        <p>D3 is a great tool for data visualizations. I built this site to take existing D3
          examples and translate them into React code.
        </p>
        <p>Bootstrapped with create-react-app, this site uses D3 to perform calculations on
          data sets and React to render front end components.
        </p>
        <p>My name is Daniel Howard and I'm a Full Stack Engineer. For more info about me,
          please check out my <a href="https://github.com/danielhoward314">Github</a> and
           <a href="https://www.linkedin.com/in/danielhoward314">LinkedIn</a> profiles.
        </p>
      </div>
    </div>
    <div className="footer">
      <div className="footer-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
        <a class="resume-link" href="daniel_howard_resume.pdf" target="_blank"><i class="fa fa-file-text-o" aria-hidden="true"></i>See Full Resume</a>
      </div>

    </div>
  </div>
)

export default AboutMe
