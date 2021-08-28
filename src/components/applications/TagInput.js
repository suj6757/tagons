/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { post } from "axios";

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

class TagInput extends React.Component {
  constructor(props) {
    super(props);

    /// Competitors 가져오기
    let compeltitors = [];
    post('/common/GetCompetitors_List').
    then((response) => {
      console.log('GetCompetitors_List', response);

      response.data.Competitors.map((c) => {
        compeltitors.push(c.Competitors);
      });

      this.setState({
        competitors: compeltitors,
      });

    })
      .catch(function (error) {
        console.log(error);
      });

    this.state = {
      tagNum : props.defaultTagNum,
      tags: [],
      competitors: [],
    };
  }

  componentDidUpdate(props) {
    // only update chart if the data has changed

    // console.log('componentDidUpdate', props);
    if (this.props.searchBtnClick){
      let { tags } = this.state;
      this.props.searchStart(tags);
    }
  }

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  /// 추가시
  handleAddition = (tag) =>  {
    const { tags , tagNum} = this.state;
    console.log('handleAddition',tag);

    let competitors = this.state.competitors;
    if (competitors.includes(tag.text)) {
      if(tags.length !== tagNum ){
        this.setState(state => ({ tags: [...state.tags, tag] }));
      }
    }
  }

  render() {
    const { tags } = this.state;
    const { tagNum } = this.state;
    return (
      <div>
        <ReactTags tags={tags}
                   handleDelete={this.handleDelete}
                   handleAddition={this.handleAddition}
                   delimiters={delimiters}
                   allowDeleteFromEmptyInput={true}
                   placeholder='Add New Item'
                   name={tags.length !== 5 ? `input-tag` : `input-tag hide`}
                  //  suggestions={suggestions}
                   inline={true}
        />
      </div>
    )
  }
};


export default TagInput;