
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, updateProfile, getAuth} from "firebase/auth";
import { getFirestore, doc, deleteDoc, getDocs,  addDoc, collection } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBtJbkHke72xJLwgiPOXKc47Z3bzhoT4pM",
    authDomain: "desarrolladow-web-junior.firebaseapp.com",
    projectId: "desarrolladow-web-junior",
    storageBucket: "desarrolladow-web-junior.appspot.com",
    messagingSenderId: "204440893175",
    appId: "1:204440893175:web:a3060896df81669a6f05f2"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const newOperario = async (gerenteId, nombre, celula) => {
    try {
        const operariosRef = collection(db, "gerentes", gerenteId, "operarios");
        await addDoc(operariosRef, {
            nombre,
            celula
        });
        console.log("Operario registrado correctamente");
    } catch (error) {
        console.error("Error al registrar operario:", error);
    }
}

export const getOperarios = async (gerenteId) => {
    try {
        const operariosRef = collection(db, "gerentes", gerenteId, "operarios");
        const snapshot = await getDocs(operariosRef);

        const operarios = [];
        snapshot.forEach((doc) => {
            operarios.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return operarios;
    } catch (error) {
        console.error("Error al obtener operarios:", error);
        return [];
    }
}

export const deleteOperario = async (gerenteId, operarioId) => {
    try {
        const operarioRef = doc(db, "gerentes", gerenteId, "operarios", operarioId);
        await deleteDoc(operarioRef);
        console.log("Operario eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar operario:", error);
    }
}


export const handleNewUser = async (newUser) => {
    try {
        await createUserWithEmailAndPassword(auth, newUser.email, newUser.password).then( async ({user}) => {
            await updateProfile(user, {
                displayName: newUser.nombres + " " + newUser.apellidos
            })
        });
        return "Usuario creado correctamente"
    } catch (err) {
        const errorMessage = getErrorMessage(err.code);
        return "Error: " + errorMessage
    }
};

function getErrorMessage(errorCode) {
    switch (errorCode) {
        case "auth/email-already-in-use":
            return "El correo electrónico ya está en uso.";
        case "auth/weak-password":
            return "La contraseña es demasiado débil.";
        default:
            return "Error al crear usuario.";
    }
}
