import React, { Component } from 'react';
import './MessageBox.scss';
import EmojiPicker from 'emoji-picker-react';
const { Textcomplete, Textarea } = require('textcomplete');
import EmojiParser, { shortNames as emojies } from '../EmojiParser/EmojiParser';
import $ from 'jquery';

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
function getOffsetLeft(elem) {
    var offsetLeft = 0;
    do {
        if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
        }
    } while ((elem = elem.offsetParent));
    return offsetLeft;
}
let listened = false;
export default class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.handelTyping = this.handelTyping.bind(this);
        this.emoji = this.emoji.bind(this);
        this.emojiPicker = this.emojiPicker.bind(this);
        this.state = {
            emoji: false,
            emoteAT: 0,
            message: props.value,
            emoji_placeholders: [
                '/emote/64/1f607.png',
                '/emote/64/1f60c.png',
                '/emote/64/1f60b.png',
                '/emote/64/1f605.png'
            ],
            emoji_link: '/emote/64/1f60b.png',
            emoji_idx: 0
        };
        this.props.text(this.state.message);
        this.onMouseOver = this.onMouseOver.bind(this);
    }
    onMouseOver() {
        let { state } = this;
        let next_link;
        let idx = state.emoji_idx;
        idx++;
        if (idx + 1 > state.emoji_placeholders.length) {
            idx = 0;
        }
        next_link = state.emoji_placeholders[idx];
        this.setState({ emoji_link: next_link, emoji_idx: idx });
    }
    componentDidMount() {
        let name = '';
        var css = `
        .textcomplete-dropdown {
            width: ${this.textarea.offsetWidth}px;
            left: ${this.textarea.getBoundingClientRect().left}px !important;
            top: ${this.textarea.getBoundingClientRect().top - 20}px !important;
        }`,
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
        var editor = new Textarea(this.textarea);
        var textcomplete = new Textcomplete(editor);
        let strategies = [
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
        ];
        textcomplete.register(strategies.concat(this.props.strategies || []));
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
                        onKeyPress={e => {
                            console.log('key press');
                            this.props.onKeyPress(e);
                        }}
                        onChange={this.handelTyping}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                    />
                    <img
                        src={state.emoji_link}
                        alt=""
                        onMouseOver={this.onMouseOver}
                        onClick={this.emojiPicker}
                        className={'trigger ' + (state.emoji && 'active')}
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
