import * as React from "react";
import { Plugin, Getter, Action } from "@devexpress/dx-react-core";
import tableSettings from '../../../initialState';

export class PaginationState extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagingSize: props.pagingSize || tableSettings.pagingSize
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
      this.props.setResultsPerPage(this.state.pagingSize);
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
