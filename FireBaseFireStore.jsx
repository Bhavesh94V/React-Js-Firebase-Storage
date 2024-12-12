import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { app } from '../firebase';

const db = getFirestore(app);

export default function FireBaseFireStore() {
    const [state, setState] = useState([]);

    async function AddData() {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: "Harsh",
                last: "Prajapati",
                born: 2005
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function GetData() {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setState(data);
        } catch (e) {
            console.error("Error fetching documents: ", e);
        }
    }

    async function DeleteData(id) {
        try {
            await deleteDoc(doc(db, "users", id));
            console.log(`Document with ID ${id} deleted.`);
            GetData();
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }

    return (
        <div>
            <h1>FireBase FireStore</h1>
            <button onClick={AddData}>Add Data</button>
            <button onClick={GetData}>Get Data</button>
            <ul style={{ listStyle: "none" }}>
                {
                    state.map((user) => (
                        <li key={user.id}>
                            <p>First Name: {user.first}</p>
                            <p>Last Name: {user.last}</p>
                            <p>Born: {user.born}</p>
                            <button onClick={() => DeleteData(user.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
