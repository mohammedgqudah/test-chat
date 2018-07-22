import React, { Component } from 'react';
import './MessageBox.scss';
import EmojiPicker from 'emoji-picker-react';
const { Textcomplete, Textarea } = require('textcomplete');
import EmojiParser, { shortNames as emojies } from '../EmojiParser/EmojiParser';

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
let emojies2 = emojies.split('|');
emojies2.forEach((emoji, idx) => {
    emojies2[idx] = emoji.replace(/:/g, '');
});
emojies2.filter(emoji => {
    return !emoji.includes('tone');
});
console.log(emojies2);
export default class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.handelTyping = this.handelTyping.bind(this);
        this.emoji = this.emoji.bind(this);
        this.emojiPicker = this.emojiPicker.bind(this);
        this.state = {
            emoji: false,
            emoteAT: 0,
            message: props.value
        };
        this.props.text(this.state.message);
    }
    componentDidMount() {
        var editor = new Textarea(this.textarea);
        var textcomplete = new Textcomplete(editor);
        textcomplete.register([
            {
                match: /(^|\s):(\w+)$/,
                search: function(term, callback) {
                    callback(
                        emojies2
                            .filter(emoji => {
                                return emoji.startsWith(term);
                            })
                            .map(e => {
                                return EmojiParser(`:${e}:`) + '   ' + `${e}`;
                            })
                    );
                },
                replace: function(value) {
                    return (
                        '$1:' + value.split('/>')[1].replace(/\s/g, '') + ': '
                    );
                }
            }
        ]);
    }
    Drag(evt) {
        console.log(evt);
    }
    emoji(val, rest) {
        let { actions, id, store } = this.props;
        val = this.props.value || '';
        let old = this.textarea.selectionStart;
        this.props.text(val.splice(old, 0, ` :${rest.name}: `));
    }
    emojiPicker() {
        this.setState({ emoji: !this.state.emoji });
    }
    handelTyping(evt) {
        this.props.text(evt.target.value);
    }
    render() {
        let { state } = this;
        let val = state.message;
        return (
            <div
                className={'MessageBox ' + this.props.className || ''}
                style={{ width: this.props.width }}
            >
                <div className="textarea-con">
                    <textarea
                        ref={r => (this.textarea = r)}
                        onKeyPress={this.props.onKeyPress}
                        onChange={this.handelTyping}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onDrop={this.Drag}
                    />
                    <img
                        src="/static/img/_XTgfmYpMZ.jpg"
                        alt=""
                        onClick={this.emojiPicker}
                        className={"trigger " + (state.emoji && 'active')}
                    />
                    {state.emoji && (
                        <EmojiPicker
                            onEmojiClick={this.emoji}
                            emojiResolution={64}
                            disableDiversityPicker
                            assetPath={'/emote'}
                        />
                    )}
                </div>
            </div>
        );
    }
}
