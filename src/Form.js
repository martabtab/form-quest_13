import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastname: "",
      firstname: "",
      email: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    fetch("https://post-a-form.herokuapp.com/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())

      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Movie #${res} has been successfully added!`);
        }
      })
      .catch(e => {
        console.error(e);
        alert("There was an error when adding the movie.");
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // to "disable" the browser's default behavior when submitting a form
  submitForm(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="FormMovies">
        <h1>Favorite movie</h1>

        <form onSubmit={this.submitForm}>
          <div className="form-data">
            <label htmlFor="movie">Movie</label>
            <input
              type="text"
              id="movie"
              name="movie"
              onChange={this.onChange}
              value={this.state.movie}
            />
          </div>

          <div className="form-data">
            <label htmlFor="URL">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              onChange={this.onChange}
              value={this.state.url}
            />
          </div>

          <div className="form-data">
            <label htmlFor="comment">Comment</label>
            <textarea
              // type="email"
              id="comment"
              name="comment"
              onChange={this.onChange}
              value={this.state.comment}
            />
          </div>

          <div className="form-data">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
