import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import Message from './Message';
import { getMessages } from '../actions/actions';
import { connect } from 'react-redux';

class Messages extends React.PureComponent {

  componentDidMount() {
    this.props.getMessages()
  }
  _keyExtractor = message => {
    return message.id;
  };

  render() {
    const { messages, isGettingMessages } = this.props;
    return (
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message body={item.body} />
        )}
        onRefresh={()=> this.props.getMessages()}
        refreshing={isGettingMessages}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'stretch',
  },
});

const mapStateToProps = state => {
  let { messages, isGettingMessages } = state
  return {
    messages,
    isGettingMessages
  };
};

export default connect(mapStateToProps, { getMessages })(Messages);