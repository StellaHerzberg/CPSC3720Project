// File defines the main React component for the Tiger Tix frontend application. Retrieves event data from the backend
// API and provides functionality to retrieve event data, purchase tickets, etc.
import React, { useEffect, useState } from 'react';
import './App.css';
import VoiceTest from "./Voice";


// Serves as root componenet of web app. Fetches the event data, displays events, handles user interactions.
// Returns: the webpage displaying all available events and buttons
// Side effects: indicates network request on component mount to get event data and update state when 
// necessary.






function App() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const[message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Gets event data from API when it first mounts. Ensures list is populated when page loads.
  // Sends request to backend and updates local state
  useEffect(() => {
    fetch('http://localhost:6001/api/events')
    .then((res) => res.json())
    .then((data) => setEvents(data))
    .catch((err) => console.error(err));
  }, [])

  async function handleRequest(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    setEvents([]);

    try {
      const response = await fetch('http://localhost:7001/api/llm/parse', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt: query})
      });
    
    const headers = (response.headers.get('content-type') || '').toLowerCase();

    if (headers.includes('application/json')) {
      const data = await response.json();
      if (Array.isArray(data)) {
        setEvents(data);
      }
      //   setEvents(data.events.map( ev => ({
      //     ...ev, 
      //     aiTickets: data.tickets ?? 1,
      //     aiIntent: data.intent ?? null
      //   })))
      // }
      else if (data?.events && Array.isArray(data.events)) {
        // setEvents(data.events);
        setEvents(data.events.map(ev => ({
          ...ev,
          aiTickets: data.tickets ?? 0,
          aiIntent: data.intent ?? null
        })))
      }
      else {
        setMessage(JSON.stringify(data));
      }
      } else {
        const text = await response.text();
        setMessage(text);
      }
    } catch (err) {
      setError("Request failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
    }
  


  //Handles process of purchasing tocker for a given event. Sends request to API to decrement available
  // ticket count, etc.
  // Params: eventName - name of event that a ticket is being purchased for
  // Params: id - unique ID of event being purchased
  // Returns: Promise<void> - operations to update database
  const buyTicket = async (eventName, id, qty = 1) => {

    // Send request
    try {
      const res = await fetch(`http://localhost:6001/api/events/${id}/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {tickets: qty })

      });

      const headersVar = (res.headers.get('content-type') || '').toLowerCase();
      let data;
      if (headersVar.includes('application/json')) {
        data = await res.json();
      } 
      else {
        const text = await res.text();
        console.error("Purchase endpoint returned non-json");
        alert("Purchase failed: " + text);
        return;
      }
      // const data = await res.json();

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
      <h1 role="banner">Welcome to Tiger Tix!</h1>

      <main> 
        <form onSubmit = {handleRequest}>
          <input 
            type = "text"
            placeholder = "Enter your desired event!"
            value = {query}
            onChange = {(e) => setQuery(e.target.value)}
            style = {{ width: '60%', fontSize: '25px'}}
            />
          <button type = "submit" disabled = {loading}>Ask!</button>
        </form>


        <VoiceTest onTranscribe = {(text) => {
          setQuery(text);
        }} />

        {loading && <p>Loading...</p>}
        {error && <p style = {{ color : 'black' }}>{error}</p>}

        {events.length > 0 ? (
          <section> 
            <h2>Available events</h2>
            {/* <ul>
              {events.map((ev, i) => (
                <li key = {ev.id ?? i}>
                  <strong>{ev.eventName ?? 'Unnamed event'}</strong>
                  {ev.available !== undefined ? ` - ${ev.available} available` : ''}
                </li>
              ))}
            </ul> */}
          </section>
        ) : (
          message && (
            <section> 
                <h2>Ticket Booking Assistant</h2>
                <pre style = {{ whiteSpace: 'pre-wrap' }}>{message}</pre>
            </section>
          )
        )}
      </main>

      {/* This is the part that we had beforehand */}
        <ul>
        {events.map((event) => (
          <li role="list" key={event.id}>
            {event.eventName} - {event.eventDate}{' '}
              <button onClick={() => buyTicket(event.eventName, event.id, event.aiTickets ?? 1)}>Purchase Event
                Tickets</button> - Tickets Left: {event.numTickets} 
          </li> 
        ))}
        </ul>
        {/* <div style={{ marginBottom: "20px" }}>
          <h2>Voice Input</h2>
            <p>Click the mic and talk. Whatever you say will hopefully print out below, fingers crossed</p>
          <VoiceTest/> 
        </div> */}
        {/* <AITest/> */}
    </div>
    );
}


export default App;