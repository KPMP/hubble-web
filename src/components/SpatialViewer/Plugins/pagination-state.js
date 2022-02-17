import * as React from "react";
import { Plugin, Getter, Action } from "@devexpress/dx-react-core";
import * as PropTypes from "prop-types";

export class PaginationState extends React.PureComponent {
  constructor(props) {
    super(props);
    const { } = props;
    this.state = {
      pagingSize: 10
    };
    this.changePagingSize = this.changePagingSize.bind(this);

    this.toggleArrangeColumnsDialogState = this.toggleArrangeColumnsDialogState.bind(this);

  }
  changePagingSize(value) {
    this.setState({
      pagingSize: value
    })
  }

  toggleArrangeColumnsDialogState() {
    console.log('bar')
    return 20
  }  


  render() {
    const { pagingSize, sortDialogOpen, arrangeColumnsDialogOpen } = this.state;

    return (
      <Plugin name="PaginationState">
        {/* <Getter name="totalCount"  value={0} /> */}
        
        <Getter name="pagingSizeValue" value={pagingSize} />

        <Action name="changePagingSizeValue" action={this.changePagingSize} />
        <Action name="setCurrentPage" action={this.setCurrentPage} />
      </Plugin>
    );
  }
}

PaginationState.propTypes = {
  defaultFilterValue: PropTypes.string,
  columnName: PropTypes.string
};

PaginationState.defaultProps = {
  defaultFilterValue: "",
  columnName: ""
};
