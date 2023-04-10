import { useRef } from "react";

export default function WannaVisitView({
  wannaVisit,
  setChosenCenter,
  wannaVisitHandler,
  getAllComments,
  comments,
  deleteCommentHandler,
  toggleComments,
  addCommentHandler,
}) {
  const commentsRef = useRef([]);
  const inputRef = useRef([]);

  const deleteHandler = async (id) => {
    await fetch("http://localhost:8000/wannaVisit?id=" + id, {
      method: "DELETE",
    });

    wannaVisitHandler();
  };

  return (
    <div className="cities-container">
      {wannaVisit.map((city, index) => (
        <div key={city.id} className="city-content-box">
          <div className="content-box">
            <div
              className="informations"
              key={`${city.id}_informations`}
              onClick={(e) => {
                setChosenCenter({ lat: city.lat, lng: city.lng });
              }}
            >
              <p>City: {city.city_name}</p>
              <p>Country: {city.country_name}</p>
            </div>
            <div className="buttons">
              <button onClick={() => deleteHandler(city.id)}>Delete</button>
              <button
                onClick={() => toggleComments(commentsRef.current[index])}
              >
                Comments
              </button>
            </div>
          </div>
          <div
            className="comments-section"
            ref={(elem) => (commentsRef.current[index] = elem)}
          >
            <div className="comment-input">
              <input
                placeholder="Add a new comment..."
                ref={(elem) => (inputRef.current[index] = elem)}
              ></input>
              <button
                onClick={() =>
                  addCommentHandler(inputRef.current[index], city.city_name)
                }
              >
                Add
              </button>
            </div>
            <div className="comments-list">
              {comments
                .filter((comment) => comment.city_name === city.city_name)
                .map((comment) => (
                  <p key={comment.id}>
                    {comment.comment}
                    <button
                      className="delete-comment"
                      onClick={() => deleteCommentHandler(comment.id)}
                    >
                      X
                    </button>
                  </p>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
