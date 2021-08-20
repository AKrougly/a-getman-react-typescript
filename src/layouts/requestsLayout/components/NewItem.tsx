import React, { createRef } from "react";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import UploadFileButton from "./uploadFile/UploadFileButton";
import DownloadStateButton from "./downloadState/DownloadStateButton";
import { IItem, initialItem } from "../../../stores/types";

const ref: React.RefObject<HTMLDivElement> = createRef();

interface INewItemProps {
  filter: boolean
  onChangeFilterValue: (value: string) => void
  addItem: (item: IItem) => void
  importItems: (file: string) => void
  exportItems: () => void
}

type TState = {
  nameValue: string;
}

class NewItem extends React.Component<INewItemProps, TState> {
  constructor(props: INewItemProps) {
    super(props);
    this.state = {
      nameValue: "",
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleAddItem = () => {
    this.props.addItem({ ...initialItem, name: this.state.nameValue });
    this.setState({nameValue: ""});
    this.props.onChangeFilterValue("");
    if (ref.current !== null) {
      ref.current.focus();
    }
  };

  handleKeyPress({ key }) {
    if (key === "Enter") {
      this.handleAddItem();
    }
  }

  handleChange({ target: { value } }) {
    this.setState({nameValue: value});
    this.props.onChangeFilterValue(value);
  }

  render () {
    return (
      <List>
        <ListItem>
          <TextField
            fullWidth
            label="Add an item"
            ref={ref}
            value={this.state.nameValue}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    title="Click to add"
                    disabled={this.props.filter || !this.state.nameValue.trim()}
                    onClick={this.handleAddItem}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </ListItem>
        <ListItem>
          <UploadFileButton
            disabled={this.props.filter || !!this.state.nameValue.trim()}
            onImport={this.props.importItems}
          />
          <DownloadStateButton
            disabled={this.props.filter}
            onExport={this.props.exportItems}
          />
        </ListItem>
      </List>
    );
  }
}

export default NewItem;