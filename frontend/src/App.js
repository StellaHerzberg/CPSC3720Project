// File defines the main React component for the Tiger Tix frontend application. Retrieves event data from the backend
// API and provides functionality to retrieve event data, purchase tickets, etc.
import React, { useEffect, useState } from 'react';
import './App.css';
import 'ollama'

// Serves as root componenet of web app. Fetches the event data, displays events, handles user interactions.
// Returns: the webpage displaying all available events and buttons
// Side effects: indicates network request on component mount to get event data and update state when 
// necessary.
function App() {
  const [events, setEvents] = useState([]);
  
  // Gets event data from API when it first mounts. Ensures list is populated when page loads.
  // Sends request to backend and updates local state
  useEffect(() => {
    fetch('http://localhost:6001/api/events')
    .then((res) => res.json())
    .then((data) => setEvents(data))
    .catch((err) => console.error(err));
  }, [])

  //Handles process of purchasing tocker for a given event. Sends request to API to decrement available
  // ticket count, etc.
  // Params: eventName - name of event that a ticket is being purchased for
  // Params: id - unique ID of event being purchased
  // Returns: Promise<void> - operations to update database
  const buyTicket = async (eventName, id) => {

    // Send request
    try {
      const res = await fetch(`http://localhost:6001/api/events/${id}/purchase`, {
        method: 'POST'
      });

      const data = await res.json();
      
      // Handles errors
      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      //Update ticker count for purchase
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id ? { ...event, numTickets: data.ticketsRemaining} : event
        )
      );

      //Notify user
      alert(`Ticket purchased for: ${eventName}. Remaining tickets: ${data.ticketsRemaining}`);



    } catch (error) {
      console.error(error);
      alert("Failed to purchase ticket.");
    }
  };



  //Displays page title, list of events with all the event information plus operations
  return (
    <div className="App">
      <h1 role="webpage_title">Clemson Campus Events</h1>
        <ul>
        {events.map((event) => (
          <li role="list_of_available_events" key={event.id}>
            {event.eventName} - {event.eventDate}{' '}
              <button role = "ticket_purchase_button" onClick={() => buyTicket(event.eventName, event.id)}>Purchase Event
                Ticket</button> - Tickets Left: {event.numTickets} 
          </li> 
        ))}
        </ul>
    </div>
    );
}

export default App;
