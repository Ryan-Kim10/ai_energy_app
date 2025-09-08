import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase";
async function testFirestore() {
  try {
    const snapshot = await getDocs(collection(db, "events"));
    console.log("✅ Connected! Found", snapshot.size, "events:");
    snapshot.forEach(doc => console.log(doc.id, "=>", doc.data()));

    const snapshot2 = await getDocs(collection(db, "news"));
    console.log("✅ Connected! Found", snapshot2.size, "news:");
    snapshot2.forEach(doc => console.log(doc.id, "=>", doc.data()));

  } catch (e) {
    console.error("❌ Error connecting to Firestore:", e);
  }
}
testFirestore(); // <-- runs automatically when file is imported