import * as React from "react";
import * as utils from "../utils/index";
import DeleteBtn from "./DeleteButton";
import { Table, StrictTableProps } from "semantic-ui-react";
import api from "../api/api";

let get = function(obj, prop) {
  var parts, last;
  parts = prop.split(".");
  last = parts.pop();
  while ((prop = parts.shift())) {
    obj = obj[prop];
    if (typeof obj !== "object" || !obj) {
      return;
    }
  }
  return obj[last];
};
let formatVal = function(val, format) {
  if (typeof format === "function") {
    return format(val);
  }
  switch (format) {
    case "date":
      return utils.formatDate(val);
    case "decimalPercent":
      return Math.round(val * 100);
    case val === undefined:
      return "empty";
    default:
      return val;
  }
};

const StringRenderer = ({ value, column: { format } }) => {
  // const [editing, setEditing] = React.useState(false);
  // getInitialState() {
  //   return {
  //     editing: false
  //   };
  // }
  const val = formatVal(value, format);
  return <div>{val}</div>;
};

interface GridProps extends StrictTableProps {
  columns: any;
  data: any;
}
class Grid extends React.Component<GridProps, undefined> {
  render() {
    const { data, columns: cols, ...props } = this.props;
    const shouldRenderFooter = cols.some(x => !!x.footerRenderer);
    return (
      <Table className="table" {...props}>
        <thead>
          <tr>{cols.map(this.renderHeader)}</tr>
        </thead>
        <tbody>
          {data.map((row, rowI) => {
            let key = `row-${rowI}-${row.id}`;
            return (
              <tr key={key}>
                {cols.map((column, columnI) => {
                  const Renderer = this.getRenderer(column);
                  return (
                    <td key={`cell=${rowI}-${columnI}`} className={column.tdClassName || ""}>
                      <Renderer
                        rowI={rowI}
                        row={row}
                        columnI={columnI}
                        column={column}
                        value={get(row, column.key || "")}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {shouldRenderFooter ? (
          <tfoot>
            <tr>{cols.map(this.renderFooter)}</tr>
          </tfoot>
        ) : null}
      </Table>
    );
  }
  getRenderer = column => {
    return column.renderer || StringRenderer;
  };
  renderHeader = (obj, index) => {
    return (
      <th key={"col-" + index} className={obj.className}>
        {obj.display || obj.key}
      </th>
    );
  };
  renderFooter = (obj, index) => {
    const Renderer = obj.footerRenderer;
    return (
      <td key={"col-foot-" + index} className={obj.className}>
        {Renderer ? <Renderer {...this.props} column={obj} /> : null}
      </td>
    );
  };
}

interface ActionProps {
  row: any;
  column: any;
}
class CrudActions extends React.Component<ActionProps, undefined> {
  handleDelete = e => {
    e.preventDefault();
    const resourceType = this.props.column.resourceType;
    return api[resourceType].del(this.props.row[resourceType + "Id"]);
  };
  render() {
    return <DeleteBtn onClick={this.handleDelete} />;
  }
}

export { Grid, CrudActions, StringRenderer };
