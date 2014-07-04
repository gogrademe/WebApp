/** @jsx React.DOM */

var Grid = React.createClass({
  getInitialState: function(){
    return {
      sortByIndex: null,
      sortDirection: true
    };
  },
  render: function(){
    var data = this.props.data;
    var getRenderer = this.getRenderer;
    return (
    <table className="table">
      <thead><tr>{this.props.headers.map(this.renderHeader)}</tr></thead>
      <tbody>
        {data.map(function(row, rowI){
          return (<tr>{row.map(function(column, columnI){
            var result = getRenderer(column, rowI, columnI)({
              row: rowI,
              column: columnI,
              value: column
            });

            return <td>{result}</td>
          })}</tr>);
        })}
      </tbody>
    </table>
    );
  },
  getRenderer: function(item, rowI, columnI){
    var renderers = this.props.renderers, renderer;
    for (var i=0; i<renderers.length; i++){
      if (renderer = renderers[i](item, rowI, columnI)) {
        return renderer;
      }
    }
    throw new Error("No renderer for " + item + " at r" + rowI + " c" + columnI);
  },
  renderHeader: function(text, index){
    var handler = function(){
      var currentIndex = this.state.sortByIndex;
      this.setState({
        sortByIndex: index,

        // flip direction if selected, otherwise set to false
        sortByDirection: index === currentIndex
            ? !this.state.sortByDirection
            : false
      });
    }.bind(this);
    return (
    <th onClick={handler}>
      {this.state.sortByIndex === index
        && <span>{this.state.sortByDirection ? '↑ ' : '↓ '}</span>}
      {text}
    </th>
    );
  }
});

function bindId(x){
  return function(){
    return x;
  };
}

var events = new EventEmitter2();

var StringRenderer = React.createClass({
  getInitialState: function(){
    return {editing: false};
  },
  handleChange: function(event){
    events.emit('change', {
      value: event.target.value,
      column: this.props.column,
      row: this.props.row
    });
  },
  render: function(){
    if (this.state.editing) {
      return (
      <div>
        <input value={this.props.value} onChange={this.handleChange} />
        <button onClick={this.toggle}>x</button>
      </div>
      )
    }
    else {
      return <div onClick={this.toggle}>{this.props.value}</div>
    }
  },
  toggle: function(){
    this.setState({
      editing: !this.state.editing
    });
  },
});

var App = React.createClass({
  getInitialState: function(){
    return {data: [
      ["John", 67, 10000],
      ["Tom", 99, 10001]
    ]};
  },
  componentDidMount: function(){
    events.on('change', function(data){
      var table = this.state.data.slice();
      var row = table[data.row].slice();
      row[data.column] = data.value;
      table[data.row] = row;
      this.setState({
        data: table
      });
    }.bind(this));
  },
  render: function(){
    return (
      <div>
        <Grid headers={"Name Grade Id".split(" ")}
          data={this.state.data}
          renderers={[bindId(StringRenderer)]} />

        <pre>{JSON.stringify(this.state.data, null, 4)}</pre>
      </div>
    );
  }
});

React.renderComponent(<App />, document.body);
