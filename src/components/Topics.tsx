import React from 'react';
import { Container, Row, Col } from 'reactstrap';
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
    moment.locale('nl');
    return (
      <section className="section" aria-label="Community">
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <h2 className="heading section-heading heading-brand">Actueel in de community</h2>
            <ul className="list list-default discussions">
              {this.state.topics.map(topic => (
                <li key={topic.id} className="list-item discussion">
                  <Row>
                    <Col md="9">
                      <a href={`https://forum.pdok.nl/t/${topic.id}`} className="discussion-link heading discussion-heading" target="_blank">{topic.title}</a>
                    </Col>
                    <Col md="3">
                      <div className="discussion-metas">
                        <span className="discussion-meta discussion-meta-comments">{topic.posts_count} <span>reactie{topic.posts_count != '1' ? 's' : ''}</span></span>
                        <span className="discussion-meta discussion-meta-upvotes">{topic.like_count} <span>like{topic.like_count != '1' ? 's' : ''}</span></span>
                      </div>
                    </Col>
                  </Row>
                  <span className="discussion-date">Laatste reactie op { moment(topic.last_posted_at).format('LL [om] LT [uur]') }</span>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
      </section>
    );
  }
}

export default Topics;
