import React from 'react';
import { Table } from 'reactstrap';
const sortJsonArray = require('sort-json-array');

export interface Props {
  readonly uri: any;
}

export interface State {
  readonly topics: Topic[];
}

export interface Topic {
  readonly title: string;
}

class Topics extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      topics: [],
    };
  }

  async componentDidMount() {
    const opts = {
      headers: {
        Accept: 'application/json',
      },
    };

    try {
      const response = await fetch(
        this.props.uri,
        opts,
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const jsonData = await response.json();

      const topics = sortJsonArray(jsonData.topic_list.topics, 'last_posted_at', 'des').slice(0, 10);
      this.setState({
        topics,
      });
    } catch (err) {
    }
  }

  render() {
    return (
      <Table>
        <tbody>
        {this.state.topics.map(topic => (
          <tr key={topic.title}>
            <td>{topic.title}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    );
  }
}

export default Topics;
