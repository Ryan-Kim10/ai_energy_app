import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

type Landmark = {
  id: string;
  facts: string;
  audio: string;
  history: string;
  information: string;
  photo: string;
  title: string;
};

export default function LandmarkPage() {
  const [landmark, setLandmark] = useState<Landmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLandmark() {
      try {
        const q = query(
          collection(db, "landmark"),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Landmark[];
        setLandmark(data);
      } catch (err) {
        console.error("Error loading landmark:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLandmark();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (landmark.length === 0) return <p>No landmark available</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Landmark</h1>
      {landmark.map((a) => {
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
