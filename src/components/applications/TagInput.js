/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

class TagInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tagNum : props.defaultTagNum,
            tags: [],
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

    handleAddition = (tag) =>  {
      const { tags , tagNum} = this.state;
      // console.log('handleAddition',tag);
      if(tags.length !== tagNum ){
          this.setState(state => ({ tags: [...state.tags, tag] }));
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
                    allowDeleteFromEmptyInput={false}
                    placeholder='No Competitors'
                    name={tags.length !== tagNum ? `input-tag` : `input-tag hide`}
                    />
            </div>
        )
    }
};


export default TagInput;