import React, { useState } from "react";
import signup1 from '../images/Back.jpeg'

export default function Home(props) {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Title or desc is empty");
    } else {
      props.Add(title, desc);
      settitle("");
      setdesc("");
    }
  };
  return (
    <div className="background" style={{
        backgroundImage: `url(${signup1})`,
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '81.5vh'
    }}>
      <section className="homepage">
      <h3 className="text-center text-white ml-0">Add Song in Playlist</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-white">
            Song title
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
            id="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label text-white">
            Filter by
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
            className="form-control"
            id="desc"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </section>
    </div>
  );
}