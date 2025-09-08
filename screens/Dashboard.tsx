import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

type Dashboard = {
  id: string;
  announcements: string;
  events: string;
  map: string;
  news: string;
  votingInfo: string;
};

export default function DashbaordPage() {
  const [dashboard, setDashboard] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const q = query(
          collection(db, "dashboard"),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Dashboard[];
        setDashboard(data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (dashboard.length === 0) return <p>No dashboard available</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Dashboard</h1>
      {dashboard.map((a) => {
        // const date = a.timestamp?.toDate
        //   ? a.timestamp.toDate().toLocaleString()
        //   : "No date";
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
