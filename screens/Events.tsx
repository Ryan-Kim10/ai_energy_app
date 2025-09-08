import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

type Events = {
  id: string;
  title: string;
  duration: number;
  eventDetails: string;
  location: string;
  timestamp: any;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = query(
          collection(db, "events"),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Events[];
        setEvents(data);
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (events.length === 0) return <p>No events available</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Events</h1>
      {events.map((a) => {
        const date = a.timestamp?.toDate
          ? a.timestamp.toDate().toLocaleString()
          : "No date";
        return (
          <div
            key={a.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* <h2>{a.title}</h2>
            <p>
              <strong>{date}</strong>
            </p>
            <p>{a.message}</p> */}
          </div>
        );
      })}
    </div>
  );
}
