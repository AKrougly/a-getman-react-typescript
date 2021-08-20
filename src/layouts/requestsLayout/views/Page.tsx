import React from "react";

import { ReduxType } from "../container/Container";
import PageTemplate from "../../../layouts/PageTemplate";
import Header from "./Header";
import Content from "./Content";

type TState = {
  isOpen: boolean;
}

class Page extends React.Component<ReduxType, TState> {  
  constructor(props: ReduxType) {
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
        Drawer={ null }
        Header={ <Header open={this.state.isOpen} /> }
        Content={ <Content open={this.state.isOpen} {...this.props} /> }
      />
    );
  }
}

export default Page;
