import * as React from "react";
import { Plugin, Getter, Action } from "@devexpress/dx-react-core";

export class PaginationState extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagingSize: props.pagingSize || 10
    };
    this.changePagingSize = this.changePagingSize.bind(this);
  }

  changePagingSize(value) {
    this.setState({
      pagingSize: value
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state !== prevState) {
      this.props.setTableSettings(this.state);
    }
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
