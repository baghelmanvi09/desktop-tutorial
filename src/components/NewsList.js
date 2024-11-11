import React from 'react';

const NewsList = ({ news }) => {
  return (
    <ul className="news-list">
      {news.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
          <p>{item.points} points by {item.author} | {item.num_comments} comments</p>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;