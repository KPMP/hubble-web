import * as React from "react";
import { Plugin, Getter, Action } from "@devexpress/dx-react-core";

export class PaginationState extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagingSize: 10
    };
    this.changePagingSize = this.changePagingSize.bind(this);
  }
  changePagingSize(value) {
    this.setState({
      pagingSize: value
    })
  }

  render() {
    const { pagingSize } = this.state;

    return (
      <Plugin name="PaginationState">       
        <Getter name="pagingSizeValue" value={pagingSize} />
        
        <Action name="changePagingSizeValue" action={this.changePagingSize} />
      </Plugin>
    );
  }
}
