import React from 'react';
import cloneWithProps from 'react/lib/cloneWithProps';


let SemanticModal = React.createClass({
  propTypes: {
    title: React.PropTypes.node,
    backdrop: React.PropTypes.bool,
    closeButton: React.PropTypes.bool,
    onRequestHide: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      backdrop: true,
      closeButton: true
    };
  },
  render() {
    return (
      <div className="modal" style={{display: 'block'}}>
        <div className="modal-dialog" {... this.props} >
          <div className="modal-content">
            {this.renderCloseButton()}
            {this.renderHeader()}
            {this.props.children}
          </div>
        </div>
      </div>
    )

  },
  renderCloseButton() {
    if (this.props.closeButton) {
      return (
        <i
          className="close icon"
          onClick={this.props.onRequestHide}
        />
      )
    }
  },
  renderHeader() {
    if (this.props.title) {
      return (
        <div className="modal-header">
          {this.props.title}
        </div>
      );
    }
  }
});

let OverlayMixin = {
  getDefaultProps() {
    return {
      container: {
        getDOMNode() {
          return document.body;
        }
      }
    };
  },
  componentWillUnmount() {
    this._unrenderOverlay();
    if (this._overlayTarget) {
      this.getContainerDOMNode().removeChild(this._overlayTarget);
      return this._overlayTarget = null;
    }
  },
  componentDidUpdate() {
    return this._renderOverlay();
  },
  componentDidMount() {
    return this._renderOverlay();
  },
  _mountOverlayTarget() {
    this._overlayTarget = document.createElement('div');
    return this.getContainerDOMNode().appendChild(this._overlayTarget);
  },
  _renderOverlay() {
    if (!this._overlayTarget) {
      this._mountOverlayTarget();
    }
    return this._overlayInstance = React.render(this.renderOverlay(), this._overlayTarget);
  },
  _unrenderOverlay() {
    React.unmountComponentAtNode(this._overlayTarget);
    return this._overlayInstance = null;
  },
  getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }
    return this._overlayInstance.getDOMNode();
  },
  getContainerDOMNode() {
    if (this.props.container.getDOMNode) {
      return this.props.container.getDOMNode();
    } else {
      return this.props.container;
    }
  }
};

let ModalTrigger = React.createClass({
  mixins: [OverlayMixin],
  propTypes: {
    modal: React.PropTypes.node.isRequired
  },
  getInitialState() {
    return {
      isOverlayShown: false
    };
  },
  show() {
    return this.setState({
      isOverlayShown: true
    });
  },
  hide() {
    return this.setState({
      isOverlayShown: false
    });
  },
  toggle() {
    return this.setState({
      isOverlayShown: !this.state.isOverlayShown
    });
  },
  renderOverlay() {
    if (!this.state.isOverlayShown) {
      return <span/>
    } else {
      return cloneWithProps(this.props.modal, {
        onRequestHide: this.hide
      });
    }
  },
  render() {
    let child = React.Children.only(this.props.children);
    return cloneWithProps(child, {
      onClick: this.toggle
    });
  }
});
module.exports = {
  SemanticModal: SemanticModal,
  ModalTrigger: ModalTrigger,
  OverlayMixin: OverlayMixin
};
