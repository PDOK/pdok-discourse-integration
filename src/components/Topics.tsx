import React from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment-timezone';
import sortJsonArray from 'sort-json-array';

export interface Props {
  readonly uri: any;
}

export interface State {
  readonly topics: Topic[];
}

export interface Topic {
  readonly id: string;
  readonly title: string;
  readonly like_count: string;
  readonly posts_count: string;
  readonly last_posted_at: string;
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

      const topics = sortJsonArray(jsonData.topic_list.topics, 'last_posted_at', 'des').slice(0, 4);

      this.setState({
        topics,
      });
    } catch (err) {
    }
  }

  render() {
    const url = new URL(this.props.uri);
    moment.locale('nl');
    return (
      <>
        <h2>Actueel in de community</h2>
           {this.state.topics.map((topic) => {
             const date = moment(topic.last_posted_at).format('DD MMMM YYYY');
             const time = moment(topic.last_posted_at).format('HH:mm');
             return (
                 <Row key={topic.id} className="overview-item">
                   <Col lg="9">
                     <h3 className="overview-header">
                       <a href={`${url.protocol}//${url.host}/t/${topic.id}`}>{topic.title}</a>
                     </h3>
                     <p>Laatste reactie op <time dateTime={date}>{date}</time> om <time
                         dateTime={time}>{time}</time> uur
                     </p>
                   </Col>
                   <Col lg="3">
                     <Row className="discussion-metadata">
                       <Col xs="6">
                         <p>
                           <span className="ico ico-social-comment discussion-metadata-icon" aria-hidden="true"/>
                           <span className="sr-only">Aantal reacties:</span>{topic.posts_count}
                         </p>
                       </Col>
                       <Col xs="6">
                         <p>
                           <span className="ico ico-social-like discussion-metadata-icon" aria-hidden="true"/>
                           <span className="sr-only">Aantal likes:</span>{topic.like_count}
                         </p>
                       </Col>
                     </Row>
                   </Col>
                 </Row>
             );
           })}
      </>
    );
  }
}

export default Topics;
