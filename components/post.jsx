

export default function Home() {
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      fetch("http://localhost:5001/getReview/67b21727149be02667585d66")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`erro HTTP! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((error) => console.error("erro ao buscar post:", error));
    }, []);
  
    if (!post) return <p>Carregando...</p>;
  
    return (
      <div>
        <h1>{post.title}</h1>
        <h3>{post.movieName}</h3>
        <p><strong>por:</strong> {post.author}</p>
        <p>{post.description}</p>
      </div>
    );
  }