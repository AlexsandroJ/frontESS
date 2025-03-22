// app/not-found.tsx

"use client"

import DataInterface from '../components/DataInterface';
import Header from '../components/Header';


export default function NotFound() {
  return (
    <div>
      <Header/>
      <div className=" flex flex-col items-center text-black  p-6 " >
        <h1>Oops! Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <a href="/"><strong>Voltar para a página inicial</strong></a>
      </div>
    </div>
  );
}
