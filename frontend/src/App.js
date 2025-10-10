
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch('http://localhost:6001/api/events')
    .then((res) => res.json())
    .then((data) => setEvents(data))
    .catch((err) => console.error(err));
  }, [])

  const buyTicket = async (eventName, id) => {

    try {
      const res = await fetch(`http://localhost:6001/api/events/${id}/purchase`, {
        method: 'POST'
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id ? { ...event, numTickets: data.ticketsRemaining} : event
        )
      );

      alert(`Ticket purchased for: ${eventName}. Remaining tickets: ${data.ticketsRemaining}`);



    } catch (error) {
      console.error(error);
      alert("Failed to purchase ticket.");
    }
  };


  return (
    <div className="App">
      <h1>Clemson Campus Events</h1>
        <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.eventName} - {event.eventDate}{' '}
              <button onClick={() => buyTicket(event.eventName, event.id)}>Purchase Event
                Ticket</button> - Tickets Left: {event.numTickets} 
          </li>
        ))}
        </ul>
    </div>
    );
}

export default App;
