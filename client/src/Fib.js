import axios from 'axios';
import { Component } from 'react';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.data });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      )
    }
    return entries;
  }

  render() {
    return (
      <div className='container mt-4 text-center'>
        <form onSubmit={this.handleSubmit}>
          <label className='form-label mb-3'>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
            className='form-control w-25 m-auto mb-3'
          />
          <button className='btn btn-primary mb-3'>Submit</button>
        </form>

        <h4 className='mb-3'>Index I have seen:</h4>
        {this.renderSeenIndexes()}

        <h4>Calculated values:</h4>
        {this.renderValues()}
      </div>
    )
  }
}

export default Fib;
