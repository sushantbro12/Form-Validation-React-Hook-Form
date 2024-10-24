import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "./Contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

const Contact = () => {
  const { contact } = useLoaderData();
  return (
    <div id="contact">
      <div>
        <img
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
          alt={`${contact.first} ${contact.last}`}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            `${contact.first} ${contact.last}`
          ) : (
            <i>No Name</i>
          )}
          <Favourite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noopener noreferrer">
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm("Please confirm you want to delete this record")
              ) {
                event.preventDefault();
              }
            }}>
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

function Favourite({ contact }) {
  const favourite = contact.favourite;
  return (
    <Form method="post">
      <button
        name="favourite"
        value={favourite ? "false" : "true"}
        aria-label={favourite ? "Remove from favourites" : "Add to favourites"}>
        {favourite ? "★" : "☆"}
      </button>
    </Form>
  );
}
