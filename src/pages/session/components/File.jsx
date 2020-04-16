import React, { Component, createRef } from "react";
import styled from "styled-components";

import { Image, Volume1, Film, FileText, Terminal, File as FileBasic } from "react-feather";

import DragIcon from "./DragIcon.jsx";

import { toAccurateDate, toAccurateFileSize, getExactFileType } from "../../../assets/utils/utils.js";

const Wrapper = styled.div`
  user-select: none;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 7px 20px;
  border: 1px solid ${props => props.selected ? `var(--color-blue) !important` : `transparent`};
  border-radius: 12px;
  outline: none;
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.selected ? `var(--color-white) !important` : props.highlighted ? `var(--color-grey-light)` : `var(--color-grey)`};
  background: ${props => props.selected ? `var(--color-blue-blur) !important` : props.highlighted ? `var(--color-black)` : `var(--color-dark)`};
  
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 16px;
  }

  &:hover {
    color: var(--color-grey-light);
    background: var(--color-black);
  }

  &:active {
    color: var(--color-grey);
  }
`

const Info = styled.span`
  flex: ${props => props.priority ? props.priority : `1`};
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 17px;
  text-align: ${props => props.right ? "right" : "left"};

  &:not(:last-child) {
    margin-right: 12px;
  }

  &::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
`

export default class File extends Component {
  constructor(props) {
    super(props);

    this.dragIcon = createRef();
  }

  render() {
    const timestamp = toAccurateDate(this.props.file.time);
    const size = Math.round(
      toAccurateFileSize(this.props.file.size).size * 10
    ) / 10 + " " + toAccurateFileSize(this.props.file.size).unit;
    let Icon;

    switch (getExactFileType(this.props.file.name)) {
      case "img":
        Icon = <Image />
        break;
      case "snd":
        Icon = <Volume1 />
        break;
      case "vid":
        Icon = <Film />
        break;
      case "scr":
        Icon = <Terminal />
        break;
      case "txt":
        Icon = <FileText />
        break;
      default:
        // Icon = <FileBasic />
        Icon = <FileText />
        break;
    }

    return (
      <Wrapper
        draggable
        selected={this.props.selected}
        highlighted={this.props.highlighted}
        onClick={() => this.props.onClick.call(this, this.props.file)}
        // onDoubleClick={() => this.props.onDoubleClick.call(this, this.props.file)}
        onDragStart={(event) => {
          event.dataTransfer.setData("native", "true")
          let files = [this.props.file]
          if (this.props.selection.includes(this.props.file)) {
            files = this.props.selection;
            if (this.props.selection.length > 1) {
              event.dataTransfer.setDragImage(this.dragIcon.current, 16, 16)
            }
          }
          event.dataTransfer.setData("nativeFiles", JSON.stringify(files))
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          this.props.onContext.call(this, event);
        }}
      >
        {Icon}
        <Info priority={3}>{this.props.file.name}</Info>
        <Info right>{size}</Info>
        <Info right>{timestamp.day + "/" + timestamp.month + "/" + timestamp.year}</Info>
        <DragIcon
          _ref={this.dragIcon}
          count={this.props.selection.length}
        />
      </Wrapper>
    )
  }
}
