import React, { useState } from "react";
import axios from "axios";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const handleEdit = () => {
    const data = {
      author: article.author,
      content: editedContent ? editedContent : article.content,
      date: article.date
    };
    console.log(data);
    axios
      .put("http://localhost:3003/articles" + article.id, data)
      .then(() => setIsEditing(false));
  };

  return (
    <div
      className="article"
      style={{ background: isEditing ? " #a95ddb" : "white" }}
    >
      <div className="card-header">
        <h3>
          {" "}{article.author}{" "}
        </h3>
        <em>
          posté le : {article.date}
        </em>

        {isEditing
          ? <textarea
              onChange={e => setEditedContent(e.target.value)}
              autoFocus
              defaultValue={editedContent ? editedContent : article.content}
            />
          : <p>
              {" "}{editedContent ? editedContent : article.content}{" "}
            </p>}
        <div className="btn-container">
          {isEditing
            ? <button onClick={handleEdit}> Valider </button>
            : <button onClick={() => setIsEditing(true)}> Edit </button>}
        </div>
      </div>
    </div>
  );
};

export default Article;
