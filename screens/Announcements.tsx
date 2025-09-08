import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

type Announcement = {
  id: string;
  title: string;
  message: string;
  timestamp: any;
};

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const q = query(
          collection(db, "announcements"),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Announcement[];
        setAnnouncements(data);
      } catch (err) {
        console.error("Error loading announcements:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (announcements.length === 0) return <p>No announcements available</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Announcements</h1>
      {announcements.map((a) => {
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
            <h2>{a.title}</h2>
            <p>
              <strong>{date}</strong>
            </p>
            <p>{a.message}</p>
          </div>
        );
      })}
    </div>
  );
}
