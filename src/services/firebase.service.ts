import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import EmergencyModel from "../model/emergencyModel";
import { format } from "date-fns";

const firebaseConfig = {
  apiKey: "AIzaSyCrqw1e1BNZhpAZSwNnd638BsxzeB-knAg",
  authDomain: "gh-5-alert.firebaseapp.com",
  projectId: "gh-5-alert",
  storageBucket: "gh-5-alert.appspot.com",
  messagingSenderId: "857565152450",
  appId: "1:857565152450:web:4fe07ae14a58a40199a75b",
  measurementId: "G-JZNLRKPFX0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const FirebaseService = {
  getFirebase: async (id: String): Promise<EmergencyModel | null> => {
    const querySnapshot = await getDocs(collection(db, "emergency"));

    let data: EmergencyModel | null = null;

    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      console.log(docData.datetime);

      const formattedDateTime = format(
        docData.datetime.seconds * 1000,
        "dd MMMM yyyy HH:mm:ss"
      ).toString();

      if (docData.id === id) {
        data = {
          id: docData.id,
          nama_user: docData.nama_user,
          nama_lokasi: docData.nama_lokasi,
          desc: docData.desc,
          latitude: docData.latitude,
          longitude: docData.longitude,
          id_emergency: docData.id_emergency,
          event: docData.event,
          datetime: formattedDateTime,
        };
      }
    });

    return data;
  },
};

export default FirebaseService;
