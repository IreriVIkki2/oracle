import React from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { HomeContext } from "../../../../Context/HomeContext";
import updateElement from "../../../../../utils/firebaseMethods/updateElement";
import css from "./Wysiwyg.module.css";
import { stateFromHTML } from "draft-js-import-html";

class Wysiwyg extends React.Component {
    static contextType = HomeContext;

    constructor(props) {
        super(props);
        this.state = {
            editorState: !this.props.value
                ? EditorState.createEmpty()
                : EditorState.createWithContent(
                      stateFromHTML(this.props.value),
                  ),
            changes: 0,
            saving: false,
            newValue: this.props.value,
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = editorState => {
            const rawContentState = convertToRaw(
                editorState.getCurrentContent(),
            );
            const markup = draftToHtml(rawContentState, hashConfig);
            this.setState({
                editorState,
                changes: this.state.changes + 1,
                newValue: markup,
            });
        };

        this.handleKeyCommand = command => this._handleKeyCommand(command);
        this.toggleBlockType = type => this._toggleBlockType(type);
        this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    }

    handleElementUpdate = async () => {
        const { collection, doc, value, path } = this.props;
        const update = {};
        if (this.state.saving && this.state.newValue === value) {
            this.setState({ saving: false });
            return;
        }

        update[path] = this.state.newValue;
        await updateElement(collection, doc, update)
            .then(async () => {
                switch (collection) {
                    case "home":
                        await this.context.updateHomeCollection();
                        break;

                    default:
                        break;
                }
            })
            .catch(err => {
                throw err;
            });
        console.log("[UPDATED Wysiwg]");
        this.setState({ saving: false });
    };

    componentDidUpdate() {
        if (this.state.changes > 5) {
            this.setState({ changes: 0, saving: true });
            this.handleElementUpdate();
        }
    }

    componentWillUnmount() {
        this.handleElementUpdate();
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(this.state.editorState, blockType),
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
        );
    }

    render() {
        const { editorState } = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = css.RichEditorEditor;
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (
                contentState
                    .getBlockMap()
                    .first()
                    .getType() !== "unstyled"
            ) {
                className += ` ${css.RichEditorHidePlaceholder}`;
            }
        }

        return (
            <div>
                <label className="h5" htmlFor={this.props.path}>
                    edit {this.props.label}
                </label>
                <div className={css.RichEditorRoot}>
                    <div className="d-flex">
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={this.toggleBlockType}
                        />
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={this.toggleInlineStyle}
                        />
                    </div>
                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            onBlur={this.handleElementUpdate}
                            placeholder="Tell a story..."
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

const hashConfig = {
    trigger: "#",
    separator: " ",
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case "blockquote":
            return "RichEditor-blockquote";
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = e => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = css.RichEditorStyleButton;
        if (this.props.active) {
            className += ` ${css.RichEditorActiveButton}`;
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    // { label: "H4", style: "header-four" },
    // { label: "H5", style: "header-five" },
    // { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
];

const BlockStyleControls = props => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className={css.RichEditorControls}>
            {BLOCK_TYPES.map(type => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

var INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = props => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className={css.RichEditorControls}>
            {INLINE_STYLES.map(type => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

export default Wysiwyg;
