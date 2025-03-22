// pages/notes/index.js
"use client"

import DataInterface from '../../../components/DataInterface';
import Header from '../../../components/Header';


export default function Home({ params }) {
    const { nome } = params;
    localStorage.setItem('userName', JSON.stringify(nome));
  return (
    <div>
      <Header/>
      <DataInterface />
    </div>
  );
}