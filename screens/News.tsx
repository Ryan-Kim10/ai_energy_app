import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

type News = {
  id: string;
  title: string;
  article: string;
  timestamp: any;
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const q = query(
          collection(db, "news"),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as News[];
        setNews(data);
      } catch (err) {
        console.error("Error loading news:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (news.length === 0) return <p>No news available</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>News</h1>
      {news.map((a) => {
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
            {/* <p>{a.message}</p> */}
          </div>
        );
      })}
    </div>
  );
}
