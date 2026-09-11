import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("all");

  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoading(true);

    fetch(`https://dummyjson.com/posts?limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setLoading(false);
      });
  }, [limit]);

  // Получаем все теги
  const allTags = [
    "all",
    ...new Set(posts.flatMap((post) => post.tags)),
  ];

  // Фильтруем посты
  const filteredPosts =
    selectedTag === "all"
      ? posts
      : posts.filter((post) => post.tags.includes(selectedTag));

  // Загрузить ещё 10
  const loadMore = () => {
    setLimit(limit + 10);
  };

  return (
    <div className="app">
      <header>
        <h1> News Feed</h1>
        <p>Последние новости и интересные публикации</p>
      </header>

      <div className="filters">
        <button
          className={selectedTag === "all" ? "active" : ""}
          onClick={() => setSelectedTag("all")}
        >
          Все
        </button>

        {allTags
          .filter((tag) => tag !== "all")
          .map((tag) => (
            <button
              key={tag}
              className={selectedTag === tag ? "active" : ""}
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </button>
          ))}
      </div>

      {loading ? (
        <h2 className="loading">Загрузка новостей...</h2>
      ) : (
        <>
          <div className="posts">
            {filteredPosts.map((post) => (
              <div className="post-card" key={post.id}>
                <h2>{post.title}</h2>

                <p>{post.body}</p>

                <div className="likes">
                   {post.reactions?.likes || 0}
                  <span>
                     {post.reactions?.dislikes || 0}
                  </span>
                </div>

                <div className="tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedTag === "all" && limit < 251 && (
            <button className="load-more" onClick={loadMore}>
              Загрузить ещё
            </button>
          )}

          {filteredPosts.length === 0 && (
            <h2 className="empty">Постов с таким тегом нет</h2>
          )}
        </>
      )}
    </div>
  );
}

export default App;