import React, { Component } from "react";
import ContactLink from "./ContactLink";
import data from "./data.json";
import pdf from "./cv_alex-harris.pdf";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: data.contactDetails
    };
  }

  componentDidMount() {
    console.log(this.state.contacts);
  }

  render() {
    const contactComponents = this.state.contacts.map(contact => (
      <ContactLink
        key={contact.id}
        type={contact.type}
        aClass={contact.aClass}
        iClass={contact.iClass}
        href={contact.href === "pdf" ? pdf : contact.href}
        target={contact.target}
        text={contact.text}
      />
    ));
    return <div className="contacts">{contactComponents}</div>;
  }
}

export default ContactList;
