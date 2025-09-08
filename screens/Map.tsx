import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

type Map = {
  id: string;
  iconsOfLandmarks: string;
  list: string;
};

export default function MapPage() {
  const [map, setMap] = useState<Map[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMap() {
      try {
        const q = query(
          collection(db, "map"),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Map[];
        setMap(data);
      } catch (err) {
        console.error("Error loading map:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMap();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (map.length === 0) return <p>No map available</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Map</h1>
      {map.map((a) => {
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
