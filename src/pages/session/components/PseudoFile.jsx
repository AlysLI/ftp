import React, { Component } from "react"
import styled from "styled-components";

import { FilePlus, FolderPlus, Type } from "react-feather";

const Wrapper = styled.div`
  outline: none;
  user-select: none;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 6px 20px;
  border: 1px solid transparent;
  border-radius: 12px;
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  color: var(--color-white);
  background: var(--color-black);
  
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 16px;
    color: var(--color-blue);
  }
`

const Input = styled.input`
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  width: 264px;
  height: 19px;
  overflow: visible;
  padding: 0;
  border: none;
  color: var(--color-white);
  background: var(--color-black);

  &:focus {
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    user-select: all;
  }

  &::placeholder {
    color: var(--color-grey);
  }
`

export class NewFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }

    this.submit = this.submit.bind(this);
  }

  submit() {
    console.debug("submitting new file", this.state.name)
    if (typeof this.props.onSubmit === "function") {
      this.props.onSubmit.call(this, this.props.path, this.state.name);
      this.props.onClose.call(this);
    }
  }

  render() {
    return (
      <Wrapper>
        <FilePlus />
        <Input
          type="text"
          placeholder="my file"
          onChange={(event) => {
            this.setState({ name: event.target.value })
          }}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              if (this.state.name !== "") this.submit();
            } else if (event.keyCode === 27) {
              this.props.onClose.call(this);
            }
          }}
          onBlur={(event) => {
            if (this.state.name !== "") this.submit();
            else this.props.onClose.call(this);
          }}
          autoFocus
        />
      </Wrapper>
    )
  }
}

export class NewFolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }

    this.submit = this.submit.bind(this);
  }

  submit() {
    console.debug("submitting new folder", this.state.name)
    if (typeof this.props.onSubmit === "function") {
      this.props.onSubmit.call(this, this.props.path, this.state.name);
      this.props.onClose.call(this);
    }
  }

  render() {
    return (
      <Wrapper>
        <FolderPlus />
        <Input
          type="text"
          placeholder="my folder"
          onChange={(event) => {
            this.setState({ name: event.target.value })
          }}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              if (this.state.name !== "") this.submit();
            } else if (event.keyCode === 27) {
              this.props.onClose.call(this);
            }
          }}
          onBlur={(event) => {
            if (this.state.name !== "") this.submit();
            else this.props.onClose.call(this);
          }}
          autoFocus
        />
      </Wrapper>
    )
  }
}

export class Rename extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }

    this.submit = this.submit.bind(this);
  }

  submit() {
    console.debug("renaming file to", this.state.name)
    if (typeof this.props.onSubmit === "function") {
      this.props.onSubmit.call(this, this.props.target, this.state.name);
      this.props.onClose.call(this);
    }
  }

  render() {
    return (
      <Wrapper>
        <Type />
        <Input
          type="text"
          defaultValue={this.props.target.name}
          placeholder={this.props.target.name}
          onChange={(event) => {
            this.setState({ name: event.target.value })
          }}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              if (this.state.name !== "") this.submit();
            } else if (event.keyCode === 27) {
              this.props.onClose.call(this);
            }
          }}
          onFocus={(event) => {
            event.target.select();
          }}
          onBlur={(event) => {
            if (this.state.name !== "") this.submit();
            else this.props.onClose.call(this);
          }}
          autoFocus
        />
      </Wrapper>
    )
  }
}
