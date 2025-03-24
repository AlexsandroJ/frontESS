"use client";
import Button from "../../components/button/Button";
import HeartButton from "../../components/heart_button/heart_button";
import StarRating from "../../components/star_classification/star_classification";
import { useEffect, useState } from "react";
import "./review.css"
import { ST } from "next/dist/shared/lib/utils";

export default function Reviews({ reviewId }) {
  const urlApi = process.env.NEXT_PUBLIC_API_URL;

  const [post, setPost] = useState(null);
  const [owner, setOwner] = useState("");
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false); 
  const [userId, setUserId] = useState(null);

  const handleClick = async () => {
  
      try {
        const token = JSON.parse(localStorage.getItem('userToken'));
        
        const response = await fetch(`${urlApi}/reviews/like`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({reviewId: reviewId}) 
        });
        
        if (!response.ok) {
          setLiked(true);
          throw new Error('Erro ao enviar o texto!');
        }
      } catch (err) {
        setError(err.message);
        console.error('Erro ao enviar:', err);
      }
    
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!reviewId) {
            throw new Error(`id inválido`);
        }
        const response = await fetch(`${urlApi}/reviews/getReview/${reviewId}`);
        if (!response.ok) {
          console.log(response.text)
          throw new Error(`Erro ao buscar post: ${response.status}`);
        }
        const data = await response.json();
        setPost(data.review);
        setOwner(data.owner || null);
        setMovie(data.movie || null);
        const loggedInUser = JSON.parse(localStorage.getItem('userName'));
        if (loggedInUser) {
          setUserId(loggedInUser.id); 
        }
        if (data.review.likes?.some(like => like === userId)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <div >
        {/* Post */}
        <div className="horizontal"> 
            {/* Container da foto */}
          <div className="mr-4"> 
            <img
              src={movie?.cover?.imageURL || 'default-image.jpg'}
              alt="Foto do post"
              className="photo_img"
            />
          </div>
         <div className="var-vertical">
            {/* Container do texto */}
            <div>
                <div className="var-horizontal">
                  <div>
                    <h1 className="h1">{post?.title}</h1>
                    <h2 className="h2">{movie?.name || 'Nome do filme indisponível'}</h2>
                  </div>
                    <StarRating rating ={post.classification}></StarRating>
                </div>
               
                <b className="p">por: {owner?.name || 'Anônimo'}</b>
                <p className="b">{post?.body || 'Conteúdo indisponível'}</p>
            </div>
            <div className="horizontal">
              <HeartButton onClick={handleClick} liked={liked} setLiked={setLiked} />
              <p className="text-xl font-bold">Curtir Review </p>
              <likes className="text-gray-600">{post.likes.length} curtidas</likes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
