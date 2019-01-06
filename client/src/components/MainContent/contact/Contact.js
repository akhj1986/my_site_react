import React, { Component } from "react";
import ContactList from "./ContactList";

class Contact extends Component {
  componentDidMount() {
    document.getElementById("contact-link").className = "nav-item current";
    document.getElementById("home-link").className = "nav-item";
    document.getElementById("portfolio-link").className = "nav-item";
    document.getElementById("skills-link").className = "nav-item";
  }

  render() {
    return (
      <div id="contact-page">
        <div className="container">
          <div className="paragraph-head-contact">
            <h1>Contact Me</h1>
          </div>
          <ContactList />
        </div>
      </div>
    );
  }
}

export default Contact;
