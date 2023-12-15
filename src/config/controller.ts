import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./firebase";
import Router from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export const firestore = getFirestore(app);

export const brandCollection = collection(firestore , 'Brand')

export const addBrand = async (brandData: any) => {
    const newBrand = await addDoc(brandCollection, {
        ...brandData});
        console.log(`data Telah dibuat ${newBrand.path}`)
}

export const updateBrand = async (Id:string | undefined, docData: any) => {
    const  getBrand = doc(firestore ,`brand${Id}`);
    await setDoc(getBrand, docData, {merge: true});
    console.log("data telah di update")
}

export const deleteBrand =async (Id:string | undefined, router: AppRouterInstance) => {
    const document = doc(firestore ,`brand${Id}`);
    await deleteDoc(document);
    console.log("data telah dihapus")
    router.push("/dashboard")
}