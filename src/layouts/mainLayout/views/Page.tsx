import React from "react";

import PageTemplate from "../../../layouts/PageTemplate";
import { IAppState } from "../../../stores/types";
import PersistentDrawerLeft from "./Drawer";
import Header from "./Header";
import Content from "./Content";

type TState = {
  isOpen: boolean;
}

class Page extends React.Component<IAppState, TState> {  
  constructor(props: IAppState) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.setOpen = this.setOpen.bind(this);
  }
  
  setOpen(open: boolean) {
    this.setState({ ...this.state, isOpen: open });
  }

  render () {
    return (
      <PageTemplate
        Drawer={ <PersistentDrawerLeft open={this.state.isOpen} onClose={() => this.setOpen(false)} /> }
        Header={ <Header open={this.state.isOpen} onOpen={() => this.setOpen(true)} /> }
        Content={ <Content open={this.state.isOpen} /> }
      />
    );
  }
}

export default Page;
